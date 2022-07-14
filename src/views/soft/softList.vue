<template>
  <div class="add">
    <el-button type="primary">新建文章</el-button>
  </div>
  <div class="list">
    <el-table :data="list" style="width: 100%" border>
      <el-table-column fixed prop="title" label="标题" width="300" />
      <el-table-column prop="type" label="分类" width="100" />
      <el-table-column prop="desc" label="描述" width="420" />
      <el-table-column prop="author" label="创建人" width="80" />
      <el-table-column prop="createTime" label="创建时间" width="220" />
      <el-table-column prop="updateTime" label="最后更新时间" width="220" />
      <el-table-column fixed="right" label="发布" width="140">
        <template #default="scope">
          <el-switch v-model="scope.row.state" :loading="swithLoading"  @change="switchState(scope)" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template #default>
          <el-button type="danger" size="small" @click="handleClick">删除</el-button>
          <el-button type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from "@/utils/time"
import { onMounted, reactive, ref } from "vue"


const value1 = ref("")
const list = ref<any[]>([])
const swithLoading = ref<boolean>(false)

onMounted(() => {
  const item = {
    id: 1,
    title: "我是标题标题标题标题标题",
    type: "PC",
    desc: "我是描述描述描述描述描述描述描述描述描述大飒飒大苏打",
    author: "爱呵呵",
    createTime: formatTime(new Date()),
    updateTime: formatTime(new Date()),
    state: 1,
  }

  let arr = []
  for (let i = 0; i < 10; i++) {
    item.id = i + 1
    arr.push(item)
  }

  list.value = arr
  console.error(list.value)
})

const handleClick = () => {
  console.log("click")
}


const switchState = (val: any) => {
  swithLoading.value = true
  console.log(val)

  setTimeout(() => {
    swithLoading.value = false
  }, 1000);
}

</script>

<style scoped lang="scss">
.add {
  margin-bottom: 20px;
}
.list {
  .pagination {
    margin-top: 20px;
    @include flex(false, false, row-reverse)
  }
}
</style>
