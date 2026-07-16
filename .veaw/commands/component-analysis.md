# component-analysis

> 盘点、分析目标项目的组件资产，识别复用机会、重复项和 Catalog 缺口。

---

## Purpose

对目标项目的组件资产进行全面分析，生成结构化报告，并在需要时更新 Component Catalog。

---

## When to Use

- 开始新功能前（检查可复用组件）
- 定期组件健康检查
- `new-component` 执行前的重复检查
- Catalog 过期或缺失时重建

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `scope` | 否 | `all` \| `common` \| `layout` \| `page-private`，缺省 `all` |
| `focus` | 否 | 指定组件名或匹配模式（如 `Table*`） |
| `output_type` | 否 | `summary` \| `full` \| `reuse-map`，缺省 `summary` |
| `update_catalog` | 否 | 是否同步更新 Catalog，缺省 false |

---

## Preconditions

- `warm-start` 已完成

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. 读取 `.veaw/component-catalog/catalog.json`（L1）
   - 若 Catalog 不存在：Component Analyst 扫描源目录 .vue 文件
3. GitNexus `context`：对关键组件 symbol 分析调用方和引用关系（可选，GitNexus 可用时）
4. Component Analyst：按 `scope` 分析组件，识别重复、缺口、高复用候选
5. 生成报告（格式由 `output_type` 决定）
6. 若 `update_catalog=true`：调用 `component-catalog-maintenance` Skill 同步更新 Catalog
7. 更新 Session Log

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `component-analysis` | 步骤 4：核心分析 |
| `component-catalog-maintenance` | 步骤 6：Catalog 更新（仅 `update_catalog=true`） |

---

## Agents Chain

Component Analyst → Reviewer（仅在 `update_catalog=true` 且有写操作时需要 Reviewer）

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `context` on 组件 symbol | 分析引用关系和调用方 |
| Component Catalog | L1 read | 读取现有 Catalog |
| Component Catalog | write（通过 Skill） | 仅 `update_catalog=true` 时 |

---

## Session Log Update

```markdown
### component-analysis
- scope: <all | ...>
- components found: <N>
- duplicates: [<list>] | none
- gaps: [<list>] | none
- catalog: updated | no change
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| Catalog 不存在 | 降级到源码扫描，完成后建议执行 `document target=catalog` |
| GitNexus 不可用 | 跳过引用关系分析，仅做静态分析，Session Log 记录降级 |
| 源码目录不可读 | 停止，报告具体路径错误 |

---

## Output

**summary 模式：**

```
## Component Analysis — <project_name>
- total: <N>
- common: <N> | layout: <N> | page-private: <N>
- duplicates: <N> (<list>)
- reuse candidates: [<list>]
- catalog: up-to-date | stale
```

**reuse-map 模式：** 以表格输出每个组件的使用频次和引用文件列表。

---

## Example

```
component-analysis

component-analysis scope=common output_type=reuse-map

component-analysis focus=Table* update_catalog=true
```
