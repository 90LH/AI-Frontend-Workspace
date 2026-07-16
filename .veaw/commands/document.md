# document

> 生成或更新文档：Component Catalog 条目、API 文档、Session Log 或功能说明。

---

## Purpose

针对不同目标类型（catalog / api / session-log / feature）生成准确、与源码同步的文档内容。

---

## When to Use

- 新增组件后更新 Catalog
- API 变更后更新 API 文档
- 会话结束前归档 Session Log
- Session Log 缺失时初始化
- 完成功能后生成功能说明

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `target` | 是 | `catalog` \| `api` \| `session-log` \| `feature:<name>` |
| `scope` | 否 | 具体文件、组件名或路由路径（不指定则全量） |

---

## Preconditions

- `warm-start` 已完成（`catalog` / `session-log` target 时强制）

---

## Execution Flow

**target = catalog：**
1. 读取相关源文件（L2）
2. Developer 调用 `component-catalog-maintenance` Skill 更新 catalog.json
3. Reviewer 验证 Catalog 条目与源码一致

**target = api：**
1. 读取 API 路由文件（L2）
2. Developer 调用 `api-development` Skill 生成 API 文档注释或独立文档
3. Reviewer 验证 API 说明与实现一致

**target = session-log：**
1. 汇总当前会话执行的任务记录（来自 Session Log 各条目）
2. Developer 写入 `.veaw/session-log.md`（首次时创建文件）
3. 不需要 Reviewer

**target = feature:\<name>：**
1. 读取功能相关文件（L2）
2. Developer 生成功能文档，写入 `.veaw/<name>.md` 或 `core/docs/<name>.md`
3. Reviewer 验证准确性

---

## Skills Called

| Skill | 适用 target | 阶段 |
|-------|-------------|------|
| `component-catalog-maintenance` | `catalog` | 核心更新 |
| `api-development` | `api` | API 文档生成 |
| `design-analysis` | `feature` | 若有设计稿则提取设计说明 |

---

## Agents Chain

- **Micro**：`session-log` → Developer（直接执行）
- **Standard**：`catalog` / `api` / `feature` → Developer → Reviewer

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `context` on 被文档化的 symbol | 确认接口和引用关系 |

---

## Session Log Update

```markdown
### document: <target>
- scope: <all | specific>
- files updated: [<list>]
- status: complete
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| 源文件不存在 | 停止，报告具体缺失路径 |
| Catalog 写入冲突 | Reviewer 介入，以源码为准 |
| API 文档与实现不一致 | Reviewer 标记差异，Developer 修正 |

---

## Output

- 指定 target 的文档已创建或更新
- Session Log 已更新

---

## Example

```
# 更新 Catalog（全量）
document target=catalog

# 更新特定组件的 Catalog 条目
document target=catalog scope=DataTable

# 生成 API 文档
document target=api scope=src/api/user.ts

# 初始化或更新 Session Log
document target=session-log

# 生成功能说明
document target=feature:order-module
```
