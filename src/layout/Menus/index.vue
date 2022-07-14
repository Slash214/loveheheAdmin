<template>
  <el-scrollbar>
    <el-menu router class="layout-menu" 
    :collapse="isCollapse" 
    :collapse-transition="false"
    :default-active="activeMenu"
    >
      <menu-item :class="isCollapse ? 'menuItems' : '' " v-for="(item, key) in allRoutes" :menu="item" :key="key" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { appState } from "@/store/app"
import { computed } from "vue"
const { isCollapse } = storeToRefs(appState())

const router = useRouter()
const route = useRoute()

console.error(router.options.routes)
const allRoutes = router.options.routes.filter((e: any) => {
  return e.meta.showMenu
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) return meta.activeMenu
  return path
})


console.error("allRoutes", allRoutes)
</script>

<style scoped lang="scss">
.el-scrollbar {
  background-color: #fff;
  border: 1px solid #eaf0f1;
  border-top: none;
  border-left: none;
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
        background-color: var(--system-menu-active-background) !important;
        color: var(--system-menu-text-color) !important;
        i {
          color: var(--system-primary-text-color) !important;
        }
        &:hover {
          background-color: var(--system-menu-active-background) !important;
          color: var(--system-menu-text-color) !important;
        }
      }
      &:hover {
        background-color: var(--system-menu-active-background) !important;
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
          background-color: var(--system-menu-active-background) !important;
          color: var(--system-menu-text-color) !important;
          &:hover {
            background-color: var(----system-menu-hover-background) !important;
            color: var(--system-menu-text-color) !important;
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
