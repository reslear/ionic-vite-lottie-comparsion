import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'lottie-player',
        },
      },
    }),
    visualizer({
      open: true,
      brotliSize: true,
      gzipSize: true,
    }),
  ],
  css: {
    devSourcemap: false,
  },
})
