# Dawud Charity Hub - Frontend

React + TypeScript frontend for donation management with multi-language support.

## Overview

Modern, responsive web application for Dawud Charity Hub. Features donation submission, multi-language support (English, Amharic, Oromo, Somali, Tigrinya, Arabic), and integration with FastAPI backend.

## Features

**Public Pages**
- Home page with hero section and statistics
- About page with organization information
- Programs page showcasing charity programs
- Events page with event listings
- Gallery page with image galleries
- Contact page with contact information
- Donate page with donation form and bank account details

**Donation Features**
- Multi-bank account support with logos
- Donation tier selection
- Transaction reference input
- Optional proof image upload (JPG/PNG, max 5MB)
- Form validation and security checks
- Real-time submission feedback

**Internationalization**
- 6 languages: English, Amharic, Oromo, Somali, Tigrinya, Arabic
- Google Translate API integration
- Language detection and persistence
- RTL support for Arabic

**UI/UX**
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications
- Security monitoring

## Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query 5.83.0
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **i18n**: i18next 25.5.2 + react-i18next
- **Animations**: Framer Motion 12.23.22
- **Icons**: Lucide React 0.462.0

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional)
# Create .env file if needed for custom API URLs

# 3. Start development server
npm run dev
```

Application runs at `http://localhost:3000`

## Configuration

### Environment Variables (Optional)

Create `.env` file for production API configuration:

```env
# API Configuration (for production builds)
VITE_API_PROTOCOL=https
VITE_API_DOMAIN=exampledomain.com
VITE_API_PORT=443
```

**Note**: In development, API calls are proxied to `http://localhost:8000` via Vite proxy.

### Vite Proxy Configuration

Development proxy is configured in `vite.config.ts`:
- `/api/*` → `http://localhost:8000/api/*`
- WebSocket support enabled

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Header, Footer
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── DonatePage.tsx
│   ├── ProgramsPage.tsx
│   ├── EventsPage.tsx
│   ├── GalleryPage.tsx
│   └── ContactPage.tsx
├── hooks/              # Custom React hooks
│   ├── useSecurity.tsx
│   ├── useTranslatedContent.tsx
│   └── useScrollAnimations.tsx
├── lib/                # Utilities and services
│   ├── i18n.ts         # i18next configuration
│   ├── translationService.ts
│   ├── security.ts
│   └── utils.ts
├── assets/            # Static assets
│   ├── banks/         # Bank logos
│   ├── images/        # Images and logos
│   └── pictures/      # Gallery images
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## API Integration

### Backend Connection

**Development**: Uses Vite proxy to `http://localhost:8000`

**Production**: Configure via environment variables or use relative URLs

### Donation Submission

```typescript
// Example from DonatePage.tsx
const apiUrl = import.meta.env.MODE === 'production'
  ? `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_DOMAIN}/api/submit-donation`
  : 'http://localhost:8000/api/submit-donation';

const formData = new FormData();
formData.append('donor_name', name);
formData.append('donor_contact', contact);
formData.append('bank_used', bank);
formData.append('amount_donated', amount);
formData.append('transaction_reference', transactionReference);
if (proofImage) {
  formData.append('proof_image', proofImage);
}

const response = await fetch(apiUrl, {
  method: 'POST',
  body: formData,
});
```

### API Endpoints Used

- `POST /api/submit-donation` - Submit donation
- `GET /health` - Health check (if needed)

## Internationalization

### Supported Languages

- English (en) - Default
- Amharic (am)
- Oromo (om)
- Somali (so)
- Tigrinya (ti)
- Arabic (ar)

### Usage

```typescript
import { useTranslation } from 'react-i18next';
import { useTranslatedContent } from '@/hooks/useTranslatedContent';

// Basic translation
const { t } = useTranslation();
const title = t('nav.home');

// Async translation with Google Translate
const { translateContent } = useTranslatedContent();
const translatedText = await translateContent('Hello World', 'am');
```

### Translation Service

Uses Google Translate API for dynamic translations. Configure API key in `src/lib/translationService.ts` if needed.

## Security Features

### Client-Side Security

- Input sanitization (DOMPurify)
- XSS protection
- CSRF protection via same-origin cookies
- Security event logging
- File upload validation
- Content Security Policy headers

### Security Hooks

```typescript
import { useSecurity } from '@/hooks/useSecurity';

const { 
  sanitizeInput, 
  validateInput, 
  validateFile,
  secureSubmit,
  logSecurityEvent 
} = useSecurity();
```

## Styling

### Tailwind CSS

Custom theme configuration in `tailwind.config.ts`:
- Custom color palette
- Animation keyframes
- Responsive breakpoints
- Dark mode support

### Component Styling

Uses shadcn/ui components with Tailwind CSS:
- Consistent design system
- Accessible components
- Theme-aware styling

## Building for Production

### Build Command

```bash
npm run build
```

Output directory: `dist/`

### Build Configuration

- Minification: esbuild
- Source maps: Development only
- Asset hashing: Production only
- Code splitting: Automatic

### Production Checklist

- [ ] Update API URLs in environment variables
- [ ] Test all language translations
- [ ] Verify image assets are included
- [ ] Test donation form submission
- [ ] Check responsive design on all devices
- [ ] Verify security headers
- [ ] Test dark mode functionality

## Deployment

### Static Hosting

The frontend builds to static files in `dist/` directory. Deploy to any static hosting service:

- **cPanel**: Upload `dist/` contents to `public_html`
- **Netlify**: Connect repository or upload `dist/`
- **Vercel**: Connect repository
- **AWS S3 + CloudFront**: Upload to S3 bucket

### cPanel Deployment

1. Build production version:
   ```bash
   npm run build
   ```

2. Upload `dist/` contents to `public_html/` or subdomain directory

3. Configure `.htaccess` for SPA routing:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### Environment-Specific Builds

For different environments, use build modes:
```bash
npm run build          # Production
npm run build:dev      # Development mode
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Code splitting for route-based chunks
- Lazy loading for images
- Optimized bundle size
- Tree shaking enabled
- Asset optimization

## Troubleshooting

### API Connection Issues

**Problem**: Cannot connect to backend
**Solution**: 
- Verify backend is running on port 8000
- Check CORS configuration in backend
- Verify proxy settings in `vite.config.ts`

### Translation Not Working

**Problem**: Translations not loading
**Solution**:
- Check Google Translate API configuration
- Verify language codes are correct
- Check browser console for errors

### Build Errors

**Problem**: Build fails
**Solution**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`
- Verify all dependencies are installed

## Development Notes

- Uses path alias `@/` for `src/` directory
- TypeScript strict mode disabled for flexibility
- ESLint configured for React
- Hot module replacement enabled in development
- Security headers configured in Vite dev server
