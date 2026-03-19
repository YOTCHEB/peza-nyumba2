import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { getSupabaseClient } from '../lib/supabase.js';

const router = Router();

// Create a new report (any authenticated user)
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { listingId, reason, otherReason, description } = req.body;

    if (!listingId || !reason) {
      return res.status(400).json({ error: 'Listing ID and reason are required' });
    }

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

    // Get user's internal ID
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already reported this listing
    const { data: existingReport } = await supabase
      .from('reports')
      .select('id')
      .eq('listing_id', listingId)
      .eq('reporter_id', userData.id)
      .single();

    if (existingReport) {
      return res.status(400).json({ error: 'You have already reported this listing' });
    }

    // Create report
    const { data: report, error } = await supabase
      .from('reports')
      .insert({
        listing_id: listingId,
        reporter_id: userData.id,
        reason,
        other_reason: otherReason || null,
        description: description || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Create report error:', error);
      return res.status(500).json({ error: 'Failed to create report' });
    }

    res.status(201).json({
      message: 'Report submitted successfully. Our team will review it.',
      report: {
        id: report.id,
        listingId: report.listing_id,
        reason: report.reason,
        status: report.status,
        createdAt: report.created_at,
      },
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all reports (admin only)
router.get('/', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const supabase = getSupabaseClient();

    let query = supabase
      .from('reports')
      .select('*, listings(title, city), users(full_name, phone)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;
    query = query.range(from, to);

    const { data: reports, error, count } = await query;

    if (error) {
      console.error('Get reports error:', error);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    res.json({
      reports: reports.map((report: any) => ({
        id: report.id,
        listingId: report.listing_id,
        listingTitle: report.listings?.title,
        listingCity: report.listings?.city,
        reporterId: report.reporter_id,
        reporterName: report.users?.full_name,
        reporterPhone: report.users?.phone,
        reason: report.reason,
        otherReason: report.other_reason,
        description: report.description,
        status: report.status,
        adminNotes: report.admin_notes,
        createdAt: report.created_at,
        updatedAt: report.updated_at,
        resolvedAt: report.resolved_at,
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get report by ID (admin only)
router.get('/:id', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();

    const { data: report, error } = await supabase
      .from('reports')
      .select('*, listings(*), users(full_name, phone, email)')
      .eq('id', id)
      .single();

    if (error || !report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({
      report: {
        id: report.id,
        listingId: report.listing_id,
        listing: report.listings,
        reporterId: report.reporter_id,
        reporterName: report.users?.full_name,
        reporterPhone: report.users?.phone,
        reporterEmail: report.users?.email,
        reason: report.reason,
        otherReason: report.other_reason,
        description: report.description,
        status: report.status,
        adminNotes: report.admin_notes,
        createdAt: report.created_at,
        updatedAt: report.updated_at,
        resolvedAt: report.resolved_at,
      },
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update report status (admin only)
router.patch('/:id', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const supabase = getSupabaseClient();

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.admin_notes = adminNotes;
    if (status && ['resolved', 'dismissed'].includes(status)) {
      updateData.resolved_at = new Date().toISOString();
    }

    const { data: report, error } = await supabase
      .from('reports')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !report) {
      return res.status(400).json({ error: 'Failed to update report' });
    }

    res.json({
      message: 'Report updated successfully',
      report: {
        id: report.id,
        status: report.status,
        adminNotes: report.admin_notes,
        resolvedAt: report.resolved_at,
      },
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete report (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();

    const { error } = await supabase.from('reports').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: 'Failed to delete report' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
