# chenjinsheng's letter

A minimalist tech blog with Markdown support, CRM admin, and REST API.

## Features

- 📝 **Markdown Posts** - `.md` files with code highlighting
- 🖥️ **CRM Admin** - Create, edit, delete posts via UI
- 📚 **REST API** - Full CRUD endpoints
- 🎨 **Fresh & Light Design** - Light green, cream, white, soft black
- 🚀 **Vercel Ready** - One-click deployment

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit http://localhost:3000

### Deploy to Vercel

1. Fork this repo
2. Go to [Vercel](https://vercel.com)
3. Import `pretty_blog`
4. Click Deploy

## Project Structure

```
pretty_blog/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── posts/         # Posts CRUD
│   ├── admin/            # Admin Dashboard
│   ├── blog/[slug]/      # Post Detail
│   ├── globals.css       # Global Styles
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Home (Post List)
├── lib/
│   └── posts.ts          # Post Utilities
├── posts/                # Markdown Posts
├── __tests__/            # Test Files
├── docs/                 # Documentation
├── package.json
├── next.config.js
└── tsconfig.json
```

## API Endpoints

### Get All Posts

```bash
GET /api/posts
```

Response:
```json
{
  "posts": [
    {
      "slug": "rust-ownership",
      "title": "Understanding Rust Ownership",
      "date": "2026-02-27",
      "tags": ["Rust", "System"],
      "excerpt": "..."
    }
  ]
}
```

### Get Single Post

```bash
GET /api/posts/:slug
```

### Create Post

```bash
POST /api/posts
Content-Type: application/json

{
  "title": "Title",
  "slug": "slug",
  "date": "2026-02-27",
  "tags": ["tag1", "tag2"],
  "excerpt": "Excerpt",
  "content": "Markdown content"
}
```

### Update Post

```bash
PUT /api/posts/:slug
```

### Delete Post

```bash
DELETE /api/posts/:slug
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home - Post List |
| `/blog/[slug]` | Post Detail |
| `/admin` | Admin Dashboard |

## Add New Post

Method 1: Via Admin
Visit `/admin` to create online

Method 2: Local Markdown File

```markdown
---
title: "Post Title"
date: "2026-02-27"
tags: ["tag1", "tag2"]
excerpt: "Post excerpt..."
---

# Content

Markdown content here...
```

Save to `posts/` directory.

## Design System

### Colors

| Usage | Color |
|-------|-------|
| Background | #FFFDF7 (Cream White) |
| Card | #FFFFFF (Pure White) |
| Accent | #C8E6C9 (Light Green) |
| Highlight | #FFF8E1 (Cream) |
| Text | #3A4A3A (Soft Black) |

### Fonts

- Headlines: Noto Serif SC
- Body: Noto Sans SC

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules / CSS Variables
- **Markdown**: gray-matter + remark
- **Testing**: Jest + esbuild-jest
- **Deployment**: Vercel

## Test

```bash
npm test
```

## License

MIT
