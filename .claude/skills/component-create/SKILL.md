---
name: component-create
description: Vue3 可复用组件开发规范 — 检查已有组件、定义接口、实现、验证
---

# component-create

> 完整执行规则见 [`core/ai/skills/component-create.md`](../../../core/ai/skills/component-create.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- 用户要求新建 UI 组件
- 多个页面存在重复 UI 或交互逻辑，需要抽取组件
- 需要封装第三方组件库的项目适配层

## 输出格式

见 `core/ai/skills/component-create.md` 输出格式章节。
