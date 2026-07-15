# 组件条目目录

## 目的

存放项目级 Component Catalog 的独立组件条目。

当前首次盘点未发现真实项目组件，因此暂无独立组件条目。

## 使用场景

- 记录已验证的通用组件、业务组件、第三方封装组件
- 按模块汇总页面私有组件
- 供 Designer、Component Analyst、Architect、Developer、Reviewer 检索

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 组件名称 | 必须 | 已验证真实项目组件 |
| 源码路径 | 必须 | 组件实际路径 |
| 验证来源 | 必须 | GitNexus、rg、文件读取或 Reviewer |

## 工作流程

1. 使用 `core/ai/templates/component-catalog.md` 创建组件条目
2. 使用 GitNexus 或降级扫描校验源码事实
3. 填写分类、接口、引用关系、相似组件和复用建议
4. 更新 `component-catalog/index.md`
5. 更新快照和变更记录

## MCP要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 校验组件引用关系和影响范围 |
| Context7 | 第三方组件库 API 不确定时 |
| Playwright | 页面实现后验证渲染与交互 |

## 输出格式

组件条目文件建议使用：

```text
components/<component-name>.md
```

当前已验证组件条目：无。

## 注意事项

- 不创建空洞组件条目
- 未验证字段写“待验证”
- 模板文件不作为项目组件资产
- 页面私有组件可按模块汇总，不必拆成大量低价值文件
