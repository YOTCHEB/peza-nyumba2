# Peza Nyumba - Find Affordable Rooms & Houses in Malawi

A full-stack real estate platform for finding rental properties in Malawi.

## Features

- 🔐 Phone-based authentication
- 🏠 Browse rental listings (houses, rooms, apartments, bedsitters, offices)
- 📍 Map view with property locations
- ❤️ Save favorite listings
- 🚩 Report fake or inappropriate listings
- 📱 PWA support - install on your phone
- 📞 Contact landlords directly via WhatsApp

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router
- React Query
- Leaflet Maps

### Backend
- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- JWT Authentication

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account

### 1. Clone and Install

```bash
git clone https://github.com/YOTCHEB/peza-nyumba2.git
cd peza-nyumba2

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `server/src/database/schema.sql`
3. Copy your **Project URL** and **service_role key**

### 3. Configure Environment

**Backend** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-key-here
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database

```bash
cd server
npm run seed
```

### 5. Run the App

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit: http://localhost:5173

## Demo Login

| Role | Phone | Password |
|------|-------|----------|
| Landlord | +265888123456 | password |
| Tenant | +265999234567 | password |
| Admin | +265888000000 | admin123 |

## Project Structure

```
pezay/
├── server/              # Backend
│   ├── src/
│   │   ├── routes/     # API endpoints
│   │   ├── middleware/ # Auth middleware
│   │   ├── database/   # SQL schema
│   │   └── scripts/    # Seed script
│   └── public/images/  # Property images
├── src/                # Frontend
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── lib/            # Utilities & API
└── public/             # Static assets
```

## API Endpoints

- `POST /api/auth/login` - Login with phone
- `POST /api/auth/register` - Register new user
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (landlord)
- `GET /api/favorites` - Get favorites
- `POST /api/reports` - Report listing

## Deployment

### Frontend
Deploy to Vercel, Netlify, or Cloudflare Pages

### Backend
Deploy to Railway, Render, or Heroku

### Database
Supabase is already cloud-hosted

## License

ISC

## Author

**Yotchek Kandolo Jean**
- GitHub: [@YOTCHEB](https://github.com/YOTCHEB)
- Email: yotchebkandolojean@gmail.com
