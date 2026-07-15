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
| `core/ai/agents/` | Designer、Component Analyst、Architect、Developer、Reviewer 角色定义 |
| `core/ai/skills/` | Claude 与 Codex 共享 Skill 定义 |
| `core/ai/workflows/` | 标准任务流程 |
| `core/ai/templates/` | 可复用代码模板 |

Agent 调度由 `.codex/AGENTS.md` 负责：

| 任务类型 | Agent 调度 |
|----------|------------|
| 需求分析 | Architect |
| 设计任务 | Designer -> Architect -> Developer -> Reviewer |
| 组件智能 | Component Analyst -> Architect -> Developer（仅在需要实现时）-> Reviewer |
| 新功能开发 | Architect -> Developer -> Reviewer |
| Bug 修复 | Developer -> Reviewer |
| 代码审查 | Reviewer |

---

## 3. 工具优先级

Codex 有可用工具时，优先级如下：

```text
GitNexus   > rg/find
Context7   > 模型记忆
Playwright > 人工描述
```

规则：

- GitNexus 用于代码关系、调用链、影响范围分析
- Context7 用于官方文档、框架 API、第三方库 API 确认
- Playwright 用于浏览器渲染、交互和回归验证
- `rg`、读取 imports、人工验证步骤只作为降级方案

---

## 4. MCP 降级策略

只有满足以下条件之一时，才允许从 MCP 降级：

- 当前环境没有对应 MCP 工具
- 目标仓库未被 GitNexus 索引
- MCP 调用失败且错误与环境或连接有关
- 用户明确要求不要使用某个 MCP

降级时必须说明原因，并选择最接近的替代方式：

| MCP | 降级方式 |
|-----|----------|
| GitNexus | `rg` 搜索、读取 imports、阅读相关文件 |
| Context7 | 只基于已读项目文档和明确 API 名称回答；不确定时说明 |
| Playwright | 运行类型检查、构建检查，并给出手动验证步骤 |

---

## 5. Skill 执行规则

Codex 收到 Skill 任务时：

1. 读取 `.codex/AGENTS.md` 的 Skill Registry
2. 读取对应 `core/ai/skills/*.md`
3. 按 Skill 的「输入要求」检查信息完整性
4. 按 Skill 的「执行流程」处理
5. 必要时引用 `core/ai/workflows/*`
6. 必要时引用 `core/ai/templates/*`
7. 按 Skill 的「输出格式」总结

Codex 不直接修改 `.claude/skills/*/SKILL.md`，除非用户明确要求维护 Claude 配置。

---

## 6. 文件读取规则

- 修改任何文件前必须先读取
- 不基于文件名猜测内容
- 独立文件可并行读取
- 有依赖关系的步骤串行执行
- MCP 调用串行执行：GitNexus -> Context7 -> Playwright

---

## 7. 文件修改规则

- 每次只修改完成任务所需的最少文件
- 修改前说明计划修改范围
- 不自动重构无关代码
- 不删除文件，除非用户明确确认
- 不修改 git 历史
- 不修改生产环境配置
- 不引入未要求的新依赖

---

## 8. 代码生成规则

- Vue 组件必须使用 `<script setup lang="ts">`
- Props、Emits、API 参数、API 响应必须有 TypeScript 类型
- 禁止 `any`，优先 `unknown`
- 禁止 Options API
- 优先复用已有组件、composables、utils、templates

---

## 9. 上下文压缩后的行为

当对话上下文被压缩或任务中断后，恢复工作前必须：

1. 读取 `.codex/AGENTS.md` 确认 Codex 入口规则
2. 读取 `core/CODEX.md` 确认 Codex 专属规则
3. 读取 `core/AGENTS.md` 确认通用开发原则
4. 用 `git status` 确认当前变更状态
5. 读取当前任务涉及的 Skill 或 Workflow
6. 继续未完成任务

---

## 10. 输出格式

与 `core/AGENTS.md` Section 8 保持一致：

```text
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```
