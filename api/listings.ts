import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { city, propertyType, minPrice, maxPrice, search, page = '1', limit = '20' } = req.query;
    
    let query = supabase
      .from('listings')
      .select('*, users(full_name)', { count: 'exact' })
      .eq('is_approved', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    // Apply filters
    if (city) query = query.eq('city', city as string);
    if (propertyType) query = query.eq('property_type', propertyType as string);
    if (minPrice) query = query.gte('rent_price', parseInt(minPrice as string));
    if (maxPrice) query = query.lte('rent_price', parseInt(maxPrice as string));
    if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;
    query = query.range(from, to);

    const { data: listings, error, count } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch listings' });
    }

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

    res.status(200).json({
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
}
