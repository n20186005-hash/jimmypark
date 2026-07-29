import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jimmypark.org',
  output: 'static',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
});
