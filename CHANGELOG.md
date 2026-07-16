# 更新日志（Changelog）

---

# v1.12.0（2026-07-16）Commands 系统

## 新增

- 新增：`.veaw/commands/` Command 库，作为跨项目（Claude Code / Codex CLI / ChatGPT）可复用的用户入口层，与 Skills（实现层）和 Agents（角色层）分离。
- 新增：`.veaw/commands/README.md`，Command Router 表 + Commands vs Skills 说明 + 统一模板字段定义（12 字段），作为 Command 注册的唯一真源（SSOT）。
- 新增：10 个 Command 定义文件：`warm-start`、`new-page`、`new-component`、`component-analysis`、`impact-analysis`、`bug-fix`、`refactor`、`review`、`release`、`document`，每个包含 Purpose / When to Use / Inputs / Preconditions / Execution Flow / Skills Called / Agents Chain / MCP Usage / Session Log Update / Failure Handling / Output / Example。
- 新增：`core/ai/router.md` Section 9 Command Router，仅做路由跳转（指向 `.veaw/commands/README.md`），不重复维护 Command 表格。

## 影响

- 未修改 `.claude/skills/*`、`.mcp/*` 或任何已有 Agent 定义文件；Commands 只编排已有 Skills 和 Agent 链，不包含实现逻辑。
- `core/ai/router.md` §1–§8 未改动，纯追加 §9，无破坏性变更。
- Commands 不存储真实项目数据；执行流程遵循 `User → Router → Command → Skills → Agents → MCP → Validation → Session Log`。

---

# v1.11.0（2026-07-16）架构约束：Component Catalog 迁移至 .veaw/

## 改进

- 架构约束：目标项目 Component Catalog 路径由根目录 `component-catalog/` 统一迁移至 `.veaw/component-catalog/`，与 `.veaw/` 知识层保持同一容器，避免真实业务目录分散在项目根目录。
- 改进：`core/ai/templates/project-profile.json` `paths.componentCatalog` 默认值由 `"component-catalog/"` 更新为 `".veaw/component-catalog/"`。
- 改进：`core/ai/router.md` §7、§8-A L1 和降级兜底规则同步更新路径。
- 改进：`core/ai/skills/`、`core/ai/workflows/`、`core/ai/agents/`、`extensions/component-intelligence/`、`examples/` 全部路径引用同步更新。
- 改进：soybean-admin `.veaw/project.json` `paths.componentCatalog` 同步更新为 `".veaw/component-catalog/"`；`.veaw/context.md` 标注 Catalog 已生成。
- 改进：`README.md` Roadmap 标记 Real Project Onboarding / Component Catalog 自动维护 / Incremental Cache 为 ✅。

## 影响

- 已接入目标项目的 `project.json` 需将 `paths.componentCatalog` 从 `"component-catalog/"` 更新为 `".veaw/component-catalog/"`。
- 物理目录也需迁移：`mv component-catalog .veaw/component-catalog`（已对 soybean-admin 执行）。
- `.claude/skills/*/SKILL.md` 中的旧路径引用不随此版本更改（约束：不修改 .claude/skills/ 入口文件）。

---

# v1.10.0（2026-07-16）Token Runtime Optimization

## 新增

- 新增：`core/ai/templates/session-log.md`，warm start 日志模板；定义写入规则（最近10条、每条≤5行、禁止写密钥/diff/代码片段）和用途边界（不替代 project.json / catalog.json / 源码事实）。

## 改进

- 改进：`core/ai/router.md` Section 8 全面扩展为三部分：
  - §8-A 事实文件优先规则：L0/L1/L2/L3 读取层级（L0 纳入 session-log warm start）、session-log 使用边界、降级兜底规则（含 session-log 缺失不报错）。
  - §8-B Cache 失效与跳过规则：6个 hash 字段的跳过条件（packageJsonHash / lockfileHash / structureHash / catalogManifestHash / catalogSnapshotId / lastOnboardingHash）+ 5条例外规则（git clean / git dirty / 缺失 / 不匹配 / 用户强制重扫）。
  - §8-C Agent 快速通道：Micro / Standard / Large 三级规模判断、Micro 禁止场景清单（8条）、高风险变更双侧出方案规则。
- 改进：`core/ai/templates/project-profile.json` cache 字段扩展，新增 `catalogManifestHash`、`catalogSnapshotId`、`lastOnboardingHash`、`lastUpdated`；`structureScope` 填充默认覆盖路径；移除旧 `catalogSnapshot` 嵌套对象。

## 影响

- 未改变任何 Skill/Workflow/Agent 行为或触发方式。
- 不生成真实业务项目的 `.veaw/session-log.md`，仅提供模板。
- `project.json` 已接入项目在下次 onboarding 校验时补充新 cache 字段。

---

# v1.9.0（2026-07-16）真实项目接入优化

## 新增

- 新增：`core/ai/templates/catalog-manifest.json`，Component Catalog 机器可读索引模板（SSOT for AI asset queries）。
- 新增：`core/ai/router.md` Section 8，定义读取预算层级（L0-L3）、事实文件优先规则和三条降级兜底规则（`project.json` 缺失 / `catalog.json` 缺失 / GitNexus 不可用）。

## 改进

- 改进：`core/ai/templates/project-profile.json` 新增 `cache` 字段（`packageJsonHash`、`lockfileHash`、`structureHash`、`structureScope`、`catalogSnapshot`），`catalogSnapshot` 指向 `catalog.json` 的 `lastVerified`，避免两个真源并存。
- 改进：`core/ai/templates/project-context.md` 精简为"架构特殊性与约定"纯人工上下文，移除与 `project.json` 重复的技术栈、Preset、Extension、目录结构表格，工具加载说明指向 `core/ai/router.md`。
- 改进：`core/ai/skills/component-analysis.md` 工作流 Step 2 改为先读 `catalog.json`，不存在时降级到 `index.md`，再调用 GitNexus。
- 改进：`core/ai/skills/component-catalog-maintenance.md` 工作流 Step 1 改为先读 `catalog.json`，不存在时降级到 `index.md`。
- 改进：`core/ai/router.md` Section 7 Component Catalog 接入规则，主读目标从 `index.md` 改为 `catalog.json`（降级到 `index.md`）。

## 影响

- 未改变任何 Skill/Workflow/Agent 的行为或触发方式；仅改变读取顺序（事实优先）与模板结构（减少重复字段）。
- `project.json` 模板新增 `cache` 字段，已接入项目需在下次 onboarding 校验时补充。

---

# v1.8.0（2026-07-16）Phase 7.5 架构优化（Token 优化重构）

本次为纯重构（Refactor），不改变任何 Skill/Agent/Workflow 的行为、Slash Command 或输出结果，仅去重、抽象和引用化。

## 新增

- 新增：`core/ai/router.md`，作为 Agent Router、Skill Registry、Workflow 入口、Preset 加载规则、Extension 加载规则、`.veaw/` 上下文加载、Component Catalog 接入的唯一真源（SSOT）。
- 新增：`core/AGENTS.md` Section 6 扩展为 MCP 优先级与降级策略的唯一真源，取代此前散落在 20+ 个文件中的重复表格。

## 改进（去重与抽象）

- 改进：`.claude/skills/` 下 5 个旧 Skill（`vue-page-create`、`component-create`、`api-development`、`bug-fix`、`code-review`）由全量重写改为 Thin Wrapper 模式，与新 4 个 Skill 保持一致；`core/ai/skills/*.md` 成为唯一执行逻辑真源。
- 改进：`.codex/AGENTS.md` 的 Agent Router（Section 4）、Skill Registry（Section 5）、Workflow 入口（Section 7）、Preset 加载规则（Section 9）、Extension 加载规则（Section 10）改为引用 `core/ai/router.md`，不再重复维护路由表。
- 改进：`.claude/CLAUDE.md` 对应 Section 3-8 同步改为引用 `core/ai/router.md`，与 Codex 侧保持单一真源。
- 改进：`core/ai/skills/*.md`、`core/ai/agents/*.md`、`core/ai/workflows/*.md` 中重复的 MCP 使用时机表格（36 处）统一改为引用 `core/AGENTS.md` Section 6，仅保留与全局默认不同的特例说明。
- 改进：非特例 Skill 的输出格式示例块统一改为引用 `core/AGENTS.md` Section 8 全局响应格式，code-review 等特殊输出格式的 Skill 保留独立说明。
- 改进：`core/CODEX.md` 的 MCP 工具优先级与降级策略（原 Section 3-4）合并为一节，引用 `core/AGENTS.md` Section 6。
- 改进：`core/ai/workflows/project-onboarding.md` 与 `core/ai/skills/project-onboarding.md` 中重复的 Preset/Extension 规则表格，以及过期的"Claude Code 兼容边界"（未同步 Claude 已有 project-onboarding Skill 的事实）改为引用 `core/ai/router.md` 并修正为当前状态。
- 改进：`core/ai/skills/README.md` 补充 Thin Wrapper 编写规范和 SSOT 引用说明。

## 影响

- 相关文件净减少约 880 行（`.claude/CLAUDE.md`、`.codex/AGENTS.md`、`core/CODEX.md`、`core/ai/skills/*`、`core/ai/agents/*`、`core/ai/workflows/*`、`.claude/skills/*`），新增 `core/ai/router.md` 160 行作为一次性维护成本。
- 未改变任何业务代码、`.mcp/mcp.json`、已有 Skill/Workflow/Agent 的行为或触发方式。

---

# v1.7.0（2026-07-15）

## 新增

- 新增：Claude Code 侧 4 个 Skill 入口文件（`.claude/skills/design-analysis/`、`component-analysis/`、`component-catalog-maintenance/`、`project-onboarding/`），与 `core/ai/skills/` 共享逻辑兼容。

## 改进

- 改进：`.claude/CLAUDE.md` 升级为 v1.7，补充 Agent Router（Section 3）、Workflow 入口（Section 4）、Preset 加载规则（Section 5）、Extension 加载规则（Section 6）、`.veaw/` 上下文加载（Section 7）、Component Catalog 接入（Section 8）。
- 改进：`.claude/CLAUDE.md` Skills 注册表从 5 个扩展至 9 个，与 `core/ai/skills/README.md` 对齐。
- 改进：`core/ai/skills/project-onboarding.md` 执行流程第 1 步由 Codex 偏向改为工具中性表述，同时列明 Codex / Claude Code / 通用规则三种读取路径。

---

# v1.6.0（2026-07-15）

## 新增

- 新增：Project Onboarding 标准工作流，用于真实项目接入、技术栈识别、Preset Activation、Extension Activation 和项目级上下文建立。
- 新增：Project Onboarding Skill，用于执行真实项目接入流程。
- 新增：项目级 Profile / Context 模板，用于目标项目 `.veaw/` 知识层。
- 新增：Component Intelligence 的真实项目 Catalog 接入说明，用于首次生成和持续维护目标项目 `component-catalog/`。
- 新增：Vue Project Onboarding 示例文档。

## 改进

- 改进：Codex Agent Router、Skill Registry 和 Workflow 入口注册 Project Onboarding。
- 改进：补充 Preset 自动选择、冲突处理和 Extension 激活规则。
- 改进：明确真实项目级知识写入目标项目 `.veaw/` 与 `component-catalog/`，不写入 VEAW core。
- 改进：修正 examples 中过期的 `core/presets/` 路径说明。
- 改进：补充 Claude Code 与 Codex 的项目级上下文兼容边界。

---

# v1.5.0（2026-07-15）

## 新增

- 新增：组件资产目录，用于沉淀已验证的项目组件信息。
- 新增：组件目录维护 Skill，用于校验并维护组件资产索引。
- 新增：组件目录维护工作流，用于在组件变更后校验并更新资产索引。
- 新增：组件资产目录模板，用于统一组件条目的数据结构。
- 新增：组件智能扩展规则，用于描述团队级 Catalog 分类、映射和维护约定。
- 新增：首次组件资产盘点快照，记录当前仓库未发现真实业务组件目录。

## 改进

- 改进：Component Analyst 增加读取 Catalog、校验 Catalog、输出差异报告和触发更新建议的职责。
- 改进：Codex Agent Router 增加组件目录、组件资产更新、组件资产校验、组件快照、组件索引、组件变更记录任务路由。
- 改进：Codex 核心规则增加组件目录维护调度说明。
- 改进：共享 Skill 索引增加 component-catalog-maintenance。

---

# v1.4.0（2026-07-15）

## 新增

- 新增：**组件资产分析 Agent**，用于识别项目中可复用的组件资源。
- 新增：**组件分析 Skill**，用于输出组件资产范围、组件分类、组件接口摘要、引用关系以及相似组件分析。
- 新增：**组件智能工作流（Component Intelligence Workflow）**，将组件分析、架构评估、开发实现和代码审查串联为统一流程。
- 新增：**组件智能扩展（Component Intelligence Extension）**，用于沉淀组件资产盘点、组件映射以及组件复用决策规则。

## 改进

- 改进：**Codex Agent Router** 新增组件资产、组件盘点、组件分析、组件映射、组件复用、组件库（Component Catalog）以及组件智能（Component Intelligence）等任务的自动路由能力。
- 改进：完善 **Codex 核心规则（Core Rules）**，增加 Component Intelligence 的调度策略和执行说明。
- 改进：更新共享 Skill 索引，新增 **component-analysis** 能力模块。

---

# v1.3.0

## 新增

- 新增：**设计 Agent（Design Agent）**，负责设计分析及设计规范输出。
- 新增：**设计分析 Skill（Design Analysis Skill）**，用于解析设计稿、页面结构和组件关系。
- 新增：**Design-to-Code 工作流**，支持从设计稿到代码的自动转换流程。
- 新增：**设计扩展（Design Extension）**，提供设计规范与开发规范的统一能力。

## 架构调整

企业级 AI Agent 架构升级为：

- 设计 Agent（Designer Agent）
- 架构 Agent（Architect Agent）
- 开发 Agent（Developer Agent）
- 代码审查 Agent（Reviewer Agent）

通过多 Agent 协作，实现设计、架构、开发与审查全流程覆盖。

---

# v1.2.0

## 新增

- 新增：**Codex Agent Router**，统一负责 Agent 调度和任务分发。
- 新增：**架构 Agent（Architect Agent）**。
- 新增：**开发 Agent（Developer Agent）**。
- 新增：**代码审查 Agent（Reviewer Agent）**。
- 新增：**Workflow Orchestration（工作流编排）**，支持多 Agent 自动协作。
- 新增：**共享 AI Skill Layer（共享能力层）**，统一管理 AI Skills。
- 新增：**MCP Priority Execution（MCP 优先执行机制）**，优先调用已配置的 MCP 服务。

## 改进

- 优化 Claude Code 与 Codex 的共享架构，提高不同 AI 工具之间的一致性。
- 优化多 Agent 的执行流程，提升任务调度稳定性和协作效率。

---

# v1.0.0（2026-07-15）

## 新增

- 初始化 AI Workspace 企业级工作区。
- 新增 Claude Code Skills 能力体系。
- 新增 Codex AGENTS 企业级规范。
- 新增 MCP 配置（GitNexus、Context7、Playwright）。
- 新增 Core AI Rules（AI 核心开发规范）。
- 新增 Vue Admin 企业后台预设。
- 新增 Vue H5 移动端预设。
- 新增 Nuxt 项目预设。
- 新增 React Admin 企业后台预设。
- 新增 Electron 桌面应用预设。

## 功能

- AI 工作流（AI Workflow）
- 页面自动生成
- API 自动开发
- Bug 智能修复
- Code Review（代码审查）

## 文档

- 架构设计文档（Architecture）
- 编码规范（Coding Standard）
- 项目目录指南（Directory Guide）
