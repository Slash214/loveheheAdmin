import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'


const pathReslove = (dir: string) => resolve(__dirname, dir)


export default defineConfig({
  plugins: [
    vue(),
    Icons({
      defaultClass: 'inline',
      defaultStyle: 'veryical-align: sub;'
    }),
    createSvgIconsPlugin({
      iconDirs: [pathReslove('./src/icons/svg')],
      symbolId: '[name]'
    }),
    Unocss({
      presets: [
        presetAttributify(),
        presetUno()
      ],
    }),
    AutoImport(),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({ componentPrefix: '' })],
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
  },
  resolve: {
    alias: {
      '@': pathReslove('./src'),
      views: pathReslove('./src/views')
    }
  },
})
