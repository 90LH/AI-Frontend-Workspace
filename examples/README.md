# 使用示例

本目录包含将 VEAW 工作流接入真实项目的示例说明。

---

## 目录结构

```text
examples/
└── vue-project-onboarding/
    └── README.md
```

---

## 推荐接入方式

真实项目接入应使用 Project Onboarding 流程：

1. 识别目标项目技术栈和目录结构
2. 选择一个主 Preset
3. 按需激活 Extension
4. 在目标项目创建 `.veaw/project.json` 与 `.veaw/context.md`
5. 在目标项目创建或维护 `component-catalog/`

相关文件：

- `core/ai/workflows/project-onboarding.md`
- `core/ai/skills/project-onboarding.md`
- `core/ai/templates/project-profile.json`
- `core/ai/templates/project-context.md`
- `extensions/component-intelligence/project-catalog-onboarding.md`
- `examples/vue-project-onboarding/README.md`

---

## Preset 路径

Preset 位于 VEAW 根目录：

```text
presets/vue-admin/
presets/vue-h5/
presets/nuxt/
presets/react-admin/
presets/electron/
```

不要使用旧路径 `core/presets/`。

---

## 项目级知识存放

真实项目事实只写入目标项目：

```text
.veaw/
├── project.json
└── context.md

component-catalog/
├── index.md
├── components/
├── snapshots/
└── CHANGELOG.md
```

不要把目标项目真实配置、组件清单或业务知识写入 VEAW `core/`。

---

## MCP 建议

优先使用 GitNexus：

```bash
gitnexus index .
```

目标项目未索引时，应明确降级为 `rg --files`、配置文件读取、目录扫描和 imports 分析。

---

## Claude 与 Codex 兼容

- Codex 通过 `.codex/AGENTS.md` 的 Skill Registry 调用 core 通用 Skill。
- Claude Code 通过 `.claude/CLAUDE.md` 和 `.claude/skills/*/SKILL.md` 工作。
- 不覆盖 `.claude/skills/*/SKILL.md`。
- 如需 Claude 自动识别新增 Skill，应新增 Claude 专用 Skill 并在 `.claude/CLAUDE.md` 注册。
