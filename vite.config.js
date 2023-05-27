import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  base: '/',
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
        target: 'http://localhost:8443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/personmis/, '')
      }
    }
  }
  
})
