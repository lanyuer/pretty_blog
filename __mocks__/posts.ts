// Mock for lib/posts.ts
import { Post } from '@/lib/posts';

const mockPosts: Post[] = [
  {
    slug: 'rust-ownership',
    title: '从零开始理解 Rust 所有权系统',
    date: '2026-02-27',
    tags: ['Rust', '系统编程', '教程'],
    excerpt: '所有权是 Rust 最核心的概念...',
    content: '# 所有权\n\n这是测试内容...',
  },
];

export function getPostSlugs() {
  return mockPosts.map(p => `${p.slug}.md`);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const post = mockPosts.find(p => p.slug === realSlug);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
}

export function getAllPosts(): Post[] {
  return [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function markdownToHtml(markdown: string) {
  return `<html><body>${markdown}</body></html>`;
}

export function savePost(post: Post) {
  const index = mockPosts.findIndex(p => p.slug === post.slug);
  if (index >= 0) {
    mockPosts[index] = post;
  } else {
    mockPosts.push(post);
  }
}

export function deletePost(slug: string) {
  const index = mockPosts.findIndex(p => p.slug === slug);
  if (index >= 0) {
    mockPosts.splice(index, 1);
  }
}
