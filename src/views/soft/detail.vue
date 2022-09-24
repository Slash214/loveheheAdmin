<template>
  <div class="top">
    <el-button :disabled="flag !== 'add'" type="primary" @click="save">保存</el-button>
    <el-button :disabled="flag !== 'update'" type="success" @click="update">更新</el-button>
    <div class="itmes">
      <p>百度网盘</p>
      <el-input class="mr20" v-model="param.baidu" placeholder="百度网盘下载地址"></el-input>
      <p>天翼网盘</p>
      <el-input v-model="param.tianyi" placeholder="天翼下载地址"></el-input>
    </div>
    <div class="itmes">
      <p>蓝奏云</p>
      <el-input class="mr20" v-model="param.lanzou" placeholder="蓝奏云下载地址"></el-input>
      <p>网站下载</p>
      <el-input v-model="param.website" placeholder="网站下载地址"></el-input>
    </div>
  </div>
  <!-- <Markdown :text="param.content" /> -->
  <md-editor
    :previewOnly="previewOnly"
    @onUploadImg="onUploadImg"
    v-model="param.content"
    class="editor"
  ></md-editor>
  <!-- </div> -->
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { addSoftDetail, getSoftDetail, updateSoftDetail } from '@/api'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { UPLOAD_URL, BASE_IMG_URL } from '@/constant'

const router = useRouter()
const route = useRoute()

let article_id = ref<number>(0),
  flag = ref<string>('add'),
  previewOnly = ref<boolean>(false)

let param = reactive({
  content: '',
  fid: 0,
  baidu: '',
  tianyi: '',
  lanzou: '',
  website: '',
})

onMounted(() => {
  console.log('router.currentRoute', router.currentRoute)
  console.log('route', route.params)
  if (route.params?.id) param.fid = +route.params.id
  getDetails()
})

const getDetails = async () => {
  const { data, code, message } = await getSoftDetail({ id: param.fid })

  flag.value = code === 200 ? 'update' : 'add'
  if (code === 200) {
    let { content, id, fid, baidu, lanzou, website, tianyi } = data || {}
    param.content = content
    article_id.value = id
    param.baidu = baidu
    param.lanzou = lanzou
    param.website = website
    param.tianyi = tianyi
  }

  console.log(data)
  console.log(code)
  console.log(message)
}

const save = async () => {
  console.log(param)
  if (!param.content || !param.fid) {
    ElMessage.error('请填写内容和文章ID')
    return
  }

  const { data, code, message } = await addSoftDetail(param)
  console.log(data)
  if (code === 200) {
    ElMessage.success(message)
    getDetails()
  }
}

const update = async () => {
  console.log(param)
  let { website, lanzou, tianyi, baidu, content } = param || {}
  if (!param.fid || !article_id.value || !content) {
    ElMessage.warning('更新内容异常')
    return
  }

  const { code, message } = await updateSoftDetail({
    content,
    id: article_id.value,
    fid: param.fid,
    baidu,
    tianyi,
    lanzou,
    website,
  })

  if (code === 200) {
    ElMessage.success(message)
    getDetails()
    console.log('success')
    return
  }

  ElMessage.error(message)
}

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
  console.log(files, '图片')
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        axios
          .post(UPLOAD_URL, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => rev(res))
          .catch((err) => rej(err))
      })
	})
	)
	// console.log(res)
	callback(res.map((item: any) => BASE_IMG_URL + item.data.data.url))
}
</script>

<style scoped lang="scss">
.top {
  background-color: $white;
  padding: 20px;
  .itmes {
    margin-top: 20px;
    @include flex(center, space-between);
    p {
      width: 150px;
    }
  }
}
.editor {
  height: calc(100vh - 200px);
}
</style>
