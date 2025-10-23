import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import postCssNested from 'postcss-nested';
import postCssAutoPrefixer from 'autoprefixer';
import postCssSimpleVars from 'postcss-simple-vars';
import postCssMantinePreset from 'postcss-preset-mantine';
import postCssPxToRem from 'postcss-pxtorem';

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
  css: {
    postcss: {
      plugins: [
        postCssNested(),
        postCssAutoPrefixer(),
        postCssMantinePreset(),
        postCssPxToRem({
          replace: false
        }),
        postCssSimpleVars({
          variables: {
            'mantine-breakpoint-xs': '36em',
            'mantine-breakpoint-sm': '48em',
            'mantine-breakpoint-md': '62em',
            'mantine-breakpoint-lg': '75em',
            'mantine-breakpoint-xl': '88em',
          }
        }),
      ],
    }
  },
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
