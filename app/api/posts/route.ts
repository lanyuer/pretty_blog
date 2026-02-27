import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, getPostBySlug } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, date, tags, excerpt, content } = body;

    if (!title || !slug || !date || !content) {
      return NextResponse.json(
        { error: "缺少必要字段" },
        { status: 400 }
      );
    }

    const post = { slug, title, date, tags, excerpt, content };
    savePost(post);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { error: "创建文章失败" },
      { status: 500 }
    );
  }
}
