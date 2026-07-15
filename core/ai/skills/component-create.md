# component-create

## 目的

定义 Vue3 可复用组件创建流程，作为 Claude 与 Codex 共享的工具无关 Skill。

## 使用场景

- 用户要求新建 UI 组件
- 多个页面存在重复 UI 或交互逻辑，需要抽取组件
- 需要封装第三方组件库的项目适配层

## 输入要求

| 参数 | 是否必须 | 说明 |
|------|----------|------|
| 组件名称 | 必须 | PascalCase，如 `DataTable`、`FormModal` |
| 组件职责描述 | 必须 | 说明组件解决什么问题 |
| Props 定义 | 可选 | 输入参数说明 |
| Emits 定义 | 可选 | 对外事件说明 |
| 使用方示例 | 可选 | 帮助确认组件接口 |

## 执行流程

1. 分析组件边界，确认单一职责
2. 查找已有同类组件，避免重复创建
3. 设计 Props、Emits、Slots、Expose 的最小接口
4. 确定文件位置：页面私有组件放 `views/[module]/components/`，可复用组件放 `components/`
5. 使用 `core/ai/templates/vue-component.vue` 或项目已有组件作为参考
6. 使用 `<script setup lang="ts">`、`defineProps`、`defineEmits`
7. 在使用页面中集成并验证
8. 按输出格式总结

## MCP 要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 查找相似组件、引用关系和影响范围 |
| Context7 | 不确定 Vue3 组件 API 或 UI 库组件 API 时查询官方文档 |
| Playwright | 验证组件视觉状态、交互状态和集成页面 |

调用顺序：GitNexus -> Context7 -> Playwright。

只有 MCP 不可用或目标仓库未索引时，才允许降级到 `rg`、读取 imports、类型检查和手动验证步骤。

## 输出格式

```text
## 理解
[组件职责和使用边界]

## 计划
[组件接口、文件位置和影响范围]

## 变更
[已创建/修改的文件路径和内容摘要]

## 验证
[类型检查、页面集成验证或降级验证说明]

## 遗留风险
[未覆盖的状态、样式或交互边界]
```

## 注意事项

- 组件只解决一个明确问题
- 不直接修改 Props
- 不把业务流程塞进通用组件
- 不重复已有基础组件能力
- 不修改 Claude 专属 `.claude/skills/*/SKILL.md`
