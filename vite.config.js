import { defineConfig } from "vite";
import vituum from 'vituum';
import liquidjs from '@vituum/vite-plugin-liquid';
import { glob } from 'glob';

const entries = glob.sync('./src/**/*.liquid').reduce((acc, path) => {
  const name = path.split('/').pop().split('.').shift();
  acc[name] = path;
  return acc;
}, {});


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
});