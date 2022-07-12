<template>
  <el-container style="height: 100vh">
    <el-aside :width="isCollapse ? '60px' : '200px'"
	class="flex flex-col">
	  <div class="logo">
		LOGO
	  </div>
	  <Menus />
	</el-aside>
    <el-container>
      <el-header>
		<Headers />
	  </el-header>
      <el-main>主要内容</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menus from './Menus/index.vue'
import Headers from '@/layout/Header/index.vue'

import { appState } from '@/store/app'

import { storeToRefs } from 'pinia';
const { isCollapse } = storeToRefs(appState())



</script>

<style scoped lang="scss">
.el-header {
	padding-left: 0;
	padding-right: 0;
}

.el-aside  {
	transition: .2s;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		width: 0 !important;
	}
	.logo {
		width: 100%;
		height: 60px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}


@media screen and (max-width: 1000px){
	.el-aside {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 1000;
		&.hide-aside {
			left: -200px;
		}
	}
}
</style>
