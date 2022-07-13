<template>
  <el-sub-menu v-if="props.menu?.children?.length > 1" :index="menu.path" :show-timeout="0" :hide-timeout="0">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{menu.meta.title}}</span>
    </template>
    <menu-item v-for="(val, index) of props?.menu?.children" :menu="val" :key="index" />
  </el-sub-menu>
  <el-menu-item :index="menu.path" v-else>
    <el-icon><icon-menu /></el-icon>
    <template #title>{{menu.meta.title}}</template >
  </el-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue"

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
  
})

console.error(props.menu, 'asdasdasd')

</script>



<style scoped lang="scss"></style>
