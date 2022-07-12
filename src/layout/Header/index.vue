<template>
  <header>
    <div class="left-box">
      <div class="menu-icon" @click="changeState">
        <SvgIcon size="20" :name="isCollapse ? 'icon-caidanzhankai' : 'icon-caidanshouqi'" />
      </div>
      <div>
        <Breadcrumb />
      </div>
    </div>
    <div class="right-box">123</div>
  </header>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/Header/Breadcrumb.vue"

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
  height: 60px;
  display: flex;
  justify-content: space-between;
  .left-box {
    align-items: center;
    display: flex;
    .menu-icon {
      color: #bbb;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
