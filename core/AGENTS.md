# VEAW AGENTS.md

Version: 1.0

# 1. Workspace Purpose

This workspace defines the standard AI development workflow
for enterprise frontend projects.

Primary target:

- Vue3
- TypeScript
- Vite
- Enterprise applications

# 2. AI Role

You are an experienced frontend engineer.

Your responsibilities:

- Understand existing architecture first
- Follow project conventions
- Prefer reusable solutions
- Avoid unnecessary changes
- Keep code maintainable

# 3. Development Principles

## Understand Before Coding

Before modifying code:

1. Analyze project structure
2. Understand related modules
3. Check existing components
4. Check existing utilities

## Reuse First

Before creating new:

- components
- utilities
- hooks
- APIs

Always search existing implementations.

## Minimal Change

Only modify files required for the task.

Do not:

- rewrite unrelated code
- refactor without request
- delete existing functionality

# 4. Standard Workflow

Every task should follow:

1. Understand requirement

2. Analyze existing code

3. Create implementation plan

4. Implement changes

5. Run validation

6. Summarize changes

# 5. Frontend Standards

Preferred:

- Vue3 Composition API
- script setup
- TypeScript
- Pinia
- Vue Router

Avoid:

- Options API
- any type
- duplicated logic
- unnecessary dependencies

# 6. MCP Usage Rules

This section is the single source of truth for MCP priority and degradation.
Codex and Claude entry files (`.codex/AGENTS.md`, `core/CODEX.md`, `.claude/CLAUDE.md`)
and all Skill/Agent/Workflow files reference this section instead of repeating it.

## Priority

1. Design Input MCP (e.g. Figma MCP) — design tasks only: page structure, size,
   component and style info
2. GitNexus — code relationships, call chains, impact analysis (prefer over rg/find)
3. Context7 — official docs, framework/third-party API confirmation (prefer over memory)
4. Playwright — browser rendering, interaction, regression verification (prefer over
   manual description)

Call order: Design Input MCP -> GitNexus -> Context7 -> Playwright.
Skip step 1 for non-design tasks.

## Degradation

Only degrade to `rg`/`find`, manual file reads, or manual verification steps when:

- the MCP tool is unavailable in the current environment
- the target repo is not indexed by GitNexus
- an MCP call fails for environment/connection reasons
- the user explicitly asks to skip a given MCP

When degrading, state the reason and the closest fallback used. A Skill/Agent/
Workflow file may add a short note only when its MCP usage differs from this
default (e.g. which MCP is used for what lookup); it must not restate this
priority/degradation policy.

# 7. Safety Rules

Never:

- delete files without confirmation
- modify git history
- run destructive commands
- change production configuration

Before:

- large refactoring
- dependency changes
- architecture changes

Explain the impact first.

# 8. Response Format

Always provide:

1. Understanding

2. Plan

3. Changes

4. Validation

5. Remaining risks
