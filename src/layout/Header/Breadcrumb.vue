<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="tag.path" v-for="(tag, key) of levleList" :key="key">{{tag.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const levleList = ref<any[]>([])
const route = useRoute()

onMounted(() => {
  getBreadcrumb()
})

const getBreadcrumb = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  levleList.value = matched
  console.warn('matched', matched)
}

watch(
  () => route.path,
  () => getBreadcrumb()
)


</script>

<style scoped lang="scss"></style>
