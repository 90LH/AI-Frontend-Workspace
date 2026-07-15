# Project Catalog Onboarding

## 目的

定义真实项目接入 Component Catalog 的首次生成与持续维护流程。

本文件属于 Component Intelligence Extension，只描述可叠加规则，不保存任何真实项目组件清单。

## 使用场景

- 真实项目首次启用 `component-intelligence`
- 目标项目需要创建 `component-catalog/`
- 目标项目已有 Catalog，需要校验与源码是否一致
- Design-to-Code 需要把设计组件映射到真实代码组件

## 输入要求

| 输入 | 是否必须 | 说明 |
|------|----------|------|
| 目标项目根目录 | 必须 | 真实项目路径 |
| 组件扫描范围 | 必须 | 全项目、组件目录、页面模块或业务域 |
| 验证方式 | 必须 | GitNexus、rg、文件读取 |
| Preset | 必须 | 已选择或待确认的项目预设 |
| UI 组件库 | 可选 | 第三方组件库或自研组件库 |
| 设计组件映射 | 可选 | Figma 或设计组件到代码组件的映射线索 |

## 首次生成流程

1. 确认目标项目根目录，不在 VEAW core 内生成真实项目数据。
2. 优先使用 GitNexus 获取组件路径、引用关系、影响范围和相似组件。
3. GitNexus 未索引时，说明原因，并降级使用：
   - `rg --files`
   - `.vue`、`.tsx`、`.jsx` 文件扫描
   - `src/components`、`src/views/*/components`、`src/pages/*/components` 目录扫描
   - imports 读取和必要文件读取
4. 判断组件分类：
   - 通用组件
   - 业务组件
   - 页面私有组件
   - 第三方封装组件
5. 在目标项目根目录创建或更新：

```text
component-catalog/
├── index.md
├── components/
├── snapshots/
└── CHANGELOG.md
```

6. 组件条目结构参考 `core/ai/templates/component-catalog.md`。
7. 不确定字段写“待验证”。
8. 更新首次快照、`lastVerified` 和 `component-catalog/CHANGELOG.md`。

## 持续维护流程

以下事件触发 Catalog 维护：

- 新增组件
- Props / Emits / Slots / Expose 变更
- 组件迁移、重命名、删除或废弃
- 页面引用关系变化
- 设计组件映射规则变化
- 公共组件影响范围变化

维护步骤：

1. 读取目标项目 `component-catalog/index.md`、相关组件条目、最近 snapshot 和 `CHANGELOG.md`。
2. 使用 GitNexus 校验源码事实和引用关系；不可用时降级到 `rg`、imports、文件读取。
3. 调用 `core/ai/skills/component-analysis.md` 输出差异报告。
4. 必要时调用 `core/ai/skills/component-catalog-maintenance.md` 更新 Catalog。
5. 公共组件或第三方封装组件变更必须标注影响范围。
6. 更新 snapshot、lastVerified 和变更记录。

## 与 Project Onboarding 的关系

`core/ai/workflows/project-onboarding.md` 负责：

- 识别项目技术栈
- 选择 Preset
- 激活 Extension
- 建立 `.veaw/` 项目级上下文

本文件负责：

- 在真实目标项目中建立 `component-catalog/`
- 维护组件资产条目、快照和变更记录
- 确保 Catalog 与源码事实一致

## MCP 要求

| MCP | 使用时机 |
|-----|----------|
| GitNexus | 组件发现、引用关系、影响范围、相似组件 |
| Context7 | 第三方 UI 组件库 API 不确定时 |
| Playwright | 实现后验证组件渲染和交互 |

不得修改 `.mcp/mcp.json`。

## 输出格式

```text
## Catalog 状态
[是否存在、条目数量、最近快照、lastVerified]

## 首次生成或维护结果
[新增/更新的目标项目 Catalog 文件，不包含 VEAW core]

## 差异报告
[源码与 Catalog 差异、引用变化、接口变化]

## 验证
[GitNexus / rg / 文件读取]

## 风险
[待验证字段、未索引、公共组件影响、过期条目]
```

## 注意事项

- 真实组件清单只写入目标项目 `component-catalog/`。
- `core/` 只保存模板和通用机制。
- `extensions/` 只保存团队级可叠加规则。
- Catalog 是源码索引与摘要，不替代源码事实。
