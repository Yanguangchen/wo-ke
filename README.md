# 沃克 Wò Kè — 静态网站

一个无需后端的静态双语网站，展示沙龙服务、特色与会员卡信息。

## 本地预览

1. 用任意静态服务器打开根目录，例如：

```bash
# Python 3
python3 -m http.server 5173
# 或者 Node（推荐）
npx serve@latest -l 5173
```

2. 浏览器访问：

```bash
http://localhost:5173
```

> 直接双击 `index.html` 也可打开，但浏览器可能限制 `module` 脚本的本地导入。

## 结构

```
index.html          # 页面骨架和区块
public/styles.css   # 响应式样式
public/data.js      # 沙龙数据（双语）
public/app.js       # 渲染逻辑（从 data.js 填充页面）
assets/             # 资源（logo、照片等，可自行添加）
```

## 部署

- 静态托管（推荐）：将整个目录上传至静态托管平台（如 Vercel、Netlify、GitHub Pages、Cloudflare Pages）。
- Nginx/Apache：将该目录设为站点根目录。

## 自定义

- 修改 `public/data.js` 更新价格、文案与联系方式。
- 在 `public/styles.css` 调整配色变量（`--brand` 等）以匹配品牌色。
- 在 `index.html` 中添加或移动区块。

## 版权

© 沃克 Wò Kè. 保留所有权利。
