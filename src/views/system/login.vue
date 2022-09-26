<template>
  <div class="login">
    <div class="box">
      <div class="left">
        <img src="@/assets/bg.png" class="imgs" />
      </div>
      <div class="right">
        <h1>爱呵呵资源网站</h1>
        <el-input placeholder="super" size="large" v-model="username"></el-input>
        <el-input placeholder="123456" type="password" size="large" v-model="password"></el-input>
        <el-button type="primary" size="large" @click="sumbit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import userHook from '@/hooks/user'
import { adminLogin } from '@/api'
import { ElMessage } from 'element-plus'
const username = ref<string>('')
const password = ref<string>('')

onMounted(() => {
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyDown, false)
})

const sumbit = async () => {
  if (!username.value || !password.value) return
  const { data, code, message } = await adminLogin({
    username: username.value,
    password: password.value,
  })

  if (code !== 200) {
    ElMessage.error(message)
    return
  }

  ElMessage.success('登陆成功!正在跳转...')
  userHook.setToken('$$$$$$$TOKEN$$$$$$$')
  userHook.setUser(data)
  await new Promise((r) => setTimeout(r, 800))
  location.reload()
}

const keyDown = (e: any) => {
  if (e.keyCode === 13) {
    sumbit()
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/login_bg.b490478a.jpg') no-repeat;
  background-size: cover;
  zoom: 1;
  z-index: -10;
  .box {
    width: 800px;
    min-width: 620px;
    max-width: 800px;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    background-color: $white;
    box-shadow: 1.5px 3.99px 27px #0000001a;
    .left {
      width: 50%;
      .imgs {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 50%;
      display: flex;
      //   border-left: 1px solid #ccc;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 30px;
      h1 {
        margin-bottom: 20px;
      }
      .el-input {
        margin-top: 30px;
      }
      .el-button {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
}
</style>
