# api-development

## 目的

定义前端 API 接口层开发流程，作为 Claude 与 Codex 共享的工具无关 Skill。

## 使用场景

- 新增后端接口的前端调用
- 修改已有 API 请求参数或响应类型
- 新增业务域 API 模块
- 在页面或 composable 中集成 API 调用

## 输入要求

| 参数 | 是否必须 | 说明 |
|------|----------|------|
| 接口路径 | 必须 | 如 `/api/user/list` |
| HTTP 方法 | 必须 | GET / POST / PUT / DELETE |
| 请求参数说明 | 必须 | 字段名、类型、是否必传 |
| 响应结构说明 | 必须 | 返回数据字段和类型 |
| 所属业务模块 | 可选 | 帮助确定文件位置 |

## 执行流程

1. 分析接口语义和业务用途
2. 查找同业务模块 API 文件和统一 HTTP 实例
3. 定义请求参数、响应数据和业务实体类型
4. 使用项目已有 HTTP 封装，不直接引入 axios 或 fetch
5. 在调用处处理 loading、error 和空数据状态
6. 不在 API 层写业务逻辑或 UI 提示
7. 执行类型检查和网络触发验证
8. 按输出格式总结

## MCP 要求

遵循 `core/AGENTS.md` Section 6 的全局 MCP 优先级与降级策略。GitNexus 用于查找已有 API 模块、HTTP 实例、调用方和影响范围。

## 输出格式

遵循 `core/AGENTS.md` Section 8 全局响应格式（理解 / 计划 / 变更 / 验证 / 遗留风险）。「遗留风险」需覆盖鉴权、错误码和后端契约不完整等情况。

## 注意事项

- 请求和响应必须有明确 TypeScript 类型
- 优先使用 `interface` 定义对象结构
- 禁止 `any`
- 不硬编码环境地址
- 修改 API 签名属于高风险操作，需说明影响范围
- 不修改 Claude 专属 `.claude/skills/*/SKILL.md`
