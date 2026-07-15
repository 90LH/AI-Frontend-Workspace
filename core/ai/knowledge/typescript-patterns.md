# TypeScript 常用模式

## API 类型定义

```typescript
// 请求参数接口
interface GetUserListParams {
  page: number
  pageSize: number
  keyword?: string
  role?: UserRole
}

// 响应数据接口
interface GetUserListResponse {
  list: User[]
  total: number
  page: number
  pageSize: number
}

// 业务实体
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
}
```

## 组件 Props 类型定义

```typescript
// 使用泛型语法，不使用运行时校验
interface Props {
  userId: number
  readonly?: boolean
  onSuccess?: (user: User) => void
}

const props = defineProps<Props>()
```

## 类型守卫

```typescript
// 处理不确定类型的外部数据
function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'message' in value
  )
}

try {
  await someApi.call()
} catch (e) {
  if (isApiError(e)) {
    toast.error(e.message)
  }
}
```

## 常见错误写法 vs 正确写法

```typescript
// 错误
const data: any = await api.get('/users')
const user = data.user as User

// 正确
const response: GetUserResponse = await userApi.getById(id)
const user = response.user
```

## 枚举定义

```typescript
// 推荐：as const 对象（更灵活）
const USER_ROLE = {
  Admin: 'admin',
  Editor: 'editor',
  Viewer: 'viewer'
} as const

type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]
// 结果：type UserRole = 'admin' | 'editor' | 'viewer'
```
