---
name: component-analysis
description: 分析项目组件资产，输出分类、接口摘要、引用关系与复用建议
---

# component-analysis

> 完整执行规则见 [`core/ai/skills/component-analysis.md`](../../../core/ai/skills/component-analysis.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- 需要了解项目现有组件资产范围
- 需要做组件复用决策前的资产盘点
- 与 `component-intelligence` Workflow 配合使用

## 注意事项

- 优先使用 GitNexus 查询组件引用关系；未索引时降级到 `rg` + 目录扫描
- 启用 `component-intelligence` Extension 前，先确认 `extensions/component-intelligence/EXTENSION.md` 存在

## 输出格式

见 `core/ai/skills/component-analysis.md` 输出格式章节。
