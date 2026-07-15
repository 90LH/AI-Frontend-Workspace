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

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 查找同类页面、组件、composables、API 和路由注册位置 |
| Context7 | 不确定 Vue3、Pinia、Vue Router 或 UI 库 API 时查询官方文档 |
| Playwright | 页面创建后验证渲染、交互、Console 和主要路径 |

调用顺序：GitNexus -> Context7 -> Playwright。

只有 MCP 不可用或目标仓库未索引时，才允许降级到 `rg`、读取 imports、类型检查和手动验证步骤。

## 输出格式

```text
## 理解
[页面功能、页面类型和数据流说明]

## 计划
[新建/修改文件列表和高风险点]

## 变更
[已创建/修改的文件路径和内容摘要]

## 验证
[TypeScript 检查、浏览器验证或降级验证说明]

## 遗留风险
[未覆盖的边界情况]
```

## 注意事项

- 不直接创建重复页面结构，优先复用已有模式
- 不在视图层直接写复杂业务逻辑，复杂逻辑放入 composable
- 不使用 `any` 和 Options API
- 不顺手重构无关页面
- 不修改 Claude 专属 `.claude/skills/*/SKILL.md`
