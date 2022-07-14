<template>
  <div class="tags-view-item" :class="active ? 'active' : ''">
    <router-link tag="a" :to="list.path"> {{ list.meta.title }} </router-link>
    <!-- <el-icon @click.stop="reload" v-if="active"><refresh-right /></el-icon> -->
    <el-icon @click.stop="closeTab" v-if="!list.meta.hideClose" alt="删除标签"><close /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { RefreshRight, Close } from "@element-plus/icons-vue"
import { onMounted } from "vue";

const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["reload", "close"])

onMounted(() => {
  console.error('直接拉满', props.active)
})

const reload = () => {
  emits("reload")
}

const closeTab = () => {
  emits("close")
}
</script>

<style scoped lang="scss">
.tags-view-item {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid var(--system-header-border-color);
  color: var(--system-header-text-color);
  background: var(--system-header-tab-background);
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  border-radius: 2px;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background-color: #000;
    background: var(--system-primary-color);
    color: var(--system-primary-text-color);
    a {
      color: var(--system-primary-text-color);
    }
    &:hover {
      background: var(--system-primary-color);
    }
  }
  &:hover {
    background-color: var(--system-header-item-hover-color);
  }
}
.active {
  background: var(--system-primary-color);
  color: var(--system-primary-text-color);
}
</style>
