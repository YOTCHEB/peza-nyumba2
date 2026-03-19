# Deployment Guide

## Frontend (Vercel)

### 1. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `peza-nyumba2`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2. Set Environment Variables in Vercel

In Vercel dashboard > Settings > Environment Variables, add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Important**: You need to deploy the backend first (see below) and get its URL.

### 3. Deploy

Click "Deploy" and Vercel will build and deploy your frontend.

---

## Backend (Render/Railway/Heroku)

### Option 1: Deploy to Render (Recommended)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: peza-nyumba-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/index.js`

5. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-key
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. Deploy and get your backend URL (e.g., `https://peza-nyumba-api.onrender.com`)

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `server`
5. Add environment variables (same as above)
6. Deploy

### Option 3: Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd server
heroku create peza-nyumba-api

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Add environment variables
heroku config:set SUPABASE_URL=your-url
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-key
heroku config:set JWT_SECRET=your-secret
heroku config:set FRONTEND_URL=your-vercel-url

# Deploy
git push heroku main
```

---

## Database (Supabase)

Your Supabase database is already cloud-hosted. Just make sure:

1. All tables are created (run `server/src/database/schema.sql`)
2. RLS policies are enabled
3. You have the credentials for your backend

---

## Final Steps

1. **Deploy backend** to Render/Railway/Heroku
2. **Copy backend URL** (e.g., `https://peza-nyumba-api.onrender.com`)
3. **Update Vercel** environment variable:
   - Go to Vercel dashboard
   - Select your project
   - Settings > Environment Variables
   - Update `VITE_API_URL` to `https://your-backend-url.onrender.com/api`
   - Redeploy

4. **Test the app**:
   - Visit your Vercel URL
   - Login with demo credentials
   - Verify listings load correctly

---

## Troubleshooting

### 404 Error on Vercel

Make sure you have `vercel.json` with proper rewrites:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### API Not Working

- Check that backend is deployed and running
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS settings in backend (should allow your Vercel domain)

### Build Fails

- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test
- Check build logs in Vercel dashboard

---

## Custom Domain

### Vercel

1. Go to Vercel dashboard > Your project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render

1. Go to Render dashboard > Your service > Settings
2. Add custom domain
3. Update DNS records

---

## Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api  # Development
VITE_API_URL=https://your-api.onrender.com/api  # Production
```

### Backend (server/.env)
```env
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-app.vercel.app
```

---

## Support

For issues, check:
- Vercel logs: Dashboard > Deployments > Click on deployment > View logs
- Render logs: Dashboard > Your service > Logs
- Supabase logs: Dashboard > Logs
