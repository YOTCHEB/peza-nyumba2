# Vercel Deployment Guide - All in One

## Quick Deploy (Recommended)

### Step 1: Click Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOTCHEB/peza-nyumba2.git)

### Step 2: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Step 3: Deploy

Click **Deploy** and wait for completion.

---

## Manual Setup

### 1. Prepare Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run SQL from `server/src/database/schema.sql`
3. Copy credentials from Project Settings > API

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repo: `peza-nyumba2`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add **Environment Variables**:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-key
   JWT_SECRET=your-secret-key-min-32-chars
   ```

6. Click **Deploy**

### 3. Seed Database

After first deploy, you need to seed the database:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link project:
   ```bash
   vercel link
   ```

4. Run seed script:
   ```bash
   cd server
   npm install
   npm run seed
   ```

   **OR** manually insert listings via Supabase Dashboard

---

## Demo Login Credentials

After seeding:

| Role | Phone | Password |
|------|-------|----------|
| Landlord | +265888123456 | password |
| Tenant | +265999234567 | password |
| Admin | +265888000000 | admin123 |

---

## Project Structure for Vercel

```
pezay/
├── api/              # Vercel Serverless Functions
│   ├── auth.ts      # /api/auth/login
│   └── listings.ts  # /api/listings
├── src/             # React Frontend
├── public/          # Static Assets
├── vercel.json      # Vercel Configuration
└── package.json     # Dependencies
```

---

## API Endpoints (Serverless)

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/listings` - Get listings
- `GET /api/listings/:id` - Get single listing
- `GET /api/favorites` - Get favorites
- `POST /api/reports` - Report listing

---

## Environment Variables

Required in Vercel Settings > Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | `eyJhbG...` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-min-32-chars` |

---

## Troubleshooting

### 404 Error
- Make sure `vercel.json` exists
- Check build completed successfully
- Verify rewrites are configured

### API Not Working
- Check environment variables are set
- Verify Supabase credentials are correct
- Check Vercel function logs

### Build Fails
- Run `npm run build` locally first
- Check all dependencies in package.json
- Review build logs in Vercel dashboard

---

## Custom Domain

1. Go to Vercel Dashboard > Project > Settings > Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate (5-10 min)

---

## Monitoring

- **Logs**: Vercel Dashboard > Deployments > Click deployment > Logs
- **Functions**: Vercel Dashboard > Project > Functions
- **Analytics**: Vercel Dashboard > Project > Analytics

---

## Support

For issues:
1. Check Vercel logs
2. Check Supabase logs
3. Review DEPLOYMENT.md for detailed guide
