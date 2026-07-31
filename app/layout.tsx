import type { Metadata } from "next";
import "./globals.css";
import "./linear-layout.css";
import { ThemeToggle } from "./components/theme-toggle";

export const metadata: Metadata = {
  title: {
    default: "拾光 SHÍGUĀNG — AI 人才智能系统",
    template: "%s · 拾光 SHÍGUĀNG",
  },
  description:
    "从真实工作、公开证据与长期轨迹中理解稀缺 AI 人才，让每一个判断都能回到来源。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="light" data-lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('shiguang-theme');var l=localStorage.getItem('shiguang-language');document.documentElement.dataset.theme=t==='dark'?'dark':'light';document.documentElement.dataset.lang=l==='en'?'en':'zh';document.documentElement.lang=l==='en'?'en':'zh-CN';document.documentElement.style.colorScheme=t==='dark'?'dark':'light'}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
