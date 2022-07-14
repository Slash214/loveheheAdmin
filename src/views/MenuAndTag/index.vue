<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="类别" name="type"></el-tab-pane>
      <el-tab-pane label="标签" name="tag"></el-tab-pane>
    </el-tabs>

    <div class="main">
      <el-tag v-for="tag in dynamicTags"  size="large" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag"  @click="showInput"> + New Tag </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"
import type { TabPanelName } from "element-plus"
import { ElInput } from "element-plus"

const activeName = ref("type")
const inputValue = ref("")
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

onMounted(() => {})

const handleChange = (name: TabPanelName) => {
  console.log("name", name)
}

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ""
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
			margin: 0 .625rem .625rem 0;
		}
		.el-input {
			width: 140px;
		}
	}
}
</style>
