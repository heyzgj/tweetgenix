# TweetGenix 前端开发指南

## 1. 设计理念与原则

TweetGenix 的前端设计遵循以下核心原则：

1. **简洁明了** - 界面简洁，减少视觉噪音，突出重要功能
2. **Twitter风格一致性** - 视觉设计模仿 Twitter/X 平台，提供熟悉的用户体验
3. **响应式设计** - 在不同设备上保持良好的可用性
4. **即时反馈** - 所有用户交互都有明确的视觉反馈
5. **渐进增强** - 核心功能在各种环境下可用，高级功能在支持时启用

## 2. 组件架构

### 2.1 组件层次结构

TweetGenix 前端使用以下组件结构：

```
页面组件 (Page Components)
└── 容器组件 (Container Components)
    └── 展示组件 (Presentation Components)
        └── 原子组件 (Atomic Components)
```

- **页面组件**: 如 `Home` - 处理路由和整体布局
- **容器组件**: 如 `TweetHistory` - 管理状态和数据流
- **展示组件**: 如 `TweetCard` - 专注于 UI 渲染
- **原子组件**: 如按钮、输入框 - 最小可复用单元

### 2.2 主要组件说明

| 组件名称 | 类型 | 职责 | 文件位置 |
|---------|------|------|---------|
| `Home` | 页面 | 主页面，管理生成流程和整体状态 | src/app/page.tsx |
| `TweetContent` | 展示 | 渲染生成的推文内容，处理复制功能 | src/app/page.tsx |
| `TweetCard` | 展示 | 渲染历史推文卡片 | src/app/page.tsx |
| `TweetHistory` | 容器 | 管理历史记录，包括搜索和分页 | src/app/page.tsx |
| `TweetSkeleton` | 展示 | 加载状态骨架屏 | src/app/page.tsx |

### 2.3 组件设计模式

- **组合优于继承** - 通过组合小组件构建复杂UI
- **单一职责** - 每个组件只负责一个功能领域
- **自包含组件** - 组件包含自己的状态、逻辑和样式
- **Props接口明确化** - 使用TypeScript定义明确的Props接口

## 3. 样式指南

### 3.1 CSS 方法论

TweetGenix 使用 Tailwind CSS v4 作为主要样式解决方案，结合以下原则：

- **基于功能的类名** - 使用 Tailwind 原子类
- **自定义组件类** - 针对特定组件使用命名类
- **CSS 变量** - 存储主题色和重复使用的值
- **响应式前缀** - 使用 Tailwind 的响应式前缀 (`sm:`, `md:`, `lg:`)

### 3.2 设计令牌 (Design Tokens)

```css
/* 色彩系统 */
--background: oklch(100% 0 0);        /* 页面背景色 */
--foreground: oklch(15% 0 0);          /* 主要文本颜色 */
--primary: oklch(15% 0 0);             /* 主要颜色 */
--primary-hover: oklch(15% 0 0 / 0.8); /* 深蓝色，用于悬停 */
--muted: oklch(97% 0 0);               /* 减弱的背景色 */
--muted-foreground: oklch(45% 0 0);   /* 减弱的文本颜色 */
--border: oklch(95% 0 0);              /* 边框颜色 */
--success: oklch(60% 0.15 150);        /* 成功状态颜色 */
```

### 3.3 组件样式指南

#### 按钮

```tsx
// 主按钮
<button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-white font-medium rounded-full px-4 py-2 transition-colors">
  生成推文
</button>

// 次要按钮
<button className="text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-medium rounded-full px-4 py-2 transition-colors">
  加载更多
</button>
```

#### 输入框

```tsx
<div className="relative">
  <input 
    className="input-standard"
    placeholder="输入提示..."
  />
</div>
```

#### 卡片

```tsx
<div className="tweet-card border-b border-[hsl(var(--border))] p-4 hover:bg-[hsl(var(--muted))] transition-colors">
  {/* 卡片内容 */}
</div>
```

## 4. 状态管理

### 4.1 React Hooks 使用指南

- **`useState`**: 用于组件级简单状态
- **`useEffect`**: 用于副作用（API调用、DOM操作）
- **`useRef`**: 用于引用DOM元素或持久值
- **`useMemo`**: 用于计算密集型派生值
- **`useCallback`**: 用于优化传递给子组件的函数

### 4.2 状态设计原则

- **单一来源**: 状态应有明确的所有者
- **提升共享状态**: 将共享状态提升到最近的共同祖先
- **局部化状态**: 保持状态尽可能靠近使用它的组件
- **不可变性**: 总是创建状态的新副本而不是直接修改

## 5. 性能优化

### 5.1 渲染优化

- **懒加载组件**: 使用 `React.lazy` 和 `Suspense`
- **虚拟列表**: 对于长列表，考虑使用虚拟化
- **记忆化**: 合理使用 `useMemo` 和 `useCallback`
- **避免不必要的渲染**: 使用 `React.memo` 和精确的依赖数组

### 5.2 资源优化

- **代码分割**: 利用动态 `import()` 分割代码
- **图片优化**: 使用适当大小和格式的图片
- **字体优化**: 使用 `font-display: swap` 和预加载关键字体

## 6. 可访问性指南

### 6.1 基本原则

- **键盘导航**: 所有交互元素可通过键盘访问
- **ARIA标签**: 为非标准控件添加适当的ARIA角色和标签
- **颜色对比**: 保持足够的文本/背景对比度
- **错误提示**: 错误信息清晰且带有适当的ARIA属性

### 6.2 实现检查清单

- [ ] 所有图片有描述性的 `alt` 文本
- [ ] 表单元素有关联的标签
- [ ] 颜色不是唯一的信息传递方式
- [ ] 组件支持屏幕阅读器

## 7. 测试策略

### 7.1 组件测试

- **单元测试**: 使用 Jest 测试独立函数和钩子
- **组件测试**: 使用 React Testing Library 测试组件行为
- **快照测试**: 用于检测UI意外变化

### 7.2 测试覆盖目标

- 核心功能: 95%+ 覆盖率
- UI组件: 80%+ 覆盖率
- 辅助功能: 70%+ 覆盖率

## 8. 最佳实践与规范

### 8.1 代码格式

- 使用 ESLint 和 Prettier 保持一致的代码风格
- 遵循项目的 TypeScript 类型定义
- 保持每个文件的单一职责

### 8.2 命名约定

- **组件**: PascalCase (如 `TweetCard`)
- **函数**: camelCase (如 `handleSubmit`)
- **常量**: UPPER_SNAKE_CASE (如 `MAX_TWEET_LENGTH`)
- **文件名**: 与主导出名称匹配 (如 `TweetCard.tsx`)

### 8.3 文件组织

```
src/
├── app/                  # Next.js App Router 页面
├── components/           # 共享组件
│   ├── ui/               # 基础UI组件
│   └── feature/          # 功能组件
├── hooks/                # 自定义钩子
├── lib/                  # 工具函数和共享逻辑
├── styles/               # 全局样式
└── types/                # TypeScript 类型定义
```

## 9. 开发工作流

### 9.1 新特性开发流程

1. 规划组件和数据流
2. 创建最小可行组件
3. 添加基本样式和功能
4. 实现交互和状态管理
5. 添加细节和动画
6. 测试和重构
7. 文档和代码审查

### 9.2 调试技巧

- 使用 React Developer Tools 检查组件树和prop
- 利用 `console.log` 和 Chrome DevTools
- 为复杂状态使用 Redux DevTools
- 使用 React 错误边界捕获UI错误

## 10. 国际化与本地化

TweetGenix 目前使用中文界面，但设计时考虑了未来的国际化拓展：

- 文本内容与组件逻辑分离
- 避免在代码中硬编码文本
- 日期和数字使用相应的格式化函数
- UI 设计预留足够空间适应不同语言长度

通过遵循本指南，开发者可以保持 TweetGenix 前端代码的一致性、可维护性和高质量标准。
