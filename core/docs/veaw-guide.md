# VEAW 用户手册

> Vue Enterprise AI Workspace — 面向 Vue3 企业级前端项目的 AI 开发工作区。
>
> 本文档适用于使用 Claude Code 或 Codex CLI 接入 VEAW 的开发者。

---

## 1. 概述

VEAW 是一套多 AI 工具统一规范，将 Claude Code、Codex CLI、ChatGPT 接入同一套 Workflow / Skill / Agent 体系。目的是让 AI 更快理解项目、减少重复上下文、规范操作边界。

核心组件：

| 组件 | 说明 |
|------|------|
| Skills | 标准化任务执行单元（组件分析、页面创建、Bug 修复等） |
| Agents | 职责分离的执行角色（Architect / Developer / Reviewer 等） |
| Workflows | 跨 Agent 的端到端任务流程 |
| Presets | 按项目类型激活的规则集（vue-admin / vue-h5 / nuxt 等） |
| Extensions | 可叠加的团队级规则（design / component-intelligence） |
| Component Catalog | 项目组件资产索引，位于目标项目 `.veaw/component-catalog/` |

---

## 2. 目录结构

```text
project/               ← 目标项目根目录
├── .veaw/             ← VEAW 为该项目生成的知识层（接入后由 AI 写入）
│   ├── project.json   ← 项目元数据（技术栈、Preset、Extension、Catalog 路径）
│   ├── context.md     ← 项目级 AI 上下文补充说明
│   ├── session-log.md ← Warm start 日志（最近10条任务，不是事实来源）
│   └── component-catalog/    ← 组件资产索引
│       ├── catalog.json      ← 机器可读索引（SSOT）
│       ├── index.md          ← 人类可读索引
│       ├── components/       ← 各组件详细条目
│       ├── snapshots/        ← 历史快照
│       └── CHANGELOG.md

veaw/                  ← VEAW 工作区自身（通常是独立仓库）
├── .claude/           ← Claude Code 入口
│   └── skills/*/SKILL.md
├── core/              ← 通用规则、模板、文档（所有工具共用）
├── presets/           ← Preset 规则集
├── extensions/        ← Extension 规则集
└── examples/          ← 接入示例
```

---

## 3. 快速接入（Project Onboarding）

### 前置条件

1. 已有真实目标项目路径（例如 `D:/projects/soybean-admin`）
2. 目标项目允许写入 `.veaw/` 目录
3. VEAW 已配置好 `.claude/CLAUDE.md`（Claude Code）或 `.codex/AGENTS.md`（Codex）

### Claude Code 接入步骤

```
/project-onboarding
```

执行后 AI 将自动：
1. 读取目标项目 `package.json`、lockfile、构建配置和目录结构
2. 选择 Preset（vue-admin / vue-h5 / nuxt / react-admin / electron）
3. 按需激活 Extension（design / component-intelligence）
4. 在目标项目写入 `.veaw/project.json` 和 `.veaw/context.md`
5. 如启用 component-intelligence，生成 `.veaw/component-catalog/`

### Codex CLI 接入步骤

```bash
codex "执行 project-onboarding，目标项目路径为 D:/projects/soybean-admin"
```

---

## 4. Preset 自动选择规则

| 证据 | 选择 Preset |
|------|-------------|
| `nuxt.config.*` 或 nuxt 依赖 | `presets/nuxt/` |
| electron 依赖或主进程目录 | `presets/electron/` |
| Vue3 + Vite + Element Plus + 管理端特征 | `presets/vue-admin/` |
| Vue3 + Vite + Vant + 移动端特征 | `presets/vue-h5/` |
| React + Vite + Ant Design + 管理端特征 | `presets/react-admin/` |

规则来源：`core/ai/router.md` §4。用户可明确指定 Preset 覆盖自动选择。

---

## 5. Extension 激活规则

| 触发条件 | Extension |
|----------|-----------|
| 需要组件盘点、组件复用分析、Component Catalog、组件治理 | `component-intelligence` |
| 需要 Figma 接入、截图还原、Design Token、设计组件映射 | `design` |

只有存在 `extensions/<name>/EXTENSION.md` 的扩展才允许激活。扩展可同时启用。

---

## 6. Skills 使用指南

### 使用方式（Claude Code）

输入 `/skill-name`，例如 `/component-analysis`。AI 将读取对应 SKILL.md 后执行。

### 可用 Skills

| 触发指令 | 功能 |
|----------|------|
| `/project-onboarding` | 真实项目接入（技术栈识别、Preset、Extension、.veaw/ 生成） |
| `/component-analysis` | 组件资产盘点、分类、接口摘要、复用决策 |
| `/component-catalog-maintenance` | 维护 Component Catalog（新增、变更、校验、快照） |
| `/component-create` | 创建新 Vue 组件（遵循 Preset 规范） |
| `/vue-page-create` | 创建新页面及其私有组件 |
| `/api-development` | API 层开发（接口定义、请求封装） |
| `/bug-fix` | Bug 定位与修复 |
| `/code-review` | 代码审查，输出问题清单 |
| `/design-analysis` | 设计稿分析与组件映射 |

---

## 7. Agents 职责

| Agent | 职责 | 何时介入 |
|-------|------|----------|
| Architect | 架构评估、技术方案、分类边界 | 新功能设计、重构判断、公共组件变更 |
| Developer | 代码实现 | Architect 产出方案后 |
| Reviewer | 代码审查、Catalog 一致性校验 | 实现完成后 |
| Component Analyst | 组件资产分析、复用决策 | 开发前、组件盘点、Design-to-Code |

Agent 快速通道规则（见 `core/ai/router.md` §8-C）：
- **Micro**（1-2 文件，低风险）：Developer → Reviewer
- **Standard**（3-10 文件）：Architect → Developer → Reviewer
- **Large**（10+ 文件，或公共组件 / 路由 / 全局状态变更）：完整 Agent 链

---

## 8. Component Catalog

### 路径约定

目标项目的 Component Catalog 必须放在 `.veaw/component-catalog/`，不放在项目根目录。

```
project/.veaw/component-catalog/
├── catalog.json    ← 机器可读索引（SSOT）
├── index.md        ← 人类可读索引
├── components/     ← 各组件详细条目（*.md）
├── snapshots/      ← 历史快照
└── CHANGELOG.md    ← 变更记录
```

### 读取时机

- L1 层（组件相关 Skill 开始时）：读取 `.veaw/component-catalog/catalog.json`
- 不存在时降级到 `.veaw/component-catalog/index.md`
- 两者均不存在时从源码目录扫描

### 维护触发事件

- 组件新增 / Props / Emits / Slots / Expose 变更
- 组件迁移、删除、重命名或废弃
- 页面引用关系变化

维护 Skill：`/component-catalog-maintenance`

---

## 9. MCP 工具优先级

遵循 `core/AGENTS.md` §6，串行使用，不并行调用：

1. **GitNexus**（首选）：代码关系检索、引用分析、影响范围、相似组件
2. **Context7**（次选）：第三方 UI 组件库官方文档检索
3. **Playwright**（最后）：页面验证，仅在实际页面实现后使用

GitNexus 降级条件：未索引 或 工具不可用 → 改用 `rg + 文件读取`，并说明降级原因。

---

## 10. 读取预算（L0/L1/L2/L3）

| 层级 | 文件 | 时机 |
|------|------|------|
| L0（必读） | `.veaw/project.json`、`.veaw/session-log.md`（如存在） | 任务开始 |
| L1（按需） | `.veaw/component-catalog/catalog.json` | 组件相关 Skill 开始时 |
| L2（精准） | 报错堆栈相关文件、catalog 命中的组件文件 | 实现阶段 |
| L3（规范补充） | `core/ai/skills/*`、`presets/*`、`extensions/*` | onboarding、行为不确定、高风险修改 |

只有 onboarding、行为不确定、高风险修改、缓存 hash 不匹配或用户要求解释规范时才展开 L3。

---

## 11. Session Log（Warm Start）

`.veaw/session-log.md` 用于下一次 session 快速恢复上下文。

**写入规则：**
- 最多保留 10 条任务记录
- 每条任务最多 5 行
- 不写完整 diff / 代码片段 / 密钥 / token
- 与 project.json 冲突时，以 project.json 为准

**SSOT 优先级：**`project.json` > `catalog.json` > 源码 > `session-log.md`

---

## 12. 缓存失效规则

`project.json` 的 `cache` 对象包含6个 hash 字段：

| 字段 | 说明 |
|------|------|
| `packageJsonHash` | 依赖变更时失效 |
| `lockfileHash` | lockfile 变更时失效 |
| `structureHash` | 目录结构变更时失效 |
| `catalogManifestHash` | catalog.json 变更时失效 |
| `catalogSnapshotId` | 快照 ID（格式：`v1-YYYY-MM-DD`） |
| `lastOnboardingHash` | 上次 onboarding 时的 structureHash |

hash 未变时可跳过对应扫描；git clean / dirty / hash 不匹配时强制重扫。

---

## 13. 安全约束（禁止操作）

- 不修改 `.mcp/mcp.json`
- 不修改 `.claude/skills/*/SKILL.md`
- 不把目标项目真实配置或组件数据写入 VEAW `core/`
- 不在未确认的目标项目中生成真实 `.veaw/project.json` 或 Catalog 数据
- 不提交 git（需用户明确要求）
- 不删除文件（需用户明确确认）

---

## 14. 常见问题

**Q: GitNexus 显示 FTS indexes missing？**
A: 运行 `gitnexus analyze --repair-fts` 修复（需联网）；修复前降级使用 `rg + 文件读取`，在 `project.json` 的 `mcp.gitnexus.fallback` 字段记录降级原因。

**Q: 如何强制重新 onboarding？**
A: 删除目标项目 `.veaw/project.json` 后重新运行 `/project-onboarding`，或直接告知 AI "重新执行 project-onboarding"。

**Q: 添加新组件后如何更新 Catalog？**
A: 运行 `/component-catalog-maintenance`，告知 AI 新增了哪个组件及其路径。

**Q: Preset 自动选择错误怎么办？**
A: 直接告知 AI "使用 `<preset-name>` Preset"，AI 会覆盖自动选择结果并更新 `project.json`。

**Q: component-catalog 可以放在项目根目录吗？**
A: 不可以。VEAW v1.11.0+ 要求必须放在 `.veaw/component-catalog/`。已有项目需迁移：`mv component-catalog .veaw/component-catalog`，并更新 `project.json` 的 `paths.componentCatalog` 为 `".veaw/component-catalog/"`。

