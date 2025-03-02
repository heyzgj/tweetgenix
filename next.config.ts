import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // @ts-ignore: 忽略 tailwindcss 属性的类型检查
    tailwindcss: {
      version: '4.0'
    }
  },
};

export default nextConfig;