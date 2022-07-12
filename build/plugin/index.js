import vue from '@vitejs/plugin-vue'

import { unocss } from './unocss'

export function createVitePlugins(viteEnv, isBuild) {
	const plugins = [
		vue(),
		unocss()
	]

	return plugins
}