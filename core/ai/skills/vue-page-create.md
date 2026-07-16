# vue-page-create

## 目的

定义 Vue3 企业级路由页面创建流程，作为 Claude 与 Codex 共享的工具无关 Skill。

## 使用场景

- 用户要求新建 Vue3 路由页面
- 需要创建对应路由的视图文件
- 需要搭建页面骨架、数据流、状态和接口调用

## 输入要求

| 参数 | 是否必须 | 说明 |
|------|----------|------|
| 页面名称 | 必须 | 如 `UserList`、`OrderDetail` |
| 路由路径 | 必须 | 如 `/user/list` |
| 页面功能描述 | 必须 | 用于理解业务逻辑 |
| 依赖接口 | 可选 | 已有 API 路径或接口说明 |
| 关联组件 | 可选 | 需要引入或复用的组件 |

## 执行流程

1. 分析需求，确认页面类型：列表、详情、表单或混合型
2. 检查已有同类页面、组件、composables、utils、API
3. 确认文件位置，遵循 `core/docs/directory.md`
4. 确认是否需要路由注册；路由修改属于高风险操作，需说明影响
5. 使用 `core/ai/templates/vue-page.vue` 或项目已有同类页面作为参考
6. 实现页面逻辑，遵循 `core/docs/coding-standard.md`
7. 执行类型检查和浏览器验证
8. 按输出格式总结

## MCP 要求

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。GitNexus 用于查找同类页面、组件、composables、API 和路由注册位置。

## 输出格式

遵循 `core/AGENTS.md` Section 8 全局响应格式（理解 / 计划 / 变更 / 验证 / 遗留风险）。「计划」需标注高风险点（如路由注册）。

## 注意事项

- 不直接创建重复页面结构，优先复用已有模式
- 不在视图层直接写复杂业务逻辑，复杂逻辑放入 composable
- 不使用 `any` 和 Options API
- 不顺手重构无关页面
- 不修改 Claude 专属 `.claude/skills/*/SKILL.md`
