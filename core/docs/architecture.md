# 架构规范

适用于所有基于本 VEAW Workspace 的 Vue3 企业项目。

---

## 核心架构原则

### 分层职责

```
视图层 (views/)
    ↓ 调用
状态层 (stores/)   ←→   接口层 (api/)
    ↓ 读写               ↓ 发送请求
业务逻辑层 (composables/)
    ↓ 使用
工具层 (utils/)
```

**每层只向下依赖，不反向依赖。**

---

## 各层职责边界

### 视图层 `views/`

- 负责：渲染 UI，处理用户交互，调用 composables
- 不做：直接调用 API，包含复杂业务逻辑，直接操作 store

### 状态层 `stores/`

- 负责：跨组件共享状态，全局数据缓存
- 不做：UI 逻辑，直接操作 DOM
- 规则：按业务域拆分 store，不建单一全局 store

### 接口层 `api/`

- 负责：定义 API 函数，声明请求/响应类型
- 不做：业务逻辑处理，状态管理，错误提示
- 规则：使用项目统一的 HTTP 实例，不直接引入 axios

### 业务逻辑层 `composables/`

- 负责：封装可复用的有状态业务逻辑
- 不做：渲染模板，直接触发路由跳转
- 规则：函数名以 `use` 开头，返回响应式数据

### 工具层 `utils/`

- 负责：纯函数工具，无状态，无副作用
- 不做：引入响应式 API，调用 store 或 API

---

## 组件设计原则

### 单一职责

每个组件只解决一个问题。超过300行的组件通常是需要拆分的信号。

### Props 设计

- Props 向下传递，Events 向上传递
- 不通过 Props 传递可变对象后在子组件内修改
- 复杂对象使用 TypeScript interface 定义

### 跨层通信

| 场景 | 方案 |
|------|------|
| 父 → 子 | Props |
| 子 → 父 | Emits |
| 祖先 → 后代 | provide/inject |
| 非父子关系 | Pinia store |
| 路由参数 | useRoute |

---

## 路由规范

- 按业务模块分组路由
- 使用懒加载：`component: () => import('./views/UserList.vue')`
- 路由 meta 定义页面权限信息
- 不在路由守卫中处理业务逻辑

---

## 禁止的架构模式

- 视图层直接调用 `fetch` / `axios`
- Store 中包含 UI 状态（loading、弹窗显示等应在组件本地管理）
- 循环依赖（A import B，B import A）
- 跨模块直接引用 `views/` 内的子组件
