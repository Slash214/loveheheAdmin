import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface appState {
	isCollapse: boolean,
	showTabs: boolean,
	menuList: Array<unknown>
}

export const appState = defineStore('app', () => {
	const isCollapse = ref<boolean>(false)
	const showTabs = ref<boolean>(false);
	const menuList = ref<any[]>([]);

	function setIsCollapse(bol: boolean) {
		// console.error('bol', bol)
		isCollapse.value = bol
	}

	return { isCollapse, showTabs, menuList, setIsCollapse }
})

