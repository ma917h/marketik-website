"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  {
    num: "01",
    title: "Number 2 マインド",
    desc: "代表の伴走役として、タスクを拾い成果にコミットできる人。法人営業経験者歓迎。",
  },
  {
    num: "02",
    title: "スタートアップ思考",
    desc: "変化を楽しめる。決まっていないことを自分で決められる。スモールチームで動ける。",
  },
  {
    num: "03",
    title: "クリエイティブへの敬意",
    desc: "映像・SNSの力を信じている。アウトプットのクオリティにこだわれる人。",
  },
];

const positions = [
  { title: "法人営業 / 営業ディレクター", type: "正社員", location: "仙台", note: "社会人経験あり・年次不問" },
  { title: "SNS運用ディレクター",         type: "正社員", location: "仙台 or リモート", note: "SNS運用経験者優遇" },
  { title: "映像ディレクター / カメラマン", type: "業務委託", location: "全国対応可", note: "" },
];

function PositionCard({ pos }: { pos: typeof positions[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--gray-mid)" : "var(--gray)",
        padding: "40px",
        position: "relative",
        transition: "background 0.3s ease",
        cursor: "none",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <span style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--red)", border: "1px solid rgba(232,0,15,0.4)", padding: "4px 10px",
        }}>
          {pos.type}
        </span>
        <span style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--gray-light)", border: "1px solid rgba(255,255,255,0.12)", padding: "4px 10px",
        }}>
          {pos.location}
        </span>
      </div>
      <h3 style={{
        fontFamily: "var(--font-bebas-neue), sans-serif",
        fontSize: "26px", letterSpacing: "0.06em", color: "var(--white)", marginBottom: "8px",
      }}>
        {pos.title}
      </h3>
      {pos.note && (
        <p style={{
          fontFamily: "var(--font-noto-sans-jp), sans-serif",
          fontSize: "12px", fontWeight: 300, color: "var(--gray-light)", marginBottom: "24px",
        }}>
          {pos.note}
        </p>
      )}
      <a href="#contact" className="btn-primary" style={{ width: "100%", marginTop: pos.note ? "0" : "24px" }}>
        応募・詳細を問い合わせる
      </a>

      {/* Hover arrow */}
      <div style={{
        position: "absolute", top: "40px", right: "40px",
        color: "var(--red)", fontSize: "18px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.3s, transform 0.3s",
      }}>
        →
      </div>
    </div>
  );
}

export default function Recruit() {
  const ref = useRef<HTMLElement>(null);

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
    <section id="recruit" ref={ref} style={{ background: "var(--black)", padding: "120px 0" }}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">Recruit</div>
          <h2 className="section-title">JOIN <em>Our Team</em></h2>
          <p className="section-desc">
            スタートアップのスピードと、映像×SNSのクリエイティブが好きな人を求めています。
            肩書きより「やり切れるか」を重視します。
          </p>
        </div>

        <div className="recruit-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginTop: "64px" }}>
          {/* Left: Values */}
          <div className="reveal reveal-delay-1" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {values.map((v) => (
              <ValueItem key={v.num} v={v} />
            ))}
          </div>

          {/* Right: Positions */}
          <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {positions.map((p) => (
              <PositionCard key={p.title} pos={p} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .recruit-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function ValueItem({ v }: { v: typeof values[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--gray)",
        padding: "28px 32px",
        borderLeft: `2px solid ${hovered ? "var(--red)" : "transparent"}`,
        transition: "border-color 0.3s, background 0.3s",
        cursor: "none",
      }}
    >
      <span style={{
        fontFamily: "var(--font-bebas-neue), sans-serif",
        fontSize: "36px", color: "rgba(232,0,15,0.3)", display: "block", marginBottom: "8px",
      }}>
        {v.num}
      </span>
      <h3 style={{
        fontFamily: "var(--font-noto-sans-jp), sans-serif",
        fontSize: "15px", fontWeight: 500, color: "var(--white)", marginBottom: "8px",
      }}>
        {v.title}
      </h3>
      <p style={{
        fontFamily: "var(--font-noto-sans-jp), sans-serif",
        fontSize: "13px", fontWeight: 300, color: "var(--gray-light)", lineHeight: 1.8,
      }}>
        {v.desc}
      </p>
    </div>
  );
}
