# Skills 目录说明

本目录存放工具无关的 Skill 定义，供不同 AI 工具引用。

## 与 .claude/skills/ 的关系

| 目录 | 用途 |
|------|------|
| `core/ai/skills/` | 通用 Skill 定义（工具无关的执行逻辑） |
| `.claude/skills/` | Claude Code 专用（包含 frontmatter，由 Claude Code 自动加载） |
| `.codex/` | Codex CLI 专用（AGENTS.md 形式，手动引用） |

## 已定义的 Skills

| Skill | 说明 |
|-------|------|
| vue-page-create | Vue3 企业级页面开发流程 |
| component-create | Vue3 可复用组件开发规范 |
| api-development | 前端 API 接口开发规范 |
| bug-fix | Bug 定位与修复流程 |
| code-review | 前端代码审查流程 |

## 如何新增 Skill

1. 在 `core/ai/skills/` 下新建 `skill-name.md`，定义工具无关的执行逻辑
2. 在 `.claude/skills/skill-name/SKILL.md` 创建 Claude Code 版本（含 frontmatter）
3. 在 `.claude/CLAUDE.md` 的 Skills 注册表中添加新 Skill
