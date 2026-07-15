# Project Onboarding 工作流

## 目的

定义 VEAW 接入真实前端项目的标准流程，让 Agent 能识别目标项目结构、选择合适 Preset、激活 Extension、加载项目级上下文，并建立或维护目标项目的 Component Catalog。

本工作流只定义通用机制，不保存真实业务项目配置、组件清单或业务知识。

## 使用场景

- 首次将 VEAW 接入真实 Vue3、Nuxt、Electron 或 React 项目
- 需要为目标项目选择或确认 Preset
- 需要启用 Design、Component Intelligence 等 Extension
- 需要创建或更新目标项目 `.veaw/` 项目级上下文
- 需要在真实项目中首次生成 `component-catalog/`

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 目标项目路径 | 必须 | 真实前端项目根目录 |
| 技术栈线索 | 可选 | Vue3、Nuxt、Electron、React、TypeScript、Vite 等 |
| 包管理器 | 可选 | pnpm、npm、yarn、bun；优先由 lockfile 判断 |
| UI 组件库 | 可选 | Element Plus、Vant、Ant Design Vue、自研组件库等 |
| 目录结构 | 可选 | `src/`、`components/`、`views/`、`router/`、`stores/`、`api/` |
| 设计输入 | 可选 | Figma、截图、Design Token、组件映射表 |
| 测试工具 | 可选 | Vitest、Jest、Cypress、Playwright 等 |
| 用户覆盖规则 | 可选 | 用户指定 Preset、Extension 或禁止扫描范围 |

## 工作流程

```text
目标项目路径
  ↓
项目事实采集
  ↓
技术栈和目录结构识别
  ↓
Preset 自动选择或用户确认
  ↓
Extension 激活
  ↓
MCP 可用性检查
  ↓
创建或更新项目级 .veaw/
  ↓
首次生成或维护 component-catalog/
  ↓
输出接入报告和后续任务
```

执行步骤：

1. 确认目标项目路径存在且是用户指定的真实项目。
2. 优先使用 GitNexus 分析目标项目；未索引时说明原因，并降级使用 `rg --files`、`package.json`、配置文件和目录扫描。
3. 读取 `package.json`、lockfile、构建配置、入口文件、路由、状态管理、组件目录和测试配置。
4. 根据项目事实选择 Preset，并记录选择证据和置信度。
5. 按 Extension 激活规则选择 `design`、`component-intelligence` 等扩展。
6. 创建或更新目标项目 `.veaw/project.json` 与 `.veaw/context.md`，内容参考 `core/ai/templates/project-profile.json` 与 `core/ai/templates/project-context.md`。
7. 如启用 Component Intelligence，按 `extensions/component-intelligence/project-catalog-onboarding.md` 在目标项目维护 `component-catalog/`。
8. 输出 Codex、Claude、MCP、Preset、Extension、Catalog 的接入状态。

## Preset 自动选择规则

| 证据 | 推荐 Preset |
|------|-------------|
| 存在 `nuxt` 依赖或 `nuxt.config.*` | `nuxt` |
| 存在 `electron` 依赖、`electron/` 目录或主进程入口 | `electron` |
| Vue3 + Vite + Element Plus + 后台布局或权限路由 | `vue-admin` |
| Vue3 + Vite + Vant 或移动端适配配置 | `vue-h5` |
| React + Vite + Ant Design 或 React Router | `react-admin` |

冲突处理：

1. 主 Preset 互斥，同一项目只能激活一个主 Preset。
2. `nuxt` 与普通 `vue-admin`、`vue-h5` 冲突时，优先 `nuxt`，除非用户明确覆盖。
3. `electron` 项目中渲染进程仍可记录 Vue3 约束，但主 Preset 选择 `electron`。
4. 用户显式指定 Preset 时优先用户选择，并记录为 `selectionReason: "userOverride"`。
5. 自动判断置信度不足时，不自动激活，只输出候选和缺失信息。

## Extension 激活规则

| 条件 | 推荐 Extension |
|------|----------------|
| 有 Figma、截图、Design Token、页面还原或设计组件映射需求 | `design` |
| 需要组件盘点、复用分析、组件映射或 Component Catalog | `component-intelligence` |

规则：

- Extension 是叠加能力，可同时启用多个。
- 只有存在 `extensions/<name>/EXTENSION.md` 时才允许激活。
- 不根据 `extensions/README.md` 中的规划项推断规则。
- Extension 不保存真实项目数据，只保存团队级可复用规则。

## 项目级上下文加载

Codex 推荐加载顺序：

```text
.codex/AGENTS.md
  ↓
core/CODEX.md
  ↓
core/AGENTS.md
  ↓
目标项目 .veaw/project.json
  ↓
目标项目 .veaw/context.md
  ↓
preset
  ↓
extension
  ↓
agent / workflow / skill / template
  ↓
MCP
```

Claude Code 推荐加载方式：

```text
.claude/CLAUDE.md
  ↓
core/AGENTS.md
  ↓
目标项目 .veaw/project.json
  ↓
目标项目 .veaw/context.md
  ↓
.claude/skills/*
  ↓
MCP
```

Claude Code 兼容边界：

- 不覆盖 `.claude/skills/*/SKILL.md`。
- 新 Skill 若需要 Claude 自动识别，应另行新增 Claude 专用 Skill 并在 `.claude/CLAUDE.md` 注册。
- 在未新增 Claude 专用 Skill 前，Claude 可按 `.veaw/context.md` 和 core 通用文档读取项目上下文。

## MCP 要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 项目结构、依赖关系、组件引用、影响范围分析 |
| Context7 | 框架、UI 库、构建工具或测试工具官方 API 确认 |
| Playwright | 接入后执行真实页面验证或交互回归 |

不得修改 `.mcp/mcp.json`。目标项目未被 GitNexus 索引时，必须说明降级原因并使用 `rg`、配置文件和只读文件读取。

## 输出格式

```text
## 理解
[目标项目路径、技术栈线索、用户约束]

## 项目识别
[框架、语言、构建工具、包管理器、目录结构、UI库]

## Preset 与 Extension
[选择结果、证据、置信度、冲突处理]

## 项目级上下文
[.veaw/project.json、.veaw/context.md、Codex/Claude 加载说明]

## Component Catalog
[首次生成或维护计划、验证来源、降级说明]

## 风险
[MCP 未索引、目录不标准、Preset 冲突、Claude Skill 未桥接、待验证字段]
```

## 注意事项

- 不把目标项目真实配置、组件数据或业务知识写入 `core/`。
- `core/` 只保存通用机制、规则和模板。
- `presets/` 只保存预设规则。
- `extensions/` 只保存可叠加扩展规则。
- 真实项目级知识写入目标项目 `.veaw/` 与 `component-catalog/`。
- Component Catalog 是源码索引与摘要，不替代源码事实。
