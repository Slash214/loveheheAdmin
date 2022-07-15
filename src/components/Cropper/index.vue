<template>
  <div class="cropper" v-if="isvisible">
    <div class="top">
      <p>裁剪图片上传</p>
      <el-icon @click="closeCropper"><CloseBold /></el-icon>
    </div>
    <div class="content">
      <div class="left">
        <el-upload
          v-if="!cropperImg"
          ref="uploadRef"
          action=""
          :show-file-list="false"
          :before-upload="beforeImageUpload"

        >
          <div class="upload-icon">
            <el-icon><Upload /></el-icon>
          </div>
        </el-upload>
        <div v-else class="container">
          <vue-cropper
            ref="cropper"
            :img="cropperImg"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            :info-true="option.infoTrue"
            @realTime="realTime"
            :enlarge="option.enlarge"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
          >
          </vue-cropper>
        </div>
      </div>
      <div class="right">
        <div class="privew_style">
          <div class="preview" :style="previews.div">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" @click="sumbitData"><el-button>确定</el-button></div>
  </div>
  <div class="mask" v-if="isvisible"></div>
</template>

<script setup lang="ts">
import { VueCropper } from "vue-cropper"
import { nextTick, onMounted, reactive, ref } from "vue"
import "vue-cropper/dist/index.css"
import { Blob } from "buffer"
import { CloseBold, Upload } from "@element-plus/icons-vue"
import { ElMessage, UploadProps } from 'element-plus'


// https://img.pinkyang.cn/2022.06.23-piqsels.com-id-jrxuc.jpg
const cropperImg = ref<string>("")



let previews: any = ref({})
const cropper = ref<any>(null)

const emits = defineEmits(['onCloseCropper', 'onSumbit'])
const props = defineProps({
  isvisible: {
    type: Boolean,
    default: false
  }
})


const option = reactive({
  img: "", // 裁剪图片的地址
  size: 1, // 裁剪生成图片的质量
  full: false, // 是否输出原图比例的截图 默认false
  outputType: "png", // 裁剪生成图片的格式 默认jpg
  canMove: false, // 上传图片是否可以移动
  fixedBox: true, // 固定截图框大小 不允许改变
  original: false, // 上传图片按照原始比例渲染
  canMoveBox: true, // 截图框能否拖动
  autoCrop: true, // 是否默认生成截图框
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 200, // 默认生成截图框宽度
  autoCropHeight: 150, // 默认生成截图框高度
  centerBox: true, // 截图框是否被限制在图片里面
  high: false, // 是否按照设备的dpr 输出等比例图片
  enlarge: 1, // 图片根据截图框输出比例倍数
  mode: "cover", // 图片默认渲染方式
  maxImgSize: 2000, // 限制图片最大宽度和高度
  limitMinSize: [100, 120], // 更新裁剪框最小属性
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
  fixedNumber: [400, 200], // 截图框的宽高比例
})

onMounted(() => {
  nextTick(() => {
    console.log(cropper.value)
  })
})

// 内部函数

const realTime = (data: any) => {
  previews.value = data
}

const saveImg = () => {
  console.warn("cropper", cropper.value)
  cropper.value.getCropBlob((data: Blob) => {
    console.log(data)
  })
}

const uploadImage = () => {
  console.log("上传图片")
}


// 图片上传拦截
const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  console.log(rawFile)
  // return true
  return false
}



// 传出函数 
const closeCropper = () => {
  console.log("关闭")
  emits('onCloseCropper', false)
}

const sumbitData = () => {
  emits('onSumbit', '图片上传')
}

</script>

<style scoped lang="scss">
.cropper {
  transition: all 0.3s ease-in-out;
  background-color: $white;
  border-radius: $br_s;
  width: 600px;
  height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  .top {
    @include flex(center, space-between);
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    @include font($font16, #111, 500, 1.3);
    .el-icon {
      cursor: pointer;
    }
  }
  .content {
    padding: 20px;
    @include flex(center, space-between);
    .left,
    .right {
      border: 1px solid #ddd;
      height: 270px;
      width: 270px;
      .imgs {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .left {
      .el-upload {
        width: 100%;
        height: 100%;
        .upload-icon {
          width: 270px;
          height: 270px;
          font-size: 32px;
          @include flex(center, center, column);
        }
      }
      .container {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      .preview {
        overflow: hidden;
        width: 100%;
      }
    }
  }
  .bottom {
    @include flex(center, center);
  }
}
.mask {
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
