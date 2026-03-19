import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { getSupabaseClient } from '../lib/supabase.js';

const router = Router();

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const { city, propertyType, minPrice, maxPrice, bedrooms, status, search, page = '1', limit = '20' } = req.query;
    
    const supabase = getSupabaseClient();
    let query = supabase
      .from('listings')
      .select('*, users(full_name)', { count: 'exact' })
      .eq('is_approved', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    // Apply filters
    if (city) {
      query = query.eq('city', city as string);
    }
    if (propertyType) {
      query = query.eq('property_type', propertyType);
    }
    if (minPrice) {
      query = query.gte('rent_price', parseInt(minPrice as string));
    }
    if (maxPrice) {
      query = query.lte('rent_price', parseInt(maxPrice as string));
    }
    if (bedrooms) {
      query = query.eq('bedrooms', parseInt(bedrooms as string));
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (search) {
      // Text search on title and description
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,area.ilike.%${search}%`);
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;
    query = query.range(from, to);

    const { data: listings, error, count } = await query;

    if (error) {
      console.error('Get listings error:', error);
      return res.status(500).json({ error: 'Failed to fetch listings' });
    }

    // Transform data for frontend
    const transformedListings = listings?.map((listing: any) => ({
      id: listing.id,
      title: listing.title,
      propertyType: listing.property_type,
      bedrooms: listing.bedrooms,
      rentPrice: listing.rent_price,
      city: listing.city,
      area: listing.area,
      description: listing.description,
      amenities: listing.amenities || [],
      images: listing.images || [],
      contactPhone: listing.contact_phone,
      contactWhatsapp: listing.contact_whatsapp,
      status: listing.status,
      isApproved: listing.is_approved,
      isFeatured: listing.is_featured,
      viewCount: listing.view_count,
      createdAt: listing.created_at,
      landlordName: listing.users?.full_name || 'Unknown',
      lat: listing.latitude ? parseFloat(listing.latitude) : null,
      lng: listing.longitude ? parseFloat(listing.longitude) : null,
    }));

    res.json({
      listings: transformedListings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();

    // Increment view count
    await supabase.rpc('increment_listing_view_count', { listing_uuid: id });

    const { data: listing, error } = await supabase
      .from('listings')
      .select('*, users(full_name, phone)')
      .eq('id', id)
      .single();

    if (error || !listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Transform data
    const transformedListing = {
      id: listing.id,
      title: listing.title,
      propertyType: listing.property_type,
      bedrooms: listing.bedrooms,
      rentPrice: listing.rent_price,
      city: listing.city,
      area: listing.area,
      description: listing.description,
      amenities: listing.amenities || [],
      images: listing.images || [],
      contactPhone: listing.contact_phone,
      contactWhatsapp: listing.contact_whatsapp,
      status: listing.status,
      isApproved: listing.is_approved,
      isFeatured: listing.is_featured,
      viewCount: listing.view_count,
      createdAt: listing.created_at,
      landlordName: listing.users?.full_name || 'Unknown',
      landlordPhone: listing.users?.phone,
      lat: listing.latitude ? parseFloat(listing.latitude) : null,
      lng: listing.longitude ? parseFloat(listing.longitude) : null,
    };

    res.json(transformedListing);
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new listing (landlord only)
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const {
      title,
      propertyType,
      bedrooms,
      rentPrice,
      city,
      area,
      description,
      amenities,
      images,
      contactPhone,
      contactWhatsapp,
      latitude,
      longitude,
    } = req.body;

    // Validate required fields
    if (!title || !propertyType || !rentPrice || !city || !area) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = getSupabaseClient();

    // Get landlord info
    const { data: landlord } = await supabase
      .from('users')
      .select('id, full_name')
      .eq('id', userId)
      .single();

    if (!landlord) {
      return res.status(404).json({ error: 'Landlord not found' });
    }

    // Insert listing
    const { data: listing, error } = await supabase
      .from('listings')
      .insert({
        landlord_id: userId,
        title,
        property_type: propertyType,
        bedrooms: bedrooms || 0,
        rent_price: rentPrice,
        city,
        area,
        description: description || null,
        amenities: amenities || [],
        images: images || [],
        contact_phone: contactPhone || null,
        contact_whatsapp: contactWhatsapp || null,
        latitude: latitude || null,
        longitude: longitude || null,
        is_approved: false, // Requires admin approval
      })
      .select()
      .single();

    if (error) {
      console.error('Create listing error:', error);
      return res.status(400).json({ error: 'Failed to create listing' });
    }

    res.status(201).json({
      message: 'Listing created successfully. Pending admin approval.',
      listing: {
        id: listing.id,
        title: listing.title,
        propertyType: listing.property_type,
        bedrooms: listing.bedrooms,
        rentPrice: listing.rent_price,
        city: listing.city,
        area: listing.area,
        description: listing.description,
        amenities: listing.amenities,
        images: listing.images,
        contactPhone: listing.contact_phone,
        contactWhatsapp: listing.contact_whatsapp,
        status: listing.status,
        isApproved: listing.is_approved,
        isFeatured: listing.is_featured,
        viewCount: listing.view_count,
        createdAt: listing.created_at,
        landlordName: landlord.full_name,
        lat: listing.latitude ? parseFloat(listing.latitude) : null,
        lng: listing.longitude ? parseFloat(listing.longitude) : null,
      },
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update listing (landlord or admin)
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updateData = req.body;

    const supabase = getSupabaseClient();

    // Check if user owns the listing or is admin
    const { data: listing } = await supabase
      .from('listings')
      .select('landlord_id, users!inner(role)')
      .eq('id', id)
      .single();

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const userRole = (listing.users as any)?.role;
    const isOwner = listing.landlord_id === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Prepare update data
    const dataToUpdate: Record<string, any> = {};
    const allowedFields = ['title', 'property_type', 'bedrooms', 'rent_price', 'city', 'area', 'description', 'amenities', 'images', 'contact_phone', 'contact_whatsapp', 'latitude', 'longitude', 'status'];
    
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        dataToUpdate[field] = updateData[field];
      }
    }

    const { data: updatedListing, error } = await supabase
      .from('listings')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update listing error:', error);
      return res.status(400).json({ error: 'Failed to update listing' });
    }

    res.json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete listing (landlord or admin)
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const supabase = getSupabaseClient();

    // Check if user owns the listing or is admin
    const { data: listing } = await supabase
      .from('listings')
      .select('landlord_id, users!inner(role)')
      .eq('id', id)
      .single();

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const userRole = (listing.users as any)?.role;
    const isOwner = listing.landlord_id === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { error } = await supabase.from('listings').delete().eq('id', id);

    if (error) {
      console.error('Delete listing error:', error);
      return res.status(400).json({ error: 'Failed to delete listing' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get landlord's listings
router.get('/landlord/my-listings', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const supabase = getSupabaseClient();

    const { data: listings, error } = await supabase
      .from('listings')
      .select('*')
      .eq('landlord_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get landlord listings error:', error);
      return res.status(500).json({ error: 'Failed to fetch listings' });
    }

    res.json({
      listings: listings.map((listing: any) => ({
        id: listing.id,
        title: listing.title,
        propertyType: listing.property_type,
        bedrooms: listing.bedrooms,
        rentPrice: listing.rent_price,
        city: listing.city,
        area: listing.area,
        description: listing.description,
        amenities: listing.amenities || [],
        images: listing.images || [],
        contactPhone: listing.contact_phone,
        contactWhatsapp: listing.contact_whatsapp,
        status: listing.status,
        isApproved: listing.is_approved,
        isFeatured: listing.is_featured,
        viewCount: listing.view_count,
        createdAt: listing.created_at,
        lat: listing.latitude ? parseFloat(listing.latitude) : null,
        lng: listing.longitude ? parseFloat(listing.longitude) : null,
      })),
    });
  } catch (error) {
    console.error('Get landlord listings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
