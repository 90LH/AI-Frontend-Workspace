# 使用示例

本目录包含将 VEAW 工作流接入真实项目的完整示例。

---

## 目录结构

```
examples/
└── vue-admin-quickstart/   ← 以 Vue3 后台项目为例
    ├── README.md            ← 接入步骤说明
    └── ...
```

---

## 快速接入步骤

### 1. 复制 AI 工程目录到你的项目

```bash
# 进入你的 Vue3 项目根目录
cd your-vue-project

# 复制 AI 配置
cp -r path/to/veaw/.claude ./.claude
cp -r path/to/veaw/.codex ./.codex
cp -r path/to/veaw/.mcp  ./.mcp
cp -r path/to/veaw/core  ./core
```

### 2. 选择并激活预设

```bash
# 后台管理项目
cp core/presets/vue-admin/AGENTS.md core/AGENTS.preset.md

# H5 移动端项目
cp core/presets/vue-h5/AGENTS.md core/AGENTS.preset.md
```

### 3. 建立 GitNexus 索引（需要 GitNexus 已安装）

```bash
gitnexus index .
```

### 4. 验证 Skills 已加载

在 Claude Code 中输入 `/vue-page-create`，确认 Skill 被识别。

---

## 最佳实践

- 项目接入后，先运行 GitNexus 索引，AI 才能准确分析代码关系
- `core/docs/` 中的规范文档按实际项目调整（目录结构、命名规范）
- 团队成员共享同一份 AI 配置，保持 AI 行为一致
