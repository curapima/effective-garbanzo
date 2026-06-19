import fs from "node:fs";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function slugify(input) {
  const slug = input
    .trim()
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `post-${formatDate()}`;
}

function readOption(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((item) => item.startsWith(prefix));

  return value ? value.slice(prefix.length).trim() : fallback;
}

const title = process.argv.find((item, index) => index > 1 && !item.startsWith("--")) ?? "未命名文章";
const date = readOption("date", formatDate());
const slug = slugify(readOption("slug", title));
const description = readOption("description", "这里填写文章摘要，用于列表页和 SEO。");
const category = readOption("category", "随笔");
const tags = readOption("tags", "博客").split(",").map((tag) => tag.trim()).filter(Boolean);
const draft = readOption("draft", "true") !== "false";
const filePath = path.join(postsDirectory, `${slug}.md`);

if (fs.existsSync(filePath)) {
  throw new Error(`文章已存在：${path.relative(process.cwd(), filePath)}`);
}

fs.mkdirSync(postsDirectory, { recursive: true });
fs.writeFileSync(
  filePath,
  `---\ntitle: "${title}"\ndescription: "${description}"\ndate: "${date}"\nupdated: "${date}"\ncategory: "${category}"\ntags:\n${tags.map((tag) => `  - "${tag}"`).join("\n")}\ndraft: ${draft}\n---\n\n## 小标题\n\n从这里开始写正文。支持 Markdown 标题、列表、引用、表格、代码块和图片。\n\n\`\`\`ts\nconst status = "ready";\n\`\`\`\n`,
  "utf8",
);

console.log(`Created ${path.relative(process.cwd(), filePath)}`);
