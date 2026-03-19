import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputLogo = join(rootDir, 'public', 'icons', 'peza-logo.png');
const output192 = join(rootDir, 'public', 'icons', 'icon-192.png');
const output512 = join(rootDir, 'public', 'icons', 'icon-512.png');

async function generateIcons() {
  try {
    // Generate 192x192 icon
    await sharp(inputLogo)
      .resize(192, 192, { fit: 'fill' })
      .toFile(output192);
    console.log('✓ Generated icon-192.png');

    // Generate 512x512 icon
    await sharp(inputLogo)
      .resize(512, 512, { fit: 'fill' })
      .toFile(output512);
    console.log('✓ Generated icon-512.png');

    console.log('PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
