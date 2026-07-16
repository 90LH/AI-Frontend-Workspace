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
| `core/ai/skills/` | 通用 Skill 定义（唯一真源，工具无关的执行逻辑） |
| `.claude/skills/*/SKILL.md` | Claude Code Thin Wrapper（含 frontmatter，仅触发条件 + 引用，不重复逻辑） |
| `.codex/AGENTS.md` | Codex Agent 入口（Skill Registry 引用 `core/ai/router.md` Section 2） |

Skill Registry、Agent Router、Workflow 入口、Preset/Extension 加载规则的唯一真源是 [`core/ai/router.md`](../router.md)，Codex 与 Claude 入口文件均引用该文件，不重复维护。

## 已定义的 Skills

| Skill | 说明 |
|-------|------|
| [project-onboarding](project-onboarding.md) | 真实项目接入、Preset Activation、Extension Activation 与项目级上下文建立 |
| [design-analysis](design-analysis.md) | 设计稿分析与 Design-to-Code 任务拆解 |
| [component-analysis](component-analysis.md) | 组件资产分析与复用决策建议 |
| [component-catalog-maintenance](component-catalog-maintenance.md) | 组件资产目录维护与一致性校验 |
| [vue-page-create](vue-page-create.md) | Vue3 企业级页面开发流程 |
| [component-create](component-create.md) | Vue3 可复用组件开发规范 |
| [api-development](api-development.md) | 前端 API 接口开发规范 |
| [bug-fix](bug-fix.md) | Bug 定位与修复流程 |
| [code-review](code-review.md) | 前端代码审查流程 |

## 如何新增 Skill

1. 在 `core/ai/skills/` 下新建 `skill-name.md`，定义工具无关的执行逻辑（唯一真源）
2. 在 `.claude/skills/skill-name/SKILL.md` 创建 Thin Wrapper（含 frontmatter + 触发条件 + 指向 core 定义的引用，不复制执行流程/MCP要求/输出格式）
3. 在 `core/ai/router.md` 的 Skill Registry（Section 2）、Agent Router（Section 1）和 Workflow 入口（Section 3，如适用）中添加新 Skill
4. Codex（`.codex/AGENTS.md`）和 Claude（`.claude/CLAUDE.md`）均引用 `core/ai/router.md`，不需要各自重复登记

## Skill 文档要求

`core/ai/skills/*.md`（唯一真源）必须包含：

- 目的
- 使用场景
- 输入要求
- 执行流程
- MCP 要求（引用 `core/AGENTS.md` Section 6，只写与全局默认不同的部分）
- 输出格式（非特例 Skill 引用 `core/AGENTS.md` Section 8，只写与全局默认不同的部分）
- 注意事项

`.claude/skills/*/SKILL.md`（Thin Wrapper）只需：frontmatter、触发条件、指向 core 定义的引用链接，不重复执行流程或输出格式细节。

## Project Onboarding 兼容边界

- `project-onboarding` 已同时具备 Codex 入口（`.codex/AGENTS.md` 引用 `core/ai/router.md`）和 Claude 入口（`.claude/skills/project-onboarding/SKILL.md`）。
- 不覆盖 `.claude/skills/*/SKILL.md`。
