# component-catalog-maintenance

## 目的

维护项目级 Component Catalog，确保组件资产索引、组件条目、快照和变更记录与源码保持一致。

本 Skill 只维护组件资产目录，不替代 `component-analysis`，也不替代源码事实。

## 使用场景

- 组件新增后需要登记 Catalog
- Props / Emits / Slots / Expose 发生变化
- 组件迁移、删除、废弃或重命名
- 页面引用关系发生变化
- 需要生成组件快照、组件索引或组件变更记录
- Reviewer 要校验 Catalog 与源码一致性

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 维护目标 | 必须 | 新增、更新、迁移、删除、校验、快照 |
| Catalog 路径 | 必须 | 项目级 `component-catalog/` |
| 组件范围 | 必须 | 全项目、组件目录、业务域、页面模块或指定组件 |
| 变更线索 | 可选 | 组件路径、diff、设计组件、页面引用、用户说明 |
| 验证要求 | 可选 | GitNexus、rg、文件读取、Reviewer 审查 |

## 工作流程

1. 读取项目级 `component-catalog/index.md`
2. 读取相关组件条目、快照和 `component-catalog/CHANGELOG.md`
3. 优先使用 GitNexus 校验组件路径、引用关系、影响范围和相似组件
4. GitNexus 不可用时，说明原因，并降级使用 `rg/find`、imports 和文件读取
5. 调用 `core/ai/skills/component-analysis.md` 生成差异报告
6. Architect 评估分类、复用边界和公共组件风险
7. Developer 仅在需要实现或修复时介入
8. Reviewer 校验影响范围与 Catalog 一致性
9. 更新 Catalog 条目、snapshot、lastVerified 和变更记录

## MCP要求

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。不得修改 `.mcp/mcp.json`。

## Skill调用规则

- 默认先调用 `core/ai/skills/component-analysis.md`
- 需要新增组件时，转交 `core/ai/skills/component-create.md`
- 需要设计组件映射时，可参考 `core/ai/skills/design-analysis.md`
- 需要审查时，转交 `core/ai/skills/code-review.md`

## Template使用规则

- 组件条目结构参考 `core/ai/templates/component-catalog.md`
- 新组件实现参考 `core/ai/templates/vue-component.vue`
- 页面组织参考 `core/ai/templates/vue-page.vue`
- 逻辑抽离参考 `core/ai/templates/composable.ts`

## 输出格式

```text
## 理解
[维护目标、组件范围、变更线索]

## Catalog 状态
[索引、条目、快照、lastVerified 状态]

## 差异报告
[源码与 Catalog 的差异、引用关系变化、接口变化]

## 更新方案
[需要更新的 Catalog 文件、snapshot、变更记录]

## 风险
[过期风险、影响范围、待验证字段、MCP 降级说明]
```

## 注意事项

- Catalog 只能作为源码索引与摘要，不得替代源码事实
- 不确定字段写“待验证”
- 组件实现变更不由本 Skill 直接完成
- 公共组件或第三方封装组件变更必须经过 Reviewer
- 每次维护应更新 lastVerified 或说明未更新原因
