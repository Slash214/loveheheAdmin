<template>
  <div class="banner">
    <!-- <div class="item" v-for="(item, index) in list" :key="index">
      <el-image :src="baseurl + item.picture" />
      <p>链接文章id：{{ item.link }}</p>
      <p>创建时间: {{ item.createdAt }}</p>
      <p>更新时间: {{ item.updatedAt }}</p>
    </div> -->
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
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getBanner } from '@/api'
import { onMounted, ref } from 'vue'

const baseurl = 'https://img.pinkyang.cn/'
const list = ref<any[]>([])

onMounted(async () => {
  const { data, code, message } = await getBanner()
  list.value = data
  console.log('图片', data)
})
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
</style>
