"use client";

import { useEffect, useRef } from "react";

const companyInfo = [
  { label: "会社名",   value: "Marketik株式会社" },
  { label: "英語名",   value: "Marketik Inc." },
  { label: "設立",     value: "2021年（旧：&life's合同会社）/ 2026年4月 株式会社化・社名変更" },
  { label: "所在地",   value: "〒984-0051 宮城県仙台市若林区新寺3丁目13-30 1F" },
  { label: "代表",     value: "代表取締役社長　山﨑 雅浩 / 取締役副社長　山﨑 誠悟" },
  { label: "事業内容", value: "映像制作・SNS運用・ドローンショー・キャスティング" },
  { label: "主要取引先", value: "AKB48 / HKT48 / Toyota / Mitsubishi / 博報堂 / SUUMO 他" },
];

export default function Company() {
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
    <section id="company" ref={ref} style={{ background: "var(--black)", padding: "120px 0" }}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">Company</div>
          <h2 className="section-title">ABOUT <em>Marketik</em></h2>
        </div>

        <div className="company-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginTop: "64px" }}>
          {/* Left: Story */}
          <div className="reveal reveal-delay-1" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {[
              "映像とSNSの力で、企業のミッションを加速させる。それがMarketikのすべてです。",
              "2020年の活動開始以来、エンタメ・自動車・不動産・住宅など多様な業界のクライアントと向き合い、「ただ映像を作る」ではなく「ビジネスに直結するクリエイティブ」を届けてきました。",
              "2026年4月、&life's合同会社からMarketik株式会社へ。マーケティングカンパニーとしての新たなフェーズへ踏み出します。",
              "仙台を拠点に、関東・関西をカバーする制作体制。AIと人間のベストな組み合わせで、スピードとクオリティを両立します。",
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-noto-sans-jp), sans-serif",
                fontSize: "14px",
                fontWeight: i === 0 ? 400 : 300,
                lineHeight: 2,
                color: i === 0 ? "var(--white)" : "var(--gray-light)",
              }}>
                {text}
              </p>
            ))}
          </div>

          {/* Right: Table */}
          <div className="reveal reveal-delay-2">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {companyInfo.map(({ label, value }) => (
                  <tr key={label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "var(--gray-light)", padding: "20px 24px 20px 0",
                      width: "130px", verticalAlign: "top", whiteSpace: "nowrap",
                    }}>
                      {label}
                    </td>
                    <td style={{
                      fontFamily: "var(--font-noto-sans-jp), sans-serif",
                      fontSize: "13px", fontWeight: 300,
                      color: "rgba(245,242,238,0.75)", padding: "20px 0",
                      lineHeight: 1.7,
                    }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .company-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
