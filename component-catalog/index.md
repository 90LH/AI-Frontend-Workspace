# Component Catalog

## 目的

沉淀当前项目可持续维护、可检索、可验证的组件资产目录。

本目录是项目级组件资产索引，只记录当前项目中已验证或待验证的真实组件资产；不替代源码事实。

## 使用场景

- Agent 开发前查找可复用组件
- Component Analyst 进行组件资产盘点
- Designer 将设计组件映射到代码组件
- Architect 评估组件复用与架构边界
- Reviewer 校验组件影响范围与 Catalog 一致性

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 组件扫描范围 | 必须 | 当前首次扫描范围为项目根目录 |
| 验证方式 | 必须 | GitNexus 或降级扫描 |
| 组件条目 | 可选 | 已验证组件记录 |

## 工作流程

1. 优先使用 GitNexus 校验组件资产
2. GitNexus 未索引当前仓库时，降级使用 `rg --files`、`.vue` 文件扫描和目录扫描
3. 按 `core/docs/directory.md` 分类组件
4. 已验证组件写入 `component-catalog/components/`
5. 页面私有组件可按模块汇总
6. 每次维护更新 snapshot、lastVerified 和 `component-catalog/CHANGELOG.md`

## MCP要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 校验组件路径、引用关系、影响范围和相似组件 |
| Context7 | 第三方组件库或框架 API 不确定时 |
| Playwright | 实际页面实现后验证组件渲染和交互 |

本次首次盘点中，GitNexus 未索引当前仓库，已降级使用 `rg` 和只读目录扫描。

## 输出格式

### 首次盘点统计

| 项目 | 数量 | 说明 |
|------|------|------|
| `src/` 目录 | 0 | 当前仓库未发现 `src/` 目录 |
| 真实组件目录 | 0 | 未发现 `src/components` 或 `views/*/components` |
| 真实项目 Vue 组件 | 0 | 未发现业务源码组件 |
| 模板 Vue 文件 | 2 | `core/ai/templates/vue-page.vue`、`core/ai/templates/vue-component.vue`，不作为项目组件资产建档 |
| 独立组件条目 | 0 | 无已验证真实组件 |

### 分类入口

- 通用组件：暂无已验证条目
- 业务组件：暂无已验证条目
- 页面私有组件：暂无已验证条目
- 第三方封装组件：暂无已验证条目

### 当前状态

- 状态：active
- lastVerified：2026-07-15
- 验证来源：GitNexus 不可用；`rg --files`、`.vue` 文件扫描、目录扫描
- 最近快照：`component-catalog/snapshots/2026-07-15-initial-scan.md`

## 注意事项

- 当前项目是 AI Workspace 配置仓库，未发现真实业务组件目录
- `core/ai/templates/*.vue` 是模板，不纳入项目组件资产
- 后续接入真实 Vue 项目后，应重新运行组件资产盘点
- Catalog 字段不确定时必须标记“待验证”
