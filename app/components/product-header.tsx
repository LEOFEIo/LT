import type { ChatGPTUser } from "../chatgpt-auth";
import { chatGPTSignInPath, chatGPTSignOutPath } from "../chatgpt-auth";
import Link from "next/link";

export function ProductHeader({
  user,
  active,
}: {
  user?: ChatGPTUser | null;
  active?: "product" | "jobs" | "workspace" | "admin";
}) {
  return (
    <header className="product-header">
      <Link className="wordmark" href="/">
        <i aria-hidden="true">拾</i>
        <span>
          <b>拾光</b>
          <small>talent intelligence</small>
        </span>
      </Link>
      <nav className="product-nav" aria-label="产品导航">
        <Link
          className={active === "product" ? "active" : ""}
          href="/#thinking"
        >
          产品
        </Link>
        <Link className={active === "jobs" ? "active" : ""} href="/jobs">
          开放机会
        </Link>
        <Link
          className={active === "workspace" ? "active" : ""}
          href="/workspace"
        >
          工作台
        </Link>
        <Link className={active === "admin" ? "active" : ""} href="/admin">
          顾问后台
        </Link>
      </nav>
      <div className="product-account">
        {user ? (
          <>
            <span className="account-name">
              <i className="live-dot" />
              {user.displayName}
            </span>
            <a className="header-text-action" href={chatGPTSignOutPath("/")}>
              退出
            </a>
          </>
        ) : (
          <>
            <a
              className="header-text-action"
              href={chatGPTSignInPath("/workspace")}
            >
              登录
            </a>
            <Link className="header-primary-action" href="/#search">
              开始搜索
            </Link>
          </>
        )}
      </div>
      <details className="mobile-nav">
        <summary>菜单</summary>
        <nav aria-label="移动端产品导航">
          <Link href="/#thinking">产品</Link>
          <Link href="/jobs">开放机会</Link>
          <Link href="/workspace">工作台</Link>
          <Link href="/admin">顾问后台</Link>
        </nav>
      </details>
    </header>
  );
}
