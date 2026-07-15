---
name: component-create
description: Vue3 可复用组件开发规范 — 检查已有组件、定义接口、实现、验证
---

# component-create

## 使用场景

新建可复用 Vue3 组件时使用。

触发条件：
- 用户要求新建 UI 组件
- 多个页面存在重复逻辑需要抽取
- 需要封装第三方库的组件适配层

---

## 输入要求

| 参数 | 是否必须 | 说明 |
|------|----------|------|
| 组件名称 | 必须 | PascalCase，如 `DataTable`、`FormModal` |
| 组件职责描述 | 必须 | 该组件解决什么问题 |
| Props 定义 | 可选 | 输入参数说明 |
| Emits 定义 | 可选 | 对外事件说明 |
| 使用方示例 | 可选 | 帮助理解预期用法 |

---

## 执行步骤

1. **分析组件边界**
   - 明确组件职责（单一职责原则）
   - 确认 props 和 emits 接口设计
   - 判断是否需要 provide/inject

2. **检查已有组件**
   - 使用 GitNexus 搜索相似组件，避免重复创建
   - 检查现有基础组件库的使用方式

3. **确定文件位置**
   - 业务组件：`src/components/` 或页面同级目录
   - 全局组件：`src/components/common/`

4. **创建组件文件**
   - 使用 `<script setup lang="ts">` 语法
   - 用 `defineProps<{}>()` 声明 Props 类型
   - 用 `defineEmits<{}>()` 声明 Emits 类型
   - 用 `defineExpose()` 仅暴露必要方法

5. **编写组件逻辑**
   - 内部状态用 `ref` / `reactive`
   - 计算属性用 `computed`
   - 副作用用 `watch` / `watchEffect`

6. **验证**
   - TypeScript 类型无报错
   - 在使用页面中引入并验证渲染

---

## MCP 调用规则

| MCP | 使用时机 |
|-----|----------|
| **GitNexus** | 查找项目中同类组件，避免重复；分析组件被引用关系 |
| **Context7** | 查询 Vue3 组件 API（defineProps / defineEmits / defineExpose）用法 |
| **Playwright** | 验证组件在浏览器中的视觉和交互效果 |

---

## 输出格式

```
## 理解
[组件职责和接口设计说明]

## 计划
[Props / Emits 接口定义预览]

## 变更
[已创建的文件路径]

## 验证
[TypeScript 检查结果 / 组件渲染验证]

## 遗留风险
[未处理的边界情况或已知限制]
```
