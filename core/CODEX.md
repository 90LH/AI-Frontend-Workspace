# Codex CLI 规则

> 本文件为 Codex CLI 专属指令。
> 主规则见 [AGENTS.md](AGENTS.md)，本文件仅记录 Codex 特有行为。

---

## 适用工具

- OpenAI Codex CLI
- ChatGPT（代码模式）

---

## 任务执行规则

### 开始任务前

```bash
# 了解项目结构
ls src/
cat workspace.json

# 了解当前变更
git status
git diff
```

### 代码生成规则

- 生成 Vue3 组件时使用 `<script setup lang="ts">`
- 生成函数时必须包含完整 TypeScript 类型
- 不生成 `any` 类型
- 不使用 Options API

### 文件修改规则

- 每次只修改完成任务所需的最少文件
- 修改前输出将要修改的文件列表，等待确认
- 不自动重构无关代码

---

## MCP 等效操作

Codex CLI 无 MCP 支持时，使用以下替代：

| 目标 | 替代方式 |
|------|----------|
| 理解代码关系 | `grep -r "FunctionName" src/` |
| 查询文档 | 提问时附上具体 API 名称 |
| 验证结果 | 描述测试步骤，由用户手动验证 |

---

## 输出格式

与 AGENTS.md Section 8 保持一致：

```
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```
