import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone number and password are required' });
    }

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

    // Check password
    const userAny = authData.user as any;
    const isValidPassword = userAny.encrypted_password
      ? await bcrypt.compare(password, userAny.encrypted_password)
      : false;
    
    // Fallback for demo users
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
    const token = jwt.sign(
      { id: user.id, email: user.email || '', role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email || '',
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
