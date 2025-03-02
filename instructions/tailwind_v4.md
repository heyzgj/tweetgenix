# 使用 Tailwind CSS v4 的指南

## 介绍
Tailwind CSS v4 是一个现代的 CSS 框架，旨在提高开发效率和性能。此版本引入了 CSS-first 配置，简化了样式的使用和管理。

## 安装
在项目中使用 Tailwind CSS v4，首先需要安装相关依赖。使用以下命令：

```bash
npm install tailwindcss@latest postcss
```

## 配置
### 1. 创建 CSS 文件
在 `src/styles` 目录中创建一个新的 CSS 文件，例如 `styles.css`。

### 2. 引入 Tailwind
在 `styles.css` 文件中，添加以下内容以引入 Tailwind：

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", sans-serif;
  --color-primary: oklch(0.72 0.19 244.08);
  /* 添加其他主题变量 */
}
```

### 3. 更新 Next.js 配置
在 `next.config.js` 文件中，添加以下配置以启用 Tailwind CSS v4：

```javascript
module.exports = {
  experimental: {
    tailwindcss: {
      version: '4.0'
    }
  }
}
```

## 使用 Tailwind CSS
### 1. 在组件中使用
在您的 React 组件中，您可以直接使用 Tailwind 的类名。例如：

```javascript
<div className="bg-primary p-4 rounded-lg hover:scale-105 transition-transform">
  <h1 className="text-3xl font-bold">欢迎使用 Tailwind CSS v4</h1>
</div>
```

### 2. 动态实用程序值
Tailwind v4 支持动态实用程序值，您可以根据需要灵活使用。

### 3. 响应式设计
使用 Tailwind 的响应式设计功能，您可以轻松地为不同屏幕尺寸应用样式。例如：

```javascript
<div className="text-base md:text-lg lg:text-xl">
  这是一个响应式文本
</div>
```

## 与 Tailwind v3 的不同
- **CSS-first 配置**: v4 允许您在 CSS 文件中直接配置，而不再需要 `tailwind.config.js` 文件。
- **性能优化**: v4 提供了更快的构建时间和更小的包大小。
- **动态实用程序**: v4 引入了更多动态实用程序值，简化了样式的应用。

## 常见问题
### 1. 如何处理颜色和主题？
您可以在 `@theme` 中定义颜色变量，并在组件中使用这些变量。

### 2. 如何确保样式生效？
确保在项目的入口文件中引入了 `styles.css`，并检查浏览器的开发者工具以确认样式是否应用。

## 参考资料
- [Tailwind CSS v4.0 Quick Guide](https://dev.to/utkarshthedev/tailwind-css-v40-quick-guide-2bh5)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/blog/tailwindcss-v4)

## 结论
Tailwind CSS v4 提供了强大的功能和灵活性，使得开发现代网页变得更加高效。通过遵循本指南，您可以在项目中顺利集成和使用 Tailwind CSS v4。
