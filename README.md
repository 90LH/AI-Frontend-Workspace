# VEAW

> **Vue Enterprise AI Workspace**
> 一个面向 Vue3 企业级项目的 AI 开发工作区，提供统一的 AI Workflow、Skills、Agents、Project Onboarding 和 Component Catalog，帮助 AI 更快理解项目、减少上下文消耗并提升开发效率。

---

## ✨ 核心能力

* 🤖 多 AI 工具统一支持

  * Claude Code
  * Codex CLI
  * ChatGPT

* 🧩 AI Workflow

  * Skills
  * Agents
  * Workflows
  * Presets
  * Extensions

* 📦 Project Onboarding

  * 自动建立项目上下文
  * 生成项目元数据
  * 构建组件目录（Component Catalog）

* 🔍 项目理解

  * GitNexus（代码关系检索）
  * Context7（官方文档检索）
  * Playwright（页面验证）

---

## 📁 推荐目录结构

```text
project/
│
├── .codex/
├── .claude/
├── core/
│   ├── ai/
│   │   ├── skills/
│   │   ├── agents/
│   │   ├── workflows/
│   │   ├── presets/
│   │   └── extensions/
│   └── docs/
│
├── .veaw/                          # 项目元数据（接入后生成）
│   └── component-catalog/          # 组件目录（接入后生成）
└── README.md
```

---

## 🚀 AI 工作流

```text
用户需求
      │
      ▼
Agent Router
      │
      ▼
Workflow
      │
      ▼
Skill
      │
      ▼
GitNexus / Context7 / Playwright
      │
      ▼
代码生成 / 修改 / 验证
```

---

## 🔧 支持工具

| 工具          | 用途             |
| ----------- | -------------- |
| Claude Code | AI 编程与工程执行     |
| Codex CLI   | 多步骤任务执行        |
| ChatGPT     | 架构设计、方案评审、知识辅助 |
| GitNexus    | 项目结构与引用关系检索    |
| Context7    | 官方文档与 API 检索   |
| Playwright  | 页面验证与自动化测试     |

---

## 🎯 设计原则

* Single Source of Truth（SSOT）
* 按需加载（On-demand Loading）
* Skills、Agents、Workflow 解耦
* Claude 与 Codex 共用 Core
* 不修改业务代码即可接入
* 支持增量维护与长期演进

---

## 📌 Roadmap

* ✅ AI Skills
* ✅ Agents
* ✅ Workflows
* ✅ Presets
* ✅ Extensions
* ✅ Project Onboarding
* ✅ Real Project Onboarding
* ✅ Component Catalog 自动维护
* ✅ Incremental Cache
* ⏳ Context Index
