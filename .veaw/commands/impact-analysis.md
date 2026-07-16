# impact-analysis

> 在执行任何修改前评估变更的影响范围，输出风险等级和受影响文件列表。

---

## Purpose

通过 GitNexus 调用图分析目标 symbol / 文件的上游依赖，生成风险报告，决定应使用 Micro / Standard / Large Agent 链。

---

## When to Use

- 修改公共组件前（必须）
- 修改 API 签名前（必须）
- 修改路由配置前（必须）
- 修改 Pinia store 结构前（必须）
- `new-page`、`new-component`、`bug-fix`、`refactor` 内部自动调用

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `target` | 是 | symbol 名、文件路径或组件名 |
| `change_type` | 是 | `modify` \| `rename` \| `delete` \| `add-prop` \| `change-api` |
| `depth` | 否 | 影响遍历深度，缺省 3 |

---

## Preconditions

- `warm-start` 已完成
- GitNexus 已索引（推荐；GitNexus 不可用时降级到 rg）

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. GitNexus `impact` on `target`（maxDepth = `depth`）
3. GitNexus `context` on `target`（获取调用方 / 被调用方图）
4. 若 `change_type=change-api`：额外调用 GitNexus `api_impact`
5. Architect：按 §8-C 规则判定风险等级（LOW / MEDIUM / HIGH）
6. 输出报告：受影响文件列表、受影响路由、风险等级、推荐 Agent 链
7. 若 HIGH：暂停，输出完整方案，等待用户明确确认后才继续
8. 更新 Session Log

---

## Skills Called

无（impact-analysis 是实现前的检查阶段，不产生代码变更）

---

## Agents Chain

Architect（仅分析；不委托 Developer）

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `impact` | 影响范围遍历 |
| GitNexus | `context` | 调用方 / 被调用方图 |
| GitNexus | `api_impact` | 仅 `change-api` 时，检查 API 消费方 |
| rg + 文件读取 | — | GitNexus 不可用时的降级路径 |

---

## Session Log Update

```markdown
### impact-analysis: <target>
- change_type: <modify | ...>
- risk: LOW | MEDIUM | HIGH
- affected files: [top 5]
- affected routes: [<list>] | none
- recommendation: Micro | Standard | Large
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| GitNexus 不可用 | 降级到 rg，风险等级保守提升为 MEDIUM（最低） |
| target 未找到 | 停止，要求用户确认 target 名称或路径 |
| HIGH 风险已确认 | 输出完整执行计划，等待用户明确批准，不自动继续 |

---

## Output

```
## Impact Analysis — <target>
- change_type:    <modify | ...>
- risk:           LOW | MEDIUM | HIGH
- affected files: <N>
  - <file:line> (<depth> hops)
  - ...
- affected routes: [<list>] | none
- recommendation: Micro | Standard | Large agent chain
```

---

## Example

```
impact-analysis target=UserCard change_type=add-prop

impact-analysis target=src/api/user.ts change_type=change-api depth=5

impact-analysis target=usePermission change_type=modify
```
