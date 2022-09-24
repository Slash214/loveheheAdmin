<template>
  <el-container style="height: 100vh">
    <el-aside :width="isCollapse ? '60px' : '220px'" :class="isCollapse ? 'hide-aside' : 'show-side'">
      <div class="logo">
        <img src="@/assets/logo.png"  />
        <p v-if="!isCollapse">斜杠boy</p>
      </div>
      <Menus />
    </el-aside>
    <el-container>
      <el-header>
        <Headers />
      </el-header>
      <Tabs />
      <el-main>
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menus from "./Menus/index.vue"
import Headers from "@/layout/Header/index.vue"
import Tabs from "./Tabs/index.vue"

import { appState } from "@/store/app"
import { storeToRefs } from "pinia"
const { isCollapse } = storeToRefs(appState())


</script>

<style scoped lang="scss">
.el-header {
  padding-left: 0;
  padding-right: 0;
}

.el-aside {
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  overflow-x: hidden;
  transition: 0.3s;
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
    border-right: 1px solid #eaf0f1;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      transition: all .3s ease-in-out;
      padding-left: 10px;
      font-weight: 700;
      line-height: 1.5;
    }
  }
}
.el-main {
  height: 100%;
  padding: 0;
  overflow-x: hidden;
  margin: 20px;
}
.el-main-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
@media screen and (max-width: 1000px) {
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    &.hide-aside {
      left: -220px;
    }
  }
}
</style>
