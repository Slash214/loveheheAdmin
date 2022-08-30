<template>
  <teleport to="#modal">
    <div v-if="isVisible">
      <el-dialog v-model="isVisible" 
      :title="title" :width="width" 
      :close-on-click-modal="false"
      :before-close="cancel">
        <slot></slot>
        <template #footer>
          <slot name="footer"></slot>
        </template>
      </el-dialog>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import useDOMCreate from '@/hooks/useDOMCreate'
useDOMCreate('modal')
const props = defineProps({
  title: {
    type: String,
    default: '弹窗标题',
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  width: {
    type: Number,
    default: '50%',
  },
})
const emits = defineEmits(['cancel'])
const cancel = () => {
  emits('cancel', '')
}
</script>

<style scoped lang="scss">
</style>