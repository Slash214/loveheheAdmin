<template>
  <el-popover
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px;"
    placement="bottom"
    :width="200"
    trigger="hover"
  >
    <template #reference>
      <div class="avatar">
        <el-avatar :size="35" :src="userInfo.avatar"></el-avatar>
        <span>{{ userInfo.nickname }}(Admin)</span>
      </div>
    </template>
    <template #default>
      <div class="outLogin" @click="outLogin">
        <el-icon :size="20"><Right /></el-icon>
        <span>退出登陆</span>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { nextTick, reactive } from "vue"
import { Right } from "@element-plus/icons-vue"
import userHook from "@/hooks/user"
import { ElMessage } from "element-plus/es"

const userInfo = userHook.getUser()

const outLogin = () => {
  console.log("退出登录")
  userHook.delUserInfo()
  ElMessage.success("正在退出...")
  setTimeout(() => {
    location.reload()
  }, 500)
}
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-avatar {
    margin-right: 10px;
  }
}
.outLogin {
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    padding-left: 5px;
  }
}
</style>
