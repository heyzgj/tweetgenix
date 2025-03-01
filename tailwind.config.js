/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // App Router 路径
      "./components/**/*.{js,ts,jsx,tsx}", // 组件路径
      "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router（可选）
    ],
    theme: {
      extend: {
        colors: {
          accent: "#4F46E5", // 你的自定义颜色
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          // shadcn 默认颜色变量
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")], // shadcn 动画插件
  };