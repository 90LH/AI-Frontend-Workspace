# Session Log

> 本文件由 `project-onboarding` 或 Skill 执行后写入，用于下一次 session 的 warm start。
>
> **用途边界（重要）**
> - 本文件只用于恢复上下文，**不是项目事实来源**。
> - 项目事实 SSOT → `.veaw/project.json`
> - 组件索引 SSOT → `component-catalog/catalog.json`
> - 最终事实 → 源码
> - 本文件内容与 project.json 冲突时，以 project.json 为准。
>
> **写入规则**
> - 只保留最近 10 条任务记录；超过上限后将旧条目压缩为 `## Recent Summary` 块。
> - 每条任务不超过 5 行。
> - 不写完整 diff、代码片段、密钥、token、环境变量或接口凭证。
> - 只写能帮助下一次 session 跳过重复发现的结论。
>
> 本文件应放在目标项目 `.veaw/session-log.md`，不得写入 VEAW `core/`。

---

## Recent Summary

[0 条任务已压缩。首次使用时删除此行。]

---

## YYYY-MM-DD

### Task: [短任务名，如 "修复 UserTable 分页 bug"]
- 修改文件：[path:line，如 src/views/user/index.vue:45，或"无"]
- 结论：[一句话，如 "分页组件 props 命名与后端约定不一致，已修正为 pageNo"]
- 待验证：[如无则写"无"]
- 下次可跳过：[如 "structureHash 未变，可跳过目录扫描"；如无则写"无"]
