# Design-to-Code 工作流

## 触发条件

用户提供设计稿、Figma 链接、图片、页面截图、UI 说明，或要求页面还原、视觉还原、截图还原时使用。

## Agent 编排

```text
Designer
  ↓
Architect
  ↓
Developer
  ↓
Reviewer
```

- Designer：理解设计输入，完成设计分析、组件规划和 Design Token 建议
- Architect：评估实现方案、项目影响范围和风险
- Developer：选择 Skill 和 Template，完成实现与验证
- Reviewer：检查还原质量、规范、风险和测试建议

## 完整流程

### 第一步：设计输入

```
输入：
- Figma 链接
- 图片
- 页面截图
- UI 说明

输出：
- 可分析的设计上下文
- 缺失信息清单
```

### 第二步：Designer Agent 分析

```
工具：设计输入 MCP（如 Figma MCP）
任务：
- 获取页面结构、尺寸、组件信息、样式信息
- 分析布局层级
- 识别组件
- 提取 Design Token 建议
- 输出组件映射建议
```

### 第三步：设计分析 Skill

```
Skill：core/ai/skills/design-analysis.md
任务：
- 输出页面结构
- 输出布局层级
- 输出组件拆分
- 输出样式规范
- 输出 Developer 可执行任务
```

### 第四步：Architect Agent 方案评估

```
任务：
- 使用 GitNexus 匹配已有组件和页面模式
- 读取 core/AGENTS.md、core/docs/* 和 preset 约束
- 评估文件范围、高风险点和复用方案
- 输出可执行技术方案
```

### 第五步：Developer Agent 实现

```
任务：
- 选择页面、组件或 API Skill
- 读取 core/ai/templates/*
- 必要时使用 Context7 查询官方文档
- 实施最小范围修改
```

### 第六步：Playwright 验证

```
任务：
- 验证页面渲染
- 验证主要交互
- 检查 Console
- 对照设计输入检查视觉还原风险
```

### 第七步：Reviewer Agent 审查

```
任务：
- 使用 code-review Skill
- 检查影响范围
- 检查编码规范
- 检查视觉还原、响应式和交互风险
- 输出修改建议
```

## MCP 要求

设计任务 MCP 顺序：

```text
设计输入 MCP
  ↓
GitNexus
  ↓
Context7
  ↓
Playwright
```

说明：

- 设计输入 MCP 用于获取设计结构、尺寸、组件和样式信息；例如 Figma MCP
- GitNexus 用于匹配已有组件、页面和影响范围
- Context7 用于确认框架、UI 库和 API 官方用法
- Playwright 用于实现后的视觉、交互和回归验证

## 输出格式

```text
## 理解
[设计输入和目标页面]

## 设计分析
[页面结构、布局层级、样式规范]

## 组件规划
[组件拆分、组件映射、复用建议]

## 实现方案
[Agent 交接、Skill、Template、文件范围、验证方式]

## 风险
[设计缺失、还原偏差、响应式、MCP 降级说明]
```

## 注意事项

- 不修改业务代码，除非进入 Developer 实现阶段且用户确认
- 不修改 `.mcp/mcp.json`
- 不凭空推断设计稿不可见内容
- 不引入新的设计系统，除非用户明确要求
- 优先引用 `core/AGENTS.md`、`core/CODEX.md`、`core/ai/skills`、`core/ai/templates`
