import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import listingsRoutes from './routes/listings.js';
import favoritesRoutes from './routes/favorites.js';
import reportsRoutes from './routes/reports.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve public path relative to this file's location
// src/index.ts -> ../public = server/public
const publicPath = path.resolve(__dirname, '../public');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
console.log('Server file directory:', __dirname);
console.log('Public path:', publicPath);
console.log('Serving images from:', path.join(publicPath, 'images'));

// Debug middleware for image requests
app.use('/images', (req, res, next) => {
  const filePath = path.join(publicPath, req.path);
  console.log('[Image Request]', req.path, '->', filePath);
  next();
});

app.use('/images', express.static(path.join(publicPath, 'images')));

// 404 handler for images
app.use('/images', (req, res) => {
  console.log('[Image 404]', req.path, 'not found in', path.join(publicPath, 'images'));
  res.status(404).json({ error: 'Image not found', path: req.path });
});

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/reports', reportsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║     Peza Nyumba Server is running!            ║
║                                               ║
║     Local:   http://localhost:${PORT}           ║
║     API:     http://localhost:${PORT}/api       ║
║     Health:  http://localhost:${PORT}/health    ║
║                                               ║
║     Environment: ${process.env.NODE_ENV || 'development'}                   ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
