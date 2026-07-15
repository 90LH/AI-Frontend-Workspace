---
name: design-analysis
description: 分析设计稿或截图，提取组件结构、布局、样式与交互——Design-to-Code 前置步骤
---

# design-analysis

> 完整执行规则见 [`core/ai/skills/design-analysis.md`](../../../core/ai/skills/design-analysis.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- 用户提供设计稿、截图或 Figma 链接，要求分析页面结构或组件关系
- 需要拆解 Design-to-Code 任务时

## 注意事项

- Figma MCP 未在 `.mcp/mcp.json` 中配置；设计输入须通过截图或用户描述提供
- 分析完成后可直接进入 `design-to-code` Workflow（见 `core/ai/workflows/design-to-code.md`）

## 输出格式

见 `core/ai/skills/design-analysis.md` 输出格式章节。
