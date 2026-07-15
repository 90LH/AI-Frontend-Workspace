# Design Extension

## 目的

定义团队级 Design-to-Code 扩展能力，用于在 VEAW core 通用设计能力之上补充 Figma、Design Token 和 Component Mapping 的团队约定。

core 提供通用能力，extension 只描述团队或项目特有规则。

## 使用场景

- 项目需要接入 Figma 设计稿分析
- 项目需要沉淀 Design Token 命名和映射规则
- 项目需要维护设计组件到代码组件的 Component Mapping
- 项目需要在 Design-to-Code 工作流中加入团队设计规范

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 设计输入 | 必须 | Figma 链接、截图、图片或 UI 说明 |
| 项目预设 | 必须 | 如 `vue-admin`、`vue-h5`、`nuxt` |
| 组件库约束 | 可选 | Element Plus、Vant、项目内部组件库等 |
| Token 规范 | 可选 | 团队已有颜色、字体、间距、圆角等 token 规则 |
| 组件映射表 | 可选 | 设计组件与代码组件的对应关系 |

## 执行流程

1. 读取 core 通用规则：`core/AGENTS.md`、`core/CODEX.md`
2. 读取设计工作流：`core/ai/workflows/design-to-code.md`
3. 读取 Designer Agent：`core/ai/agents/designer.md`
4. 读取设计分析 Skill：`core/ai/skills/design-analysis.md`
5. 根据项目预设补充 UI 库、响应式和组件使用约束
6. 根据团队约定补充 Design Token 和 Component Mapping 建议
7. 将结果交给 Architect、Developer、Reviewer 继续执行

## MCP 要求

| MCP | 使用时机 |
|-----|----------|
| 设计输入 MCP | 获取设计结构、尺寸、组件和样式信息；例如 Figma MCP |
| GitNexus | 匹配项目已有组件、页面、样式和 token 实现 |
| Context7 | 查询 UI 库、框架或设计系统官方文档 |
| Playwright | 实现后进行视觉还原和交互验证 |

注意：

- 本扩展只定义调用策略，不实现具体 MCP
- 不修改 `.mcp/mcp.json`
- 当前环境没有设计输入 MCP 时，按 core 降级策略处理

## 输出格式

```text
## 理解
[设计输入、项目预设、团队约束]

## 设计分析
[页面结构、布局、组件、样式和 token 线索]

## 组件映射
[设计组件到现有组件或新增组件的映射建议]

## 实现方案
[交给 Architect/Developer 的任务、Skill、Template 和验证建议]

## 风险
[Figma/MCP 不可用、token 缺失、组件映射不完整、还原风险]
```

## 注意事项

- 不重复 core 中已有的通用 Designer、Workflow、Skill 规则
- 不绑定具体 MCP 实现
- 不修改 Claude Code 配置
- 不修改业务代码
- 不直接创建或修改 Design Token 文件，只输出建议
- Component Mapping 应优先匹配项目已有组件
