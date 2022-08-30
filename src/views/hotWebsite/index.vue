<template>
  <div class="opts mb20">
    <el-button type="primary" class="mr20" @click="changeIsvisible">新增网站</el-button>
    <el-select
      clearable
      @change="handleChange"
      v-model="state.currentValue"
      class="m-2"
      placeholder="网站类型"
    >
      <el-option
        v-for="item in state.options"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      />
    </el-select>
  </div>
  <div class="website">
    <el-table :data="state.list" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column label="ICON" width="120">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.icon"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="ago" label="时间" width="120" />
      <el-table-column prop="type" label="类型" width="120" />
      <el-table-column prop="collect" label="收藏人数" width="100" />
      <el-table-column prop="look" label="浏览人数" width="100" />
      <el-table-column prop="url" label="网站地址" width="200" />
      <el-table-column prop="title" label="网站标题" />
      <el-table-column prop="desc" label="描述内容" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除网站嘛?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="pag">
      <el-pagination
        :page-size="state.pageSize"
        background
        layout="prev, pager, next"
        :total="state.total"
        @current-change="sizeChange"
      />
    </div>
  </div>

  <Modal :is-visible="isvisible" title="增加网站" :width="700" @cancel="onCancel">
    <div class="upload">
      <el-input v-model="params.title" placeholder="网站标题"></el-input>
      <!-- <el-input v-model="params.type" placeholder="网站类型"></el-input> -->
      <el-select class="mb20" v-model="params.type" placeholder="网站类型">
        <el-option
          v-for="item in state.options"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-input v-model="params.desc" placeholder="网站描述内容"></el-input>
      <el-input v-model="params.url" placeholder="网站的URL地址"></el-input>
      <div class="crop">
        <p class="mr20" v-if="params.icon">✅ 已上传图片</p>
        <Cropper :cropper-height="100" :cropper-width="100" @upload-success="getImage"></Cropper>
      </div>
      <el-button class="mt20" type="success" @click="sumbit" v-if="state.flag === 'add'"
        >提交上传</el-button
      >
      <el-button class="mt20" type="danger" @click="updates" v-else>更新上传</el-button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { addWebSite, deletWebSite, getTag, getWebSite, updateWebSite } from '@/api'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

type tags = {
  ago: string
  id: number
  type: string
  label: string
  shortTime: string
}

type tools = {
  id: number
  ago: string
  desc: string
  icon: string
  title: string
  type: string
  url: string
  collect: number
  look: number
}

type opts = {
  id: number
  type: string
  label: string
}

let isvisible = ref<boolean>(false)
const params = reactive({
  title: '',
  url: '',
  icon: '',
  desc: '',
  type: '',
})

let state: {
  list: Array<tools>
  currentValue: string
  options: Array<opts>
  total: number
  pageSize: number
  pageIndex: number
  flag: string
  id: number
} = reactive({
  currentValue: '',
  options: [],
  list: [],
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  flag: 'add',
  id: 0,
})

onMounted(() => {
  getTags()
  getList('')
})

const getTags = async () => {
  const { data, code, total } = await getTag({ type: 'webSite' })
  state.options = data
  console.error('data', data)
}

const getList = async (type: string) => {
  let params: any = {
    pageSize: state.pageSize,
    pageIndex: state.pageIndex,
  }
  if (type) params['type'] = type
  const { data, code, total = 0 } = await getWebSite(params)
  console.log('data', data)

  state.total = total
  state.list = data
}

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  params.title = row.title
  params.desc = row.desc
  params.icon = row.icon
  params.url = row.url
  params.type = row.type
  state.flag = 'update'
  state.id = row.id
  changeIsvisible()
}

const handleDelete = async (id: number) => {
  console.log(id)

  const { message, code } = await deletWebSite({ id })

  ElMessage.success(message)
  getList(state.currentValue)
}

const changeIsvisible = () => {
  isvisible.value = !isvisible.value
}

const getImage = (url: string) => {
  console.log('url', url)
  params.icon = url
}

const sumbit = async () => {
  console.log(params)
  if (params.title && params.desc && params.icon && params.url) {
    const { data, code, message } = await addWebSite(params)
    ElMessage.success(message)
    changeIsvisible()
    setTimeout(() => {
      getList(state.currentValue)
    }, 500)
    // console.log(data)
  }
}

const updates = async () => {
  console.log(params)
  let obj = { ...params, ...{ id: state.id } }
  const { data, code, message } = await updateWebSite(obj)
  console.log('data, code, message', data, code, message)
  ElMessage.success(message)
  resteParams()
  changeIsvisible()
  getList(state.currentValue)
}

const handleChange = (val: string) => {
  console.log('值改变了', val)
  state.list = []
  getList(val)
}

const sizeChange = (idx: number) => {
  console.log(idx)
  state.pageIndex = idx
  getList(state.currentValue)
}


const onCancel = () => {
  resteParams()
  changeIsvisible()
}

const resteParams = () => {
  params.desc = ''
  params.title = ''
  params.icon = ''
  params.type = ''
  params.url = ''
  state.id = 0
  state.flag = 'add'
}
</script>

<style scoped lang="scss">
.website {
  background-color: $white;
  .pag {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
  .el-form {
    width: 500px;
  }
}
.upload {
  .el-input {
    margin-bottom: 20px;
  }
  .crop {
    @include flex(center);
    color: #67c23a;
  }
}
</style>
