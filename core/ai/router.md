# AI Router — 唯一真源（SSOT）

> 本文件是 Agent Router、Skill Registry、Workflow 入口、Preset 加载规则、Extension 加载规则的唯一真源。
> `.codex/AGENTS.md` 和 `.claude/CLAUDE.md` 均引用本文件，只保留各自工具特有的触发语法（Codex 的 Agent 交接链、Claude 的 slash command）。
> 修改路由规则时只改本文件，不在两个入口文件中重复维护。

---

## 1. 任务类型路由表

| 任务类型 | Agent 链 | Skill | Workflow |
|----------|----------|-------|----------|
| 项目接入、Project Onboarding、Preset Activation | Architect → Component Analyst（仅需 Catalog 时）→ Reviewer | `project-onboarding` | `project-onboarding` |
| 设计稿、UI、Figma、页面还原、Design-to-Code | Designer → Architect → Developer → Reviewer | `design-analysis` | `design-to-code` |
| 组件资产、组件盘点、组件分析、组件映射、组件复用、Component Intelligence | Component Analyst → Architect → Developer（仅需实现时）→ Reviewer | `component-analysis` | `component-intelligence` |
| 组件目录、Catalog 更新、组件资产校验、组件快照 | Component Analyst → Architect → Developer（仅需实现时）→ Reviewer | `component-catalog-maintenance` | `component-catalog-maintenance` |
| 新功能、页面、组件、接口开发 | Architect → Developer → Reviewer | `vue-page-create` / `component-create` / `api-development` | `feature-development` |
| Bug 定位与修复 | Developer → Reviewer | `bug-fix` | `bug-fix` |
| 代码审查、风险检查、质量验证 | Reviewer | `code-review` | — |

调度规则：

1. Designer 负责设计稿理解、页面结构、布局、组件、Design Token 和组件映射分析
2. Component Analyst 负责组件发现、资产盘点、接口摘要、引用关系、相似组件和复用决策建议
3. Architect 负责项目理解、架构分析、技术方案和风险评估
4. Developer 负责 Skill 选择、Template 选择、代码实现和验证
5. Reviewer 负责影响范围、规范、风险和测试建议
6. 复杂任务按 Agent 顺序交接，不跳过必要角色

Agent 定义文件：

| Agent | 定义文件 |
|-------|----------|
| Designer | `core/ai/agents/designer.md` |
| Component Analyst | `core/ai/agents/component-analyst.md` |
| Architect | `core/ai/agents/architect.md` |
| Developer | `core/ai/agents/developer.md` |
| Reviewer | `core/ai/agents/reviewer.md` |

---

## 2. Skill Registry

`core/ai/skills/` 是 Claude 与 Codex 共享的 Skill 定义源，两侧均不重复维护完整逻辑。

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

---

## 3. Workflow 入口

| Workflow | 入口文件 | 触发场景 |
|----------|----------|----------|
| feature-development | `core/ai/workflows/feature-development.md` | 新功能需求 |
| bug-fix | `core/ai/workflows/bug-fix.md` | Bug 定位与修复 |
| design-to-code | `core/ai/workflows/design-to-code.md` | 设计稿转代码 |
| component-intelligence | `core/ai/workflows/component-intelligence.md` | 组件资产分析与复用 |
| component-catalog-maintenance | `core/ai/workflows/component-catalog-maintenance.md` | Catalog 维护与校验 |
| project-onboarding | `core/ai/workflows/project-onboarding.md` | 真实项目接入 VEAW |

Skill 中已有明确流程时，以 Skill 为主；Skill 需要展开执行细节时，引用对应 Workflow。

---

## 4. Preset 加载规则

执行任务前，检查目标项目是否已激活 Preset：

1. 读取目标项目 `.veaw/project.json` 中 `preset` 字段
2. 按激活的 Preset 名称读取对应规则：`presets/<name>/preset.json`
3. 若该 Preset 存在 `AGENTS.md`（`presets/<name>/AGENTS.md`），一并加载作为补充规则
4. 若 Preset 仅有 `preset.json`（无 `AGENTS.md`），只加载 `preset.json` 声明的技术栈规则，不推断不存在的规则

| Preset | 说明 | AGENTS.md |
|--------|------|-----------|
| vue-admin | Vue3 后台管理系统 | ✓ `presets/vue-admin/AGENTS.md` |
| vue-h5 | Vue3 移动端 H5 | ✓ `presets/vue-h5/AGENTS.md` |
| nuxt | Nuxt3 全栈应用 | ✗ 仅 preset.json |
| react-admin | React 管理系统 | ✗ 仅 preset.json |
| electron | Electron 桌面应用 | ✗ 仅 preset.json |

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
2. `nuxt` 与普通 `vue-admin`、`vue-h5` 冲突时，优先 `nuxt`，除非用户明确覆盖
3. 用户显式指定 Preset 时优先用户选择，并记录为覆盖原因
4. 自动判断置信度不足时，不自动激活，只输出候选和缺失信息
5. Preset 只有 `preset.json` 时，不推断不存在的 `AGENTS.md` 规则

---

## 5. Extension 加载规则

Extension 由 `project-onboarding` 激活后写入目标项目 `.veaw/project.json` 的 `extensions` 字段。

加载顺序：core → preset → extension → 工具入口（Codex / Claude）

规则：

1. 读取 `.veaw/project.json` 中 `extensions` 数组
2. 对每个已激活 Extension，读取 `extensions/<name>/EXTENSION.md`
3. 只有存在 `extensions/<name>/EXTENSION.md` 时才视为扩展已启用，不根据 `extensions/README.md` 中的规划项推断规则
4. Extension 可叠加，可同时启用多个

激活规则：

| Extension | 定义文件 | 启用条件 |
|-----------|----------|----------|
| component-intelligence | `extensions/component-intelligence/EXTENSION.md` | 组件盘点、复用分析、组件映射、Component Catalog |
| design | `extensions/design/EXTENSION.md` | Figma、截图、Design Token、页面还原、设计组件映射 |

> Figma MCP 当前未在 `.mcp/mcp.json` 中配置。`design` Extension 激活后，设计输入须通过截图、用户描述或本地设计文件提供。

真实项目级知识必须写入目标项目 `.veaw/` 与 `component-catalog/`，不得写入 VEAW `core/`、`presets/` 或 `extensions/`。

---

## 6. .veaw/ 上下文加载

目标项目根目录下的 `.veaw/` 为项目级知识层，由 `project-onboarding` 在目标项目中生成。

加载顺序：`.veaw/project.json`（技术栈、Preset、Extension、Catalog 路径）→ `.veaw/context.md`（项目级 AI 上下文补充）

规则：

- `.veaw/` 属于目标项目目录，不属于 VEAW 本身
- 不在 VEAW 仓库中创建 `.veaw/project.json`
- 无 `.veaw/` 时，降级到读取目标项目 `package.json` 和目录结构推断

---

## 7. Component Catalog 接入

Component Catalog 位于目标项目的 `component-catalog/` 目录下，由 `project-onboarding` 初始化。

使用规则：

- 组件分析任务前，优先读取 `component-catalog/index.md` 了解已有资产
- `component-catalog-maintenance` 负责更新 Catalog，不手动覆盖索引
- VEAW 自身的 `component-catalog/` 为 workspace 配置仓库的示例，不含真实业务组件数据
