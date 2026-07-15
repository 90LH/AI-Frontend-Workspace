---
name: project-onboarding
description: 真实前端项目接入 VEAW 标准流程：技术栈识别、Preset Activation、Extension Activation、项目级上下文建立
---

# project-onboarding

> 完整执行规则见 [`core/ai/skills/project-onboarding.md`](../../../core/ai/skills/project-onboarding.md)。
> 本文件为 Claude Code slash command 入口，不重复维护完整逻辑。

## 触发条件

- 用户要求"接入真实项目""Project Onboarding"或"Preset Activation"
- 需要为目标项目创建 `.veaw/` 上下文
- 需要初始化目标项目 `component-catalog/`

## Claude Code 专属说明

- Claude Code 读取 `.claude/CLAUDE.md` 的 Skill Registry 和 Workflow 入口（非 `.codex/AGENTS.md`）
- 通用规则读取 `core/AGENTS.md`

## 输出格式

见 `core/ai/skills/project-onboarding.md` 输出格式章节。
