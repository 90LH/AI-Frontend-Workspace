# Component Intelligence 工作流

## 目的

在开发前理解项目组件资产，帮助 Agent 发现、分析、映射和复用已有组件，避免重复实现和高风险公共组件修改。

## 使用场景

- 用户提出组件资产、组件盘点、组件分析、组件映射、组件复用、组件库或 Component Catalog 需求
- 新功能开发前需要确认已有组件能力
- Design-to-Code 任务需要将设计组件映射到代码组件
- 修改公共组件前需要分析影响范围

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 用户组件需求 | 必须 | 组件资产、复用、映射、盘点或影响分析需求 |
| 分析范围 | 必须 | 全项目、组件目录、页面模块、业务域或指定组件 |
| 组件线索 | 可选 | 组件名称、页面路径、设计组件、功能描述 |
| 约束条件 | 可选 | 禁止修改范围、预设、UI 库、团队规范 |

## 工作流程

```text
用户组件需求
  ↓
Component Analyst
  ↓
component-intelligence workflow
  ↓
GitNexus
  ↓
component-analysis skill
  ↓
组件资产报告
  ↓
Architect
  ↓
Developer（仅在需要实现时）
  ↓
Reviewer
```

执行步骤：

1. Component Analyst 理解组件需求和分析范围
2. 优先使用 GitNexus 分析组件发现、引用关系、影响范围和相似组件
3. GitNexus 不可用时，说明降级原因，并使用 `rg`、文件读取和 imports 分析
4. 调用 `core/ai/skills/component-analysis.md`
5. 输出组件资产报告
6. Architect 基于报告评估方案、边界和风险
7. 仅在需要实现时交给 Developer，并由 Developer 选择 `component-create`、`vue-page-create` 等 Skill
8. Reviewer 检查影响范围、复用合理性、规范和风险

## MCP要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 组件发现、调用关系、影响范围、相似组件和依赖分析 |
| Context7 | 第三方 UI 组件库、Vue API 或组件库 API 不确定时查询官方文档 |
| Playwright | 仅在实际页面实现后验证组件渲染、交互和回归 |

MCP 调用策略遵循 `core/CODEX.md`。不得修改或实现 MCP 配置。

## Skill调用规则

- 默认调用 `core/ai/skills/component-analysis.md`
- 需要新增组件时，由 Developer 调用 `core/ai/skills/component-create.md`
- 需要页面集成时，由 Developer 调用 `core/ai/skills/vue-page-create.md`
- 需要设计组件映射时，可参考 `core/ai/skills/design-analysis.md`
- 需要质量审查时，由 Reviewer 调用 `core/ai/skills/code-review.md`

## Template使用规则

- 分析阶段不直接使用 Template 生成代码
- 需要实现组件时，建议 Developer 参考 `core/ai/templates/vue-component.vue`
- 需要页面私有组件组织时，建议参考 `core/ai/templates/vue-page.vue`
- 需要抽离逻辑时，建议参考 `core/ai/templates/composable.ts`

## 输出格式

```text
## 理解
[组件需求、分析范围、目标]

## 资产报告
[组件目录与分类、接口摘要、引用关系、相似组件]

## 决策建议
[复用 / 扩展 / 包装 / 新建 / 拆分]

## 执行建议
[交给 Architect / Developer / Reviewer 的后续任务]

## 风险
[影响范围、重复实现、公共组件变更、MCP 降级说明]
```

## 注意事项

- 不修改业务代码
- 不替代 `feature-development` 或 `component-create`
- 组件资产报告必须先于实现
- 公共组件和跨模块复用必须标注影响范围
- 保持 Claude Code、现有 Skills、Workflow、Template 和 MCP 策略兼容
