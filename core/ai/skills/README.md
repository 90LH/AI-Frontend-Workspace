# Skills 目录说明

本目录存放工具无关的 Skill 定义，是 Claude 与 Codex 共享的能力源。

```text
core/ai/skills
        |
        |
 ----------------
 |              |
Claude        Codex
.claude       .codex
```

## 与 .claude/skills/ 的关系

| 目录 | 用途 |
|------|------|
| `core/ai/skills/` | 通用 Skill 定义（工具无关的执行逻辑） |
| `.claude/skills/` | Claude Code 专用（包含 frontmatter，由 Claude Code 自动加载） |
| `.codex/` | Codex Agent 入口（通过 Skill Registry 路由到本目录） |

## 已定义的 Skills

| Skill | 说明 |
|-------|------|
| [design-analysis](design-analysis.md) | 设计稿分析与 Design-to-Code 任务拆解 |
| [component-analysis](component-analysis.md) | 组件资产分析与复用决策建议 |
| [component-catalog-maintenance](component-catalog-maintenance.md) | 组件资产目录维护与一致性校验 |
| [vue-page-create](vue-page-create.md) | Vue3 企业级页面开发流程 |
| [component-create](component-create.md) | Vue3 可复用组件开发规范 |
| [api-development](api-development.md) | 前端 API 接口开发规范 |
| [bug-fix](bug-fix.md) | Bug 定位与修复流程 |
| [code-review](code-review.md) | 前端代码审查流程 |

## 如何新增 Skill

1. 在 `core/ai/skills/` 下新建 `skill-name.md`，定义工具无关的执行逻辑
2. 在 `.claude/skills/skill-name/SKILL.md` 创建 Claude Code 版本（含 frontmatter）
3. 在 `.claude/CLAUDE.md` 的 Skills 注册表中添加新 Skill
4. 在 `.codex/AGENTS.md` 的 Skill Registry 中添加新 Skill

## Skill 文档要求

所有新增 Skill 必须包含：

- 目的
- 使用场景
- 输入要求
- 执行流程
- MCP 要求
- 输出格式
- 注意事项
