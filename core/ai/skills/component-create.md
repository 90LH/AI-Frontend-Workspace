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

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。GitNexus 用于查找相似组件、引用关系和影响范围。

## 输出格式

遵循 `core/AGENTS.md` Section 8 全局响应格式（理解 / 计划 / 变更 / 验证 / 遗留风险）。

## 注意事项

- 组件只解决一个明确问题
- 不直接修改 Props
- 不把业务流程塞进通用组件
- 不重复已有基础组件能力
- 不修改 Claude 专属 `.claude/skills/*/SKILL.md`
