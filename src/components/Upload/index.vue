<template>
  <!-- <div class="upload"> -->
  <el-upload
    class="upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-success="handleFileSuccess"
    :show-file-list="false"
  >
    <img v-if="imageUrl" :src="imageUrl" class="imgs" />
    <el-icon class="pic"><Plus /></el-icon>
  </el-upload>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import { ref } from "vue"
import type { UploadProps } from "element-plus"

const imageUrl = ref<string>()

const handleFileSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.warn("response")
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
</script>

<style scoped lang="scss">
.upload {
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  overflow: hidden;
  border: 1px dashed #eee;
  position: relative;
  border-radius: $br_s;
  &:hover {
    border: 1px dashed #ff81ff;
  }
  .pic {
    font-size: 1.75rem;
    color: #8c939d;
    width: 10rem;
    height: 10rem;
    text-align: center;
  }
}
</style>
