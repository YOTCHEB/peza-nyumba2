import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { getSupabaseClient } from '../lib/supabase.js';

const router = Router();

// Get user's favorites
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const supabase = getSupabaseClient();

    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*, listings(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get favorites error:', error);
      return res.status(500).json({ error: 'Failed to fetch favorites' });
    }

    const transformedFavorites = favorites?.map((fav: any) => ({
      id: fav.id,
      createdAt: fav.created_at,
      listing: {
        id: fav.listings.id,
        title: fav.listings.title,
        propertyType: fav.listings.property_type,
        bedrooms: fav.listings.bedrooms,
        rentPrice: fav.listings.rent_price,
        city: fav.listings.city,
        area: fav.listings.area,
        description: fav.listings.description,
        amenities: fav.listings.amenities || [],
        images: fav.listings.images || [],
        contactPhone: fav.listings.contact_phone,
        contactWhatsapp: fav.listings.contact_whatsapp,
        status: fav.listings.status,
        isApproved: fav.listings.is_approved,
        isFeatured: fav.listings.is_featured,
        viewCount: fav.listings.view_count,
        createdAt: fav.listings.created_at,
        lat: fav.listings.latitude ? parseFloat(fav.listings.latitude) : null,
        lng: fav.listings.longitude ? parseFloat(fav.listings.longitude) : null,
      },
    }));

    res.json({ favorites: transformedFavorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add to favorites
router.post('/:listingId', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { listingId } = req.params;
    const supabase = getSupabaseClient();

    // Check if listing exists
    const { data: listing } = await supabase
      .from('listings')
      .select('id')
      .eq('id', listingId)
      .single();

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Get user's internal ID from auth_id
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add to favorites
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userData.id,
        listing_id: listingId,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Already in favorites' });
      }
      console.error('Add favorite error:', error);
      return res.status(500).json({ error: 'Failed to add to favorites' });
    }

    res.status(201).json({
      message: 'Added to favorites',
      favorite: {
        id: favorite.id,
        listingId: favorite.listing_id,
        createdAt: favorite.created_at,
      },
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from favorites
router.delete('/:listingId', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { listingId } = req.params;
    const supabase = getSupabaseClient();

    // Get user's internal ID from auth_id
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userData.id)
      .eq('listing_id', listingId);

    if (error) {
      console.error('Remove favorite error:', error);
      return res.status(500).json({ error: 'Failed to remove from favorites' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if listing is in favorites
router.get('/check/:listingId', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { listingId } = req.params;
    const supabase = getSupabaseClient();

    // Get user's internal ID from auth_id
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: favorite } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userData.id)
      .eq('listing_id', listingId)
      .single();

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
