# Vue Project Onboarding 示例

## 目的

说明如何把 VEAW 接入一个真实 Vue3 + TypeScript 项目，并激活 Preset、Extension、项目级上下文和 Component Catalog。

本示例只描述流程，不包含真实业务项目数据。

## 前置条件

- 已有真实目标项目路径，例如 `D:/projects/your-vue-project`
- 目标项目允许写入项目级 `.veaw/`（含 `.veaw/component-catalog/`）
- 已确认是否允许运行 GitNexus 索引
- 不修改 VEAW `core/` 来保存目标项目事实

## 推荐接入目录

在目标项目中维护：

```text
.veaw/
├── project.json
├── context.md
└── component-catalog/
    ├── index.md
    ├── components/
    ├── snapshots/
    └── CHANGELOG.md
```

## 接入步骤

### 1. 识别目标项目

读取目标项目：

- `package.json`
- lockfile：`pnpm-lock.yaml`、`package-lock.json`、`yarn.lock` 或 `bun.lockb`
- `vite.config.*`、`nuxt.config.*`、Electron 配置
- `src/`、`src/components/`、`src/views/`、`src/pages/`
- `src/router/`、`src/stores/` 或 `src/store/`
- 测试配置和 UI 组件库依赖

### 2. 选择 Preset

根据项目事实选择一个主 Preset：

| 项目事实 | Preset |
|----------|--------|
| Nuxt 依赖或 `nuxt.config.*` | `presets/nuxt/` |
| Electron 依赖或主进程目录 | `presets/electron/` |
| Vue3 + Vite + Element Plus 管理端 | `presets/vue-admin/` |
| Vue3 + Vite + Vant 移动端 | `presets/vue-h5/` |
| React + Vite + Ant Design 管理端 | `presets/react-admin/` |

Preset 目录位于 VEAW 根目录 `presets/`，不是 `core/presets/`。

### 3. 激活 Extension

按需求启用：

- `extensions/design/EXTENSION.md`
- `extensions/component-intelligence/EXTENSION.md`

只有存在 `EXTENSION.md` 的扩展才视为可启用。

### 4. 创建项目级上下文

在目标项目根目录创建 `.veaw/`：

- `.veaw/project.json` 参考 `core/ai/templates/project-profile.json`
- `.veaw/context.md` 参考 `core/ai/templates/project-context.md`

这些文件保存目标项目事实，不写入 VEAW `core/`。

### 5. 建立 Component Catalog

如果启用 `component-intelligence`，在目标项目 `.veaw/` 下创建或更新：

```text
.veaw/component-catalog/
├── index.md
├── components/
├── snapshots/
└── CHANGELOG.md
```

组件条目参考 `core/ai/templates/component-catalog.md`，首次生成流程参考 `extensions/component-intelligence/project-catalog-onboarding.md`。

### 6. MCP 与降级

优先使用 GitNexus：

```bash
gitnexus index .
```

如果目标项目未索引，必须明确说明，并降级使用 `rg --files`、目录扫描、imports 和只读文件读取。

### 7. Codex 与 Claude 加载

Codex：

```text
.codex/AGENTS.md
  ↓
core/CODEX.md
  ↓
core/AGENTS.md
  ↓
目标项目 .veaw/project.json
  ↓
目标项目 .veaw/context.md
  ↓
preset / extension / agent / workflow / skill
```

Claude Code：

```text
.claude/CLAUDE.md
  ↓
core/AGENTS.md
  ↓
目标项目 .veaw/project.json
  ↓
目标项目 .veaw/context.md
  ↓
.claude/skills/*
```

不要覆盖 `.claude/skills/*/SKILL.md`。如需 Claude 自动识别新 Skill，应新增 Claude 专用 Skill 并在 `.claude/CLAUDE.md` 注册。

## 验收清单

- 已识别目标项目技术栈和目录结构
- 已选择一个主 Preset，或明确列出候选和缺失证据
- 已启用必要 Extension
- `.veaw/project.json` 和 `.veaw/context.md` 只保存在目标项目
- `.veaw/component-catalog/` 只保存目标项目真实组件资产
- GitNexus 状态或降级方式已记录
- Codex 与 Claude 加载边界已说明
