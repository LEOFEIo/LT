import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getChatGPTUser,
  safeRelativeReturnPath,
} from "../chatgpt-auth";

export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  invalid: "请填写有效的姓名和邮箱。",
  admin: "管理员密码不正确。",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string; error?: string }>;
}) {
  const params = await searchParams;
  const returnTo = safeRelativeReturnPath(params.return_to ?? "/workspace");
  const user = await getChatGPTUser();
  if (user) redirect(returnTo);

  return (
    <main className="signin-page">
      <section className="signin-panel">
        <div className="signin-topline">
          <Link className="ui-mark" href="/">
            <span className="mark-symbol">拾</span>
            <span>
              拾光
              <small>SHÍGUĀNG</small>
            </span>
          </Link>
          <span className="status-chip">SECURE</span>
        </div>

        <div className="signin-copy">
          <span className="ui-eyebrow">SECURE WORKSPACE</span>
          <h1>进入你的<br />人才工作台。</h1>
          <p>
            候选人可查看申请进度；管理员使用配置的邮箱与密码进入顾问后台。
          </p>
        </div>

        <form action="/api/auth/signin" method="post" className="signin-form">
          <input type="hidden" name="returnTo" value={returnTo} />
          <label>
            <span>姓名</span>
            <input
              autoComplete="name"
              name="displayName"
              placeholder="你的姓名"
              required
            />
          </label>
          <label>
            <span>邮箱</span>
            <input
              autoComplete="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              required
            />
          </label>
          <label>
            <span>管理员密码 <small>普通候选人无需填写</small></span>
            <input
              autoComplete="current-password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </label>
          {params.error ? (
            <p className="signin-error">
              {errorMessages[params.error] ?? "登录失败，请重试。"}
            </p>
          ) : null}
          <button className="primary-button" type="submit">
            进入工作台 ↗
          </button>
        </form>

        <p className="signin-note">
          登录即表示你同意仅将提交信息用于职位匹配。
        </p>
      </section>
      <aside className="signin-visual" aria-hidden="true">
        <span>SHIGUANG / AUTH</span>
        <div className="auth-orbit">
          <i />
          <i />
          <i />
        </div>
        <p>Evidence first.<br />People always.</p>
      </aside>
    </main>
  );
}
