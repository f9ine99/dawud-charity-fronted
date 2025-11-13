import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 3000,
    // HMR configuration for better WebSocket support
    hmr: {
      port: 3000,
    },
    // Proxy only for development
    ...(mode === 'development' && {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    }),
    headers: {
      // Security headers for development server
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(self), microphone=(), camera=(), payment=(), usb=(), bluetooth=()',
      'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com",
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
            "img-src 'self' data: blob: https:",
            "font-src 'self' https://cdnjs.cloudflare.com",
            "connect-src 'self' ws://localhost:3000 wss://localhost:3000 ws: wss: https://admin.furi-cadaster.com https://www.admin.furi-cadaster.com http://localhost http://localhost:8000 http://192.168.1.8 https://translation.googleapis.com",
            "frame-ancestors 'none'",
            "frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com https://*.gstatic.com https://www.gstatic.com"
          ].join('; ')
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Security optimizations for production build
    sourcemap: mode === 'development',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Security: Add integrity checks in production
        entryFileNames: mode === 'production' ? 'assets/[name]-[hash].js' : 'assets/[name].js',
        chunkFileNames: mode === 'production' ? 'assets/[name]-[hash].js' : 'assets/[name].js',
        assetFileNames: mode === 'production' ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]'
      }
    }
  },
  // Security: Define allowed hosts
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
}));
