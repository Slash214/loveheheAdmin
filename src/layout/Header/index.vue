<template>
  <header class="flex justify-between h60">
    <div class="left-box flex">
      <div class="menu-icon" @click="changeState">
        <SvgIcon size="28" :name="isCollapse ? 'icon-caidanzhankai' : 'icon-caidanshouqi'" />
      </div>
	  <Breadcrumb />
    </div>
    <div class="right-box">123</div>
  </header>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/Header/Breadcrumb.vue";

import { appState } from "@/store/app"
import { computed } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue"
import { storeToRefs } from "pinia"


const { isCollapse } = storeToRefs(appState())

const changeState = () => {
  console.warn("isCollapse", isCollapse)
  appState().setIsCollapse(!isCollapse.value)
}
</script>

<style scoped lang="scss">
header {
  background-color: #fff;
  padding: 0 15px;
  align-items: center;
  .left-box {
	.menu-icon {
		color: #bbb;
		cursor: pointer;
	}
  }
}
</style>
