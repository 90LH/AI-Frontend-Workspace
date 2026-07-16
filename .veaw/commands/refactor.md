# refactor

> 在保持行为不变的前提下，重构代码以提升可读性、可维护性或消除重复。

---

## Purpose

对指定目标进行代码重构，同步维护 Component Catalog 一致性。严格遵守 Minimal Change 原则，不重构任务范围外的代码。

---

## When to Use

- component-analysis 识别出重复组件或逻辑冗余
- 提取公共 composable / 工具函数
- 改善 TypeScript 类型精确度
- 功能完成后在任务范围内的代码整理

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `target` | 是 | 文件路径、组件名或代码区域 |
| `goal` | 是 | 重构目标描述（如"提取 useTableFilter composable"） |
| `scope` | 否 | `minimal`（只改 target）\| `module`（target 所在模块），缺省 `minimal` |

---

## Preconditions

- `warm-start` 已完成
- `impact-analysis` 已针对 `target` 完成（涉及公共组件时强制）

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. `impact-analysis target=<target> change_type=modify`
3. 若 impact 为 HIGH：输出重构方案，等待用户明确确认
4. Architect：设计重构方案（不超出 `scope` 边界）
5. Developer：调用 `code-review` Skill 记录重构前状态（快照）
6. Developer：执行重构，保持行为不变
7. 若组件接口变更：调用 `component-catalog-maintenance` Skill 同步 Catalog
8. Reviewer：验证行为保持不变、TypeScript 正确、无 Options API
9. 更新 Session Log

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `code-review` | 步骤 5：重构前快照 |
| `component-catalog-maintenance` | 步骤 7：Catalog 同步（仅组件接口变更时） |

---

## Agents Chain

- **Standard**：多文件、需要方案决策 → Architect → Developer → Reviewer
- **Large**：影响 >5 个文件或跨模块 → 完整 Agent 链，先输出方案确认

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `impact` | 重构前影响范围评估 |
| GitNexus | `context` | 分析目标 symbol 的依赖关系 |
| Component Catalog | L1 read | 确认组件 API 现状 |
| Component Catalog | write（通过 Skill） | 仅组件接口变更时 |

---

## Session Log Update

```markdown
### refactor: <target>
- goal: <一行描述>
- files changed: [<list>]
- catalog: updated | no change
- behavior: preserved (verified by Reviewer)
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| impact HIGH 未确认 | 暂停，输出方案，等待用户明确批准 |
| 重构引入 TypeScript 错误 | Developer 回退并重新实现，不向 Reviewer 提交 |
| Catalog 同步失败 | 记录警告，提示执行 `component-analysis update_catalog=true` |
| 超出 scope 边界 | Reviewer 拒绝，Developer 缩减变更范围 |

---

## Output

- 代码已重构（行为不变）
- Component Catalog 已同步（如适用）
- Session Log 已更新

---

## Example

```
refactor
  target: src/views/order/list.vue
  goal: 提取分页逻辑为 useOrderPagination composable

refactor target=UserCard goal="将 props 改为 TypeScript interface 声明" scope=minimal
```
