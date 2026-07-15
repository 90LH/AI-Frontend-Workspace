# 提示词：创建 Vue3 表单页面

适用场景：需要创建包含表单验证和提交的创建/编辑页面时使用。

---

## 提示词模板

```
请创建一个 Vue3 TypeScript 表单页面，用于 [新建/编辑] [实体名称]。

要求：
- 页面名称：[PAGE_NAME]（如 UserForm）
- 路由路径：[ROUTE_PATH]（如 /user/create 或 /user/:id/edit）
- 表单字段：[FIELDS]
- 验证规则：[VALIDATION]
- 提交行为：[SUBMIT_ACTION]（如 调用创建 API / 更新 API）
- 取消行为：[CANCEL_ACTION]（如 返回列表页）

遵循：
- core/AGENTS.md 开发原则
- core/docs/coding-standard.md 编码规范

技术要求：
- 使用 <script setup lang="ts">
- 使用 reactive() 管理表单状态
- 区分新建模式和编辑模式（通过路由参数判断）
```

---

## 填写示例

```
请创建一个 Vue3 TypeScript 表单页面，用于新建/编辑用户。

要求：
- 页面名称：UserForm
- 路由路径：/user/create 和 /user/:id/edit
- 表单字段：姓名（必填）、邮箱（必填，格式验证）、角色（下拉选择）
- 验证规则：姓名不为空，邮箱格式正确
- 提交行为：新建时调用 userApi.create，编辑时调用 userApi.update
- 取消行为：返回 /user/list

技术要求：
<script setup lang="ts">、reactive() 管理表单、通过 useRoute().params.id 判断编辑模式
```
