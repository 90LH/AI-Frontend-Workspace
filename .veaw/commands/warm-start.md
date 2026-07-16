# warm-start

> 在执行任何任务前加载并验证目标项目的完整 AI 上下文。

---

## Purpose

初始化 AI 会话，加载目标项目的 L0 层上下文文件，验证缓存 hash，确保 AI 与当前项目状态保持一致。

---

## When to Use

- 每次新会话开始时（强制）
- 上下文压缩或对话摘要后
- 切换目标项目时
- 执行高风险操作前的上下文核验

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `project_path` | 否 | 目标项目根目录路径，缺省时使用 CWD |

---

## Preconditions

- 目标项目已执行 `/project-onboarding`，存在 `.veaw/project.json`
- 未接入项目：先运行 `/project-onboarding`

---

## Execution Flow

1. 解析 `project_path`（未提供时使用 CWD）
2. 读取 `.veaw/project.json`（L0 — 必读）
3. 读取 `.veaw/session-log.md`（L0 — 若存在）
4. 验证缓存字段：`packageJsonHash`、`structureHash`、`catalogManifestHash`
   - hash 匹配 + git clean：跳过对应扫描，标记 context valid
   - hash 缺失或不匹配：标记 cache stale，记录具体字段
5. 读取 `.veaw/context.md`（补充项目上下文）
6. 若 `extensions` 包含 `component-intelligence`：确认 `.veaw/component-catalog/catalog.json` 可读（L1 可读性检查，不读内容）
7. 调用 GitNexus `list_repos` 确认索引可用性
8. 输出 Ready State 摘要

---

## Skills Called

无（warm-start 是 Skill 前置的上下文加载阶段，不调用 Skill）

---

## Agents Chain

无（由 AI 直接执行，不委托 Agent）

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `list_repos` | 确认当前项目是否已索引 |

仅确认可用性，不执行 query / context / impact。

---

## Session Log Update

```markdown
### warm-start
- 时间: <ISO 8601>
- 结论: context valid | cache stale (<字段列表>)
- catalog: ✅ readable | ⚠ missing
- GitNexus: ✅ indexed | ⚠ unavailable (fallback: rg)
- session: ready
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| `.veaw/project.json` 不存在 | 停止。提示：项目未接入，建议执行 `/project-onboarding` |
| hash 不匹配 | 继续，标记 cache stale，Session Log 记录具体字段 |
| GitNexus 不可用 | 继续，降级到 rg + 文件读取，Session Log 记录 |
| `.veaw/session-log.md` 不存在 | 按冷启动流程继续，不报错；建议执行 `document target=session-log` |

---

## Output

```
## Warm Start — <project_name>
- preset:     <vue-admin | vue-h5 | nuxt | ...>
- extensions: [<list>]
- catalog:    ✅ ready | ⚠ missing
- cache:      ✅ valid | ⚠ stale (<字段>)
- GitNexus:   ✅ indexed | ⚠ unavailable
- session:    ready
```

---

## Example

```
# 当前目录
warm-start

# 指定路径
warm-start project_path=D:\projects\my-app
```
