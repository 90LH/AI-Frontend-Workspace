# Component Catalog 维护工作流

## 目的

定义组件资产目录的持续维护流程，让项目级 Component Catalog 在组件新增、接口变更、迁移、删除和引用关系变化后保持可检索、可验证、可被 Agent 消费。

## 使用场景

- 组件新增
- 组件 Props / Emits / Slots / Expose 变更
- 组件迁移、删除、重命名或废弃
- 页面引用关系变化
- 需要生成组件快照、组件索引或组件变更记录
- 需要校验 Catalog 与源码一致性

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 维护事件 | 必须 | 新增、接口变更、迁移、删除、引用变化、校验 |
| Catalog 路径 | 必须 | 项目级 `.veaw/component-catalog/` |
| 组件范围 | 必须 | 全项目、组件目录、页面模块、业务域或指定组件 |
| 变更来源 | 可选 | diff、用户说明、设计输入、任务记录 |

## 工作流程

```text
组件新增 / 接口变更 / 迁移 / 删除 / 页面引用变化
  ↓
读取 Component Catalog
  ↓
GitNexus 优先校验源码与关系
  ↓
GitNexus 不可用时才使用 rg/find 降级
  ↓
component-analysis Skill
  ↓
差异报告
  ↓
Architect 评估架构边界
  ↓
Developer（仅在需要实现时）
  ↓
Reviewer 校验影响范围与 Catalog 一致性
  ↓
更新 Catalog、snapshot、lastVerified、变更记录
```

执行步骤：

1. 读取 `.veaw/component-catalog/index.md`
2. 读取相关组件条目和最近 snapshot
3. 优先使用 GitNexus 校验源码路径、引用关系、影响范围和相似组件
4. GitNexus 不可用时，说明原因，并使用 `rg`、imports 和文件读取降级
5. 调用 `core/ai/skills/component-analysis.md`
6. 输出源码与 Catalog 差异报告
7. Architect 评估组件分类、复用边界和架构风险
8. Developer 仅在需要修改源码或补实现时介入
9. Reviewer 校验 Catalog 与源码一致性
10. 更新组件条目、索引、snapshot、lastVerified 和变更记录

## MCP要求

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。不得修改 `.mcp/mcp.json`。

## Skill调用规则

- 默认调用 `core/ai/skills/component-catalog-maintenance.md`
- 差异分析调用 `core/ai/skills/component-analysis.md`
- 实现阶段再调用 `component-create` 或其他实现型 Skill
- 审查阶段调用 `code-review`

## Template使用规则

- Catalog 条目参考 `core/ai/templates/component-catalog.md`
- 实现阶段按需参考已有代码模板
- 不在 Workflow 中复制模板内容

## 输出格式

```text
## 理解
[维护事件、组件范围、Catalog 状态]

## 差异报告
[源码与 Catalog 的差异、接口变化、引用变化]

## 更新结果
[索引、条目、snapshot、lastVerified、CHANGELOG 更新]

## 验证
[GitNexus / rg / 文件读取 / Reviewer 校验结果]

## 风险
[过期字段、待验证信息、影响范围、降级说明]
```

## 注意事项

- Catalog 维护必须基于源码校验
- 不确定字段标记“待验证”
- 不把真实项目组件资产写进 core
- 项目级 Catalog 应放在项目根目录或项目级知识层
- Catalog 更新不代表源码修改，源码修改需由 Developer 单独处理
