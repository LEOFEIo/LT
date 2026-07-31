import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
