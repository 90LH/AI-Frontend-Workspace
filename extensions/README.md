# 扩展目录说明

本目录用于存放面向特定场景的 AI 工作流扩展配置。

扩展是对基础工作流的能力增补，不修改核心配置。

---

## 已规划扩展

| 扩展 | 说明 | 状态 |
|------|------|------|
| `i18n/` | 国际化开发工作流（多语言页面创建、翻译键管理） | 待创建 |
| `testing/` | 单元测试和 E2E 测试工作流 | 待创建 |
| `performance/` | 性能优化分析和建议工作流 | 待创建 |
| `auth/` | 认证授权模块开发规范 | 待创建 |

---

## 如何添加扩展

1. 在 `extensions/` 下新建目录（如 `extensions/i18n/`）
2. 创建 `EXTENSION.md` 描述扩展的适用场景和附加规则
3. 如需新增 Skill，在 `core/ai/skills/` 中添加工具无关 Skill 定义
4. 如需 Claude Code 自动加载，在 `.claude/skills/` 中添加对应 SKILL.md
5. 在 `.claude/CLAUDE.md` 中注册 Claude Skill
6. 在 `.codex/AGENTS.md` 中注册 Codex Skill Router

---

## Codex 加载方式

Codex 使用扩展时，按以下顺序叠加规则：

```text
core
  ↓
preset
  ↓
extension
  ↓
codex
```

含义：

| 层级 | 来源 | 说明 |
|------|------|------|
| core | `core/AGENTS.md`、`core/CODEX.md` | 通用开发原则和 Codex 专属规则 |
| preset | `presets/<preset>/AGENTS.md` 或 `preset.json` | 项目类型规则 |
| extension | `extensions/<name>/EXTENSION.md` | 专项能力增补 |
| codex | `.codex/AGENTS.md` | Codex Agent 入口、Skill Router、MCP 优先级 |

只有存在 `extensions/<name>/EXTENSION.md` 时，扩展才视为已启用。

`extensions/README.md` 中的规划项不等于已启用规则，Codex 不应基于规划项推断具体行为。

---

## EXTENSION.md 文档要求

所有新增扩展文档必须包含：

- 目的
- 使用场景
- 输入要求
- 执行流程
- MCP 要求
- 输出格式
- 注意事项

---

## 扩展与预设的区别

| 类型 | 作用 |
|------|------|
| **预设（presets/）** | 针对不同技术栈的完整配置（如 vue-admin、vue-h5） |
| **扩展（extensions/）** | 在任意预设基础上叠加的专项能力（如 i18n、测试） |
