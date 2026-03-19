import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getSupabaseClient } from '../lib/supabase.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, email, password, role } = req.body;

    if (!fullName || !phone || !password || !role) {
      return res.status(400).json({ error: 'Full name, phone, password, and role are required' });
    }

    const supabase = getSupabaseClient();

    // Check if user already exists (by phone or email)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .or(`phone.eq.${phone}${email ? `,email.eq.${email}` : ''}`)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in Supabase Auth with phone
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email || undefined,
      phone,
      password: hashedPassword,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
        role,
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Create user in public.users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        auth_id: authData.user.id,
        full_name: fullName,
        phone,
        email: email || null,
        role,
      })
      .select()
      .single();

    if (userError) {
      console.error('User error:', userError);
      // Rollback auth user creation
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(400).json({ error: 'Failed to create user profile' });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: userData.id, email: userData.email || '', role: userData.role },
      jwtSecret!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userData.id,
        fullName: userData.full_name,
        email: userData.email || '',
        phone: userData.phone,
        role: userData.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone number and password are required' });
    }

    const supabase = getSupabaseClient();

    // Find user by phone
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single();

    if (userError || !user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // Get auth user to verify password
    const { data: authData, error: authError } = await supabase.auth.admin.getUserById(user.auth_id);

    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // For demo purposes, we'll check against stored password or use plain password comparison
    // In production, passwords should be properly hashed
    const userAny = authData.user as any;
    const isValidPassword = userAny.encrypted_password
      ? await bcrypt.compare(password, userAny.encrypted_password)
      : false;
    
    // Fallback for demo users (if no encrypted password)
    const demoPasswords: Record<string, string> = {
      '+265888123456': 'password',
      '+265999234567': 'password',
      '+265888000000': 'admin123',
    };

    const isDemoValid = demoPasswords[phone] === password;

    if (!isValidPassword && !isDemoValid) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret!,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const supabase = getSupabaseClient();
    const userId = req.user?.id;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, email, phone, role, avatar_url, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const supabase = getSupabaseClient();
    const userId = req.user?.id;
    const { fullName, phone, avatarUrl } = req.body;

    const updateData: Record<string, string> = {};
    if (fullName) updateData.full_name = fullName;
    if (phone) updateData.phone = phone;
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Failed to update profile' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
