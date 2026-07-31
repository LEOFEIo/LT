# 拾光 Shiguang Recruiting

一套可直接上传 GitHub、部署到 Vercel 的全栈 AI 人才招聘网站。V8 使用 Notion-inspired 浅色优先产品系统和 DINQ 式人才智能工作流；所有品牌、图标、文案和演示数据均为原创，与 Notion 无官方关联。

## 这个版本包含

- Notion-inspired 白色画布、暖灰表面、紫色主操作与高对比信息层级
- 中/英文一键切换，浅色/暗黑双主题并自动记忆选择
- 固定 1184px 桌面容器，低于 1100px 自动切换单列，避免中等电脑宽度双栏挤压
- DINQ 式自然语言人才搜索、履历证据、候选清单与个性化触达
- 交互式招聘计划器：HC、周期、人才难度、漏斗测算、复制与下载计划
- React 人才搜索：实时 API 查询、本地收藏、双候选人对比
- JD 智能解析、能力标签、招聘难点与候选人推荐
- 双候选人能力对比与结构化面试问题生成
- 招聘 Copilot、`⌘K` 快捷命令与原创 SVG 图标系统
- GitHub Pages 静态候选人中心和招聘方后台
- Next.js 候选人端、招聘方驾驶舱和完整管理控制台
- 精选职位、申请流程、个人档案、CSV 导出与可选 Neon 数据库
- 无数据库演示降级：档案和申请可安全保存在当前浏览器，不再直接报错

## 目录入口

| 页面 | GitHub Pages 静态版 | Next.js / Vercel |
| --- | --- | --- |
| 品牌首页 | `index.html` | `/` |
| 登录 | `login.html` | `/signin` |
| 候选人中心 | `candidate.html` | `/candidate` |
| 招聘方后台 | `recruiter.html` | `/recruiter` |
| 完整管理台 | 静态招聘方后台内演示 | `/admin` |

## 静态演示账号

- 管理员用户名：`admin`
- 管理员密码：`fy147852`

> 重要：GitHub Pages 是纯前端网站，静态账号与密码必然能在源代码中看到，只能用于产品演示，不能保护真实候选人数据。正式上线请部署 Next.js 版本，通过环境变量更换账号密码，并连接数据库和企业身份认证。

候选人无需密码，在登录页填写姓名和邮箱即可进入。静态版的档案、招聘阶段和新增人才只保存在当前浏览器的 `localStorage` 中。

## 直接上传 GitHub

1. 解压下载的 ZIP。
2. 在 GitHub 新建空仓库，不要预先添加 README 或 `.gitignore`。
3. 点击 **Add file → Upload files**。
4. 将 `Shiguang-Recruiting-GitHub` 文件夹内的全部内容拖入上传区域。
5. 提交到 `main` 分支。

也可以使用 Git：

```bash
git init
git add .
git commit -m "Launch Shiguang Recruiting"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 部署 GitHub Pages

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**。
3. 分支选择 `main`，目录选择 `/ (root)`。
4. 保存后访问 GitHub 提供的 Pages 地址。

根目录 `index.html`、`login.html`、`candidate.html` 和 `recruiter.html` 是 GitHub Pages 演示入口。完整产品不是纯静态站：Next.js 版本包含 React 状态、API、登录、候选人端、招聘方后台以及可选 Neon 数据持久化，建议正式使用 Vercel 部署。

## 本地预览静态版

可以直接打开 `index.html`，或使用本地服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 运行完整 Next.js 版

要求 Node.js 22.13 或更高版本。

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。不配置数据库时，品牌首页、职位、候选人中心和招聘方后台会使用内置演示数据；连接数据库后，申请、档案和后台操作可持久化。

## 环境变量

```env
DATABASE_URL=
AUTH_SECRET=
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@shiguang.local
ADMIN_PASSWORD=fy147852
```

- `DATABASE_URL`：可选，推荐使用 Neon PostgreSQL。
- `AUTH_SECRET`：生产环境必须设置为随机长字符串。
- `ADMIN_USERNAME`：管理员登录用户名。
- `ADMIN_EMAIL`：管理员会话邮箱标识。
- `ADMIN_PASSWORD`：管理员密码，生产部署必须更换。

## 部署 Vercel

1. 在 Vercel 选择 **Add New → Project** 并导入仓库。
2. Framework Preset 选择 **Next.js**。
3. 在 Environment Variables 中设置 `AUTH_SECRET` 和新的管理员凭据。
4. 如需真实申请和档案数据，再配置 `DATABASE_URL`。
5. 点击 **Deploy**。

项目自带 `vercel.json`。没有 `DATABASE_URL` 时，数据库初始化会安全跳过。

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

- Next.js 16、React 19、TypeScript
- Drizzle ORM、Neon PostgreSQL
- 原生 HTML、CSS、JavaScript 静态门户
- 原创内联 SVG 图标

完整设计令牌、组件规则与响应式约束见 [`DESIGN.md`](./DESIGN.md)。
