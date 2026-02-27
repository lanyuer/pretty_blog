export default function matter(content: string) {
  const lines = content.split('\n');
  const frontmatter: Record<string, any> = {};
  let contentStart = 0;

  // 简单的 frontmatter 解析
  if (lines[0]?.trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        contentStart = i + 1;
        break;
      }
      const [key, ...valueParts] = lines[i].split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        // 处理 tags 数组
        if (key.trim() === 'tags') {
          const tagMatch = value.match(/\[(.*)\]/);
          if (tagMatch) {
            frontmatter[key.trim()] = tagMatch[1].split(',').map((t: string) => t.trim().replace(/"/g, ''));
          }
        } else {
          frontmatter[key.trim()] = value;
        }
      }
    }
  }

  return {
    data: frontmatter,
    content: lines.slice(contentStart).join('\n').trim(),
  };
}
