# release

> 发布前全面准备：代码审查、API 契约验证、CHANGELOG 生成、Session Log 归档。

---

## Purpose

在切出发布分支或合并 PR 前，系统验证本次发布范围内所有变更的质量和完整性，输出 ready / blocked 结论。

---

## When to Use

- 切出发布分支前
- 合并大型功能分支前
- 定期版本健康检查

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `version` | 是 | 目标版本号（如 `1.2.0`） |
| `scope` | 否 | 本次发布变更的文件或模块范围，缺省取 git diff since last tag |
| `changelog_entry` | 否 | CHANGELOG 草稿，未提供时自动生成 |

---

## Preconditions

- `warm-start` 已完成
- 本次发布的所有任务已在 Session Log 中记录完成

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. GitNexus `detect_changes`：列出自上次 tag 以来所有变更 symbol
3. `review` command：对所有变更文件执行代码审查
4. 若存在 critical 问题：停止，返回 Developer 修复
5. GitNexus `shape_check`：检查所有修改的 API 路由与消费方的响应结构匹配
6. GitNexus `api_impact`：识别 breaking API 变更
7. Architect：确认无未处理的 breaking 变更；若有，要求提供迁移说明
8. 读取 `.veaw/component-catalog/catalog.json`（L1）：确认 Catalog 与发布范围同步
9. 生成 `version` 的 CHANGELOG.md 条目
10. 更新 `.veaw/session-log.md`（发布记录）
11. 输出发布结论：ready | blocked

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `code-review` | 步骤 3（通过 `review` command） |
| `api-development` | 步骤 6：API 契约验证 |

---

## Agents Chain

**Standard**：Architect → Reviewer

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `detect_changes` | 枚举发布范围内所有变更 symbol |
| GitNexus | `shape_check` | API 响应结构与消费方匹配检查 |
| GitNexus | `api_impact` | Breaking API 变更识别 |
| Component Catalog | L1 read | 确认 Catalog 与发布同步 |

---

## Session Log Update

```markdown
### release: v<version>
- changed symbols: <N>
- review: passed | blocked (<N> critical)
- api contracts: ok | mismatch (<routes>)
- breaking changes: none | [<list>]
- catalog: in sync | stale
- changelog: generated | provided
- status: ✅ ready | ❌ blocked
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| critical review 问题 | 停止，列出问题，返回 Developer |
| API 结构不匹配 | 停止，报告不匹配路由，要求修复或添加迁移说明 |
| breaking 变更无迁移说明 | 停止，要求 Architect 提供迁移说明后继续 |
| GitNexus 不可用 | 记录降级，继续静态检查，最终结论标注 "GitNexus unavailable" |

---

## Output

```
## Release Preparation — v<version>
- changed symbols:  <N>
- review:           ✅ passed | ❌ blocked
- api contracts:    ✅ ok | ❌ mismatch (<N> routes)
- breaking changes: none | [<list>]
- catalog:          ✅ in sync | ⚠ stale
- changelog:        ✅ generated

---
conclusion: ✅ ready to release | ❌ blocked — <reason>
```

---

## Example

```
release version=1.2.0

release
  version: 2.0.0
  scope: src/api/ src/views/order/
  changelog_entry: "feat: 订单模块重构，API v2 接口上线"
```
