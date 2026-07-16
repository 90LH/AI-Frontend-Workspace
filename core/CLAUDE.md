# Claude Code 补充规则

> 本文件是 AGENTS.md 的 Claude Code 专属补充。
> 主规则见 [AGENTS.md](AGENTS.md)，本文件仅记录 Claude Code 特有行为。

---

## 文件加载顺序

Claude Code 启动时加载顺序：

1. `.claude/CLAUDE.md` — 项目入口规则（Skills注册、MCP顺序、安全规则）
2. `core/AGENTS.md` — 核心 AI 开发原则
3. `core/docs/` — 项目规范文档（按需读取）

---

## Claude Code 专属行为

### 工具优先级

MCP 优先级与降级策略的唯一真源是 [`core/AGENTS.md`](AGENTS.md) Section 6。

### 文件读取规则

- 修改任何文件前必须先读取
- 不基于文件名猜测内容
- 读取后不重复读取同一文件（除非内容可能已变更）

### 并行工具调用

- 独立的文件读取操作：并行执行
- 有依赖关系的操作：串行执行
- MCP 调用：始终串行，顺序见 `core/AGENTS.md` Section 6

---

## 上下文压缩后的行为

当对话上下文被压缩后，恢复工作前必须：

1. 读取 `.claude/CLAUDE.md` 确认当前规则
2. 读取 `core/AGENTS.md` 确认开发原则
3. 用 `git status` 确认当前变更状态
4. 继续未完成的任务
