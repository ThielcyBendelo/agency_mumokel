import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  // Ensure single React instance
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('pdf') || id.includes('jspdf')) return 'pdf-vendor';
            if (id.includes('stripe')) return 'stripe-vendor';
            if (id.includes('chart') || id.includes('chart.js')) return 'chart-vendor';
            if (id.includes('framer-motion')) return 'animation-vendor';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            return 'vendor';
          }

          // Application chunks
          if (id.includes('src/pages/')) return 'pages';
          if (id.includes('src/dashboard/')) return 'dashboard';
          if (id.includes('src/components/')) return 'components';
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Minify for smaller bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'firebase/app'],
  },
});
