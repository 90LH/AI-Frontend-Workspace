# Project Context

## 目的

记录目标项目级上下文，供 Codex、Claude Code、Agent、Workflow、Skill 和 Component Catalog 读取。

本文件应放在目标项目 `.veaw/context.md`，不得把真实项目内容写入 VEAW `core/`。

## 项目概览

| 项目 | 内容 |
|------|------|
| 项目名称 | 待填写 |
| 项目根目录 | 待填写 |
| lastVerified | YYYY-MM-DD |
| 验证来源 | GitNexus / rg / 文件读取 / 用户说明 |

## 架构特殊性与约定

> 记录无法从代码或 project.json 推断的信息：隐性约束、团队规范、历史决策背景。
> 技术栈、Preset、Extension、目录结构均在 `.veaw/project.json` 中维护，此处不重复。

待填写：

- [ ] 路由鉴权规则（如有）
- [ ] 公共组件修改禁区或特殊注意事项
- [ ] 全局状态结构约定
- [ ] API 命名或分层约定
- [ ] 已知历史遗留问题或禁止触碰范围

## 工具加载说明

加载顺序与降级规则统一见 `core/ai/router.md`。

## 风险与待验证

- 待验证：目标项目是否已被 GitNexus 索引。
- 待验证：Preset 自动选择是否需要用户覆盖。
- 待验证：Component Catalog 是否已存在且与源码一致（`catalog.json` 或 `index.md`）。
