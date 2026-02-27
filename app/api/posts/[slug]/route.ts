import { NextRequest, NextResponse } from "next/server";
import { savePost, deletePost, getPostBySlug } from "@/lib/posts";

export async function GET(
  request: NextRequest,
  { params } Promise<{ slug: { params:: string }> }
) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: "文章不存在" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, date, tags, excerpt, content } = body;

    if (!title || !date || !content) {
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
      { error: "更新文章失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    deletePost(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "删除文章失败" },
      { status: 500 }
    );
  }
}
