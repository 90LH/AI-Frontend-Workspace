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

## 技术栈

| 项目 | 内容 |
|------|------|
| 框架 | 待验证 |
| 语言 | TypeScript |
| 构建工具 | 待验证 |
| 包管理器 | 待验证 |
| UI 组件库 | 待验证 |
| 路由 | 待验证 |
| 状态管理 | 待验证 |
| 测试工具 | 待验证 |

## Preset Activation

| 项目 | 内容 |
|------|------|
| 已选择 Preset | pending |
| 选择方式 | auto / userOverride / pending |
| 置信度 | high / medium / low |
| 选择证据 | 待填写 |
| 冲突处理 | 无 / 待验证 |

## Extension Activation

| Extension | 状态 | 原因 |
|-----------|------|------|
| design | disabled | 待验证 |
| component-intelligence | disabled | 待验证 |

## 目录结构摘要

| 目录 | 用途 | 状态 |
|------|------|------|
| `src/` | 源码目录 | 待验证 |
| `src/components/` | 通用组件 | 待验证 |
| `src/views/` 或 `src/pages/` | 页面目录 | 待验证 |
| `src/router/` | 路由配置 | 待验证 |
| `src/stores/` 或 `src/store/` | 状态管理 | 待验证 |
| `src/api/` | API 层 | 待验证 |
| `src/composables/` | 业务逻辑复用 | 待验证 |

## Codex 加载说明

Codex 处理当前项目任务时，建议按以下顺序读取：

1. `.codex/AGENTS.md`
2. `core/CODEX.md`
3. `core/AGENTS.md`
4. `.veaw/project.json`
5. `.veaw/context.md`
6. 已选择的 `presets/<preset>/preset.json`
7. 如存在，读取 `presets/<preset>/AGENTS.md`
8. 已启用的 `extensions/<name>/EXTENSION.md`
9. 任务相关 Agent、Workflow、Skill、Template

## Claude Code 加载说明

Claude Code 处理当前项目任务时，建议按以下方式补充上下文：

1. `.claude/CLAUDE.md`
2. `core/AGENTS.md`
3. `.veaw/project.json`
4. `.veaw/context.md`
5. `.claude/skills/*/SKILL.md`

兼容边界：

- 不覆盖 `.claude/skills/*/SKILL.md`。
- 未注册为 Claude 专用 Skill 的能力，可通过读取 core 通用 Skill 文档和本项目上下文执行。

## Component Catalog

| 项目 | 内容 |
|------|------|
| Catalog 路径 | `component-catalog/` |
| 首次快照 | 待生成 |
| 验证来源 | GitNexus / rg / 文件读取 |
| 状态 | pending |

## 风险与待验证

- 待验证：目标项目是否已被 GitNexus 索引。
- 待验证：Preset 自动选择是否需要用户覆盖。
- 待验证：Component Catalog 是否已存在且与源码一致。
- 待验证：Claude Code 是否需要新增专用 Skill 桥接。
