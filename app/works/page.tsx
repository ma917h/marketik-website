import Link from "next/link";
import { getAllWorks } from "@/lib/works";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works | Marketik株式会社",
  description: "Marketikの制作実績一覧。映像制作・SNS運用・ドローンショー・キャスティングの実績をご覧ください。",
};

const categoryLabel: Record<string, string> = {
  entertainment: "エンタメ",
  automotive: "自動車",
  "real-estate": "不動産",
  other: "その他",
};

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      {/* Header */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <div className="section-label">Works</div>
          <h1 className="section-title">ALL <em>Works</em></h1>
          <p className="section-desc">映像制作・SNS運用・ドローンショー・キャスティングにわたる制作実績。</p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div className="works-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {works.map((work) => (
              <Link
                key={work.slug}
                href={`/works/${work.slug}`}
                style={{ textDecoration: "none", display: "block", position: "relative" }}
                className="work-card-link"
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  {/* Background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(${work.gradient})`,
                    transition: "transform 0.6s ease",
                  }} className="work-bg" />
                  {/* Initials */}
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-bebas-neue), sans-serif",
                    fontSize: "48px", color: "rgba(255,255,255,0.06)",
                  }}>
                    {work.placeholder}
                  </div>
                  {/* Overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%)",
                  }} />
                  <div className="work-hover-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "rgba(232,0,15,0)",
                    transition: "background 0.4s ease",
                  }} />
                  {/* Text */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                    <span style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "var(--red)", display: "inline-block",
                      border: "1px solid rgba(232,0,15,0.4)", padding: "3px 8px", marginBottom: "8px",
                    }}>
                      {categoryLabel[work.category] ?? work.category}
                    </span>
                    <h2 style={{
                      fontFamily: "var(--font-bebas-neue), sans-serif",
                      fontSize: "22px", letterSpacing: "0.06em", color: "var(--white)",
                    }}>
                      {work.title}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      fontSize: "10px", color: "rgba(245,242,238,0.45)", marginTop: "4px",
                    }}>
                      {work.type}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .work-card-link:hover .work-hover-overlay { background: rgba(232,0,15,0.6) !important; }
        .work-card-link:hover .work-bg { transform: scale(1.05); }
        @media (max-width: 900px) { .works-page-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .works-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
