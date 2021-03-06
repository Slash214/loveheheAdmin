import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'


const pathReslove = (dir: string) => resolve(__dirname, dir)


export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [pathReslove('./src/icons/svg')],
      symbolId: '[name]'
    }),
    AutoImport(),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      include: [/.vue$/, /.vue?vue/],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3100,
    cors: true,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`,
        javascriptEnbled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': pathReslove('./src'),
      views: pathReslove('./src/views')
    }
  },
})
