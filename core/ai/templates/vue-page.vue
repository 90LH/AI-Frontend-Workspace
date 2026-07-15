<script setup lang="ts">
/**
 * 标准 Vue3 页面模板
 * 使用方式：复制此文件，替换 PageName 和业务逻辑
 */

import { useRouter } from 'vue-router'

// --- 如需 Pinia store ---
// import { useUserStore } from '@/stores/useUserStore'
// const userStore = useUserStore()

const router = useRouter()

// --- 列表类页面标准状态 ---
// import { useEntityList } from '@/composables/useEntityList'
// const { list, total, loading, error, fetchList, setPage } = useEntityList()

// --- 表单类页面标准状态 ---
// const form = reactive({ name: '', role: '' })
// const submitting = ref(false)

// async function handleSubmit() {
//   submitting.value = true
//   try {
//     await entityApi.create(form)
//     router.back()
//   } finally {
//     submitting.value = false
//   }
// }
</script>

<template>
  <div class="page-name">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>页面标题</h2>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 内容区域 -->
    </div>
  </div>
</template>

<style scoped>
.page-name {
  padding: 24px;
}

.page-header {
  margin-bottom: 16px;
}

.page-content {
  /* 内容区域样式 */
}
</style>
