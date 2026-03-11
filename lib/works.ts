import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type WorkCategory = "entertainment" | "automotive" | "real-estate" | "other";

export interface Work {
  slug: string;
  client: string;
  title: string;
  type: string;
  category: WorkCategory;
  placeholder: string;
  gradient: string;
  description: string;
  period?: string;
  tools?: string[];
  videoUrl?: string;
  content: string;
}

const WORKS_DIR = path.join(process.cwd(), "content/works");

export function getAllWorks(): Work[] {
  const files = fs.readdirSync(WORKS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(WORKS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug, ...data, content } as Work;
    })
    .sort((a, b) => (a.slug > b.slug ? 1 : -1));
}

export function getWorkBySlug(slug: string): Work | undefined {
  const filePath = path.join(WORKS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, content } as Work;
}
