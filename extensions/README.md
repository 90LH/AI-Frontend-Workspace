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
| `design/` | 设计稿转代码工作流（Figma、Design Token、Component Mapping） | 已创建 |
| `component-intelligence/` | 组件资产盘点、组件映射、Component Catalog 维护 | 已创建 |

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
agent
  ↓
codex
```

含义：

| 层级 | 来源 | 说明 |
|------|------|------|
| core | `core/AGENTS.md`、`core/CODEX.md` | 通用开发原则和 Codex 专属规则 |
| preset | `presets/<preset>/AGENTS.md` 或 `preset.json` | 项目类型规则 |
| extension | `extensions/<name>/EXTENSION.md` | 专项能力增补 |
| agent | `core/ai/agents/*` | 专项任务的 Agent 角色 |
| codex | `.codex/AGENTS.md` | Codex Agent 入口、Skill Router、MCP 优先级 |

只有存在 `extensions/<name>/EXTENSION.md` 时，扩展才视为已启用。

`extensions/README.md` 中的规划项不等于已启用规则，Codex 不应基于规划项推断具体行为。

---

## Project Onboarding 中的扩展激活

真实项目接入时，扩展按需求叠加：

| 条件 | 推荐扩展 |
|------|----------|
| 存在 Figma、截图、Design Token、页面还原或设计组件映射需求 | `design/` |
| 存在组件盘点、组件复用、组件映射、Component Catalog 或组件治理需求 | `component-intelligence/` |

激活规则：

1. 只有存在 `extensions/<name>/EXTENSION.md` 时才允许激活。
2. 扩展可同时启用，但不得修改主 Preset 的技术栈判断。
3. 扩展只保存团队级可复用规则，不保存真实项目组件清单或业务配置。
4. 真实项目级知识写入目标项目 `.veaw/`（含 `.veaw/component-catalog/`）。
5. Component Catalog 首次接入流程见 `extensions/component-intelligence/project-catalog-onboarding.md`。

---

## 设计扩展方向

设计扩展用于把设计输入接入 Agent 工作流，常见方向包括：

| 能力 | 说明 |
|------|------|
| Figma | 通过设计输入 MCP 获取页面结构、尺寸、组件和样式信息 |
| Design Token | 提取颜色、字体、间距、圆角、阴影等语义化 token 建议 |
| Component Mapping | 将设计组件映射到项目已有组件、业务组件或待新增组件 |

设计扩展加载关系：

```text
core
  ↓
preset
  ↓
extension
  ↓
agent
```

当前 Design-to-Code 基础能力位于：

- `core/ai/agents/designer.md`
- `core/ai/workflows/design-to-code.md`
- `core/ai/skills/design-analysis.md`

如果未来创建 `extensions/design/EXTENSION.md`，应只补充项目或团队特有的设计规则，不重复 core 中的通用 Agent、Workflow 和 Skill。

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
