# Peza Nyumba Backend Server

Express.js backend for Peza Nyumba - Find Affordable Rooms & Houses in Malawi.

## Features

- 🔐 Phone-based authentication with Supabase
- 🏠 Listings CRUD API
- ❤️ Favorites management
- 🚩 Report system for fake/inappropriate listings
- 👥 User roles: tenant, landlord, admin

## Prerequisites

1. Node.js 18+ installed
2. Supabase account and project created

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once created, go to **SQL Editor** in your Supabase dashboard
3. Copy the contents of `src/database/schema.sql` and run it
4. Go to **Project Settings** > **API** and copy:
   - Project URL
   - `service_role` key (keep this secret!)

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

JWT_SECRET=your-super-secret-jwt-key-change-this

FRONTEND_URL=http://localhost:5173
```

### 4. Seed the Database

Run the seed script to populate the database with sample data:

```bash
npm run seed
```

This creates:
- 6 demo users (landlords, tenants, admin)
- 16 sample property listings

### 5. Start the Server

Development mode (with hot reload):

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with phone + password |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/me` | Update user profile |

### Listings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings (with filters) |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/api/listings` | Create listing (landlord only) |
| PUT | `/api/listings/:id` | Update listing |
| DELETE | `/api/listings/:id` | Delete listing |
| GET | `/api/listings/landlord/my-listings` | Get landlord's listings |

### Favorites

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favorites` | Get user's favorites |
| POST | `/api/favorites/:listingId` | Add to favorites |
| DELETE | `/api/favorites/:listingId` | Remove from favorites |
| GET | `/api/favorites/check/:listingId` | Check if favorited |

### Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reports` | Create report |
| GET | `/api/reports` | Get all reports (admin only) |
| GET | `/api/reports/:id` | Get report by ID (admin only) |
| PATCH | `/api/reports/:id` | Update report status (admin only) |
| DELETE | `/api/reports/:id` | Delete report (admin only) |

## Demo Login Credentials

After running the seed script:

| Role | Phone | Password |
|------|-------|----------|
| Landlord | +265888123456 | password |
| Tenant | +265999234567 | password |
| Admin | +265888000000 | admin123 |

## Report Reasons

Users can report listings for:
- **Fake Listing** - Property doesn't exist or is a scam
- **Wrong Information** - Incorrect details (price, location, etc.)
- **Property Unavailable** - No longer available for rent
- **Spam** - Duplicate or spam listing
- **Inappropriate** - Offensive or inappropriate content
- **Other** - Specify custom reason

## Admin Features

Admins can:
- View all reports
- Update report status (pending, investigating, resolved, dismissed)
- Add admin notes to reports
- Delete fake/spam listings

## Security Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Change JWT_SECRET** - Generate a strong random string for production
3. **Use HTTPS** - Always use HTTPS in production
4. **Rate limiting** - Consider adding rate limiting for production

## Troubleshooting

### "Missing Supabase environment variables"

Make sure your `.env` file has the correct `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

### "User already exists"

The seed script clears existing data. If you get this error, manually delete the users from Supabase dashboard or run the SQL:

```sql
DELETE FROM reports;
DELETE FROM favorites;
DELETE FROM listings;
DELETE FROM users;
```

### CORS errors

Make sure `FRONTEND_URL` in `.env` matches your frontend's URL (default: `http://localhost:5173`).

## Project Structure

```
server/
├── src/
│   ├── database/
│   │   └── schema.sql          # Supabase database schema
│   ├── lib/
│   │   └── supabase.ts         # Supabase client setup
│   ├── middleware/
│   │   └── auth.ts             # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts             # Auth routes
│   │   ├── listings.ts         # Listings routes
│   │   ├── favorites.ts        # Favorites routes
│   │   └── reports.ts          # Reports routes
│   ├── scripts/
│   │   └── seed.ts             # Database seeding script
│   └── index.ts                # Express app entry point
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.example                # Example environment file
├── package.json
└── tsconfig.json
```

## License

ISC
