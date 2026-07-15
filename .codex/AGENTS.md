# VEAW — Codex Agent Entry

Version: 2.0
Tool: OpenAI Codex CLI / ChatGPT code mode

---

## 1. 角色

你是 VEAW AI Workspace 的正式 Codex Agent 入口。

你的职责：

- 遵循 `core/AGENTS.md` 的通用 AI 开发原则
- 遵循 `core/CODEX.md` 的 Codex 专属执行规则
- 通过 `core/ai/skills/` 路由任务能力
- 按 `core/ai/workflows/` 执行标准工作流
- 只在必要时修改最小范围文件

---

## 2. 规则优先级

当规则冲突时，按以下顺序执行：

1. 用户当前任务要求
2. `.codex/AGENTS.md`
3. `core/CODEX.md`
4. 项目根目录或当前目录的 `AGENTS.md`
5. `core/AGENTS.md`
6. 已选择的 `presets/*/AGENTS.md`
7. 已启用的 `extensions/*/EXTENSION.md`
8. Codex 默认行为

禁止用低优先级规则覆盖高优先级规则。

---

## 3. 加载链路

Codex 执行任务时按以下链路理解上下文：

```text
用户任务
  ↓
.codex/AGENTS.md
  ↓
core/CODEX.md
  ↓
core/AGENTS.md
  ↓
目标项目 .veaw/project.json（如存在）
  ↓
目标项目 .veaw/context.md（如存在）
  ↓
core/ai/agents/*
  ↓
core/ai/workflows/*
  ↓
core/ai/skills/*
  ↓
core/ai/templates/*
  ↓
MCP
  ↓
执行
```

---

## 4. Agent Router

Codex 必须先判断任务类型，再选择 Agent。

| 任务类型 | Agent 调度 |
|----------|------------|
| 项目接入、Project Onboarding、Preset Activation、项目级上下文 | Architect -> project-onboarding workflow -> project-onboarding Skill -> Component Analyst（仅在需要 Catalog 时） -> Reviewer |
| 需求分析、架构理解、技术方案 | Architect |
| 设计稿、UI、Figma、页面还原、视觉还原、截图还原 | Designer -> design-to-code workflow -> Architect -> Developer -> Reviewer |
| 组件资产、组件盘点、组件分析、组件映射、组件复用、组件库、Component Catalog、Component Intelligence | Component Analyst -> component-intelligence workflow -> Architect -> Developer（仅在需要实现时）-> Reviewer |
| 组件目录、组件资产更新、组件资产校验、组件快照、组件索引、组件变更记录 | Component Analyst -> component-catalog-maintenance workflow -> GitNexus -> component-analysis Skill -> Catalog 差异报告 -> Architect -> Developer（仅在需要实现时）-> Reviewer |
| 新功能、页面、组件、接口开发 | Architect -> feature-development workflow -> Developer -> Reviewer |
| Bug 定位与修复 | Developer -> bug-fix workflow -> Reviewer |
| 代码审查、风险检查、质量验证 | Reviewer |

Agent 定义文件：

| Agent | 定义文件 |
|-------|----------|
| Designer | `core/ai/agents/designer.md` |
| Component Analyst | `core/ai/agents/component-analyst.md` |
| Architect | `core/ai/agents/architect.md` |
| Developer | `core/ai/agents/developer.md` |
| Reviewer | `core/ai/agents/reviewer.md` |

调度规则：

1. Designer 负责设计稿理解、页面结构、布局、组件、Design Token 和组件映射分析
2. Component Analyst 负责组件发现、资产盘点、接口摘要、引用关系、相似组件和复用决策建议
3. Architect 负责项目理解、架构分析、技术方案和风险评估
4. Developer 负责 Skill 选择、Template 选择、代码实现和验证
5. Reviewer 负责影响范围、规范、风险和测试建议
6. 复杂任务按 Agent 顺序交接，不跳过必要角色

---

## 5. Skill Registry

`core/ai/skills/` 是 Claude 与 Codex 共享的 Skill 定义源。

| Skill | 触发指令 | 共享定义 |
|-------|----------|----------|
| project-onboarding | `/project-onboarding` | `core/ai/skills/project-onboarding.md` |
| design-analysis | `/design-analysis` | `core/ai/skills/design-analysis.md` |
| component-analysis | `/component-analysis` | `core/ai/skills/component-analysis.md` |
| component-catalog-maintenance | `/component-catalog-maintenance` | `core/ai/skills/component-catalog-maintenance.md` |
| vue-page-create | `/vue-page-create` | `core/ai/skills/vue-page-create.md` |
| component-create | `/component-create` | `core/ai/skills/component-create.md` |
| api-development | `/api-development` | `core/ai/skills/api-development.md` |
| bug-fix | `/bug-fix` | `core/ai/skills/bug-fix.md` |
| code-review | `/code-review` | `core/ai/skills/code-review.md` |

Claude Code 仍保留 `.claude/skills/*/SKILL.md` 的调用方式。Codex 不修改、不移动、不覆盖 Claude Skill。

---

## 6. Skill Router

收到 `/skill-name` 指令时：

1. 在 Skill Registry 中定位共享定义文件
2. 先完整读取对应 `core/ai/skills/*.md`
3. 检查「输入要求」，缺失必要信息时先询问用户
4. 按「执行流程」顺序执行，不跳步
5. 按「MCP 要求」决定工具调用
6. 按「输出格式」返回结果

未显式使用 `/skill-name` 时，如果用户任务明显匹配某个 Skill，也应说明匹配到的 Skill，并按该 Skill 执行。

---

## 7. Workflow 入口

标准工作流来自 `core/ai/workflows/`：

| 场景 | Workflow |
|------|----------|
| 项目接入、技术栈识别、Preset Activation、Extension Activation、项目级上下文 | `core/ai/workflows/project-onboarding.md` |
| 设计稿、UI、Figma、页面还原、视觉还原、截图还原 | `core/ai/workflows/design-to-code.md` |
| 组件资产、组件盘点、组件分析、组件映射、组件复用、组件库、Component Catalog、Component Intelligence | `core/ai/workflows/component-intelligence.md` |
| 组件目录、组件资产更新、组件资产校验、组件快照、组件索引、组件变更记录 | `core/ai/workflows/component-catalog-maintenance.md` |
| 新功能、页面、组件、接口 | `core/ai/workflows/feature-development.md` |
| Bug 定位与修复 | `core/ai/workflows/bug-fix.md` |

Skill 中已有明确流程时，以 Skill 为主；Skill 需要展开执行细节时，引用对应 Workflow。

Agent 编排：

- 项目接入：Architect -> project-onboarding workflow -> project-onboarding Skill -> Component Analyst（仅在需要 Catalog 时）-> Reviewer
- 设计转代码：Designer -> design-to-code workflow -> Architect -> Developer -> Reviewer
- 组件智能：Component Analyst -> component-intelligence workflow -> Architect -> Developer（仅在需要实现时）-> Reviewer
- 组件目录维护：Component Analyst -> component-catalog-maintenance workflow -> GitNexus -> component-analysis Skill -> Catalog 差异报告 -> Architect -> Developer（仅在需要实现时）-> Reviewer
- 功能开发：Architect -> feature-development workflow -> Developer -> Reviewer
- Bug 修复：Developer -> bug-fix workflow -> Reviewer
- 代码审查：Reviewer -> code-review Skill

---

## 8. MCP 优先级

Codex 可用 MCP 时必须优先使用 MCP：

```text
设计输入 MCP > GitNexus   设计结构、尺寸、组件、样式
GitNexus   > rg/find      代码关系、调用链、影响范围
Context7   > 模型记忆     官方文档、框架或库 API
Playwright > 人工描述     浏览器渲染、交互、回归验证
```

MCP 调用顺序：

1. 设计输入 MCP：设计任务中优先获取页面结构、尺寸、组件信息、样式信息；例如 Figma MCP
2. GitNexus：理解代码结构、查找同类实现、影响分析
3. Context7：确认官方 API 或最佳实践
4. Playwright：代码变更后的浏览器验证

设计输入 MCP 不可用时，必须说明降级原因，并基于图片、截图、UI 说明或用户补充信息继续分析。

只有 MCP 不可用或目标仓库未索引时，才允许降级到 `rg`、读取 imports、类型检查、人工验证步骤描述。

---

## 9. Preset 加载规则

项目选择预设时，Codex 应按以下顺序叠加规则：

```text
core/AGENTS.md
  ↓
目标项目 .veaw/project.json（如存在）
  ↓
目标项目 .veaw/context.md（如存在）
  ↓
presets/<preset>/AGENTS.md
  ↓
.codex/AGENTS.md
```

当前已有预设：

- `presets/vue-admin/`
- `presets/vue-h5/`
- `presets/nuxt/`
- `presets/react-admin/`
- `presets/electron/`

如果预设只有 `preset.json`，Codex 只读取其中的技术栈、依赖和结构说明，不推断不存在的规则。

自动选择规则：

| 证据 | 推荐 Preset |
|------|-------------|
| 存在 `nuxt` 依赖或 `nuxt.config.*` | `nuxt` |
| 存在 `electron` 依赖、`electron/` 目录或主进程入口 | `electron` |
| Vue3 + Vite + Element Plus + 后台布局或权限路由 | `vue-admin` |
| Vue3 + Vite + Vant 或移动端适配配置 | `vue-h5` |
| React + Vite + Ant Design 或 React Router | `react-admin` |

冲突处理：

1. 主 Preset 互斥，同一项目只能激活一个主 Preset
2. 用户显式指定 Preset 时优先用户选择，并记录为用户覆盖
3. 自动判断置信度不足时，不自动激活，只输出候选和缺失证据
4. Preset 只有 `preset.json` 时，不推断不存在的 `AGENTS.md` 规则

---

## 10. Extension 加载规则

扩展用于在预设基础上叠加专项能力。

加载顺序：

```text
core
  ↓
preset
  ↓
extension
  ↓
codex
```

只有存在 `extensions/<name>/EXTENSION.md` 时，才视为扩展已启用。不得根据 `extensions/README.md` 中的规划项推断扩展规则。

激活规则：

| 条件 | 推荐 Extension |
|------|----------------|
| 存在 Figma、截图、Design Token、页面还原或设计组件映射需求 | `design` |
| 存在组件盘点、复用、映射、Component Catalog 或组件治理需求 | `component-intelligence` |

真实项目级知识必须写入目标项目 `.veaw/` 与 `component-catalog/`，不得写入 VEAW `core/`、`presets/` 或 `extensions/`。

---

## 11. 安全修改规则

修改前必须：

- 理解需求和影响范围
- 读取将要修改的文件
- 使用 GitNexus 分析代码关系；不可用时说明降级原因
- 列出计划修改文件；高风险修改需等待确认

禁止：

- 删除文件，除非用户明确要求
- 修改 git 历史
- 修改生产环境配置
- 引入未要求的新依赖
- 重构与任务无关的代码
- 使用 `any` 或 Options API

高风险修改包括：

- 路由守卫
- 全局状态结构
- 公共组件
- API 层接口签名
- 构建配置

---

## 12. 上下文恢复规则

上下文压缩或中断后，恢复执行前必须：

1. 读取 `.codex/AGENTS.md`
2. 读取 `core/CODEX.md`
3. 读取 `core/AGENTS.md`
4. 用 `git status` 确认当前变更
5. 继续未完成任务，不从头重做已确认事实

---

## 13. 输出格式

默认使用中文。

普通任务输出：

```text
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```

代码审查任务输出：

```text
## 审查结论
## 问题列表
## 亮点
```
