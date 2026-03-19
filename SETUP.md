# Peza Nyumba - Full Stack Setup Guide

## Overview

Peza Nyumba is now a full-stack application with:
- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Phone-based with JWT
- **PWA**: Progressive Web App ready

## Quick Start

### 1. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run `server/src/database/schema.sql`
4. Copy your **Project URL** and **service_role key**

### 2. Configure Backend

```bash
cd server
npm install
```

Edit `server/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-key-here
JWT_SECRET=generate-a-strong-random-string
```

### 3. Seed Database

```bash
cd server
npm run seed
```

### 4. Start Backend

```bash
cd server
npm run dev
```

Server runs on: `http://localhost:5000`

### 5. Configure Frontend

Edit `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Demo Credentials

| Role | Phone | Password |
|------|-------|----------|
| Landlord | +265888123456 | password |
| Tenant | +265999234567 | password |
| Admin | +265888000000 | admin123 |

## Key Features

### 🔐 Authentication
- Phone number + password login
- JWT token-based sessions
- User roles: tenant, landlord, admin

### 🏠 Listings
- Browse properties by city, type, price
- Featured and latest listings
- Map view with property locations
- Contact landlord via call/WhatsApp

### ❤️ Favorites
- Save favorite listings
- Requires authentication

### 🚩 Report System
- Report fake/inappropriate listings
- Reasons: fake, wrong info, unavailable, spam, inappropriate
- Admin dashboard to manage reports

### 📱 PWA
- Install on mobile devices
- Offline support
- Auto-update

## Project Structure

```
pezay/
├── server/                    # Backend
│   ├── src/
│   │   ├── database/
│   │   │   └── schema.sql    # Supabase schema
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── listings.ts
│   │   │   ├── favorites.ts
│   │   │   └── reports.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── index.ts
│   ├── .env
│   └── package.json
├── src/                       # Frontend
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ListingCard.tsx
│   │   ├── ReportDialog.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Listings.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.tsx
│   │   ├── favorites.tsx
│   │   └── ...
│   └── ...
├── .env
└── package.json
```

## API Endpoints

See `server/README.md` for complete API documentation.

## Development Tips

### Hot Reload
- Frontend: Vite auto-reloads on changes
- Backend: `npm run dev` uses tsx watch

### Database Changes
- Edit `server/src/database/schema.sql`
- Run in Supabase SQL Editor

### Testing Locally
1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev`
3. Login with demo credentials

### Production Build
```bash
# Build frontend
npm run build

# Build backend
cd server && npm run build
```

## Troubleshooting

### "Cannot connect to API"
- Ensure backend is running on port 5000
- Check `.env` has correct `VITE_API_URL`

### "Invalid phone or password"
- Run seed script: `cd server && npm run seed`
- Use exact phone numbers from demo table

### CORS errors
- Check `FRONTEND_URL` in server `.env`
- Should match your frontend URL

## Next Steps

1. **Customize Data**: Update seed script with real properties
2. **Add Images**: Upload real property photos
3. **Deploy**: 
   - Frontend: Vercel, Netlify, or Cloudflare Pages
   - Backend: Railway, Render, or Heroku
   - Database: Supabase (already cloud-hosted)
4. **Add Features**:
   - Image upload (Supabase Storage)
   - Email notifications
   - SMS verification
   - Payment integration

## Support

For issues or questions, check:
- `server/README.md` - Backend documentation
- `server/src/database/schema.sql` - Database schema
- Source code comments

---

**Built with ❤️ for Malawi real estate**
