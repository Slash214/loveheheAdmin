<template>
  <div class="website">
    <el-form label-width="100px" :model="params">
      <el-form-item label="名称">
        <el-input v-model="params.title" placeholder="网站名称"></el-input>
      </el-form-item>
      <el-form-item label="网址">
        <el-input v-model="params.url" placeholder="网址地址"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="params.desc" placeholder="网站描述"></el-input>
      </el-form-item>
      <el-form-item label="Icon">
        <el-button plain @click="handleChangeIsvisible">点击上传</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">增加</el-button>
      </el-form-item>
    </el-form>
  </div>

  <Cropper :isvisible="isvisible" @onCloseCropper="handleChangeIsvisible" />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"


let isvisible = ref<boolean>(false)
const params = reactive({
  title: <string>"",
  url: <string>"",
  icon: <string>"",
  desc: <string>"",
})

const submitForm = () => {
	console.log('12312')
}

const handleChangeIsvisible = () => {
  isvisible.value = !isvisible.value
}

</script>

<style scoped lang="scss">
.website {
  background-color: $white;
  padding: 40px 0;
  .el-form {
    width: 500px;
  }
}
</style>
