# Project Context

## 目的

记录目标项目级上下文，供 Codex、Claude Code、Agent、Workflow、Skill 和 Component Catalog 读取。

本文件应放在目标项目 `.veaw/context.md`。真实项目的人工约定只写在目标项目中，不写回 VEAW `core/`。

## 维护规则

- `VEAW_CONTEXT_START` 到 `VEAW_CONTEXT_END` 之间由 `veaw context` 自动生成，请勿手动修改。
- 自动生成区只写自动检测事实，例如技术栈、目录、依赖和组件摘要。
- 自动生成区外由项目维护者填写，必须区分 `Confirmed` 与 `Pending confirmation`。
- 未由源码、配置或维护者确认的信息不得写成事实。

## 项目概览

| 项目 | 内容 |
|------|------|
| 项目名称 | 待填写 |
| 项目根目录 | 待填写 |
| lastVerified | YYYY-MM-DD |
| 验证来源 | GitNexus / rg / 文件读取 / 用户说明 |

## Architecture

- Confirmed: 待填写。请只记录已确认的架构约定，并标注 source。
- Pending confirmation: 新页面从路由到菜单/权限的注册方式。
- Pending confirmation: Service 请求封装入口与 API 文件组织。
- Pending confirmation: Pinia/store 模块命名与职责。

## Conventions

- Confirmed: 待填写。请只记录项目团队明确采用的约定，并标注 source。
- Pending confirmation: Composable、组件和页面的职责边界。
- Pending confirmation: 国际化、权限、错误处理和测试约定。

## Decisions

- Confirmed: 待填写。请记录长期有效的技术决策、禁止触碰范围和兼容性要求。
- Pending confirmation: 公共组件修改禁区或特殊注意事项。
- Pending confirmation: 已知历史遗留问题。

## 工具加载说明

加载顺序与降级规则统一见 `core/ai/router.md`。

## 风险与待验证

- 待验证：目标项目是否已被 GitNexus 索引。
- 待验证：Preset 自动选择是否需要用户覆盖。
- 待验证：Component Catalog 是否已存在且与源码一致（`catalog.json` 或 `index.md`）。
