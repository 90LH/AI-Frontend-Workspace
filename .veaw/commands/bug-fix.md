# bug-fix

> 系统性地定位、诊断并以最小变更修复一个 Bug。

---

## Purpose

通过 GitNexus 调用链分析和精准文件读取，找到 Bug 根因，使用 `bug-fix` Skill 执行最小化修复，并经 Reviewer 验证无回归。

---

## When to Use

- 修复用户报告的 Bug 或测试失败
- 排查意外的运行时行为
- 解决 TypeScript 编译错误或 lint 错误

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `description` | 是 | Bug 描述 / 错误信息 |
| `file` | 否 | 观察到 Bug 的文件路径 |
| `reproduction` | 否 | 复现步骤 |

---

## Preconditions

- `warm-start` 已完成

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. 若 `file` 已知：调用 `impact-analysis target=<file> change_type=modify`
3. GitNexus `context` on 疑似 symbol，`trace` 追踪调用链
4. Developer：读取相关文件，定位根因
5. Developer：调用 `bug-fix` Skill，执行最小化修复（不重构周边代码）
6. Reviewer：验证修复不引入回归，TypeScript 类型正确
7. 更新 Session Log

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `bug-fix` | 步骤 5：修复实现 |

---

## Agents Chain

- **Micro**：单文件、逻辑明确、不涉及公共组件 → Developer → Reviewer
- **Standard**：涉及多文件或公共组件 → Architect → Developer → Reviewer

按 `impact-analysis` 结果自动选择。

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `context` | 分析疑似 symbol 的引用关系 |
| GitNexus | `trace` | 追踪从触发点到 Bug 位置的调用链 |
| GitNexus | `pdg_query` | 复杂逻辑分支的数据流分析（可选） |

---

## Session Log Update

```markdown
### bug-fix: <description 摘要>
- file: <path:line>
- root cause: <一行描述>
- fix: <一行描述>
- risk: low | medium
- agent chain: Micro | Standard
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| 无法定位根因 | 输出已排查路径，询问用户提供更多上下文或复现步骤 |
| 修复引入新 TypeScript 错误 | Developer 重新修复，不交 Reviewer |
| impact-analysis 为 HIGH | 升级为 Standard，输出方案，等待用户确认 |
| GitNexus 不可用 | 降级到 rg + 文件读取，继续排查 |

---

## Output

- Bug 已修复（最小化变更）
- 无新引入 TypeScript 错误
- Session Log 已更新

---

## Example

```
bug-fix description="点击保存后表单数据被重置"

bug-fix
  description: 列表页分页跳转后滚动位置不重置
  file: src/views/order/list.vue
  reproduction: 1. 进入订单列表 2. 翻到第3页 3. 点击详情返回 4. 页面未回到顶部
```
