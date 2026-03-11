import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog | Marketik株式会社`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      {/* Header */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <BackButton href="/blog" label="← ブログ一覧へ" />

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--red)", border: "1px solid rgba(232,0,15,0.4)", padding: "4px 10px",
            }}>
              {post.category}
            </span>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "9px", letterSpacing: "0.1em", color: "var(--gray-light)",
            }}>
              {post.date}
            </span>
            {post.author && (
              <span style={{
                fontFamily: "var(--font-noto-sans-jp), sans-serif",
                fontSize: "12px", fontWeight: 300, color: "var(--gray-light)",
              }}>
                {post.author}
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 500,
            color: "var(--white)", lineHeight: 1.5, maxWidth: "800px",
          }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "80px" }} className="blog-layout">
            {/* Main */}
            <div className="mdx-content">
              <MDXRemote source={post.content} />
            </div>

            {/* Sidebar */}
            <aside>
              <div style={{ position: "sticky", top: "120px" }}>
                <div style={{
                  background: "var(--gray)", padding: "32px",
                  marginBottom: "24px",
                }}>
                  <p style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "var(--red)", marginBottom: "16px",
                  }}>About</p>
                  <p style={{
                    fontFamily: "var(--font-noto-sans-jp), sans-serif",
                    fontSize: "12px", fontWeight: 300, color: "var(--gray-light)", lineHeight: 1.8,
                  }}>
                    Marketik株式会社は、映像制作・SNS運用・ドローンショー・キャスティングの4軸でブランドのマーケティングを支援しています。
                  </p>
                </div>
                <Link href="/#contact" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center" }}>
                  お問い合わせ
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .mdx-content h2 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 32px; letter-spacing: 0.05em;
          color: var(--white); margin: 56px 0 16px;
          border-left: 3px solid var(--red); padding-left: 16px;
        }
        .mdx-content h3 {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 17px; font-weight: 500;
          color: var(--white); margin: 36px 0 12px;
        }
        .mdx-content p {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 15px; font-weight: 300;
          color: var(--gray-light); line-height: 2; margin-bottom: 20px;
        }
        .mdx-content ul, .mdx-content ol {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 15px; font-weight: 300;
          color: var(--gray-light); line-height: 2;
          padding-left: 28px; margin-bottom: 20px;
        }
        .mdx-content li { margin-bottom: 8px; }
        .mdx-content strong { color: var(--white); font-weight: 500; }
        .mdx-content table {
          width: 100%; border-collapse: collapse; margin-bottom: 24px;
        }
        .mdx-content th {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gray-light); padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;
        }
        .mdx-content td {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 14px; font-weight: 300; color: var(--gray-light);
          padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 900px) {
          .blog-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
