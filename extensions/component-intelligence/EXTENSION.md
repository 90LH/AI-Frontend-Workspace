# Component Intelligence Extension

## 目的

定义团队级组件智能扩展能力，用于在 VEAW core 通用 Component Intelligence 能力之上补充组件资产盘点、组件映射和组件复用决策的团队约定。

core 提供通用能力，extension 只描述团队或项目特有规则。

## 使用场景

- 项目需要建立组件资产目录或 Component Catalog
- 项目需要统一组件分类和复用决策
- 项目需要维护设计组件到代码组件的映射规则
- 项目需要在开发前强制检查已有组件资产

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 组件分析范围 | 必须 | 全项目、组件目录、业务域、页面模块或指定组件 |
| 组件需求 | 必须 | 盘点、复用、映射、影响分析或组件库治理 |
| 团队分类规则 | 可选 | 通用组件、业务组件、页面私有组件、第三方封装组件的团队定义 |
| 组件映射规则 | 可选 | 设计组件或业务概念到代码组件的映射 |
| 复用决策规则 | 可选 | 复用、扩展、包装、新建、拆分的团队偏好 |

## 工作流程

1. 读取 core 通用规则：`core/AGENTS.md`、`core/CODEX.md`
2. 读取 Component Analyst：`core/ai/agents/component-analyst.md`
3. 读取组件智能工作流：`core/ai/workflows/component-intelligence.md`
4. 读取组件分析 Skill：`core/ai/skills/component-analysis.md`
5. 按项目预设和团队约定补充组件分类规则
6. 输出组件映射建议和复用决策建议
7. 将结果交给 Architect、Developer、Reviewer 继续执行

## MCP要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 组件发现、引用关系、影响范围、相似组件和依赖分析 |
| Context7 | 第三方 UI 组件库或组件 API 不确定时查询官方文档 |
| Playwright | 仅在实际页面实现后验证组件渲染、交互和回归 |

本扩展只定义调用策略，不实现或修改 MCP 配置。

## Skill调用规则

- 默认使用 `core/ai/skills/component-analysis.md`
- 新组件实现仍使用 `core/ai/skills/component-create.md`
- 设计组件映射可结合 `core/ai/skills/design-analysis.md`
- 审查阶段使用 `core/ai/skills/code-review.md`

## Template使用规则

- 本扩展不复制 Template
- 组件实现参考 `core/ai/templates/vue-component.vue`
- 页面私有组件组织参考 `core/ai/templates/vue-page.vue`
- 逻辑抽离参考 `core/ai/templates/composable.ts`

## 输出格式

```text
## 理解
[组件需求、分析范围、团队约定]

## 资产报告
[组件分类、接口摘要、引用关系、相似组件]

## 组件映射
[设计组件或业务概念到代码组件的映射]

## 决策建议
[复用 / 扩展 / 包装 / 新建 / 拆分]

## 风险
[公共组件影响、重复实现、组件层级不清、MCP 降级说明]
```

## 注意事项

- 不重复 core 中已有的通用 Agent、Workflow 和 Skill 规则
- 不修改 `.mcp/mcp.json`
- 不修改 Claude Code 配置
- 不修改业务代码
- Component Mapping 应优先匹配项目已有组件
- 分析型结果不能直接替代实现型 Skill
