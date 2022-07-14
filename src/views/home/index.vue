<template>
  <div class="card">
    <el-avatar src="https://p6-passport.byteacctimg.com/img/user-avatar/e81bc5d0ad2e25c80e4891878610afc6~300x300.image" :size="60">
    </el-avatar>
    <div class="info">
      <p>Hello 爱呵呵</p>
      <p>今天又是快乐的一天哦</p>
    </div>
  </div>
  <div class="main">首页开发中...</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  background-color: $white;
  min-height: 50vh;
  @include flex(center, center, column);
  @include font($font40, #333, 500, 1.5);
}

.card {
  border: 1px solid $line;
  background-color: $white;
  border-radius: $br_s;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  @include flex(center);
  .info {
	margin-left: 20px;
	p {
	  @include font($font16, #333, 500, 1.5);
	  
	  &:last-child {
		padding-top: .625rem;
		@include font($font14, #999, 450, 1.5);
	  }
	}
  }
}
</style>
