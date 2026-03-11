"use client";

import { useEffect, useRef, useState } from "react";

type Category = "all" | "entertainment" | "automotive" | "real-estate" | "other";

interface WorkCard {
  id: string;
  client: string;
  title: string;
  type: string;
  category: Category;
  placeholder: string;
  gradient: string;
}

const works: WorkCard[] = [
  { id: "akb48",      client: "Entertainment",  title: "AKB48 SNS プロモーション",          type: "映像制作 / SNS運用",            category: "entertainment", placeholder: "AKB", gradient: "135deg, #1a0010, #0d0d0d" },
  { id: "toyota",     client: "Automotive",     title: "Toyota YouTubeチャンネル",           type: "映像制作 / 撮影",               category: "automotive",    placeholder: "TMC", gradient: "135deg, #001a0d, #0d0d0d" },
  { id: "hakuhodo",   client: "Marketing",      title: "博報堂マーケティングシステムズ",     type: "映像制作 / ディレクション",     category: "other",         placeholder: "HMS", gradient: "135deg, #0d001a, #0d0d0d" },
  { id: "hkt48",      client: "Entertainment",  title: "HKT48 コンテンツ制作",              type: "映像制作 / 写真撮影",           category: "entertainment", placeholder: "HKT", gradient: "135deg, #1a0010, #0d0d0d" },
  { id: "yamada",     client: "Real Estate",    title: "ヤマダホームズ YouTube",             type: "映像制作 / 企画・ディレクション", category: "real-estate", placeholder: "YH",  gradient: "135deg, #001219, #0d0d0d" },
  { id: "auto-densho",client: "Automotive",     title: "オートデンソーマルヤマ TikTok",      type: "TikTok Shop / ライブコマース",  category: "automotive",    placeholder: "ADM", gradient: "135deg, #001a0d, #0d0d0d" },
];

const filters: { label: string; value: Category }[] = [
  { label: "All",     value: "all" },
  { label: "エンタメ", value: "entertainment" },
  { label: "自動車",   value: "automotive" },
  { label: "不動産",   value: "real-estate" },
  { label: "その他",   value: "other" },
];

export default function Works() {
  const [active, setActive] = useState<Category>("all");
  const ref = useRef<HTMLElement>(null);

  const filtered = active === "all" ? works : works.filter((w) => w.category === active);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".reveal");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" ref={ref} style={{ background: "var(--gray)", padding: "120px 0" }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div className="section-label">Works</div>
            <h2 className="section-title">OUR <em>Works</em></h2>
          </div>
          {/* Filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  border: `1px solid ${active === f.value ? "var(--red)" : "rgba(255,255,255,0.12)"}`,
                  background: active === f.value ? "var(--red)" : "transparent",
                  color: "var(--white)",
                  cursor: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="works-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            marginTop: "48px",
          }}
        >
          {filtered.map((work, i) => (
            <WorkCardItem key={work.id} work={work} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: "center", marginTop: "64px" }}>
          <a href="#contact" className="btn-primary">実績一覧を見る</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .works-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .works-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function WorkCardItem({ work, index }: { work: WorkCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal reveal-delay-${index % 4}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "none" }}
    >
      {/* Placeholder background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${work.gradient})`,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.6s ease",
      }} />

      {/* Placeholder initials */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "48px",
        color: "rgba(255,255,255,0.06)", letterSpacing: "0.1em",
      }}>
        {work.placeholder}
      </div>

      {/* Default gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)",
      }} />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `rgba(232,0,15,${hovered ? 0.7 : 0})`,
        transition: "background 0.4s ease",
      }} />

      {/* Text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace", fontSize: "9px",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: hovered ? "var(--white)" : "var(--gray-light)", marginBottom: "6px",
          transition: "color 0.3s",
        }}>
          {work.client}
        </p>
        <h3 style={{
          fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "22px",
          letterSpacing: "0.06em", color: "var(--white)",
        }}>
          {work.title}
        </h3>
        <p style={{
          fontFamily: "var(--font-noto-sans-jp), sans-serif", fontSize: "10px",
          color: "rgba(245,242,238,0.45)", marginTop: "4px",
          opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s",
        }}>
          {work.type}
        </p>
      </div>
    </div>
  );
}
