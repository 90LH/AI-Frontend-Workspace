# 编码规范

适用于所有基于本 VEAW Workspace 的 Vue3 TypeScript 项目。

---

## Vue3 组件规范

### 必须使用

```vue
<script setup lang="ts">
// Composition API + script setup
</script>
```

### Props 定义

```typescript
// 使用泛型语法，不使用 defineProps({})
const props = defineProps<{
  title: string
  count?: number
  items: UserItem[]
}>()
```

### Emits 定义

```typescript
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'confirm', id: number): void
}>()
```

### 暴露方法

```typescript
// 只暴露必要的公共方法
defineExpose({ refresh, reset })
```

---

## TypeScript 规范

### 禁止

```typescript
// 禁止
const data: any = {}
const result = someFunc() as any

// 禁止（用 unknown 替代）
function process(input: any) {}
```

### 要求

```typescript
// API 响应必须有类型
interface UserListResponse {
  list: User[]
  total: number
}

// 函数参数和返回值必须有类型
function formatUser(user: User): string {}
```

---

## 响应式数据规范

| 场景 | 使用 |
|------|------|
| 基本类型（string, number, boolean） | `ref()` |
| 对象/数组 | `reactive()` 或 `ref()` |
| 计算派生值 | `computed()` |
| 监听变化执行副作用 | `watch()` / `watchEffect()` |

```typescript
// ref — 基本类型
const count = ref(0)
const name = ref('')

// reactive — 复杂对象
const form = reactive({ name: '', age: 0 })

// computed — 派生值，不产生副作用
const fullName = computed(() => `${form.firstName} ${form.lastName}`)
```

---

## 异步处理规范

```typescript
// 必须处理 loading 和 error 状态
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    const data = await userApi.getList(params)
    list.value = data.list
  } catch (e) {
    error.value = '加载失败'
  } finally {
    loading.value = false
  }
}
```

---

## 禁止项

- `Options API`（data、methods、computed 对象形式）
- `any` 类型（包括隐式 any）
- 在 `computed` 内产生副作用
- 在 API 层做业务逻辑处理
- 硬编码 API 地址
- 直接操作 DOM（使用 `ref` + 模板引用代替）
