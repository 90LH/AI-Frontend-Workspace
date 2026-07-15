# TypeScript 使用规则

## 类型定义规则

### 必须定义类型的场景

- 所有 API 请求参数和响应数据
- 所有组件 Props 和 Emits
- 所有函数的参数和返回值（推断不出时）
- 所有 Pinia store 中的状态

### 类型命名规范

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| API 请求参数 | `XxxParams` | `GetUserListParams` |
| API 响应数据 | `XxxResponse` | `GetUserListResponse` |
| 业务实体 | 名词 | `User`, `Order` |
| 组件 Props | `XxxProps` 或 inline | `TableProps` |
| 枚举值 | PascalCase | `UserRole` |

## 禁止事项

```typescript
// 禁止：any 类型
const data: any = {}
function process(input: any) {}
const result = api.call() as any

// 禁止：隐式 any（未声明参数类型）
function handler(event) {}  // event 隐式 any

// 禁止：类型断言绕过检查
const user = unknownData as User  // 无验证的断言
```

## 正确做法

```typescript
// 定义明确的接口
interface GetUserListParams {
  page: number
  pageSize: number
  keyword?: string
  role?: UserRole
}

// 使用 unknown 代替 any 处理外部数据
function processApiResponse(response: unknown): User {
  if (!isUser(response)) throw new Error('Invalid response')
  return response
}

// 类型守卫
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}
```

## 枚举规则

```typescript
// 使用 const enum（编译后零运行时开销）
const enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer'
}

// 或使用 as const 对象（更灵活）
const USER_ROLE = {
  Admin: 'admin',
  Editor: 'editor',
  Viewer: 'viewer'
} as const

type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]
```
