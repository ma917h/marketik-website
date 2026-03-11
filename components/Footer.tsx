"use client";

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-noto-sans-jp), sans-serif",
    fontSize: "12px",
    letterSpacing: "0.04em",
    color: "var(--gray-light)",
    textDecoration: "none",
    display: "block",
    marginBottom: "12px",
    transition: "color 0.2s",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-mono), monospace",
    fontSize: "9px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--white)",
    marginBottom: "20px",
  };

  return (
    <footer style={{
      background: "var(--black)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 0 40px",
    }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          {/* Logo column */}
          <div>
            <a href="#hero" style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "32px", letterSpacing: "0.1em",
              color: "var(--white)", textDecoration: "none", display: "block", marginBottom: "16px",
            }}>
              MARKE<span style={{ color: "var(--red)" }}>T</span>IK
            </a>
            <p style={{
              fontFamily: "var(--font-noto-sans-jp), sans-serif",
              fontSize: "12px", fontWeight: 300,
              color: "var(--gray-light)", lineHeight: 1.8, marginBottom: "24px", maxWidth: "280px",
            }}>
              映像とSNSの力で、ブランドのストーリーを動かす。仙台発、全国対応のマーケティングカンパニー。
            </p>
            {/* SNS Icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {["IG", "TT", "YT", "X"].map((icon) => (
                <div key={icon} style={{
                  width: "36px", height: "36px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "9px", color: "var(--gray-light)", cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--red)";
                  el.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.color = "var(--gray-light)";
                }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Service */}
          <div>
            <p style={headingStyle}>Service</p>
            {["映像制作", "SNS運用", "ドローンショー", "キャスティング"].map((item) => (
              <a key={item} href="#service" style={linkStyle}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={headingStyle}>Company</p>
            {[
              { label: "About",   href: "#company" },
              { label: "Team",    href: "#team" },
              { label: "Works",   href: "#works" },
              { label: "Recruit", href: "#recruit" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={headingStyle}>Contact</p>
            <a href="#contact" style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
            >
              お問い合わせ
            </a>
            <a href="mailto:info@marketik.jp" style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
            >
              info@marketik.jp
            </a>
            <a href="#" style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
            >
              プライバシーポリシー
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "10px", letterSpacing: "0.1em",
            color: "rgba(245,242,238,0.2)",
          }}>
            © 2026 Marketik Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Use"].map((label) => (
              <a key={label} href="#" style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "9px", letterSpacing: "0.1em",
                color: "rgba(245,242,238,0.2)", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(245,242,238,0.2)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
