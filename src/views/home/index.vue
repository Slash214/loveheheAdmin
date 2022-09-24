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
      <div @click="showNumber" style="cursor: pointer">
        <span>网站注册用户</span>
        <p v-text="userNum"></p>
      </div>
      <div>
        <span>网站访问量</span>
        <p v-text="count"></p>
      </div>
      <div>
        <span>当前时间</span>
        <p>{{ formatTime(new Date()) }}</p>
      </div>
    </div>
  </div>
  <div class="box">
    <line-chart :xData="xline" :yData="yline"></line-chart>
  </div>
  <el-drawer v-model="flag" title="网站注册用户列表" direction="rtl" size="50%">
    <el-scrollbar height="100vh">
      <ul
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="disabled"
        style="padding-right: 40px"
      >
        <li v-for="item in userList" :key="item.id" class="user_item">
          <div class="ifno">
            <el-avatar :src="item.avatar"></el-avatar>
            <span>{{ item.nickname || '默认昵称' }}</span>
          </div>
          <p class="way">登录方式：{{ item.way === 'web' ? '网站注册' : 'QQ登录' }}</p>
          <p>注册时间：{{ item.createdAt }}</p>
        </li>
      </ul>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/time'
import { getKeywords, getUserNum, getWebBrowse } from '@/api'
import { computed, onMounted, reactive, ref } from 'vue'

let xline = reactive<string[]>([]),
  yline = reactive<number[]>([]),
  userNum = ref<number>(0),
  count = ref<number>(0),
  flag = ref(false),
  userList = ref<any[]>([]),
  pageSize = ref(20),
  pageIndex = ref(1),
  disabled = ref(false)

// const disabled = computed(() => userNum.value === userList.value.length)

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
  const {
    data,
    total = 0,
    code,
  } = await getUserNum({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
  })
  userNum.value = total

  console.error('用户算了', data, total, code)
  userList.value = userList.value.length ? [...userList.value, ...data] : data
}

const loadMore = () => {
  if (userNum.value === userList.value.length) {
    console.log('没有数据了')
    disabled.value = true
    return
  }

  pageIndex.value++
  getUser()
}

const getBrowse = async () => {
  const { data } = await getWebBrowse()
  count.value = data.count
  console.log('网站', data)
}

const showNumber = () => {
  console.log(1)
  flag.value = true
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

.user_item {
  display: block;
  margin-bottom: 40px;
  @include flex(center, space-between);
  .ifno {
    width: 240px;
    @include flex(center);
    span {
      margin-left: 20px;
    }
  }
  .way {
    width: 180px;
  }
}
</style>
