# CLAUDE.md — VEAW Claude Code Rules

> Claude Code 项目入口规则文件。
> 本文件由 Claude Code 自动加载，规定 AI 在本项目中的行为边界。

---

## 1. 核心规范

所有行为遵循 [`core/AGENTS.md`](../core/AGENTS.md)。

优先级：本文件 > AGENTS.md > Claude 默认行为

---

## 2. Skills 注册

本项目启用以下 Skills。收到对应触发指令时，按 Skill 定义的步骤执行。

| Skill | 触发指令 | 定义文件 |
|-------|----------|----------|
| vue-page-create | `/vue-page-create` | [skills/vue-page-create/SKILL.md](skills/vue-page-create/SKILL.md) |
| component-create | `/component-create` | [skills/component-create/SKILL.md](skills/component-create/SKILL.md) |
| api-development | `/api-development` | [skills/api-development/SKILL.md](skills/api-development/SKILL.md) |
| bug-fix | `/bug-fix` | [skills/bug-fix/SKILL.md](skills/bug-fix/SKILL.md) |
| code-review | `/code-review` | [skills/code-review/SKILL.md](skills/code-review/SKILL.md) |

### Skill 调用规则

- 收到 `/skill-name` 指令后，**必须先读取对应 SKILL.md**，再开始执行
- 按 SKILL.md 中「输入要求」检查用户是否提供了必要信息，缺失时主动询问
- 按 SKILL.md 中「执行步骤」顺序执行，不跳过步骤
- 按 SKILL.md 中「输出格式」输出结果

---

## 3. MCP 调用顺序

每次任务按以下顺序决定是否调用 MCP：

```
1. GitNexus   — 理解代码结构（先查关系，再读代码）
2. Context7   — 查询官方文档（有 API 疑问时调用）
3. Playwright — 验证结果（代码修改后在浏览器中验证）
```

规则：
- 不并行调用多个 MCP，按上述顺序串行
- GitNexus 有结果时，不重复用 grep/find 搜索
- Context7 只用于查询官方文档，不用于分析业务代码
- Playwright 只在代码变更后调用，不用于探索阶段

---

## 4. 代码修改安全规则

### 修改前必须

- 阅读并理解相关文件（不猜测实现）
- 用 GitNexus 分析修改影响范围
- 确认修改范围最小化（Minimal Change 原则）

### 禁止操作

- 删除文件（需用户明确确认）
- 修改 git 历史
- 修改生产环境配置
- 重构与当前任务无关的代码
- 在未被要求时添加新依赖

### 高风险操作（执行前说明影响并等待确认）

- 修改路由配置
- 修改全局状态（Pinia store 结构变更）
- 修改公共组件（影响多个页面）
- 修改 API 层接口签名

### 安全修改原则

- 优先复用已有组件、hooks、工具函数
- 不引入 `any` 类型
- 不使用 Options API
- 新增代码必须通过 TypeScript 类型检查

---

## 5. 响应格式

所有任务响应使用 AGENTS.md Section 8 定义的格式：

```
## 理解
## 计划
## 变更
## 验证
## 遗留风险
```
