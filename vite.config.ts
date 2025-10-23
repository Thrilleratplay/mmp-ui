import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
        checker({
      typescript: true,
      stylelint: {
        lintCommand: 'stylelint src/**/*.css',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      overlay: {
        initialIsOpen: false,
      },
    }),

  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ],
  },
  server: {
    open: 'index.html',
    cors: true
  },
})
