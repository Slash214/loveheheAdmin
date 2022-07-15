<template>
  <div class="optins">
    <input class="inputs" v-model="title" placeholder="请输入标题..." />
	<button class="btns" @click="addList">增加</button>
  </div>
  <md-editor :previewOnly="previewOnly" @onUploadImg="onUploadImg" v-model="text" class="editor"></md-editor>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css"


const props = defineProps({
	previewOnly: {
		type: Boolean,
		default: false
	}
})

const text = ref<string>("")
const title = ref<string>("")


const addList = () => {
	console.log(title.value)
	console.log(text.value)
}

const onUploadImg = (files: Array<File>, callback: (urls: Array<string>) => void) => {
  console.log(files, '图片')
}


</script>

<style scoped lang="scss">
.optins {
	@include flex(false, space-between);
  .inputs {
    border: none;
    font-size: 24px;
    padding: 10px;
    background: #fff;
    width: 100%;
    color: #999;
    border: 1px solid #eee;
    border-bottom: none;
  }
  .btns {
	width: 140px;
    border: none;
	outline: none;
	background-color: #eee;
	color: #111;
	cursor: pointer;
	&:hover {
		color: #fff;
		background-color: $primaryColor;
	}
  }

}
.editor {
  height: calc(100vh - 200px);
}
</style>
