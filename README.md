# VEAW

> Vue Enterprise AI Workspace.

VEAW 是面向企业级前端项目的 AI Workspace。它不直接修改用户项目代码，而是作为资源真源提供 rules、templates、prompts、skills、agents、workflows、presets、extensions、commands 等资源，由 `veaw-cli` 通过 Resource Loader 发现、校验、安装和消费。

## 已实现闭环

```text
Workspace
  -> registries/*.json
  -> Resource Loader
  -> veaw-cli
  -> Project .veaw/
  -> context / ask / plan / catalog / commands
```

当前闭环已经成立：

- Workspace 通过 `registries/registry.json` 声明顶层 registry。
- 子 registry 通过统一资源字段描述资源：`id`、`type`、`version`、`sourcePath`、`targetPath`、`tags`、`dependencies`、`enabledByDefault`、`copyPolicy`、`overwritePolicy`、`hash`。
- CLI `init` 和 `sync` 能从 Registry materialize 资源到项目 `.veaw/`。
- CLI `context`、`ask`、`plan`、`catalog`、`commands` 能通过 Resource Loader 消费 Workspace 资源。
- Workspace 不可发现时，CLI 保持内置 assets fallback，旧项目仍可初始化。

## Registry

主入口：

```text
registries/
├── registry.schema.json
├── registry.json
├── core.json
├── skills.json
├── templates.json
├── workflows.json
├── agents.json
├── presets.json
├── extensions.json
├── prompts.json
├── commands.json
├── rules.json
├── knowledge.json
└── docs.json
```

`registry.json` 定义 Workspace 元信息和子 registry 入口。每个子 registry 维护同一种资源类型或相关资源集合。

## Resource Types

| Type | 用途 |
|------|------|
| `core` | AI 入口规则、跨工具基础说明 |
| `skill` | 可复用 AI 能力说明 |
| `template` | 项目、组件、上下文、代码模板 |
| `workflow` | 多步骤 AI 工作流 |
| `agent` | AI 角色定义 |
| `preset` | 项目类型预设 |
| `extension` | 可选扩展能力 |
| `prompt` | 可直接组装的 AI prompt 片段 |
| `rule` | TypeScript、Vue 等工程规则 |
| `knowledge` | 可复用知识片段 |
| `doc` | 架构、规范、目录文档 |
| `command` | Workspace 声明式命令入口 |

## Declarative Commands

`registries/commands.json` 除保留原有 command 资源外，还包含声明式命令定义：

- `commandSchemaVersion`
- `commands[]`
- `parameters`
- `dependencies`
- `execution`

当前支持的安全执行类型：

- `generate-prompt`
- `render-template`
- `call-workflow`

Workspace command 不允许直接执行 shell 或任意 JavaScript。真实执行入口由 CLI 内置命令控制。

## CLI Consumption

`veaw-cli` 当前消费关系：

| CLI command | Workspace resource types |
|-------------|--------------------------|
| `init` | 默认启用资源及其依赖 |
| `sync` | 默认启用资源及其依赖 |
| `context` | `template`、`rule`、项目事实 |
| `ask` | `prompt`、`rule`、`skill`、项目事实 |
| `plan` | `workflow`、`template`、`skill`、项目事实 |
| `catalog` | `extension`、`extension-guide`、`extension-template`、`template` |
| `commands list/run` | `command` 声明、依赖资源 |

## Compatibility

- 旧 `.veaw/commands/*.md` 路径仍保留。
- 旧 CLI assets fallback 仍可用。
- 旧 `.veaw/project.json` 的自定义字段由 CLI 合并保留。
- Registry 资源通过 hash 和 lockfile 支持增量同步。

## Validation Snapshot

本仓库当前 Registry 校验结果：

- resources: 66
- unique ids: 66
- declarative commands: 5
- sourcePath missing: 0
- hash mismatch: 0
- dependency missing: 0

## v1.0 前仍需完成

- 完整的资源选择策略：按 preset、project type、tag profile 选择资源，而不是只依赖默认启用。
- 更强的 lockfile 模型：记录 target hash、安装状态、冲突状态和上次 materialize 行为。
- Registry schema 自动校验命令。
- Workspace command 的更多声明式执行能力，但仍不得开放任意 shell/JS。
- Project 迁移器：覆盖无 lockfile、旧 config、手工改动资源、Workspace 丢失等路径。
- 文档和示例项目持续对齐真实 CLI 行为。
