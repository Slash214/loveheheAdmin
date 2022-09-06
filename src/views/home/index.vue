<template>
  <div class="card">
    <div class="userinfo">
      <el-avatar
        src="https://p6-passport.byteacctimg.com/img/user-avatar/e81bc5d0ad2e25c80e4891878610afc6~300x300.image"
        :size="60"
      >
      </el-avatar>
      <div class="info">
        <p>Hello 爱呵呵</p>
        <p>今天又是快乐的一天哦</p>
      </div>
    </div>
    <div class="webinfo">
      <div>
        <span>网站注册用户</span>
        <p v-text="userNum"></p>
      </div>
      <div>
        <span>网站访问量</span>
        <p v-text="count"></p>
      </div>
      <div>
        <span>网站时间</span>
        <p>{{ formatTime(new Date()) }}</p>
      </div>
    </div>
  </div>
  <div class="box">
    <line-chart :xData="xline" :yData="yline"></line-chart>
  </div>
  <div class="yuan">
    <div class="left"></div>
  </div>
  <div class="main"></div>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/time'
import { getKeywords, getUserNum, getWebBrowse } from '@/api'
import { onMounted, reactive, ref } from 'vue'

let xline = reactive<string[]>([])
let yline = reactive<number[]>([])
let userNum = ref<number>(0)
let count = ref<number>(0)


onMounted(() => {
  getWords()
  getUser()
  getBrowse()
})

const getWords = async () => {
  const { data, total, code } = await getKeywords()
  console.log(total, data, code)
  for (let item of data) {
    xline.push(item.val)
    yline.push(item.count)
  }
  console.error('xline', xline, yline)
}

const getUser = async () => {
  const { data, total = 0, code } = await getUserNum()
  console.error('用户算了', data, total, code)
  userNum.value = total
}

const getBrowse = async () => {
  const { data } = await getWebBrowse()
  count.value = data.count
  console.log('网站', data)
}

</script>

<style scoped lang="scss">
.box {
  background-color: $white;
  height: 700px;
  padding-top: 20px;
}

.card {
  border: 1px solid $line;
  background-color: $white;
  border-radius: $br_s;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  height: 180px;
  @include flex(center, space-between);
  .userinfo {
    display: flex;

    .info {
      margin-left: 20px;
      p {
        @include font($font16, #333, 500, 1.5);

        &:last-child {
          padding-top: 0.625rem;
          @include font($font14, #999, 450, 1.5);
        }
      }
    }
  }
  .webinfo {
    @include flex(center);
    div {
      @include flex(center, center, column);
      margin-right: 40px;
      p {
        font-size: 24px;
        color: #409eff;
        padding-top: 10px;
        font-weight: 700;
      }
      span {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
