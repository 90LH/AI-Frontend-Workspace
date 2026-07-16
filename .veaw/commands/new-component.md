# new-component

> 创建新的可复用 Vue3 组件，并自动更新 Component Catalog。

---

## Purpose

在目标项目中创建符合项目规范的可复用组件，同时将组件信息写入 `.veaw/component-catalog/catalog.json`，保持 Catalog 同步。

---

## When to Use

- 构建新的公共 UI 组件
- 创建功能型私有组件
- component-analysis 识别出 Catalog 中存在缺口时
- 避免重复造轮子（先确认 Catalog 中不存在）

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `component_name` | 是 | 组件名称（PascalCase） |
| `type` | 是 | `common` \| `layout` \| `page-private` |
| `description` | 是 | 组件功能描述 |
| `props` | 否 | Props 定义（字段名: 类型 = 默认值） |
| `slots` | 否 | Slot 定义列表 |
| `emits` | 否 | Emit 事件列表 |

---

## Preconditions

- `warm-start` 已完成
- L1 Component Catalog 已读（必须确认组件不存在重复）

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. 读取 `.veaw/component-catalog/catalog.json`（L1）— 重复检查
3. 若发现同名或高度相似组件：展示已有组件，询问用户：复用 / 创建变体 / 继续新建
4. Architect：设计组件 API（props、slots、emits、TypeScript 接口）
5. Developer：调用 `component-create` Skill 生成 .vue 文件及类型声明
6. Developer：调用 `component-catalog-maintenance` Skill 更新 catalog.json
7. Reviewer：验证 TypeScript 类型、无 Options API、props 校验完整

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `component-analysis` | 步骤 2–3：重复检查（只读） |
| `component-create` | 步骤 5：生成组件文件 |
| `component-catalog-maintenance` | 步骤 6：更新 Catalog |

---

## Agents Chain

**Standard**：Architect → Developer → Reviewer

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `context` on 同类组件 | 参考已有组件实现模式 |
| Component Catalog | L1 read | 重复检查 |
| Component Catalog | write（通过 Skill） | 更新 catalog.json |

---

## Session Log Update

```markdown
### new-component: <component_name>
- type: <common | layout | page-private>
- file: <路径>
- catalog: updated
- duplicate check: passed | override confirmed
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| Catalog 中存在重复组件 | 停止，展示已有组件，等待用户确认 |
| TypeScript 错误 | Developer 修复后再交 Reviewer |
| Catalog 写入失败 | 记录警告，提示用户手动执行 `component-analysis` |

---

## Output

- 新组件文件已创建
- `.veaw/component-catalog/catalog.json` 已更新
- Session Log 已更新

---

## Example

```
new-component
  component_name: DataTable
  type: common
  description: 带分页、排序、筛选的数据表格
  props: data:Array columns:Array loading:boolean=false
  emits: sort-change, page-change

new-component component_name=PageHeader type=layout description="页面顶部标题区域"
```
