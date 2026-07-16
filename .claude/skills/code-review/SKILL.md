---
name: code-review
description: 前端代码审查流程 — 规范符合度、逻辑正确性、安全性、可维护性分级输出
---

# code-review

> 完整执行规则见 [`core/ai/skills/code-review.md`](../../../core/ai/skills/code-review.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- PR/MR 提交前的自检
- 用户请求审查某段代码
- 代码合并前的质量检查

## 输出格式

见 `core/ai/skills/code-review.md` 输出格式章节（审查专用三段式：审查结论 / 问题列表 / 亮点）。
