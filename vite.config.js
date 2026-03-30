import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    base: 'https://www.rastarcomms.com/',
    onFinished() {
      console.log('Build finished! Ready for indexing.');
    },
    includedRoutes(paths, routes) {
      // 모든 포트폴리오 상세 경로를 포함합니다.
      return [
        '/',
        '/contact',
        '/portfolio/public-events',
        '/portfolio/broadcast-stage',
        '/portfolio/univ-festival',
        '/portfolio/workshop-mt'
      ]
    }
  },
})
