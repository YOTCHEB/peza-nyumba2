-- Peza Nyumba Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('tenant', 'landlord', 'admin');

-- Create enum for property types
CREATE TYPE property_type AS ENUM ('House', 'Room', 'Apartment', 'Bedsitter', 'Shop/Office');

-- Create enum for listing status
CREATE TYPE listing_status AS ENUM ('Available', 'Taken', 'Pending');

-- Create enum for report status
CREATE TYPE report_status AS ENUM ('pending', 'investigating', 'resolved', 'dismissed');

-- Create enum for report reasons
CREATE TYPE report_reason AS ENUM ('fake_listing', 'wrong_info', 'unavailable', 'spam', 'inappropriate', 'other');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  role user_role DEFAULT 'tenant',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listings table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  property_type property_type NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  rent_price INTEGER NOT NULL,
  city VARCHAR(100) NOT NULL,
  area VARCHAR(255) NOT NULL,
  description TEXT,
  amenities TEXT[],
  images TEXT[],
  contact_phone VARCHAR(20),
  contact_whatsapp VARCHAR(20),
  status listing_status DEFAULT 'Available',
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_name VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20),
  sender_email VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table (for flagging fake/inappropriate listings)
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  reason report_reason NOT NULL,
  other_reason TEXT,
  description TEXT,
  status report_status DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX idx_listings_city ON public.listings(city);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_is_approved ON public.listings(is_approved);
CREATE INDEX idx_listings_location ON public.listings(latitude, longitude);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_listing_id ON public.favorites(listing_id);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_auth_id ON public.users(auth_id);
CREATE INDEX idx_users_phone ON public.users(phone);
CREATE INDEX idx_reports_listing_id ON public.reports(listing_id);
CREATE INDEX idx_reports_status ON public.reports(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = auth_id OR auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- Listings policies
CREATE POLICY "Anyone can view approved listings" ON public.listings
  FOR SELECT USING (is_approved = true OR auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin'));

CREATE POLICY "Landlords can create listings" ON public.listings
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'landlord' OR role = 'admin')
  );

CREATE POLICY "Landlords can update their own listings" ON public.listings
  FOR UPDATE USING (
    landlord_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()) OR 
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Landlords can delete their own listings" ON public.listings
  FOR DELETE USING (
    landlord_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()) OR 
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin')
  );

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can manage their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Listing owners can view messages" ON public.contact_messages
  FOR SELECT USING (
    listing_id IN (SELECT id FROM public.listings WHERE landlord_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())) OR
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin')
  );

-- Reports policies
CREATE POLICY "Anyone can create reports" ON public.reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own reports" ON public.reports
  FOR SELECT USING (
    reporter_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()) OR
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins can update reports" ON public.reports
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM public.users WHERE role = 'admin')
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_listing_view_count(listing_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.listings SET view_count = view_count + 1 WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
