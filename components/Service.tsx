"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceCard {
  num: string;
  nameEn: string;
  nameJa: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

const services: ServiceCard[] = [
  {
    num: "01",
    nameEn: "FILM PRODUCTION",
    nameJa: "映像制作",
    description:
      "企画・撮影・編集からディレクションまで一貫対応。YouTube・TikTok・CM・企業VP・ドキュメンタリーなど、目的に合わせた映像コンテンツを制作します。",
    tags: ["YouTube", "TikTok", "CM", "企業VP", "ドキュメンタリー"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5,3 19,12 5,21" />
      </svg>
    ),
  },
  {
    num: "02",
    nameEn: "SNS MARKETING",
    nameJa: "SNS運用・マーケティング",
    description:
      "Instagram・TikTok・YouTube・X（Twitter）の戦略立案から日々の運用、広告配信、ライブコマースまで。データに基づいたアカウント成長をサポートします。",
    tags: ["Instagram", "TikTok", "YouTube", "広告運用", "ライブコマース"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
  },
  {
    num: "03",
    nameEn: "DRONE SHOW",
    nameJa: "ドローンショー",
    description:
      "ドローンショー演出・空中映像制作に対応。屋外イベント・企業PR・地域プロモーションなど、唯一無二の空中体験を提供します。",
    tags: ["ドローンショー", "空中映像", "イベント演出"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "04",
    nameEn: "CASTING",
    nameJa: "キャスティング",
    description:
      "アイドル・タレント・インフルエンサーのキャスティングと案件管理。エンタメ業界との深いネットワークを活かし、ブランドに最適なキャスティングを実現します。",
    tags: ["タレント", "インフルエンサー", "アイドル", "イベント"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    num: "05",
    nameEn: "AI CONSULTING",
    nameJa: "AI導入支援・コンサルティング",
    description:
      "業務フローへのAI組み込みから、ツール選定・社内研修・運用設計まで伴走支援。映像・SNS事業で培ったデジタル活用の知見を活かし、中小企業のAI活用を加速させます。",
    tags: ["AI導入", "業務効率化", "コンサルティング", "研修・ワークショップ"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
];

function ServiceCardItem({ svc, index, fullWidth = false }: { svc: ServiceCard; index: number; fullWidth?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal reveal-delay-${index}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--gray-mid)" : "var(--gray)",
        padding: "48px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease",
        cursor: "none",
        gridColumn: fullWidth ? "1 / -1" : undefined,
      }}
    >
      {/* Number decoration */}
      <span
        style={{
          position: "absolute",
          top: "-10px",
          right: "24px",
          fontFamily: "var(--font-bebas-neue), sans-serif",
          fontSize: "80px",
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {svc.num}
      </span>

      {/* Red bottom line on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--red)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "48px",
          height: "48px",
          border: `1px solid ${hovered ? "var(--red)" : "rgba(232,0,15,0.3)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? "var(--red)" : "var(--gray-light)",
          marginBottom: "32px",
          transition: "border-color 0.3s ease, color 0.3s ease",
        }}
      >
        {svc.icon}
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--gray-light)",
          marginBottom: "8px",
        }}
      >
        {svc.nameJa}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-bebas-neue), sans-serif",
          fontSize: "32px",
          letterSpacing: "0.05em",
          color: "var(--white)",
          marginBottom: "20px",
        }}
      >
        {svc.nameEn}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-noto-sans-jp), sans-serif",
          fontSize: "13px",
          fontWeight: 300,
          color: "rgba(245,242,238,0.55)",
          lineHeight: 1.8,
          marginBottom: "24px",
        }}
      >
        {svc.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {svc.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gray-light)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "4px 10px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          color: hovered ? "var(--red)" : "var(--gray-light)",
          fontSize: "18px",
          transform: hovered ? "translate(4px, -4px)" : "translate(0, 0)",
          transition: "color 0.3s ease, transform 0.3s ease",
        }}
      >
        ↗
      </div>
    </div>
  );
}

export default function Service() {
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
    <section id="service" ref={ref} style={{ background: "var(--black)", padding: "120px 0" }}>
      <div className="container">
        {/* Header */}
        <div className="reveal">
          <div className="section-label">Service</div>
          <h2 className="section-title">
            OUR <em>Services</em>
          </h2>
          <p className="section-desc">
            クリエイティブ・SNS・ドローン・キャスティングの4軸を基盤に、
            映像とSNSで企業のミッションを加速させます。
          </p>
        </div>

        {/* Grid */}
        <div
          className="service-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
            marginTop: "72px",
          }}
        >
          {services.map((svc, i) => (
            <ServiceCardItem key={svc.num} svc={svc} index={i} fullWidth={i === services.length - 1 && services.length % 2 !== 0} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
