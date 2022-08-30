<template>
  <div class="add">
    <el-button type="primary" @click="createNew">新建文章</el-button>
  </div>
  <div class="list">
    <el-table :data="state.list" border v-loading="state.load">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="id" label="文章ID" width="80" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="type" label="分类" width="100" />
      <el-table-column prop="look" label="浏览量" width="80" />
      <el-table-column prop="like" label="喜欢数" width="80" />
      <el-table-column prop="remake" label="评论数" width="80" />
      <el-table-column label="封面" width="200" align="center">
        <template #default="scope">
          <el-image :src="scope.row.cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="content" label="描述" />
      <el-table-column prop="createdAt" label="创建时间" width="150" />
      <el-table-column prop="updatedAt" label="最后更新时间" width="150" />
      <el-table-column fixed="right" label="操作" width="240" align="center">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleClick">删除</el-button>
          <el-button type="primary" size="small" @click="updateNew(scope.row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleDetail(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="handleChangPage"
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="pageSize"
      />
    </div>
  </div>

  <modal :is-visible="isVisible" :title="'增加文章'" :width="800" @cancel="onCancel">
    <div class="poup">
      <el-input placeholder="输入标题" v-model="data.title"></el-input>
      <el-input
        placeholder="输入描述内容"
        maxleng="180"
        type="textarea"
        :autosize="{ maxRows: 3 }"
        v-model="data.content"
      ></el-input>
      <el-select v-model="data.type"  placeholder="请选择软件类型">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-input placeholder="作者" v-model="data.author"></el-input>
      <el-input placeholder="输入标签 使用-去分割多个标签" v-model="data.label"></el-input>
      <div class="crop">
        <p class="mr20" v-if="data.cover">✅ 已上传图片</p>
        <Cropper :cropper-height="180" :cropper-width="250" @upload-success="getImage"></Cropper>
      </div>
      <div class="bottom mt20">
        <el-button type="primary" @click="createArticle" v-if="flag === 'create'">确认</el-button>
        <el-button type="success" @click="updateArticle" v-if="flag === 'update'">修改</el-button>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { getSoftList } from '@/api'
import { formatTime } from '@/utils/time'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addSoft, updateSoft } from '@/api'
import { ElMessage } from 'element-plus'

const router = useRouter()
const state = reactive({
  total: 0,
  list: [],
  load: true,
})

const flag = ref<string>('create')
const pageSize = ref<number>(15)
const pageIndex = ref<number>(1)
const isVisible = ref<boolean>(false)
const soft_id = ref<number>(0)
const options = [
  { label: 'Windows' },
  { label: 'Mac' },
  { label: 'PC' },
  { label: 'Phone' },
  { label: 'Android' },
  { label: 'IOS' },
]

const data = reactive({
  title: '',
  content: '',
  type: '',
  label: '',
  cover: '',
  author: '爱呵呵',
})

onMounted(() => {
  getListData()
  // formatTime
})

const handleClick = () => {
  console.log('click')
}

// 详情
const handleDetail = (row: any) => {
  // console.log('去详情', row)
  router.push(`/detail/${row.id}`)
}

const getListData = async () => {
  state.load = true
  const { data, code, total, message } = await getSoftList({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
  })

  if (code === 200 && data.length) {
    state.load = false
    state.total = total || 0
    state.list = data
  }
  console.log('请求', data, code, total, message)
}

// 改变了当前页数
const handleChangPage = (val: number) => {
  console.log(val)
  // return
  pageIndex.value = val
  getListData()
}

const changeIsVisible = () => {
  isVisible.value = !isVisible.value
}

const resetData = () => {
  data.author = '爱呵呵'
  data.content = ''
  data.cover = ''
  data.label = ''
  data.title = ''
  data.type = ''
}

const onCancel = () => {
  changeIsVisible()
  resetData()
}

const createArticle = async () => {
  let { title, content, cover, label, type, author } = data || {}
  if (title && content && cover && label && type) {
    const { code, message } = await addSoft({
      title,
      content,
      cover,
      label,
      type,
      author,
    })

    if (code === 200) {
      ElMessage.success(message)
      resetData()
      changeIsVisible()
      getListData()
    }

    console.log(code, message)
  } else ElMessage.warning('参数不完整！')
}

const updateArticle = async () => {

  if (!soft_id.value) return
  if (!data.title) return
  if (!data.content) return
  if (!data.cover) return
  if (!data.label) return
  if (!data.type) return

  let item = {...data, ...{ id: soft_id.value }}
  const { code, message } = await updateSoft(item)

  if (code === 200) {
    ElMessage.success(message)
    changeIsVisible()
    resetData()
    getListData()
  }
}

const getImage = (url: string) => {
  console.log('获取的url')
  data.cover = url
}


const createNew = () => {
  changeIsVisible()
  flag.value = 'create' 
}

const updateNew = (item: any) => {
  changeIsVisible()
  flag.value = 'update'
  // console.log(item)
  soft_id.value = item.id
  data.author = item.author
  data.content = item.content
  data.cover = item.cover
  data.label = item.label
  data.type = item.type
  data.title = item.title
}

</script>



<style scoped lang="scss">
.add {
  margin-bottom: 20px;
}
.list {
  .pagination {
    margin-top: 20px;
    @include flex(false, false, row-reverse);
  }
}

.poup {
  .el-input {
    margin-bottom: 20px;
  }
  .el-select {
    margin: 20px 0;
  }
  .crop {
    @include flex(center);
    color: #67c23a;
  }
}
</style>
