# VEAW Commands Library

> 跨项目可复用的命令定义库。适用于 Claude Code、Codex CLI、ChatGPT。
> Commands 是用户入口，负责编排 Skills 和 Agents，不包含实现逻辑。

---

## 架构

```
User
→ Router（本文件 Command Router 表）
→ Command（.veaw/commands/*.md）
→ Skills（core/ai/skills/）
→ Agents（core/ai/agents/）
→ MCP（GitNexus → Context7 → Playwright）
→ Validation
→ Session Log
```

---

## Commands vs Skills

| | Commands | Skills |
|---|---|---|
| 调用方 | 用户直接触发 | Command 或 Developer Agent |
| 职责 | 编排：上下文加载 + Skill 链 + Agent 链 | 实现：步骤、模板、输出格式 |
| Session Log | 每次必须更新 | 可选 |
| Failure Handling | 显式定义 | 在 Skill 内部 |
| 跨 AI 工具 | Claude Code / Codex / ChatGPT | Claude Code / Codex |

---

## Command Router

| Command | 触发词 | Skills Called | Agent 链 | 适用场景 |
|---------|--------|---------------|----------|----------|
| [warm-start](warm-start.md) | `warm-start` | — | — | 每次会话开始 |
| [new-page](new-page.md) | `new-page` | vue-page-create | Architect → Developer → Reviewer | 创建页面 + 路由 |
| [new-component](new-component.md) | `new-component` | component-create, component-catalog-maintenance | Architect → Developer → Reviewer | 创建可复用组件 |
| [component-analysis](component-analysis.md) | `component-analysis` | component-analysis, component-catalog-maintenance | Component Analyst | 组件资产盘点 |
| [impact-analysis](impact-analysis.md) | `impact-analysis` | — | Architect | 变更前影响范围评估 |
| [bug-fix](bug-fix.md) | `bug-fix` | bug-fix | Developer → Reviewer | 定位并修复 Bug |
| [refactor](refactor.md) | `refactor` | code-review, component-catalog-maintenance | Architect → Developer → Reviewer | 代码重构 |
| [review](review.md) | `review` | code-review | Reviewer | 代码审查 |
| [release](release.md) | `release` | code-review, api-development | Architect → Reviewer | 发布准备 |
| [document](document.md) | `document` | component-catalog-maintenance, api-development | Developer → Reviewer | 生成或更新文档 |

---

## 调用示例

```bash
# Claude Code
warm-start
new-page page_name=UserProfile route_path=/users/profile description="用户详情页"
bug-fix description="点击保存后表单重置" file=src/views/user/profile.vue

# Codex CLI
codex "warm-start"
codex "new-component component_name=DataTable type=common description=数据表格组件"

# ChatGPT（需提供 VEAW 上下文）
warm-start  → 执行任何任务前先确认项目上下文
```

---

## Command 模板结构

每个 Command 文件包含以下 12 个字段：

| 字段 | 说明 |
|------|------|
| Purpose | 命令的目标 |
| When to Use | 适用场景 |
| Inputs | 输入参数表 |
| Preconditions | 前置条件 |
| Execution Flow | 执行步骤 |
| Skills Called | 调用的 Skill 列表 |
| Agents Chain | Agent 链 |
| MCP Usage | MCP 工具调用规则 |
| Session Log Update | Session Log 写入格式 |
| Failure Handling | 失败处理表 |
| Output | 输出格式 |
| Example | 调用示例 |

---

## 约束

- Commands 不包含实现逻辑（实现在 `core/ai/skills/`）
- Commands 不修改：`.claude/skills/*`、`.mcp/*`、已有 Agent 定义文件
- Commands 不存储真实项目数据（项目数据属于目标项目 `.veaw/`）
- 每个 Command 执行结束必须更新 Session Log
