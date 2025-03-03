# TweetGenix 样式审计和重构计划

## 一、样式审计结果

### 已定义的设计令牌 (在 globals.css)

| 类型 | 变量名 | 值 | 用途 |
|------|---------|-----|------|
| 主题色 | `--primary` | `204 88% 53%` | X 蓝色 (#1d9bf0) |
| 主题前景色 | `--primary-foreground` | `0 0% 100%` | 主题背景上的文字颜色 |
| 次要色 | `--secondary` | `204 88% 96%` | 淡蓝色，用于悬停状态 |
| 次要前景色 | `--secondary-foreground` | `204 88% 53%` | 次要背景上的文字颜色 |
| 背景色 | `--background` | `0 0% 100%` | 页面背景色 |
| 前景色 | `--foreground` | `200 15% 15%` | 正文文字颜色 |
| 卡片背景 | `--card` | `0 0% 100%` | 卡片背景色 |
| 卡片前景 | `--card-foreground` | `200 15% 15%` | 卡片文字颜色 |
| 边框色 | `--border` | `220 13% 90%` | 边框颜色 |
| 警示色 | `--destructive` | `0 84% 60%` | 删除操作等警示色 |
| 圆角 | `--radius` | `0.5rem` | 通用圆角值 |

### 硬编码颜色值使用情况

| 组件/位置 | 硬编码值 | 应使用的设计令牌 | 严重程度 |
|-----------|----------|-----------------|---------|
| Tweet Card | `border-[#eff3f4]` | `border-border` | 中 |
| Tweet Fullname | `text-[#0f1419]` | `text-foreground` | 中 |
| Tweet Username | `text-[#536471]` | `text-muted-foreground` | 中 |
| Tweet Timestamp | `text-[#536471]` | `text-muted-foreground` | 中 |
| Tweet Content Hover | `bg-[#f7f9f9]` | `bg-muted` | 低 |
| History Section | `border-[#eff3f4]` | `border-border` | 中 |
| History Header | `border-b border-[#eff3f4]` | `border-b border-border` | 中 |
| History Filter Button | `border-[#eff3f4]` | `border-border` | 中 |
| History Search Input | `border-[#eff3f4]` | `border-border` | 中 |
| Load More Button | `text-[#1d9bf0]` | `text-primary` | 高 |
| Tweet Action Buttons | 硬编码 rgba 值 | 使用 HSL 变量 | 中 |

### 样式一致性问题

1. **混合样式定义方法**：
   - 按钮组件使用 class-variance-authority (CVA)
   - 推文卡片使用自定义 CSS 类
   - 历史记录组件混合使用 Tailwind 和自定义 CSS

2. **组件抽象层次不一致**：
   - 某些组件 (Button, Card) 使用了抽象组件
   - 其他组件 (TweetCard) 直接使用 div + 类名

3. **响应式设计不一致**：
   - 部分组件有响应式断点设计
   - 其他组件缺乏响应式考虑

## 二、重构优先级

### 第一阶段：设计令牌统一 (高优先级)

1. 更新 `globals.css` 中的设计令牌定义，确保完整覆盖
2. 将硬编码的颜色替换为设计令牌
3. 特别处理关键交互元素 (按钮、链接、表单元素)

### 第二阶段：组件抽象 (中优先级)

1. 为常用模式创建复合类
2. 重构推文卡片样式
3. 重构历史记录组件样式

### 第三阶段：响应式优化 (低优先级)

1. 检查并增强移动端体验
2. 优化大屏幕布局

## 三、重构计划详情

1. **设计令牌扩展**
   - 添加额外的设计令牌，如间距、阴影变量等
   - 重新组织 CSS 层次结构

2. **组件类库**
   - 创建 `.btn-primary`, `.btn-secondary` 等复合类
   - 创建 `.input-standard` 类
   - 创建 `.card-standard` 类

3. **迁移步骤**
   - 从关键交互组件开始
   - 逐步向下层组件扩展
   - 为开发者提供样式使用指南 