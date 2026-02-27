/**
 * @jest-environment node
 */

import { POST, GET } from '@/app/api/posts/route';
import { PUT, DELETE } from '@/app/api/posts/[slug]/route';
import { NextRequest } from 'next/server';

// 模拟 NextRequest
function createMockRequest(body: any, method: string = 'POST') {
  const req = {
    json: async () => body,
    method,
  } as unknown as NextRequest;
  return req;
}

describe('API: /api/posts', () => {
  describe('GET /api/posts', () => {
    it('应该返回文章列表', async () => {
      const req = createMockRequest({}, 'GET');
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty('posts');
      expect(Array.isArray(data.posts)).toBe(true);
    });
  });

  describe('POST /api/posts', () => {
    it('缺少必填字段应该返回 400', async () => {
      const req = createMockRequest({ title: '测试' });
      const res = await POST(req);

      expect(res.status).toBe(400);
    });

    it('正常创建文章应该返回成功', async () => {
      const newPost = {
        title: 'API 测试文章',
        slug: 'api-test-' + Date.now(),
        date: '2026-02-27',
        tags: ['测试'],
        excerpt: 'API 测试',
        content: '# 内容',
      };

      const req = createMockRequest(newPost);
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});

describe('API: /api/posts/[slug]', () => {
  const testSlug = 'test-slug-' + Date.now();

  describe('PUT /api/posts/[slug]', () => {
    it('更新文章应该返回成功', async () => {
      // 先创建文章
      const createReq = createMockRequest({
        title: '原始标题',
        slug: testSlug,
        date: '2026-02-27',
        tags: [],
        excerpt: '',
        content: '# 内容',
      });
      await POST(createReq);

      // 更新
      const updateReq = createMockRequest({
        title: '更新后的标题',
        date: '2026-02-28',
        tags: ['更新'],
        excerpt: '更新摘要',
        content: '# 新内容',
      });

      // 模拟 params
      const { params } = { params: Promise.resolve({ slug: testSlug }) } as any;
      const res = await PUT(updateReq, { params } as any);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /api/posts/[slug]', () => {
    it('删除文章应该返回成功', async () => {
      const { params } = { params: Promise.resolve({ slug: testSlug }) } as any;
      const req = createMockRequest({}, 'DELETE');
      const res = await DELETE(req, { params } as any);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});
