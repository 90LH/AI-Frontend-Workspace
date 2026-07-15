# 提示词：创建 Vue3 列表页面

适用场景：需要创建包含搜索、分页、操作列的标准列表页面时使用。

---

## 提示词模板

```
请创建一个 Vue3 TypeScript 列表页面，用于管理 [实体名称]。

要求：
- 页面名称：[PAGE_NAME]（如 UserList）
- 路由路径：[ROUTE_PATH]（如 /user/list）
- 列表字段：[COLUMNS]
- 搜索条件：[SEARCH_FIELDS]
- 操作按钮：[ACTIONS]（如 查看、编辑、删除）

遵循：
- core/AGENTS.md 开发原则
- core/docs/coding-standard.md 编码规范
- core/docs/directory.md 目录规范

技术要求：
- 使用 <script setup lang="ts">
- 使用 Pinia 管理跨组件状态（如需要）
- 封装 useXxxList composable 管理列表逻辑
- 所有 Props 和 Emits 使用 defineProps<{}> / defineEmits<{}>
```

---

## 填写示例

```
请创建一个 Vue3 TypeScript 列表页面，用于管理用户。

要求：
- 页面名称：UserList
- 路由路径：/user/list
- 列表字段：姓名、邮箱、角色、创建时间、操作列
- 搜索条件：关键词（姓名/邮箱）、角色筛选
- 操作按钮：查看详情、编辑、删除（带确认弹窗）

遵循：core/AGENTS.md、coding-standard.md、directory.md

技术要求：
<script setup lang="ts">、Pinia userStore、useUserList composable
```
