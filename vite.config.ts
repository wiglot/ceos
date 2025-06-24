import path from 'path';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig(({ mode }) => {
    return {
      css: {
        postcss,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
          },
        },
      }
    };
});
