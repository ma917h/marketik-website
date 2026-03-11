import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Marketik株式会社",
  description: "映像制作・SNS運用・AI活用・マーケティングに関するノウハウを発信しています。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      {/* Header */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <div className="section-label">Blog</div>
          <h1 className="section-title">OUR <em>Blog</em></h1>
          <p className="section-desc">映像・SNS・AI活用に関するノウハウを発信しています。</p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
                className="blog-row"
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "36px 48px",
                  background: "var(--gray)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "background 0.3s",
                  flexWrap: "wrap", gap: "16px",
                }} className="blog-row-inner">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "var(--red)", border: "1px solid rgba(232,0,15,0.4)", padding: "3px 8px",
                      }}>
                        {post.category}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "9px", letterSpacing: "0.1em", color: "var(--gray-light)",
                      }}>
                        {post.date}
                      </span>
                    </div>
                    <h2 style={{
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      fontSize: "18px", fontWeight: 500, color: "var(--white)",
                      marginBottom: "8px", lineHeight: 1.5,
                    }}>
                      {post.title}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      fontSize: "13px", fontWeight: 300, color: "var(--gray-light)",
                      lineHeight: 1.7,
                    }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div style={{
                    color: "var(--gray-light)", fontSize: "20px",
                    transition: "color 0.3s, transform 0.3s",
                    flexShrink: 0,
                  }} className="blog-arrow">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-row:hover .blog-row-inner { background: var(--gray-mid) !important; }
        .blog-row:hover .blog-arrow { color: var(--red) !important; transform: translateX(4px); }
        @media (max-width: 700px) {
          .blog-row-inner { padding: 24px !important; }
        }
      `}</style>
    </main>
  );
}
