# Tailwind CSS v4 使用指南

## 简介

Tailwind CSS 是一个实用优先的 CSS 框架，可以帮助您快速构建现代网站，而无需离开 HTML。在 TweetGenix 项目中，我们使用 Tailwind CSS v4 来构建用户界面，并结合自定义设计令牌系统，确保整个应用程序的视觉一致性。

## 设计令牌系统

我们的设计系统基于明确定义的设计令牌，这些令牌在 `globals.css` 中定义，并通过 Tailwind CSS 的原子类或我们的组件复合类使用。

### 核心设计令牌

```css
:root {
  /* 颜色 */
  --background: oklch(100% 0 0);        /* 页面背景色 */
  --foreground: oklch(15% 0 0);          /* 主要文本颜色 */
  --primary: oklch(15% 0 0);             /* 主要颜色 */
  --primary-hover: oklch(15% 0 0 / 0.8); /* 深蓝色，用于悬停 */
  --muted: oklch(97% 0 0);               /* 减弱的背景色 */
  --muted-foreground: oklch(45% 0 0);   /* 减弱的文本颜色 */
  --border: oklch(95% 0 0);              /* 边框颜色 */
  --success: oklch(60% 0.15 150);        /* 成功状态颜色 */
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* 间距 */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  /* ... 更多间距变量 ... */
  
  /* 过渡 */
  --transition-normal: 0.2s ease;
}
```

### 使用设计令牌

在 Tailwind 中使用设计令牌有两种主要方式：

1. **直接在原子类中使用**:

```jsx
<button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
  Click me
</button>
```

2. **通过组件复合类使用**:

```jsx
<button className="btn-primary">
  Click me
</button>
```

## 组件复合类

我们创建了许多复合类来封装常见的样式组合，确保一致性并提高开发效率。

### 按钮

```css
.btn-primary {
  @apply bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] 
         rounded-[var(--radius-full)] px-4 py-2 font-medium transition-colors 
         hover:bg-[hsl(var(--primary-hover))] disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-transparent text-[hsl(var(--primary))] border border-[hsl(var(--border))] 
         rounded-[var(--radius-full)] px-4 py-2 font-medium transition-colors 
         hover:bg-[hsl(var(--secondary))] disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-ghost {
  @apply bg-transparent text-[hsl(var(--foreground))] rounded-[var(--radius-full)] 
         px-4 py-2 font-medium transition-colors hover:bg-[hsl(var(--muted))] 
         disabled:opacity-50 disabled:cursor-not-allowed;
}
```

### 输入框

```css
.input-standard {
  @apply w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] 
         bg-transparent px-3 py-1 text-[hsl(var(--foreground))] 
         focus:outline-none focus:border-[hsl(var(--primary))] 
         focus:ring-2 focus:ring-[hsl(var(--primary)/20%)] transition-colors 
         disabled:opacity-50 disabled:cursor-not-allowed;
}
```

### 卡片

```css
.card-standard {
  @apply bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] 
         rounded-[var(--radius-lg)] border border-[hsl(var(--border))] 
         shadow-[var(--shadow-sm)] overflow-hidden;
}
```

## 样式使用规范

### 1. 优先使用设计令牌

**✅ 推荐**: 使用设计令牌变量

```tsx
<div className="text-[hsl(var(--foreground))] bg-[hsl(var(--background))]">
  Hello World
</div>
```

**❌ 避免**: 直接使用颜色代码

```tsx
<div className="text-[#0f1419] bg-white">
  Hello World
</div>
```

### 2. 优先使用组件复合类

**✅ 推荐**: 使用预定义的组件类

```tsx
<button className="btn-primary">
  提交
</button>
```

**❌ 避免**: 重复编写相同的样式组合

```tsx
<button className="bg-[hsl(var(--primary))] text-white rounded-full px-4 py-2 hover:bg-blue-600">
  提交
</button>
```

### 3. 响应式设计

使用 Tailwind 的响应式前缀来适应不同屏幕尺寸：

```tsx
<div className="flex flex-col md:flex-row gap-4">
  {/* 在移动端是垂直排列，在中等尺寸及以上是水平排列 */}
</div>
```

### 4. 状态变体

利用 Tailwind 的状态变体来设计交互状态：

```tsx
<button className="btn-primary hover:bg-[hsl(var(--primary-hover))] focus:ring-2 focus:ring-[hsl(var(--primary)/50%)]">
  Hover and Focus
</button>
```

## 最佳实践

1. **组件抽象**：对于重复使用的 UI 模式，创建 React 组件而不是复制粘贴样式类。

2. **避免内联样式**：使用 Tailwind 类或自定义 CSS 类，避免使用内联样式。

3. **使用语义化类名**：当创建自定义组件时，使用描述组件用途而非其外观的类名。

4. **组织类名顺序**：建议按照以下顺序组织类名：
   - 布局类 (display, position)
   - 尺寸类 (width, height)
   - 间距类 (margin, padding)
   - 边框类 (border, rounded)
   - 颜色类 (text, bg)
   - 其他样式 (shadow, opacity)
   - 状态变体 (hover, focus)

5. **在需要时使用 `@apply`**：如果一组样式被频繁重用，考虑创建一个组件类。

## 排错指南

### 1. 样式未应用

如果样式未正确应用，请检查：
- 类名是否拼写正确
- CSS 变量是否在正确的范围内定义
- 是否有高优先级样式覆盖了您的样式

### 2. HSL 颜色使用

使用 HSL 颜色变量时，确保正确使用 `hsl()` 函数：

```tsx
// 正确
<div className="bg-[hsl(var(--primary))]"></div>

// 错误
<div className="bg-[var(--primary)]"></div>
```

### 3. 自定义值

对于 Tailwind 配置中没有的值，可以使用方括号语法：

```tsx
<div className="w-[342px] h-[calc(100vh-80px)]"></div>
```

## 样式重构

在进行样式更改时：

1. 先检查是否有设计令牌可以使用
2. 然后检查是否有组件复合类可以使用
3. 如果以上都不适用，使用 Tailwind 原子类
4. 仅在必要时创建新的自定义样式

通过遵循这些指南，我们可以保持代码库的一致性，提高开发效率，并确保用户界面在整个应用程序中保持一致的外观和感觉。
