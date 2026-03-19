-- Run this in Supabase SQL Editor to completely reset the database
-- This will delete all users, listings, favorites, and reports

-- First, delete all data from public tables
DELETE FROM reports;
DELETE FROM favorites;
DELETE FROM listings;
DELETE FROM users;

-- To delete auth users, you need to do it manually in Supabase Dashboard:
-- Go to Authentication > Users > Delete all users
-- OR run this in SQL Editor (if you have the right permissions):
-- DELETE FROM auth.users;

-- After running this, run: npm run seed
