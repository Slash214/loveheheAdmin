<template>
  <div class="main">
    <el-form label-position="left" :model="table" style="max-width: 450px" label-width="70px">
      <el-form-item label="作者">
        <el-input v-model="table.author"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="table.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="table.desc"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="table.type" placeholder="选择软件属于什么类别">
          <el-option v-for="item of MenuType" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="table.tag" multiple placeholder="选择文章标签" style="width: 300px">
          <el-option v-for="item in softTag" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片上传">  
         <Upload />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">增加</el-button>
      </el-form-item>
    </el-form>

    <Cropper />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"


const table = reactive({
  title: <string>"",
  desc: <string>"",
  author: <string>"爱呵呵",
  type: <string>"",
  tag: [],
  imgUrl: <string>"",
})

const MenuType = [
  { id: 1, name: "PC" },
  { id: 2, name: "Andriod" },
  { id: 3, name: "IOS" },
  { id: 4, name: "Mac" },
  { id: 6, name: "Iphone" },
  { id: 5, name: "Windows" },
]

const softTag = [
  { id: 1, name: "黑科技" },
  { id: 167, name: "摸鱼" },
  { id: 123, name: "工具" },
  { id: 15, name: "图片" },
  { id: 41, name: "影视" },
  { id: 21, name: "百度网盘" },
  { id: 188, name: "季后赛" },
]

const submitForm = () => {
  console.log("2321")
  console.log(table)
}

// const getSoftType = (val: string | undefined | object) => {
// 	console.log(val)
// 	table.v
// }
</script>

<style scoped lang="scss">
.main {
  background-color: $white;
  padding: 20px;
}
</style>
