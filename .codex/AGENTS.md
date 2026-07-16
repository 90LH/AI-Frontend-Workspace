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

Agent Router、Agent 定义文件和调度规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 1，Codex 完全遵循。

Codex 执行任务类型判断后，用 `->` 链式交接 Agent（例如 `Architect -> Developer -> Reviewer`），交接顺序以 `core/ai/router.md` Section 1 的 Agent 链列为准。

---

## 5. Skill Registry

Skill Registry 的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 2。

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

Workflow 入口表的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 3。

Skill 中已有明确流程时，以 Skill 为主；Skill 需要展开执行细节时，引用对应 Workflow。Agent 编排顺序见 `core/ai/router.md` Section 1。

---

## 8. MCP 优先级

MCP 优先级、调用顺序和降级策略的唯一真源是 [`core/AGENTS.md`](../core/AGENTS.md) Section 6，Codex 完全遵循。

---

## 9. Preset 加载规则

Preset 加载顺序、自动选择规则和冲突处理的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 4。

Codex 叠加顺序：`core/AGENTS.md` → 目标项目 `.veaw/project.json` → `.veaw/context.md` → `presets/<preset>/AGENTS.md` → `.codex/AGENTS.md`。

---

## 10. Extension 加载规则

Extension 加载顺序和激活规则的唯一真源是 [`core/ai/router.md`](../core/ai/router.md) Section 5。

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
