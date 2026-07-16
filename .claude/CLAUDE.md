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

Agent Router、Agent 定义文件和调度规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 1，Claude Code 完全遵循。

Claude Code 用 slash command 触发对应 Skill（见本文件 Section 2），再按 Section 1 的 Agent 链完成后续交接（如需要 Architect / Developer / Reviewer 参与）。

---

## 4. Workflow 入口

Workflow 入口表的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 3。

---

## 5. Preset 加载规则

Preset 加载顺序、自动选择规则和冲突处理的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 4。

---

## 6. Extension 加载规则

Extension 加载顺序和激活规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 5。

---

## 7. .veaw/ 上下文加载

`.veaw/` 上下文加载顺序和规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 6。

---

## 8. Component Catalog 接入

Component Catalog 接入规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 7。

---

## 9. MCP 调用顺序

MCP 优先级、调用顺序和降级策略的唯一真源是 [`core/AGENTS.md`](../core/AGENTS.md) Section 6，Claude Code 完全遵循：GitNexus → Context7 → Playwright（设计任务额外前置设计输入 MCP，当前未配置）。

- 不并行调用多个 MCP，按顺序串行
- GitNexus 有结果时，不重复用 grep/find 搜索
- 只有 MCP 不可用或目标仓库未索引时才降级

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
