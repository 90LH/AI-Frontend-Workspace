# Vue3 移动端 H5 — AI 补充规则

适用：在 `vue-h5` 预设项目中使用 AI 工作流时的附加规则。

主规则见：`../../core/AGENTS.md`

---

## H5 项目特有约定

### 移动端适配

- 使用 `postcss-px-to-viewport` 或 `postcss-pxtorem` 做单位转换
- 不手动写 `px` 单位，使用设计稿对应值（工具自动转换）
- 视口宽度基准：375px（iPhone 标准）

### UI 组件

- 优先使用 Vant 组件库
- 不混用 PC 端组件库（Element Plus 等）

### 性能要求

- 路由页面全部使用懒加载
- 图片使用懒加载（`v-lazy` 或 `loading="lazy"`）
- 首屏资源控制在 200KB 以内（gzip 后）

### 微信环境

- JSSDK 初始化放在 `src/utils/wx.ts`
- 分享配置在各页面的 `onMounted` 中单独设置

### 页面切换动画

- 使用 Vue Router 的 `<transition>` 组件
- 区分前进（slide-left）和后退（slide-right）方向
