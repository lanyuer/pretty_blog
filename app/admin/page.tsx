"use client";

import { useState, useEffect } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: "",
    tags: "",
    excerpt: "",
    content: "",
  });

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const post = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const method = isCreating ? "POST" : "PUT";
    const url = isCreating ? "/api/posts" : `/api/posts/${formData.slug}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    // 刷新列表
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);

    // 重置表单
    setIsCreating(false);
    setEditingPost(null);
    setFormData({ title: "", slug: "", date: "", tags: "", excerpt: "", content: "" });
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("确定要删除这篇文章吗？")) return;

    await fetch(`/api/posts/${slug}`, { method: "DELETE" });

    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      slug: post.slug,
      date: post.date,
      tags: post.tags.join(", "),
      excerpt: post.excerpt,
      content: "",
    });
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      tags: "",
      excerpt: "",
      content: "",
    });
  };

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>文章管理</h2>
        <button
          onClick={startCreate}
          style={{
            background: "var(--color-green-muted)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          + 新建文章
        </button>
      </div>

      {/* 文章列表 */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "16px", color: "var(--color-text-secondary)" }}>文章列表</h3>
        {posts.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>暂无文章</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.slug}
              className="post-card"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <h4 style={{ fontWeight: 600 }}>{post.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                  {post.date} · {post.tags.join(", ")}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-green-muted)",
                    color: "var(--color-green-muted)",
                    padding: "6px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  style={{
                    background: "transparent",
                    border: "1px solid #e57373",
                    color: "#e57373",
                    padding: "6px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 编辑器 */}
      {(isCreating || editingPost) && (
        <div className="post-card">
          <h3 style={{ fontSize: "1rem", marginBottom: "20px", fontFamily: "var(--font-serif)" }}>
            {isCreating ? "新建文章" : "编辑文章"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                  标题
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid rgba(58, 74, 58, 0.15)",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  disabled={!isCreating}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid rgba(58, 74, 58, 0.15)",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    outline: "none",
                    background: !isCreating ? "#f5f5f5" : "white",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                  日期
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid rgba(58, 74, 58, 0.15)",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                  标签（逗号分隔）
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Rust, Go, 算法"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid rgba(58, 74, 58, 0.15)",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                摘要
              </label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid rgba(58, 74, 58, 0.15)",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
                内容（Markdown）
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid rgba(58, 74, 58, 0.15)",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                style={{
                  background: "var(--color-green-muted)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                {isCreating ? "创建文章" : "保存修改"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingPost(null);
                }}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-text-muted)",
                  color: "var(--color-text-secondary)",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
