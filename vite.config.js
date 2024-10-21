import { defineConfig } from "vite";
import vituum from 'vituum';
import liquidjs from '@vituum/vite-plugin-liquid';
import path from 'node:path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  },
  plugins: [
    vituum({
      // Disable sass input on build
      input: [
        './src/styles/*.scss',
        './src/libs/**/scss/*.scss',
      ],
    }),
    liquidjs({
      root: 'src',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (chunkInfo) => {
          let outDir = '';
          let filename = chunkInfo.names && chunkInfo.names[0];
          let originalFilename = chunkInfo.originalFileNames && chunkInfo.originalFileNames[0];
          
          // Fonts
          if (/(ttf|woff|woff2|eot)$/.test(filename)) {
            outDir = 'fonts';
          }

          // SVG
          if (/svg$/.test(filename)) {
            outDir = 'svg';
          }

          // Images
          if (/(png|jpg|jpeg|gif|webp)$/.test(filename)) {
            outDir = 'images';
          }

          // Media
          if (/(mp3|mp4|webm|ogg|wav|flac|aac)$/.test(filename)) {
            outDir += 'media';
          }

          // JSON
          if (/json$/.test(filename)) {
            outDir = 'json';
          }

          // JS
          if (/js$/.test(filename)) {
            outDir = 'js';
          }

          // CSS
          if (/css$/.test(filename)) {
            if ((/^src\/libs/.test(originalFilename))) {
              console.log(originalFilename);
              outDir = originalFilename
                        .replace(/^src\/libs/, 'libs')
                        .replace(/scss.*\.scss$/, 'css');

            } else {
              outDir = 'css';
            }
          }
          
          return `${outDir}/[name][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});