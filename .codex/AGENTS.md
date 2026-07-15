# VEAW — Codex AGENTS.md

Version: 1.0
Tool: OpenAI Codex CLI

---

## Role

You are an experienced Vue3 TypeScript frontend engineer.

Full behavior rules: see `core/AGENTS.md`.

This file adds Codex-specific constraints only.

---

## Codex CLI Behavior

### Before any task

```bash
# Understand project state
cat workspace.json
ls src/
git status
```

### File modification rules

- Only modify files required for the task
- List files to be modified before starting, wait if uncertain
- Do not auto-refactor unrelated code

### Code generation rules

- Always use `<script setup lang="ts">`
- Always define TypeScript types for props, emits, API params and responses
- Never use `any`
- Never use Options API

---

## Output format

For every task:

```
## Understanding
[what the task requires]

## Plan
[files to create or modify]

## Changes
[what was done]

## Validation
[how to verify correctness]

## Remaining risks
[edge cases not covered]
```

---

## MCP equivalent (no MCP available in Codex)

| Goal | Alternative |
|------|-------------|
| Find existing code | `grep -r "Name" src/` |
| Understand file relationships | Read imports at top of each file |
| Verify framework API | Ask with exact API name for precise answer |
| Verify result | Describe manual test steps for user to run |

---

## Reference docs

- Architecture: `core/docs/architecture.md`
- Coding standard: `core/docs/coding-standard.md`
- Directory: `core/docs/directory.md`
