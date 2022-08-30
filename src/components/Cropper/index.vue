<template>
  <el-upload
    action="#"
    :auto-upload="false"
    accept="image/*"
    ref="uploadDom"
    :on-change="uploadchange"
    :show-file-list="false"
  >
    <template #trigger>
      <el-button type="primary">上传图片</el-button>
    </template>
  </el-upload>
  <modal :isVisible="isvisible" :width="800" @cancel="cancel" :title="'裁剪上传'">
    <div class="box">
      <div class="left">
        <img :id="imgId" class="default-img" :src="modelValue" />
      </div>
      <div class="right">
        <div :class="previewClass" class="preview"></div>
      </div>
    </div>
    <template v-slot:footer>
      <div class="center">
        <el-upload
          action="#"
          :auto-upload="false"
          accept="image/*"
          ref="uploadDom"
          :on-change="uploadchange"
          :show-file-list="false"
        >
          <template #trigger>
            <el-button type="success">重新上传</el-button>
          </template>
        </el-upload>
        <el-button class="ml20" type="primary" @click="saveAsModel">确认裁剪</el-button>
      </div>
    </template>
  </modal>
  <!-- <loading /> -->
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  cropperWidth: {
    type: Number,
    default: 250,
  },
  cropperHeight: {
    type: Number,
    default: 180,
  },
})

const emits = defineEmits(['uploadSuccess'])

let filename = ref<string>('')
let imgId = 'image' + new Date().getTime()
let previewClass = 'preview' + new Date().getTime()

let isvisible = ref<boolean>(false),
  cropper = ref(null as Cropper | null),
  uploadDom = ref(null as any | null)

watch(
  () => isvisible,
  newVal => {
    if (!newVal) return
    nextTick(() => {
      initCropper()
    })
  }
)

const initCropper = () => {
  if (cropper.value) cropper.value.destroy()
  const image = document.getElementById(imgId) as HTMLImageElement

  cropper.value = new Cropper(image, {
    preview: '.' + previewClass,
    aspectRatio: props.cropperWidth / props.cropperHeight,
    viewMode: 1,
    center: false,
    // scalable: false,  // 图片缩放
    zoomOnWheel: false, // 是否可以通过鼠标滚轮缩放图片
    movable: false, // 启用图片移动
  })
}

const uploadchange = (file: any, fileList: any) => {
  console.error('文件名称', file.name)
  filename.value = file.name
  isvisible.value = true
  file2base64(file)
  uploadDom.value.clearFiles()
}

const file2base64 = (file: any) => {
  let imgFile = new FileReader()
  imgFile.readAsDataURL(file.raw)
  imgFile.onload = function (e) {
    const image = document.getElementById(imgId) as HTMLImageElement
    image.setAttribute('src', this.result as string)
    initCropper()
  }
}

const saveAsModel = async () => {
  // 1. 获取base64数据
  const canvas = cropper.value?.getCroppedCanvas({
    maxWidth: 4096,
    maxHeight: 4096,
  })
  const base64 = canvas?.toDataURL() || ''
  // console.log('base64', base64)
  let file = base64ToFile(base64, filename.value)
  console.warn('文件流', file)

  // 2. 进行图片上传，并拿到上传后的地址，暂时省略
  let data = new FormData()
  data.append('file', file)
  const result = await axios.post('https://lovehaha.cn/api/qiniu', data, {
    headers: { 'Contnet-Type': 'multipart/form-data' }
  })

  if (result?.data?.state === 'success') {
    console.log('上传成功')
    result.data.data.url
    console.log('url', result.data.data.url)
    isvisible.value = false
    ElMessage.success('上传成功')
    emits('uploadSuccess', result.data.data.url)
  } else {
    isvisible.value = false
    ElMessage.success('上传失败') 
  }
  // console.log(result)
  
  // 3. 赋值给v-model
  // emit('update:modelValue', base64)
  // 4. 关闭当前弹窗

}

const cancel = () => {
  isvisible.value = false
}

const base64ToFile = (base64: string, filename: string) => {
  const dataArr = base64.split(',')
  const byteString = atob(dataArr[1])

  const options: object = {
    type: 'image/jpeg',
    endings: 'native'
  }

  const u8Arr = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    u8Arr[i] = byteString.charCodeAt(i)
  }

  return new File([u8Arr], filename, options)
}

</script>

<style scoped lang="scss">
.box {
  width: 100%;
  @include flex(center, space-between);

  .left {
    width: 49%;
    height: 400px;
    overflow: hidden;
    .cropper {
      height: 350px;
      width: auto;
    }
  }
  .right {
    width: 49%;
    overflow: hidden;
    height: 400px;
    @include flex(center, center, column);
    .preview {
      width: 100%;
      height: 100%;
      img {
        max-width: 100%;
      }
    }
  }
}
.center {
  @include flex(center, center);
  
}
</style>