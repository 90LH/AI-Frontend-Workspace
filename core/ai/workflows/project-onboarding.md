# Project Onboarding 工作流

## 目的

定义 VEAW 接入真实前端项目的标准流程，让 Agent 能识别目标项目结构、选择合适 Preset、激活 Extension、加载项目级上下文，并建立或维护目标项目的 Component Catalog。

本工作流只定义通用机制，不保存真实业务项目配置、组件清单或业务知识。

## 使用场景

- 首次将 VEAW 接入真实 Vue3、Nuxt、Electron 或 React 项目
- 需要为目标项目选择或确认 Preset
- 需要启用 Design、Component Intelligence 等 Extension
- 需要创建或更新目标项目 `.veaw/` 项目级上下文
- 需要在真实项目中首次生成 `.veaw/component-catalog/`

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
首次生成或维护 .veaw/component-catalog/
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
7. 如启用 Component Intelligence，按 `extensions/component-intelligence/project-catalog-onboarding.md` 在目标项目维护 `.veaw/component-catalog/`。
8. 输出 Codex、Claude、MCP、Preset、Extension、Catalog 的接入状态。

## Preset 自动选择规则与 Extension 激活规则

唯一真源是 [`core/ai/router.md`](../router.md) Section 4-5。

## 项目级上下文加载

Codex 加载链路见 `core/CODEX.md` Section 2；Claude Code 加载顺序见 `.claude/CLAUDE.md` Section 1。两侧均在 core 通用规则之后加载目标项目 `.veaw/project.json` 和 `.veaw/context.md`，再进入 preset / extension / agent / workflow / skill / template / MCP。

Claude Code 已具备 `.claude/skills/project-onboarding/SKILL.md` 入口，不再依赖 Codex 专属路径。

## MCP 要求

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。不得修改 `.mcp/mcp.json`。

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
- 真实项目级知识写入目标项目 `.veaw/`（含 `.veaw/component-catalog/`）。
- Component Catalog 是源码索引与摘要，不替代源码事实。
