<template>
  <div class="tabs">
    <el-scrollbar class="scrollbar-container" ref="scrollbarDom" @wheel.native.passive="handleWhellScroll" @scroll="handleScroll">
      <Items
        :list="val"
        v-for="(val, key) of state.menuList"
        :key="key"
        :active="activeMenu.path == val.path"
        @reload="pageReload"
        @close="delMenu(val)"
      />
    </el-scrollbar>
    <div class="handle">
      <el-dropdown placement="bottom">
        <span>面板操作</span>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item class="tab" :icon="RefreshLeft" @click="pageReload">刷新当前标签</el-dropdown-item> -->
            <el-dropdown-item :icon="CircleClose" @click="currentDisabled">关闭当前路由</el-dropdown-item>
            <el-dropdown-item :icon="CircleClose" :disabled="state.menuList.length < 3" @click="closeOtherRoute"
              >关闭其他路由</el-dropdown-item
            >
            <el-dropdown-item :icon="CircleClose" :disabled="state.menuList.length <= 1" @click="closeAllRoute"
              >关闭全部路由</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, watch } from "vue"
import { ArrowDown, CircleClose, RefreshLeft } from "@element-plus/icons-vue"
import Items from "@/layout/Tabs/Item.vue"
import { ElScrollbar } from "element-plus/es"
import tabsHook from "./tabsHook"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const state = reactive({
  scrollLeft: 0,
  scrollbarDom: null,
  menuList: tabsHook.getItem(),
})
const defaultMenu = {
  path: "/dashboard",
  meta: { title: "首页", hideColse: true },
}
let activeMenu = reactive({ path: "" })

onMounted(() => {
  if (state.menuList.length === 0) {
    addMenu(defaultMenu)
  }

  // console.warn("activeMenu", activeMenu)
})

watch(state.menuList, (newVal: []) => {
  tabsHook.setItem(newVal)
})

router.afterEach(() => {
  addMenu(route)
  initMenu(route)
})

const addMenu = (menu: any) => {
  let { path, meta, name } = menu
  if (meta.hideTabs) {
    return
  }
  let hasMenu = state.menuList.some((obj: any) => {
    return obj.path === path
  })
  if (!hasMenu) {
    state.menuList.push({
      path,
      meta,
      name,
    })
  }
}

const delMenu = (menu: any) => {
  console.warn("触发了删除")
  let index = 0
  if (!menu.meta.hideClose) {
    // if (menu.meta.cache && menu.name) {
    //   store.commit("keepAlive/delKeepAliveComponentsName", menu.name)
    // }
    index = state.menuList.findIndex((item: any) => item.path === menu.path)
    state.menuList.splice(index, 1)
  }
  if (menu.path === activeMenu.path) {
    index - 1 > 0 ? router.push(state.menuList[index - 1].path) : router.push(defaultMenu.path)
  }
}

const initMenu = (menu: any) => {
  activeMenu = menu
  // console.error("activeMenu", activeMenu.path)
  // console.error("state.menuList.", state.menuList)
  nextTick(() => {
    setPosition()
  })
}

// 设置当前滚动条
const setPosition = () => {
  if (state.scrollbarDom) {
    const domBox = {
      scrollbar: state.scrollbarDom.scrollbar$.querySelector(".el-scrollbar__wrap ") as HTMLDivElement,
      activeDom: state.scrollbarDom.scrollbar$.querySelector(".active") as HTMLDivElement,
      activeFather: state.scrollbarDom.scrollbar$.querySelector(".el-scrollbar__view") as HTMLDivElement,
    }
    let hasDoms = true
    Object.keys(domBox).forEach((dom) => {
      if (!dom) hasDoms = false
    })
    if (!hasDoms) return
    const domData = {
      scrollbar: domBox.scrollbar.getBoundingClientRect(),
      activeDom: domBox.activeDom.getBoundingClientRect(),
      activeFather: domBox.activeFather.getBoundingClientRect(),
    }
    const num = domData.activeDom.x - domData.activeFather.x + (1 / 2) * domData.activeDom.width - (1 / 2) * domData.scrollbar.width
    domBox.scrollbar.scrollLeft = num
  }
}

// 鼠标滚动
const handleWhellScroll = (e: any) => {
  let distance = 0,
    speed = 5
  if (e.wheelDelta > 30) distance = -10
  else distance = 10
  state.scrollbarDom?.setScrollLeft(state.scrollLeft + distance * speed)
}

const handleScroll = ({ scrollLeft: left }: { scrollLeft: number }) => {
  state.scrollLeft = left
}

// 当前页面组件 刷新
const pageReload = () => {
  console.log('路由刷新，暂不处理')
  // const self: any = route.matched[route.matched.length - 1].instances.default
  // 刷新路由方法
  // self.handleReload()
}

// 关闭当前标签，首页不关闭
const currentDisabled = () => {
  if (route.path !== defaultMenu.path) {
    delMenu(route)
  }
}

const closeOtherRoute = () => {
  state.menuList = [defaultMenu]
  if (route.path !== defaultMenu.path) {
    addMenu(route)
  }
  //   setKeepAliveData()
}

const closeAllRoute = () => {
  state.menuList = [defaultMenu]
  router.push(defaultMenu.path)
}

// 初始化最底下更新
addMenu(route)
initMenu(route)
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: $white;
  border-top: 1px solid #eaf0f1;
  border-bottom: 1px solid #eaf0f1;
  // box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  .scrollbar-container {
    width: 90%;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    :deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
      height: 40px;
    }
  }
  .handle {
    flex: 1;
    min-width: 95px;
    height: 100%;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      margin-top: 5px;
      border-left: 1px solid var(--system-header-border-color);
      height: 25px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    i {
      color: var(--system-header-text-color);
    }
  }
}
</style>
