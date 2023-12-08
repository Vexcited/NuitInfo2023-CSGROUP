import { defineConfig } from 'vite'

import unocss from "unocss/vite";
import solid from 'vite-plugin-solid'
import pages from 'vite-plugin-pages'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    unocss(),
    solid(),
    pages(),
    icons({ compiler: "solid" })
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
