<template>
  <div class="empty">
    <img src="@/assets/404.png" class="imgs" alt="404" />
    <p>抱歉，您访问的页面不存在</p>
    <el-button type="primary" plain @click="back">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.empty {
  width: 100%;
  height: 80%;
  @include flex(center, center, column);
  .imgs {
    object-fit: contain;
    width: 660px;
    height: 545px;
  }
  p {
    color: #333;
    padding-bottom: 10px;
  }
  .el-button {
    width: 100px;
  }
}
</style>
