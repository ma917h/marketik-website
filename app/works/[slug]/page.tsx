import { getAllWorks, getWorkBySlug } from "@/lib/works";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWorkBySlug(params.slug);
  if (!work) return {};
  return {
    title: `${work.title} | Works | Marketik株式会社`,
    description: work.description,
  };
}

export default function WorkDetailPage({ params }: Props) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();

  return (
    <main style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <BackButton href="/works" label="← Works一覧へ" />

          <div className="section-label">{work.client}</div>
          <h1 className="section-title" style={{ marginBottom: "24px" }}>
            {work.title}
          </h1>
          <p style={{
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            fontSize: "15px", fontWeight: 300, color: "var(--gray-light)",
            lineHeight: 1.9, maxWidth: "640px",
          }}>
            {work.description}
          </p>
        </div>
      </section>

      {/* Video placeholder */}
      <section style={{ padding: "0 0 60px" }}>
        <div className="container">
          <div style={{
            width: "100%", aspectRatio: "16/9",
            background: `linear-gradient(${work.gradient})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {work.videoUrl ? (
              <iframe
                src={work.videoUrl}
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
              />
            ) : (
              <div style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "64px", color: "rgba(255,255,255,0.06)", letterSpacing: "0.1em",
              }}>
                {work.placeholder}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meta info */}
      <section style={{ padding: "0 0 60px" }}>
        <div className="container">
          <div style={{
            display: "flex", gap: "48px", flexWrap: "wrap",
            paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {work.period && (
              <div>
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gray-light)", marginBottom: "8px" }}>Period</p>
                <p style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--white)" }}>{work.period}</p>
              </div>
            )}
            <div>
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gray-light)", marginBottom: "8px" }}>Type</p>
              <p style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--white)" }}>{work.type}</p>
            </div>
            {work.tools && work.tools.length > 0 && (
              <div>
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gray-light)", marginBottom: "8px" }}>Tools</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {work.tools.map((t) => (
                    <span key={t} style={{
                      fontFamily: "var(--font-space-mono), monospace", fontSize: "9px",
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "var(--gray-light)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MDX Content */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div className="mdx-content" style={{ maxWidth: "720px" }}>
            <MDXRemote source={work.content} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "var(--gray)", textAlign: "center" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "24px" }}>
            {"Let's"} <em>Talk</em>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            同様のプロジェクトについてお気軽にご相談ください。
          </p>
          <Link href="/#contact" className="btn-primary">お問い合わせ</Link>
        </div>
      </section>

      <style>{`
        .mdx-content h2 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 32px; letter-spacing: 0.05em;
          color: var(--white); margin: 48px 0 16px;
        }
        .mdx-content h3 {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 16px; font-weight: 500;
          color: var(--white); margin: 32px 0 12px;
        }
        .mdx-content p {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 14px; font-weight: 300;
          color: var(--gray-light); line-height: 1.9; margin-bottom: 16px;
        }
        .mdx-content ul, .mdx-content ol {
          font-family: var(--font-noto-sans-jp), sans-serif;
          font-size: 14px; font-weight: 300;
          color: var(--gray-light); line-height: 1.9;
          padding-left: 24px; margin-bottom: 16px;
        }
        .mdx-content li { margin-bottom: 6px; }
        .mdx-content strong { color: var(--white); font-weight: 500; }
      `}</style>
    </main>
  );
}
