<script setup lang="ts">
/**
 * 标准 Vue3 组件模板
 * 使用方式：复制此文件，替换 ComponentName 和业务逻辑
 */

interface Props {
  // 在此定义 Props 类型
  title: string
  loading?: boolean
}

interface Emits {
  // 在此定义 Emits 类型
  (e: 'confirm', value: string): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// --- 响应式状态 ---
// const localState = ref('')

// --- 计算属性 ---
// const derivedValue = computed(() => ...)

// --- 方法 ---
// function handleConfirm() {
//   emit('confirm', localState.value)
// }

// --- 生命周期 ---
// onMounted(() => { ... })
// onUnmounted(() => { ... })

// --- 暴露（仅暴露必要方法）---
// defineExpose({ refresh })
</script>

<template>
  <div class="component-name">
    <!-- 模板内容 -->
    <slot />
  </div>
</template>

<style scoped>
.component-name {
  /* 组件样式 */
}
</style>
