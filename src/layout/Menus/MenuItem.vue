<template>
  <el-sub-menu v-if="props.menu?.children?.length > 1" :index="menu.path" :show-timeout="0" :hide-timeout="0">
    <template #title>
      <svg-icon :style="!isCollapse ? {'margin-right': '10px'} : '' "
      :name="menu.meta.icon" size="16" v-if="menu.meta.icon"></svg-icon>
      <span>{{menu.meta.title}}</span>
    </template>
    <menu-item v-for="(val, index) of props?.menu?.children" :menu="val" :key="index" />
  </el-sub-menu>
  <el-menu-item :index="menu.path" v-else>
    <svg-icon :name="menu.meta.icon" size="16" v-if="menu.meta.icon" :style="!isCollapse ? {'margin-right': '10px'} : '' "></svg-icon>
    <template #title >{{menu.meta.title}}</template >
  </el-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
import { appState } from "@/store/app"
import { storeToRefs } from "pinia"
const { isCollapse } = storeToRefs(appState())


const props = defineProps({
  menu: {
    type: Object,
    required: true,
  }
})

</script>



<style scoped lang="scss"></style>
