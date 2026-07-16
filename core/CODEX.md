# Codex CLI 补充规则

> 本文件是 Codex 专属补充。
> 主规则见 [AGENTS.md](AGENTS.md)，Codex 入口见 [../.codex/AGENTS.md](../.codex/AGENTS.md)。

---

## 1. 适用工具

- OpenAI Codex CLI
- ChatGPT（代码模式）

---

## 2. Codex 加载链路

Codex 执行任务时按以下链路工作：

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
Agent
  ↓
Skill
  ↓
Workflow
  ↓
Template
  ↓
MCP
  ↓
执行
```

职责分工：

| 层级 | 职责 |
|------|------|
| `.codex/AGENTS.md` | Codex Agent 入口、Skill Router、MCP 优先级 |
| `core/CODEX.md` | Codex 专属执行规则 |
| `core/AGENTS.md` | 工具无关的通用开发原则 |
| 目标项目 `.veaw/` | 项目级 Profile、Context、Preset 和 Extension 激活状态 |
| `core/ai/agents/` | Designer、Component Analyst、Architect、Developer、Reviewer 角色定义 |
| `core/ai/skills/` | Claude 与 Codex 共享 Skill 定义 |
| `core/ai/workflows/` | 标准任务流程 |
| `core/ai/templates/` | 可复用代码模板 |

Agent 调度由 `.codex/AGENTS.md` 负责：

| 任务类型 | Agent 调度 |
|----------|------------|
| 项目接入 | Architect -> Project Onboarding -> Component Analyst（仅在需要 Catalog 时）-> Reviewer |
| 需求分析 | Architect |
| 设计任务 | Designer -> Architect -> Developer -> Reviewer |
| 组件智能 | Component Analyst -> Architect -> Developer（仅在需要实现时）-> Reviewer |
| 组件目录维护 | Component Analyst -> Architect -> Developer（仅在需要实现时）-> Reviewer |
| 新功能开发 | Architect -> Developer -> Reviewer |
| Bug 修复 | Developer -> Reviewer |
| 代码审查 | Reviewer |

---

## 3. 工具优先级与降级

MCP 优先级和降级策略的唯一真源是 [`core/AGENTS.md`](AGENTS.md) Section 6。

Codex 特有的一点：设计输入 MCP（如 Figma MCP）在设计任务中优先于 GitNexus，
其余顺序与 `core/AGENTS.md` Section 6 一致。

---

## 4. Skill 执行规则

Codex 收到 Skill 任务时：

1. 读取 `.codex/AGENTS.md` 的 Skill Registry
2. 读取对应 `core/ai/skills/*.md`
3. 按 Skill 的「输入要求」检查信息完整性
4. 按 Skill 的「执行流程」处理
5. 必要时引用 `core/ai/workflows/*`
6. 必要时引用 `core/ai/templates/*`
7. 按 Skill 的「输出格式」总结

Codex 不直接修改 `.claude/skills/*/SKILL.md`，除非用户明确要求维护 Claude 配置。

Project Onboarding 任务应读取：

1. `core/ai/skills/project-onboarding.md`
2. `core/ai/workflows/project-onboarding.md`
3. `core/ai/templates/project-profile.json`
4. `core/ai/templates/project-context.md`
5. 必要时读取 `extensions/component-intelligence/project-catalog-onboarding.md`

真实项目级事实只写入目标项目 `.veaw/` 与 `component-catalog/`。`core/` 只保存通用机制、规则和模板。

---

## 5. 文件读取规则

- 修改任何文件前必须先读取
- 不基于文件名猜测内容
- 独立文件可并行读取
- 有依赖关系的步骤串行执行
- MCP 调用顺序遵循 `core/AGENTS.md` Section 6

---

## 6. 文件修改规则

- 每次只修改完成任务所需的最少文件
- 修改前说明计划修改范围
- 不自动重构无关代码
- 不删除文件，除非用户明确确认
- 不修改 git 历史
- 不修改生产环境配置
- 不引入未要求的新依赖

---

## 7. 代码生成规则

- Vue 组件必须使用 `<script setup lang="ts">`
- Props、Emits、API 参数、API 响应必须有 TypeScript 类型
- 禁止 `any`，优先 `unknown`
- 禁止 Options API
- 优先复用已有组件、composables、utils、templates

---

## 8. 上下文压缩后的行为

当对话上下文被压缩或任务中断后，恢复工作前必须：

1. 读取 `.codex/AGENTS.md` 确认 Codex 入口规则
2. 读取 `core/CODEX.md` 确认 Codex 专属规则
3. 读取 `core/AGENTS.md` 确认通用开发原则
4. 用 `git status` 确认当前变更状态
5. 读取当前任务涉及的 Skill 或 Workflow
6. 继续未完成任务

---

## 9. 输出格式

与 `core/AGENTS.md` Section 8 保持一致：

```text
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```
