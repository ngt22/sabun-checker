import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const appName = "テキスト差分チェッカーβ"
const appVersion = "0.1.1"

// https://vite.dev/config/
export default defineConfig({
  base: '/sabun-checker/',
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    workbox: {
      globPatterns: ['**/*.{js, css, html, ico, png, svg, json, vue, txt, woff2}'],
    },
    manifest: {
      name: appName,
      short_name: appName,
      description: '二つのテキストを比較して差分を表示します',
      theme_color: '#000080', //darkblue
      background_color: '#eoffff',  //lightcyan
      display: 'standalone',
      start_url: '.',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  })
  ],
  define: {
    // グローバル定数を定義 (文字列は JSON.stringify で囲む)
    '__APP_NAME__': JSON.stringify(appName),
    '__APP_VERSION__': JSON.stringify(appVersion),
  },
})
