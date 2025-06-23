import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
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
