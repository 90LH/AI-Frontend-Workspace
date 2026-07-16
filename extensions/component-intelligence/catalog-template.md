# Component Catalog 项目模板

## 目的

定义项目级 Component Catalog 的落地目录模板，用于指导接入项目创建真实组件资产索引、组件条目、快照和变更记录。

## 使用场景

- 项目首次接入 Component Catalog
- 项目需要创建组件资产索引
- 项目需要保存组件快照和变更记录
- Agent 需要读取项目级组件资产知识层

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 项目根目录 | 必须 | Catalog 所在项目 |
| 组件扫描范围 | 必须 | 组件目录、页面目录、业务模块 |
| 验证方式 | 必须 | GitNexus、rg、文件读取 |
| 维护策略 | 可选 | 团队更新频率和 Reviewer 要求 |

## 工作流程

1. 在目标项目 `.veaw/` 下创建 `component-catalog/`（完整路径：`.veaw/component-catalog/`）
2. 创建 `.veaw/component-catalog/index.md`
3. 创建 `.veaw/component-catalog/components/`
4. 创建 `.veaw/component-catalog/snapshots/`
5. 创建 `.veaw/component-catalog/CHANGELOG.md`
6. 使用 `core/ai/templates/component-catalog.md` 维护组件条目
7. 使用维护工作流更新 snapshot、lastVerified 和变更记录

## MCP要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 首次盘点和后续校验引用关系 |
| Context7 | 第三方组件库行为不确定时 |
| Playwright | 实际页面实现后验证组件行为 |

不得修改 `.mcp/mcp.json`。

## 输出格式

```text
.veaw/component-catalog/
├── index.md
├── components/
├── snapshots/
└── CHANGELOG.md
```

## 注意事项

- 项目级 Catalog 保存真实组件资产数据
- core 只保存通用机制和模板
- extension 只保存团队规则
- 组件条目必须标记 lastVerified 和验证来源
- 无法验证的字段写“待验证”
