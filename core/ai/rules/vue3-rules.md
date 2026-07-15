# Vue3 开发规则

## 组件规则

### 必须使用

- `<script setup lang="ts">` 语法
- `defineProps<{}>()` 泛型形式声明 Props
- `defineEmits<{}>()` 泛型形式声明 Emits
- `defineExpose()` 仅暴露必要的公共方法

### 禁止使用

- Options API（data、methods、computed 对象形式）
- 在 `<template>` 中使用 `v-html`（除非内容经过严格消毒）
- 在子组件内部直接修改 Props
- 在 `computed` 中产生副作用

## 响应式规则

| 场景 | 正确用法 |
|------|----------|
| 基本类型 | `ref()` |
| 对象/数组 | `reactive()` 或 `ref()` |
| 派生值 | `computed()`，不产生副作用 |
| 监听变化执行逻辑 | `watch()` / `watchEffect()` |

## 生命周期规则

- 数据初始化放在 `onMounted`
- 清理副作用（定时器、事件监听）放在 `onUnmounted`
- 不在 `onUpdated` 中触发数据请求

## 组件通信规则

| 场景 | 方式 |
|------|------|
| 父 → 子 | Props |
| 子 → 父 | Emits |
| 祖先 → 后代 | provide / inject |
| 跨组件共享状态 | Pinia store |
| 页面参数传递 | Vue Router |

## 异步规则

```typescript
// 必须处理 loading 和 error 状态
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    const data = await someApi.getList()
    list.value = data.list
  } catch {
    error.value = '加载失败，请重试'
  } finally {
    loading.value = false
  }
}
```
