<template>
  <div class="banner">
    <el-table :data="list" border>
      <el-table-column align="center" prop="id" label="ID" width="180" />
      <el-table-column align="center" prop="link" label="链接文章ID" width="180" />
      <el-table-column align="center" prop="shortTime" label="创建时间" width="180" />
      <el-table-column align="center" label="轮播图">
        <template #default="scope">
          <el-image class="imgs" :src="baseurl + scope.row.picture" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope"> 
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handledelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <modal :title="'更新轮播图'" :isVisible="isVisiable" :width="700"  @cancel="onCancel">
      <div class="box">
        <el-input placeholder="图片id" v-model="params.id"></el-input>
        <el-input placeholder="图片链接的文章id" v-model="params.link"></el-input>
        <!-- <el-input placeholder="图片地址" v-model="params.picture"></el-input> -->
        <div class="pic">
          <p class="mr20" v-if="params.picture">✅ 已上传图片</p>
          <Cropper :cropper-height="500" :cropper-width="1400" @upload-success="getImage"></Cropper>
        </div>
        
        <el-button @click="addBanner">更新</el-button>
      </div>
  </modal>
</template>

<script setup lang="ts">
import { getBanner, updateBanner } from '@/api'
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'

const baseurl = 'https://img.pinkyang.cn/'
const list = ref<any[]>([])
let isVisiable = ref<boolean>(false)
const params = reactive<any>({
  id: '',
  picture: '',
  link: ''
}) 

onMounted(async () => {
  const { data, code, message } = await getBanner()
  list.value = data
  console.log('图片', data)
})


const handleEdit = (item: any) => {
  console.log('编辑', item)
  changeIsVisiable()
  params.id = item.id
  params.link = item.link
  params.picture = item.picture
}

const handledelete = (item: any) => {
  console.log('删除')
}


const changeIsVisiable = () => {
  isVisiable.value = !isVisiable.value
}

const onCancel = () => {
  changeIsVisiable()
}

const addBanner = async () => {
  if (!params.id || !params.link || !params.picture) {
    ElMessage.warning('参数不能为空')
    return
  }

  const { data, code, message } = await updateBanner({
    id: +params.id,
    link: +params.link,
    picture: params.picture
  })

  changeIsVisiable()
  if (code === 200) {
    ElMessage.success(message)
  }
}


const getImage = (url: string) => {
  console.log('图片', url)
  params.picture = url.replace('https://img.pinkyang.cn/', '')
}

const resetData = () => {
  params.id = ''
  params.link = ''
  params.picture = ''
  isVisiable.value = false
}

</script>

<style scoped lang="scss">
.banner {
  background-color: $white;
  min-height: 80vh;
  .imgs {
    width: 1000px;
    height: 400px;
  }
  .el-table {
    text-align: center;
  }
}

.box {
  .el-input {
    margin-bottom: 20px;
  }
  .pic {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
}
</style>
