# 更新日志（Changelog）

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
