# 项目目录规范

适用于所有基于本 VEAW Workspace 的 Vue3 企业项目。

---

## 标准目录结构

```
src/
├── assets/          # 静态资源（图片、字体、全局样式）
├── components/      # 可复用组件
│   └── common/      # 跨业务通用组件
├── composables/     # 可复用 Composition 函数（useXxx）
├── layouts/         # 页面布局组件
├── router/          # 路由配置
│   └── index.ts
├── stores/          # Pinia 状态管理
│   └── modules/     # 按业务域拆分的 store
├── types/           # TypeScript 类型定义
│   ├── api.ts       # API 请求/响应类型
│   └── common.ts    # 通用业务类型
├── utils/           # 工具函数（纯函数，无副作用）
├── views/           # 路由页面
│   └── [module]/    # 按业务模块分组
│       ├── index.vue
│       └── components/  # 仅本页面使用的组件
├── api/             # API 接口层
│   └── [module].ts  # 按业务模块分文件
└── main.ts
```

---

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面文件 | PascalCase.vue | `UserList.vue` |
| 组件文件 | PascalCase.vue | `DataTable.vue` |
| Composable | useXxx.ts | `useUserList.ts` |
| Store | useXxxStore.ts | `useUserStore.ts` |
| API 文件 | camelCase.ts | `userApi.ts` |
| 类型文件 | camelCase.ts | `userTypes.ts` |
| 工具文件 | camelCase.ts | `formatDate.ts` |

---

## 文件放置决策规则

**组件放在哪里？**
- 只有一个页面用 → `views/[module]/components/`
- 多个页面用 → `components/`
- 所有业务都可能用 → `components/common/`

**类型定义放在哪里？**
- API 相关类型 → `types/api.ts` 或 `api/[module].ts` 同文件
- 业务通用类型 → `types/`
- 组件内部类型 → 组件文件内部定义

**工具函数放在哪里？**
- 有副作用、依赖响应式状态 → `composables/`
- 纯函数，无副作用 → `utils/`
