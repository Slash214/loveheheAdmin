<template>
  <header>
    <div class="left-box">
      <div class="menu-icon" @click="changeState">
        <SvgIcon size="20" :name="isCollapse ? 'icon-caidanzhankai' : 'icon-caidanshouqi'" />
      </div>
      <Breadcrumb />
    </div>
    <el-popover
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      placement="bottom"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <div class="right-box">
          <el-avatar :size="35" :src="userInfo.avatar"></el-avatar>
          <span>{{ userInfo.nickname }}(Admin)</span>
        </div>
      </template>
      <template #default>
        <div class="outLogin">
          <el-icon><Right /></el-icon>
          <span>退出登陆</span>
        </div>
      </template>
    </el-popover>
  </header>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/Header/Breadcrumb.vue"
import { Right } from "@element-plus/icons-vue"
import { appState } from "@/store/app"
import { computed, onMounted, reactive, ref } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue"
import { storeToRefs } from "pinia"
const { isCollapse } = storeToRefs(appState())

const userInfo = reactive({
  avatar: "http://img.pinkyang.cn/2021.06.20-myhead.jpg",
  nickname: "爱呵呵",
})

onMounted(() => {})

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
    width: 50%;
    .menu-icon {
      color: #bbb;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .right-box {
    align-items: center;
    display: flex;
    cursor: pointer;
    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>
