<template>
  <el-scrollbar>
    <el-menu
      class="layout-menu system-scrollbar"
      background-color="var(--system-menu-background)"
      text-color="var(--system-menu-text-color)"
      active-text-color="var(--system-primary-color)"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <SvgIcon size="24" name="icon-shouye"></SvgIcon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <SvgIcon size="24" name="icon-shouye"></SvgIcon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <SvgIcon size="24" name="icon-shezhi"></SvgIcon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <SvgIcon size="24" name="icon-shouye"></SvgIcon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue"
// import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue"
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.el-scrollbar {
  background-color: #fff;
  border: 1px solid #eaf0f1;
  border-top: none;
}
.layout-menu {
  width: 100%;
  border: none;
  &.collapse {
    margin-left: 0px;
  }
  :deep() {
    .el-menu-item,
    .el-sub-menu {
      background-color: var(--system-menu-background) !important;
    }
    .el-menu-item i,
    .el-menu-item-group__title,
    .el-sub-menu__title i {
      color: var(--system-menu-text-color);
    }
    .el-menu-item,
    .el-sub-menu__title {
      &.is-active {
        background-color: var(--system-primary-color) !important;
        color: var(--system-primary-text-color) !important;
        i {
          color: var(--system-primary-text-color) !important;
        }
        &:hover {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
        }
      }
      &:hover {
        background-color: var(--system-menu-hover-background) !important;
      }
    }
    .el-sub-menu {
      &.is-active {
        > .el-sub-menu__title,
        > .el-sub-menu__title i {
          color: var(--system-menu-submenu-active-color) !important;
        }
      }
      .el-menu-item {
        background-color: var(--system-menu-children-background) !important;
        &.is-active {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
          &:hover {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
          }
        }
        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }
      .el-sub-menu {
        .el-sub-menu__title {
          background-color: var(--system-menu-children-background) !important;
          &:hover {
            background-color: var(--system-menu-hover-background) !important;
          }
        }
      }
    }
  }
}
</style>
