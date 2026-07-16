# review

> 对变更文件执行结构化代码审查，输出按优先级排列的问题清单。

---

## Purpose

通过 `code-review` Skill 对指定目标进行全面代码审查，输出 critical / major / minor / info 四级问题列表，并明确是否可以继续下一步。

---

## When to Use

- PR 合并前
- Developer Agent 完成实现后
- 任意文件或模块的按需质量检查
- `release` 命令的子步骤（自动调用）

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `target` | 是 | 文件路径、目录或 git diff 描述 |
| `focus` | 否 | `security` \| `types` \| `performance` \| `all`，缺省 `all` |
| `depth` | 否 | `quick`（快速浏览）\| `thorough`（深度审查），缺省 `thorough` |

---

## Preconditions

- `warm-start` 已完成

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. GitNexus `context` on 变更 symbol（了解引用关系）
3. 若有 API 路由变更：GitNexus `shape_check` 检测响应结构不匹配
4. Reviewer：调用 `code-review` Skill，按 `focus` 和 `depth` 分析 `target`
5. 生成结构化问题清单（按严重性排序）
6. 若存在 critical 问题：阻断，必须由 Developer 修复后重新 review
7. 更新 Session Log

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `code-review` | 步骤 4：核心审查 |

---

## Agents Chain

Reviewer（独立执行；若问题涉及架构决策，上升 Architect）

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `context` | 分析被审查 symbol 的引用上下文 |
| GitNexus | `shape_check` | API 响应结构与消费方匹配检查 |

---

## Session Log Update

```markdown
### review: <target>
- focus: <all | ...>
- findings: <N critical, N major, N minor, N info>
- status: passed | blocked (must fix N critical)
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| 存在 critical 问题 | 阻断，列出所有 critical 问题，要求 Developer 修复 |
| GitNexus 不可用 | 继续静态审查，跳过引用分析，Session Log 记录降级 |
| target 路径不存在 | 停止，要求用户确认路径 |

---

## Output

```
## Review — <target>
- focus: <all | ...>
- depth: <thorough | quick>

### Critical (<N>)
- [C1] <file:line> <描述>

### Major (<N>)
- [M1] <file:line> <描述>

### Minor (<N>)
- [m1] <file:line> <描述>

### Info (<N>)
- [I1] <描述>

---
status: ✅ passed | ❌ blocked (fix N critical issues first)
```

---

## Example

```
review target=src/views/user/profile.vue

review target=src/api/ focus=security depth=thorough

review target=src/components/DataTable.vue focus=types
```
