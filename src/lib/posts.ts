import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

const postFileExtensionPattern = /\.mdx?$/i;
const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

type RawPostFrontmatter = Omit<PostFrontmatter, "date" | "updated"> & {
  date: string | Date;
  updated?: string | Date;
};

export function createPostSlug(filePath: string): string {
  const normalizedPath = filePath.replaceAll("\\", "/");
  const fileName = path.posix.basename(normalizedPath);

  return fileName.replace(postFileExtensionPattern, "");
}

function isPostFile(fileName: string): boolean {
  return postFileExtensionPattern.test(fileName);
}

function normalizeFrontmatterDate(date: string | Date | undefined): string | undefined {
  if (!date) {
    return undefined;
  }

  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return date;
}

function toPost(fileName: string): Post {
  const fullPath = path.join(postsDirectory, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = data as RawPostFrontmatter;

  return {
    ...frontmatter,
    date: normalizeFrontmatterDate(frontmatter.date) ?? "",
    updated: normalizeFrontmatterDate(frontmatter.updated),
    slug: createPostSlug(fileName),
    content,
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
}

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(isPostFile)
    .map(toPost)
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().slice(0, 3);
}

export function getCategories(): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getTags(): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(`${date}T00:00:00+08:00`))
    .replaceAll("/", "-");
}
