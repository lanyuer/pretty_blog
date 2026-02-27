import { getPostBySlug, getAllPosts, markdownToHtml } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content);

  return (
    <article>
      <Link href="/" style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", display: "inline-block", marginBottom: "24px" }}>
        ← 返回首页
      </Link>

      <div className="post-meta" style={{ marginBottom: "16px" }}>
        <span className="post-date">{post.date}</span>
        {post.tags.map((tag) => (
          <span key={tag} className="post-tag">{tag}</span>
        ))}
      </div>

      <h1 className="post-title" style={{ fontSize: "1.8rem", marginBottom: "24px" }}>
        {post.title}
      </h1>

      <div
        className="post-content"
        style={{
          fontSize: "1rem",
          lineHeight: "1.9",
          color: "var(--color-text-secondary)",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(58, 74, 58, 0.08)" }}>
        <Link href="/" style={{ color: "var(--color-green-muted)" }}>
          ← 返回文章列表
        </Link>
      </div>
    </article>
  );
}
