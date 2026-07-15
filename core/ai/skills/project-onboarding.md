# project-onboarding

## 目的

执行真实前端项目接入 VEAW 的标准流程，完成项目事实采集、Preset Activation、Extension Activation、项目级上下文建立，以及 Component Catalog 首次生成或维护计划。

本 Skill 只处理接入机制，不写入真实业务数据到 VEAW core。

## 使用场景

- 用户要求“接入真实项目”“Project Onboarding”“Preset Activation”
- 需要识别目标项目技术栈和目录结构
- 需要选择 Vue Admin、Vue H5、Nuxt、React Admin 或 Electron Preset
- 需要启用 Design 或 Component Intelligence Extension
- 需要为目标项目创建 `.veaw/` Profile / Context
- 需要初始化目标项目 `component-catalog/`

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 目标项目路径 | 必须 | 真实项目根目录 |
| 接入目标 | 必须 | 识别、激活、生成上下文、初始化 Catalog 或完整接入 |
| 技术栈线索 | 可选 | 用户已知框架、构建工具、UI 库 |
| 用户指定 Preset | 可选 | 用户可覆盖自动选择 |
| 用户指定 Extension | 可选 | 用户可指定启用扩展 |
| 扫描范围 | 可选 | 组件目录、页面目录、业务模块 |
| 禁止修改范围 | 可选 | 不允许写入的目录或配置 |

缺少目标项目路径时必须先询问用户；不得猜测真实项目位置。

## 执行流程

1. 读取 `.codex/AGENTS.md` 的 Skill Registry 和 Workflow 入口。
2. 读取 `core/ai/workflows/project-onboarding.md`。
3. 确认目标项目路径和用户约束。
4. 优先使用 GitNexus 检查目标项目是否已索引；未索引时说明并降级。
5. 读取目标项目 `package.json`、lockfile、构建配置、目录结构和关键入口文件。
6. 识别框架、语言、构建工具、包管理器、路由、状态管理、测试工具和 UI 组件库。
7. 根据 Preset 自动选择规则输出候选、证据、冲突和最终选择。
8. 根据 Extension 激活规则输出启用扩展。
9. 参考 `core/ai/templates/project-profile.json` 与 `core/ai/templates/project-context.md` 创建或更新目标项目 `.veaw/` 项目级上下文。
10. 若启用 Component Intelligence，读取 `extensions/component-intelligence/project-catalog-onboarding.md` 并建立或维护目标项目 `component-catalog/`。
11. 输出 Codex 与 Claude 的加载说明、MCP 状态、Catalog 状态和后续建议。

## MCP 要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 项目结构、调用关系、组件引用、影响范围 |
| Context7 | Vue、Vite、Nuxt、Pinia、Vue Router、UI 库等官方 API 确认 |
| Playwright | 代码接入后验证页面渲染和交互；纯文档接入可不使用 |

只有目标项目未索引、MCP 不可用或用户明确禁止时，才允许降级到 `rg`、配置文件读取和目录扫描。

## Preset 选择规则

- `nuxt`：存在 `nuxt` 依赖或 `nuxt.config.*`。
- `electron`：存在 `electron` 依赖、`electron/` 目录或主进程入口。
- `vue-admin`：Vue3 + Vite + Element Plus + 后台布局、权限路由或管理端结构。
- `vue-h5`：Vue3 + Vite + Vant、移动端适配或 H5 页面结构。
- `react-admin`：React + Vite + Ant Design、React Router 或管理端结构。

冲突时：

1. 主 Preset 互斥，只选择一个。
2. 用户指定优先，但必须记录覆盖原因。
3. 自动判断证据不足时，不激活，只输出候选和缺失信息。
4. Preset 只有 `preset.json` 时，不推断不存在的 `AGENTS.md` 规则。

## Extension 激活规则

- 设计输入或 Design-to-Code 需求启用 `design`。
- 组件盘点、复用、映射、Component Catalog 需求启用 `component-intelligence`。
- Extension 可叠加。
- 只有存在 `extensions/<name>/EXTENSION.md` 时才允许启用。
- 不修改 `.mcp/mcp.json`，不覆盖 `.claude/skills`。

## Template 使用规则

- 项目 Profile 参考 `core/ai/templates/project-profile.json`。
- 项目 Context 参考 `core/ai/templates/project-context.md`。
- Component Catalog 条目参考 `core/ai/templates/component-catalog.md`。
- 不把模板中的占位字段当作真实项目事实。

## 输出格式

```text
## 理解
[目标项目路径、接入目标、用户约束]

## 项目识别
[技术栈、包管理器、目录结构、UI库、路由、状态、测试]

## 激活结果
[Preset、Extension、证据、冲突处理]

## 项目级上下文
[.veaw/ 文件计划或更新结果、Codex/Claude 加载方式]

## Component Catalog
[首次生成或维护结果、验证来源、待验证项]

## 验证
[GitNexus / rg / 文件读取 / 路径一致性]

## 风险
[未索引、低置信度、Claude 兼容边界、Catalog 过期风险]
```

## 注意事项

- 不写入真实业务项目数据到 VEAW `core/`。
- 不修改 `.mcp/mcp.json`。
- 不覆盖 `.claude/skills/*/SKILL.md`。
- 不在未确认的目标项目中生成真实 `.veaw/project.json` 或 Component Catalog 数据。
- 所有项目事实必须来自目标项目真实文件或用户明确说明。
