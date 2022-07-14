<template>
	<div class="main">
       首页开发中...
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.main {
	background-color: $white;
	margin: 20px;
	min-height: 50vh;
	box-sizing: border-box;
	@include flex(center, center, column);
	@include font($font40, #333, 500, 1.5);
}
</style>