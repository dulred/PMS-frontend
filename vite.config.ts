import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 将所有以 /personmis 开头的请求自动代理到 http://localhost:8443 下
      '/personmis': { 
        // target: 'http://localhost:8443',
        target: 'http://localhost:8556',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/personmis/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
        additionalData: '@import "../assets/scss/globalVar.scss";@import "../assets/scss/globalMixin.scss";@import "../assets/scss/globalExtend.scss";'
      }
    }
  },

  
})
