# new-page

> 创建新页面，包含路由注册、页面文件和私有组件脚手架。

---

## Purpose

在目标项目中创建一个完整的路由级页面，包括：页面 .vue 文件、路由配置注册、按需创建 Pinia store slice。

---

## When to Use

- 添加新的路由级页面
- 创建新的后台管理模块页面
- 搭建新 H5 页面

---

## Inputs

| 字段 | 必填 | 说明 |
|------|------|------|
| `page_name` | 是 | 页面名称（PascalCase 或 kebab-case） |
| `route_path` | 是 | 路由路径（如 `/users/profile`） |
| `description` | 是 | 页面功能描述 |
| `layout` | 否 | 使用的 Layout 组件，缺省取 Preset 默认值 |
| `store` | 否 | 是否创建 Pinia store slice，缺省 false |

---

## Preconditions

- `warm-start` 已完成，项目上下文已加载
- Preset 已加载（vue-admin 或 vue-h5）
- L1 Component Catalog 可读（用于复用检查）

---

## Execution Flow

1. `warm-start`（若当前会话未执行）
2. GitNexus `impact`：评估路由配置文件的影响范围
3. 读取 `.veaw/component-catalog/catalog.json`（L1）— 识别可复用组件
4. Architect：设计页面结构（Layout、组件列表、store slice 需求）
5. 输出方案供用户确认（Large 场景强制；Standard 可选）
6. Developer：调用 `vue-page-create` Skill 生成页面文件
7. Developer：在路由配置中注册新路由
8. 若 `store=true`：Developer 创建对应 Pinia store slice
9. Reviewer：验证 TypeScript 类型、路由注册、无回归
10. 更新 Session Log

---

## Skills Called

| Skill | 阶段 |
|-------|------|
| `vue-page-create` | 页面文件生成 |
| `component-analysis` | L1 catalog 读取（复用检查，只读） |

---

## Agents Chain

**Standard**（多文件 + 路由配置）：Architect → Developer → Reviewer

升级为 **Large** 的条件：新页面引入新模块、影响超过 5 个文件、需要架构方案。

---

## MCP Usage

| MCP | 调用 | 目的 |
|-----|------|------|
| GitNexus | `impact` on 路由配置文件 | 修改前影响评估 |
| GitNexus | `context` on 同类页面 | 参考已有页面结构模式 |
| Component Catalog | L1 read | 识别可复用组件 |

---

## Session Log Update

```markdown
### new-page: <page_name>
- route: <route_path>
- files: [<list>]
- components reused: [<list>] | none
- store: created | skipped
```

---

## Failure Handling

| 失败情况 | 处理 |
|----------|------|
| 路由路径冲突 | 停止。报告冲突路由，询问用户确认新路径 |
| Component Catalog 不存在 | 继续，跳过复用检查，Session Log 记录警告 |
| TypeScript 错误 | Developer 修复后再交 Reviewer |
| GitNexus 不可用 | 跳过影响评估，Session Log 记录降级原因 |

---

## Output

- 新页面文件已创建
- 路由配置已更新
- Session Log 已更新

---

## Example

```
new-page
  page_name: UserProfile
  route_path: /users/profile
  description: 展示并编辑用户个人信息

new-page page_name=OrderList route_path=/orders description="订单列表页" store=true
```
