import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://tky-blog.vercel.app"),
  title: {
    default: "TKY Blog",
    template: "%s | TKY Blog",
  },
  description: "黑白灰像素终端风格的个人博客，记录技术、项目和长期思考。",
  openGraph: {
    title: "TKY Blog",
    description: "黑白灰像素终端风格的个人博客。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
