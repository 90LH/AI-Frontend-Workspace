---
name: component-catalog-maintenance
description: 校验并维护目标项目 component-catalog/，保持组件资产索引与代码库一致
---

# component-catalog-maintenance

> 完整执行规则见 [`core/ai/skills/component-catalog-maintenance.md`](../../../core/ai/skills/component-catalog-maintenance.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- 组件新增、修改或删除后需要更新 Catalog
- 需要校验 `component-catalog/index.md` 与代码库一致性
- 定期 Catalog 维护任务

## 注意事项

- 目标为目标项目的 `component-catalog/`，不是 VEAW 自身的 `component-catalog/`
- 不手动覆盖 Catalog 索引；通过此 Skill 的标准流程更新

## 输出格式

见 `core/ai/skills/component-catalog-maintenance.md` 输出格式章节。
