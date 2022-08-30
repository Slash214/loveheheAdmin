<template>
  <div class="load">
    <div class="loadingio-spinner-bean-eater-7s8klzybvb8">
      <div class="ldio-t2vulug8wk">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
	<p>正在上传中...</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.load {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999999;
}


@keyframes ldio-t2vulug8wk-1 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes ldio-t2vulug8wk-2 {
  0% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(225deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.ldio-t2vulug8wk > div:nth-child(2) {
  transform: translate(-15px, 0);
}
.ldio-t2vulug8wk > div:nth-child(2) div {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 120px;
  height: 60px;
  border-radius: 120px 120px 0 0;
  background: #f8b26a;
  animation: ldio-t2vulug8wk-1 1s linear infinite;
  transform-origin: 60px 60px;
}
.ldio-t2vulug8wk > div:nth-child(2) div:nth-child(2) {
  animation: ldio-t2vulug8wk-2 1s linear infinite;
}
.ldio-t2vulug8wk > div:nth-child(2) div:nth-child(3) {
  transform: rotate(-90deg);
  animation: none;
}
@keyframes ldio-t2vulug8wk-3 {
  0% {
    transform: translate(190px, 0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(70px, 0);
    opacity: 1;
  }
}
.ldio-t2vulug8wk > div:nth-child(1) {
  display: block;
}
.ldio-t2vulug8wk > div:nth-child(1) div {
  position: absolute;
  top: 92px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e15b64;
  animation: ldio-t2vulug8wk-3 1s linear infinite;
}
.ldio-t2vulug8wk > div:nth-child(1) div:nth-child(1) {
  animation-delay: -0.67s;
}
.ldio-t2vulug8wk > div:nth-child(1) div:nth-child(2) {
  animation-delay: -0.33s;
}
.ldio-t2vulug8wk > div:nth-child(1) div:nth-child(3) {
  animation-delay: 0s;
}
.loadingio-spinner-bean-eater-7s8klzybvb8 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-t2vulug8wk {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-t2vulug8wk div {
  box-sizing: content-box;
}
</style>
