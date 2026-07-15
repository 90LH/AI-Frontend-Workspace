# CLAUDE.md — VEAW Claude Code Rules

> Claude Code 项目入口规则文件。
> 本文件由 Claude Code 自动加载，规定 AI 在本项目中的行为边界。

---

## 1. 核心规范

所有行为遵循 [`core/AGENTS.md`](../core/AGENTS.md)。

优先级：本文件 > AGENTS.md > Claude 默认行为

---

## 2. Skills 注册

本项目启用以下 Skills。收到对应触发指令时，按 Skill 定义的步骤执行。

| Skill | 触发指令 | 定义文件 |
|-------|----------|----------|
| vue-page-create | `/vue-page-create` | [skills/vue-page-create/SKILL.md](skills/vue-page-create/SKILL.md) |
| component-create | `/component-create` | [skills/component-create/SKILL.md](skills/component-create/SKILL.md) |
| api-development | `/api-development` | [skills/api-development/SKILL.md](skills/api-development/SKILL.md) |
| bug-fix | `/bug-fix` | [skills/bug-fix/SKILL.md](skills/bug-fix/SKILL.md) |
| code-review | `/code-review` | [skills/code-review/SKILL.md](skills/code-review/SKILL.md) |
| design-analysis | `/design-analysis` | [skills/design-analysis/SKILL.md](skills/design-analysis/SKILL.md) |
| component-analysis | `/component-analysis` | [skills/component-analysis/SKILL.md](skills/component-analysis/SKILL.md) |
| component-catalog-maintenance | `/component-catalog-maintenance` | [skills/component-catalog-maintenance/SKILL.md](skills/component-catalog-maintenance/SKILL.md) |
| project-onboarding | `/project-onboarding` | [skills/project-onboarding/SKILL.md](skills/project-onboarding/SKILL.md) |

### Skill 调用规则

- 收到 `/skill-name` 指令后，**必须先读取对应 SKILL.md**，再开始执行
- 按 SKILL.md 中「输入要求」检查用户是否提供了必要信息，缺失时主动询问
- 按 SKILL.md 中「执行步骤」顺序执行，不跳过步骤
- 按 SKILL.md 中「输出格式」输出结果
- `.claude/skills/*/SKILL.md` 为 Claude Code 入口；完整执行逻辑定义于 `core/ai/skills/*.md`

---

## 3. Agent Router

收到任务请求时，按以下规则路由至对应 Agent 和 Workflow：

| 任务类型 | 路由链 |
|----------|--------|
| 设计稿分析 / Design-to-Code | Designer → `/design-analysis` → `design-to-code` Workflow → Architect → Developer → Reviewer |
| 组件资产分析 / 组件复用 | Component Analyst → `/component-analysis` → `component-intelligence` Workflow |
| 组件目录维护 / Catalog 更新 | Component Analyst → `/component-catalog-maintenance` → `component-catalog-maintenance` Workflow |
| 项目接入 / Preset Activation | `/project-onboarding` → `project-onboarding` Workflow |
| 新功能开发 | Architect → `feature-development` Workflow → Developer → Reviewer |
| Bug 修复 | Developer → `/bug-fix` → `bug-fix` Workflow → Reviewer |
| Code Review | Reviewer → `/code-review` |

### Agent 定义

| Agent | 定义文件 |
|-------|----------|
| Designer | [core/ai/agents/designer.md](../core/ai/agents/designer.md) |
| Component Analyst | [core/ai/agents/component-analyst.md](../core/ai/agents/component-analyst.md) |
| Architect | [core/ai/agents/architect.md](../core/ai/agents/architect.md) |
| Developer | [core/ai/agents/developer.md](../core/ai/agents/developer.md) |
| Reviewer | [core/ai/agents/reviewer.md](../core/ai/agents/reviewer.md) |

---

## 4. Workflow 入口

| Workflow | 入口文件 | 触发场景 |
|----------|----------|----------|
| feature-development | [core/ai/workflows/feature-development.md](../core/ai/workflows/feature-development.md) | 新功能需求 |
| bug-fix | [core/ai/workflows/bug-fix.md](../core/ai/workflows/bug-fix.md) | Bug 定位与修复 |
| design-to-code | [core/ai/workflows/design-to-code.md](../core/ai/workflows/design-to-code.md) | 设计稿转代码 |
| component-intelligence | [core/ai/workflows/component-intelligence.md](../core/ai/workflows/component-intelligence.md) | 组件资产分析与复用 |
| component-catalog-maintenance | [core/ai/workflows/component-catalog-maintenance.md](../core/ai/workflows/component-catalog-maintenance.md) | Catalog 维护与校验 |
| project-onboarding | [core/ai/workflows/project-onboarding.md](../core/ai/workflows/project-onboarding.md) | 真实项目接入 VEAW |

---

## 5. Preset 加载规则

执行任务前，检查目标项目是否已激活 Preset：

1. 读取目标项目 `.veaw/project.json` 中 `preset` 字段
2. 按激活的 Preset 名称读取对应规则：`presets/<name>/preset.json`
3. 若该 Preset 存在 `AGENTS.md`（`presets/<name>/AGENTS.md`），一并加载作为补充规则
4. 若 Preset 仅有 `preset.json`（无 `AGENTS.md`），只加载 `preset.json` 声明的技术栈规则，不推断不存在的规则

| Preset | 说明 | AGENTS.md |
|--------|------|-----------|
| vue-admin | Vue3 后台管理系统 | ✓ [presets/vue-admin/AGENTS.md](../presets/vue-admin/AGENTS.md) |
| vue-h5 | Vue3 移动端 H5 | ✓ [presets/vue-h5/AGENTS.md](../presets/vue-h5/AGENTS.md) |
| nuxt | Nuxt3 全栈应用 | ✗ 仅 preset.json |
| react-admin | React 管理系统 | ✗ 仅 preset.json |
| electron | Electron 桌面应用 | ✗ 仅 preset.json |

---

## 6. Extension 加载规则

Extension 由 `/project-onboarding` 激活后写入目标项目 `.veaw/project.json` 的 `extensions` 字段。

加载规则：
1. 读取 `.veaw/project.json` 中 `extensions` 数组
2. 对每个已激活 Extension，读取 `extensions/<name>/EXTENSION.md`
3. 仅加载存在 `EXTENSION.md` 的 Extension；否则跳过并告知用户

| Extension | 定义文件 | 启用条件 |
|-----------|----------|----------|
| component-intelligence | [extensions/component-intelligence/EXTENSION.md](../extensions/component-intelligence/EXTENSION.md) | 组件分析、复用决策、Catalog 维护 |
| design | [extensions/design/EXTENSION.md](../extensions/design/EXTENSION.md) | 设计稿分析、Design-to-Code |

> Figma MCP 当前未在 `.mcp/mcp.json` 中配置。`design` Extension 激活后，设计输入须通过截图、用户描述或本地设计文件提供。

---

## 7. .veaw/ 上下文加载

目标项目根目录下的 `.veaw/` 为项目级知识层，由 `/project-onboarding` 在目标项目中生成。

加载顺序：
1. `.veaw/project.json` — 技术栈、Preset、Extension、Catalog 路径
2. `.veaw/context.md` — 项目级 AI 上下文补充（架构特殊性、约定、禁止操作）

规则：
- `.veaw/` 属于目标项目目录，不属于 VEAW 本身
- 不在 VEAW 仓库中创建 `.veaw/project.json`
- 无 `.veaw/` 时，降级到读取目标项目 `package.json` 和目录结构推断

---

## 8. Component Catalog 接入

Component Catalog 位于目标项目的 `component-catalog/` 目录下，由 `/project-onboarding` 初始化。

使用规则：
- 组件分析任务前，优先读取 `component-catalog/index.md` 了解已有资产
- `/component-catalog-maintenance` 负责更新 Catalog，不手动覆盖索引
- VEAW 自身的 `component-catalog/` 为 workspace 配置仓库的示例，不含真实业务组件数据

---

## 9. MCP 调用顺序

每次任务按以下顺序决定是否调用 MCP：

```
1. GitNexus   — 理解代码结构（先查关系，再读代码）
2. Context7   — 查询官方文档（有 API 疑问时调用）
3. Playwright — 验证结果（代码修改后在浏览器中验证）
```

规则：
- 不并行调用多个 MCP，按上述顺序串行
- GitNexus 有结果时，不重复用 grep/find 搜索
- Context7 只用于查询官方文档，不用于分析业务代码
- Playwright 只在代码变更后调用，不用于探索阶段

---

## 10. 代码修改安全规则

### 修改前必须

- 阅读并理解相关文件（不猜测实现）
- 用 GitNexus 分析修改影响范围
- 确认修改范围最小化（Minimal Change 原则）

### 禁止操作

- 删除文件（需用户明确确认）
- 修改 git 历史
- 修改生产环境配置
- 重构与当前任务无关的代码
- 在未被要求时添加新依赖

### 高风险操作（执行前说明影响并等待确认）

- 修改路由配置
- 修改全局状态（Pinia store 结构变更）
- 修改公共组件（影响多个页面）
- 修改 API 层接口签名

### 安全修改原则

- 优先复用已有组件、hooks、工具函数
- 不引入 `any` 类型
- 不使用 Options API
- 新增代码必须通过 TypeScript 类型检查

---

## 11. 响应格式

所有任务响应使用 AGENTS.md Section 8 定义的格式：

```
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```
