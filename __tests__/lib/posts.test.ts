/**
 * @jest-environment node
 */

import fs from 'fs';
import path from 'path';
import {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  savePost,
  deletePost,
  Post,
} from '@/lib/posts';

const testPostDir = path.join(process.cwd(), 'posts');

// 测试用的临时文章
const testPost: Post = {
  slug: 'test-post',
  title: '测试文章',
  date: '2026-02-27',
  tags: ['测试', 'Jest'],
  excerpt: '这是一篇测试文章',
  content: '# 测试标题\n\n这是测试内容。',
};

describe('lib/posts.ts', () => {
  // 每个测试前确保 posts 目录存在
  beforeAll(() => {
    if (!fs.existsSync(testPostDir)) {
      fs.mkdirSync(testPostDir, { recursive: true });
    }
  });

  // 测试后清理测试文章
  afterAll(() => {
    const testFile = path.join(testPostDir, 'test-post.md');
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    const testFile2 = path.join(testPostDir, 'test-post-2.md');
    if (fs.existsSync(testFile2)) {
      fs.unlinkSync(testFile2);
    }
  });

  describe('getPostSlugs', () => {
    it('应该返回 posts 目录中的文件列表', () => {
      const slugs = getPostSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
    });
  });

  describe('getPostBySlug', () => {
    it('应该根据 slug 获取文章', () => {
      const post = getPostBySlug('rust-ownership');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('content');
    });

    it('应该包含正确的 frontmatter 字段', () => {
      const post = getPostBySlug('rust-ownership');
      expect(post.title).toBe('从零开始理解 Rust 所有权系统');
      expect(post.tags).toContain('Rust');
      expect(typeof post.excerpt).toBe('string');
    });
  });

  describe('getAllPosts', () => {
    it('应该返回所有文章列表', () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('文章应该按日期倒序排列', () => {
      const posts = getAllPosts();
      for (let i = 0; i < posts.length - 1; i++) {
        expect(new Date(posts[i].date) >= new Date(posts[i + 1].date)).toBe(true);
      }
    });
  });

  describe('savePost', () => {
    it('应该成功创建新文章', () => {
      savePost(testPost);

      const savedPost = getPostBySlug('test-post');
      expect(savedPost.title).toBe('测试文章');
      expect(savedPost.date).toBe('2026-02-27');
      expect(savedPost.tags).toEqual(['测试', 'Jest']);
    });
  });

  describe('deletePost', () => {
    it('应该成功删除文章', () => {
      // 先创建一篇文章
      const testPost2: Post = {
        slug: 'test-post-2',
        title: '待删除文章',
        date: '2026-02-27',
        tags: ['测试'],
        excerpt: '测试删除',
        content: '# 内容',
      };
      savePost(testPost2);

      // 确认文章存在
      let posts = getAllPosts();
      const beforeCount = posts.length;

      // 删除
      deletePost('test-post-2');

      // 确认文章已删除
      posts = getAllPosts();
      expect(posts.length).toBe(beforeCount - 1);
    });
  });
});
