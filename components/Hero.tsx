"use client";

const tickerItems = [
  "AKB48", "HKT48", "Toyota", "Mitsubishi", "SUUMO",
  "Vegalta Sendai", "Hakuhodo", "Mitsui Fudosan",
  "Miyagi University", "Spring Valley", "Sendai TV",
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Video / Fallback Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a0000 50%, #080808 100%)",
          animation: "heroAnim 8s ease-in-out infinite alternate",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,0,15,0.12) 0%, transparent 70%),
            linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.85) 100%)
          `,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 48px 100px",
          maxWidth: "900px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--red)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.3s",
          }}
        >
          <span style={{ width: "40px", height: "1px", background: "var(--red)", display: "block" }} />
          映像 × SNS × マーケティング
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            fontSize: "clamp(72px, 11vw, 160px)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            color: "var(--white)",
            animation: "fadeUp 0.9s ease both",
            animationDelay: "0.5s",
          }}
        >
          MAKE<br />
          YOUR<br />
          <em
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontStyle: "italic",
              color: "var(--red)",
            }}
          >
            Story
          </em>
          <br />
          MOVE
        </h1>

        {/* Sub Copy */}
        <p
          style={{
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "var(--gray-light)",
            marginTop: "24px",
            lineHeight: 1.8,
            animation: "fadeUp 0.9s ease both",
            animationDelay: "0.7s",
          }}
        >
          映像とSNSの力で、ブランドのストーリーを動かす。<br />
          エンタメ・自動車・不動産──あらゆる業界のミッションを、クリエイティブで実現します。
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            marginTop: "40px",
            animation: "fadeUp 0.9s ease both",
            animationDelay: "0.9s",
          }}
        >
          <a href="#contact" className="btn-primary">
            お問い合わせ
          </a>
          <a href="#works" className="btn-ghost">
            実績を見る <span>→</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "fadeIn 1s ease both",
          animationDelay: "1.4s",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gray-light)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--red), transparent)",
            animation: "scrollPulse 2s ease infinite",
          }}
        />
      </div>

      {/* Ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          overflow: "hidden",
          padding: "14px 0",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker 25s linear infinite",
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gray-light)",
                padding: "0 24px",
              }}
            >
              {item}
              <span style={{ color: "var(--red)", marginLeft: "24px" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
