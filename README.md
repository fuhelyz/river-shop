# River商城前端

该仓库是River商城系统的前端部分，采用Vue 3 + Vite + Element Plus实现，提供现代化的电商购物体验。

## 项目特点

- 基于Vue 3和Vite构建的现代化前端项目
- 使用Element Plus组件库，提供美观的UI界面
- 采用Vue Router进行路由管理
- 使用Vuex进行状态管理
- 响应式设计，适配各种屏幕尺寸
- 参考苹果设计风格，提供良好的用户体验

## 运行项目

### 环境准备

- 安装 [Node.js](https://nodejs.org/)（建议v16.0以上版本）
- 确保已安装npm或yarn包管理工具

### 安装依赖

```bash
# 进入项目目录
cd river-shop/front-end-for-cus

# 安装依赖
npm install
# 或使用yarn
yarn
```

### 启动开发服务器

```bash
# 启动开发服务器
npm run dev
# 或使用yarn
yarn dev
```

### 访问网页

- 打开浏览器访问 http://localhost:5173
- 如需网络访问，启动时使用 `npm run dev -- --host`

### 构建生产版本（可选）

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 注意事项

- 项目已配置好所需依赖，包括Vue、Element Plus、vue-router等
- 如果后端API不可用，前端页面仍可显示但功能会受限
- 项目默认使用了模拟数据，实际使用时需连接真实API
- 用户认证实现了密码加盐哈希加密，提高安全性

## 主要功能

- 用户注册与登录（支持用户名/手机号登录）
- 商品分类浏览
- 商品搜索
- 商品详情查看
- 购物车管理
- 订单管理
- 个人中心

## 项目结构

```
src/
├── api/        # API请求
├── assets/     # 静态资源
├── components/ # 组件
├── router/     # 路由
├── store/      # 状态管理
├── styles/     # 全局样式
├── utils/      # 工具函数
└── views/      # 页面
```