<template>
  <md-editor
    :previewOnly="previewOnly"
    @onUploadImg="onUploadImg"
    v-model="text"
    class="editor"
  ></md-editor>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { addSoftDetail } from '@/api';

const props = defineProps({
  previewOnly: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
})

// const text = ref<string>("")
const title = ref<string>('')

const addList = async () => {
  console.log(title.value)
  console.log(props.text)
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
