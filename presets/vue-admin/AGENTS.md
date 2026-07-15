# Vue3 后台管理系统 — AI 补充规则

适用：在 `vue-admin` 预设项目中使用 AI 工作流时的附加规则。

主规则见：`../../core/AGENTS.md`

---

## 后台项目特有约定

### 权限控制

- 路由权限通过 `router.beforeEach` 守卫实现
- 菜单权限存储在 Pinia store 中（从登录接口获取）
- 修改路由守卫前：**必须**说明影响并等待确认

### 表格和表单

- 优先使用 Element Plus 的 `el-table` 和 `el-form`
- 表单验证使用 Element Plus 的 `rules` 属性
- 不自己实现已有的 UI 组件功能

### API 层规范

- 所有接口统一通过 `src/utils/request.ts` 的 axios 实例调用
- Token 在请求拦截器中自动添加
- 401 响应在响应拦截器中统一处理（跳转登录页）

### 页面布局

- 后台页面使用 `src/layouts/AdminLayout.vue` 作为外层布局
- 新建页面时必须注册到路由，并配置 `meta.title` 和 `meta.permissions`
