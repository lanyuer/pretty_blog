import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
          <div className="post-meta">
            <span className="post-date">{post.date}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-footer">
            <span className="read-more">
              阅读全文
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </Link>
      ))}

      {posts.length === 0 && (
        <div className="post-card" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
          <p>暂无文章，敬请期待...</p>
        </div>
      )}
    </main>
  );
}
