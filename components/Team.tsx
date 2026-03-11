"use client";

import { useEffect, useRef, useState } from "react";

interface TeamMember {
  initials: string;
  role: string;
  nameEn: string;
  nameJa: string;
  bio: string;
  note?: string;
}

const members: TeamMember[] = [
  {
    initials: "MY",
    role: "CEO / Representative Director",
    nameEn: "MASAHIRO YAMAZAKI",
    nameJa: "山﨑 雅浩",
    bio: "代表取締役社長。映像制作・SNSマーケティングの事業全体を統括。仙台を拠点に、エンタメから不動産まで多業界のクライアントの映像マーケティングを牽引。",
  },
  {
    initials: "SY",
    role: "COO / Vice President Director",
    nameEn: "SEIGO YAMAZAKI",
    nameJa: "山﨑 誠悟",
    bio: "取締役副社長。事業拡大・パートナーシップ・M&A戦略を担当。",
    note: "※2026年4月就任",
  },
  {
    initials: "KT",
    role: "Creative Director",
    nameEn: "KEIGO TAKAHASHI",
    nameJa: "高橋 啓吾",
    bio: "クリエイティブディレクター。映像の世界観設計からビジュアル品質管理まで、クリエイティブ全般を担当。",
  },
  {
    initials: "KY",
    role: "Outside Director",
    nameEn: "KYOHEI MIYANISHI",
    nameJa: "宮西 恭平",
    bio: "社外取締役。経営戦略・ガバナンスの観点から会社成長を支援。",
    note: "※2026年4月就任",
  },
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal reveal-delay-${index % 4}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#333" : "var(--gray-mid)",
        padding: "48px",
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
        transition: "background 0.3s ease",
        cursor: "none",
      }}
    >
      {/* Avatar */}
      <div style={{
        width: "80px", height: "80px", flexShrink: 0,
        background: "linear-gradient(135deg, #2a0000, #1a1a1a)",
        border: "1px solid rgba(232,0,15,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-bebas-neue), sans-serif",
        fontSize: "28px", color: "var(--red)",
      }}>
        {member.initials}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--red)", marginBottom: "8px",
        }}>
          {member.role}
        </p>
        <h3 style={{
          fontFamily: "var(--font-bebas-neue), sans-serif",
          fontSize: "28px", letterSpacing: "0.06em", color: "var(--white)",
        }}>
          {member.nameEn}
        </h3>
        <p style={{
          fontFamily: "var(--font-noto-sans-jp), sans-serif",
          fontSize: "12px", fontWeight: 300, color: "var(--gray-light)",
          marginBottom: "16px",
        }}>
          {member.nameJa}
          {member.note && (
            <span style={{ marginLeft: "12px", fontSize: "11px", opacity: 0.7 }}>{member.note}</span>
          )}
        </p>
        <p style={{
          fontFamily: "var(--font-noto-sans-jp), sans-serif",
          fontSize: "12px", fontWeight: 300,
          color: "rgba(245,242,238,0.45)", lineHeight: 1.8,
        }}>
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
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
    <section id="team" ref={ref} style={{ background: "var(--gray)", padding: "120px 0" }}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">Team</div>
          <h2 className="section-title">THE <em>Team</em></h2>
        </div>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", marginTop: "64px" }}>
          {members.map((m, i) => (
            <MemberCard key={m.initials} member={m} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
