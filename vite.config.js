import { defineConfig } from "vite";
import vituum from 'vituum';
import liquidjs from '@vituum/vite-plugin-liquid';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [
    vituum(),
    liquidjs({
      root: 'src'
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (chunkInfo) => {
          let outDir = '';

          // Fonts
          if (/(ttf|woff|woff2|eot)$/.test(chunkInfo.name)) {
            outDir = 'fonts';
          }

          // SVG
          if (/svg$/.test(chunkInfo.name)) {
            outDir = 'svg';
          }

          // Images
          if (/(png|jpg|jpeg|gif|webp)$/.test(chunkInfo.name)) {
            outDir = 'images';
          }

          // Media
          if (/(mp3|mp4|webm|ogg|wav|flac|aac)$/.test(chunkInfo.name)) {
            outDir += 'media';
          }

          // JSON
          if (/json$/.test(chunkInfo.name)) {
            outDir = 'json';
          }

          // JS
          if (/js$/.test(chunkInfo.name)) {
            outDir = 'js';
          }

          // CSS
          if (/css$/.test(chunkInfo.name)) {
            outDir = 'css';
          }

          return `${outDir}/[name][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});