import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "chenjinsheng's letter",
  description: "技术札记 · 思考与记录",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="container">
          <header>
            <h1 className="logo">chenjinsheng</h1>
            <p className="tagline">Code & Thoughts</p>
          </header>

          <nav>
            <a href="/">首页</a>
            <a href="/blog">文章</a>
            <a href="/admin">管理</a>
          </nav>

          {children}

          <footer>
            <p>© 2026 chenjinsheng's letter</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
