"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "500", unit: "+", label: "累計制作本数" },
  { value: "100", unit: "+", label: "取引企業数" },
  { value: "5",   unit: "年", label: "設立からの実績" },
  { value: "4",   unit: "軸", label: "コアサービス領域" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

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
    <section
      ref={ref}
      style={{
        background: "var(--gray)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "80px 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 20px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bebas-neue), sans-serif",
                  fontSize: "72px",
                  lineHeight: 1,
                  color: "var(--white)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bebas-neue), sans-serif",
                  fontSize: "28px",
                  lineHeight: 1,
                  color: "var(--red)",
                  marginTop: "10px",
                }}
              >
                {stat.unit}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-noto-sans-jp), sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                letterSpacing: "0.1em",
                color: "var(--gray-light)",
                marginTop: "12px",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          section > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
