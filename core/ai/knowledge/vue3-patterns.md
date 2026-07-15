# Vue3 Composition API 常用模式

## 列表页数据获取

```typescript
const list = ref<User[]>([])
const total = ref(0)
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchList(params?: UserListParams) {
  loading.value = true
  error.value = null
  try {
    const res = await userApi.getList(params)
    list.value = res.list
    total.value = res.total
  } catch {
    error.value = '加载失败，请重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchList())
```

## 响应式表单

```typescript
const form = reactive<CreateUserForm>({
  name: '',
  email: '',
  role: 'viewer'
})

function resetForm() {
  Object.assign(form, { name: '', email: '', role: 'viewer' })
}
```

## Composable 封装模式

```typescript
// composables/useUserList.ts
export function useUserList() {
  const list = ref<User[]>([])
  const loading = ref(false)

  async function fetchList(params?: UserListParams) {
    loading.value = true
    try {
      list.value = (await userApi.getList(params)).list
    } finally {
      loading.value = false
    }
  }

  return { list, loading, fetchList }
}
```

## Pinia Store 标准写法

```typescript
// stores/useUserStore.ts
export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)

  function setUser(user: User) {
    currentUser.value = user
  }

  function clearUser() {
    currentUser.value = null
  }

  return { currentUser, setUser, clearUser }
})
```

## 响应式数据选择原则

| 场景 | 选用 |
|------|------|
| 基本类型（string/number/boolean） | `ref()` |
| 对象/数组 | `reactive()` 或 `ref()` |
| 派生计算值 | `computed()` |
| 监听变化执行副作用 | `watch()` / `watchEffect()` |

**注意**：`reactive()` 解构会丢失响应性，需用 `toRefs()` 或保持整体引用。
