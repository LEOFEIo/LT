# 拾光 Shiguang Recruiting

一套面向 AI 与科技人才招聘的全栈网站，采用 Meta 风格的明亮产品视觉系统。

项目包含：

- 可直接用于 GitHub Pages 的根目录 `index.html`
- AI 人才自然语言搜索
- 精选职位列表与职位详情
- 候选人申请与个人档案
- 招聘顾问工作台与管理后台
- Neon PostgreSQL 可选数据持久化
- Vercel 一键部署配置
- GitHub Actions 自动构建检查

## 上传到 GitHub

1. 解压下载的 ZIP。
2. 在 GitHub 新建一个空仓库，不要预先添加 README 或 `.gitignore`。
3. 点击 **Add file → Upload files**。
4. 把 `Shiguang-Recruiting-GitHub` 文件夹里面的全部内容拖入上传区域。
5. 提交后即可在仓库中看到 `app`、`public`、`package.json` 等文件。

也可以使用 Git：

```bash
git init
git add .
git commit -m "Initial Shiguang Recruiting site"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 部署到 GitHub Pages

根目录的 [`index.html`](./index.html) 是完整的单文件静态站点，不需要安装依赖或执行构建：

1. 把项目内容上传到 GitHub 仓库的 `main` 分支。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 分支选择 `main`，目录选择 `/ (root)`，然后保存。

GitHub Pages 会直接发布 `index.html`。该静态版包含人才自然语言筛选、候选人详情、浏览器本地收藏、个性化触达文案、职位筛选、移动菜单和 FAQ 等交互。

> `index.html` 与 Next.js 应用相互独立：GitHub Pages 用于静态展示，Vercel 用于完整的申请流程、工作台、API 和管理后台。

## 本地运行

要求 Node.js 22.13 或更高版本。

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。

不配置数据库也能运行，网站会自动使用内置演示职位和人才数据。

如果只想预览 GitHub Pages 静态版，可以直接双击 `index.html`，或运行：

```bash
python3 -m http.server 8080
```

然后打开 `http://localhost:8080`。

## 环境变量

复制 `.env.example` 为 `.env.local`：

```env
DATABASE_URL=
AUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

- `DATABASE_URL`：可选，推荐使用 Neon PostgreSQL。
- `AUTH_SECRET`：生产环境必须设置为随机长字符串。
- `ADMIN_EMAIL`：管理后台账号邮箱。
- `ADMIN_PASSWORD`：管理后台密码。

## 部署到 Vercel

1. 在 Vercel 选择 **Add New → Project**。
2. 导入刚上传的 GitHub 仓库。
3. Framework Preset 选择 **Next.js**，其余构建配置保持默认。
4. 如果需要真实数据和管理后台，在 Environment Variables 中填写上述变量。
5. 点击 **Deploy**。

项目自带 `vercel.json`，Vercel 会执行数据库初始化脚本和 Next.js 生产构建。未配置 `DATABASE_URL` 时，初始化脚本会安全跳过。

## 常用命令

```bash
npm run dev        # 本地开发
npm run typecheck  # TypeScript 检查
npm run lint       # ESLint 检查
npm run build      # 生产构建
npm run check      # 执行全部检查
npm run db:setup   # 初始化数据库
```

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Neon PostgreSQL

设计规则保存在 [`DESIGN.md`](./DESIGN.md)。

## 设计说明

网站以 Meta 设计系统为主要视觉语言：白色画布、黑色营销 CTA、圆角胶囊按钮、32px 大卡片和轻量边框。人才搜索、证据核验与个性化触达的信息结构参考现代人才智能产品，但所有品牌、文案、候选人和职位数据均为“拾光”原创演示内容。
