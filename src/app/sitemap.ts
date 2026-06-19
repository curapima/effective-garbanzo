import type { MetadataRoute } from "next";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/posts", "/categories", "/tags", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00+08:00`),
  }));

  const categoryRoutes = getCategories().map((category) => ({
    url: `${siteConfig.url}/categories/${encodeURIComponent(category.name)}`,
    lastModified: new Date(),
  }));

  const tagRoutes = getTags().map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag.name)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
