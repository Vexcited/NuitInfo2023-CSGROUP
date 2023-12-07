import { defineConfig } from 'vite'

import unocss from "unocss/vite";
import solid from 'vite-plugin-solid'
import pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    unocss(),
    solid(),
    pages()
  ],

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
