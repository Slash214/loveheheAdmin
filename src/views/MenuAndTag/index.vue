<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="文章标签" name="article"></el-tab-pane>
      <el-tab-pane label="网站标签" name="website"></el-tab-pane>
    </el-tabs>

    <div class="main">
      <el-tag
        v-for="tag in dynamicTags"
        size="large"
        :key="tag.id"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag.label }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" @click="showInput"> + 增加标签 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, reactive } from 'vue'
import type { TabPanelName } from 'element-plus'
import { ElInput } from 'element-plus'
import { getTag, createTag } from '@/api'

const activeName = ref('article')  // 当前选择的
const inputValue = ref('')
const dynamicTags = ref<any[]>([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()


const state: any = reactive({

})


onMounted(() => {
  getData()
})

const getData = async () => {

  const { data, code } = await getTag({ type: activeName.value })
  console.log(data)
  dynamicTags.value = data
}

const handleChange = (name: string) => {
  console.log('name', name)
  activeName.value = name
  getData()
}

const handleClose = (tag: string) => {
  console.log(tag)
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = async () => {
  if (inputValue.value) {
    console.log(inputValue.value)

    const { data, code } = await createTag({
      label: inputValue.value,
      type: activeName.value
    })
    console.log(data, code)
    if (code === 200) getData()
    // dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  background-color: $white;
  padding: 1.25rem;
  min-height: 80vh;
  .main {
    .el-tag {
      margin: 0 0.625rem 0.625rem 0;
    }
    .el-input {
      width: 140px;
    }
  }
}
</style>
