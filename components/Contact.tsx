"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const mailto = `mailto:info@marketik.jp?subject=${encodeURIComponent("お問い合わせ：" + (data.get("type") as string || ""))}&body=${encodeURIComponent(
      `お名前: ${data.get("name")}\n会社名: ${data.get("company")}\nメール: ${data.get("email")}\n\n${data.get("message")}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "14px 16px",
    color: "var(--white)",
    fontFamily: "var(--font-noto-sans-jp), sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-mono), monospace",
    fontSize: "9px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gray-light)",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <section id="contact" ref={ref} style={{ background: "var(--gray)", padding: "120px 0" }}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">Contact</div>
          <h2 className="section-title">{"LET'S"} <em>Talk</em></h2>
          <p className="section-desc">
            新規プロジェクトのご相談・お見積りなど、まずはお気軽にご連絡ください。2〜3営業日以内にご返信します。
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginTop: "64px" }}>
          {/* Left: Info */}
          <div className="reveal reveal-delay-1" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {[
              { label: "Email",   value: "info@marketik.jp", href: "mailto:info@marketik.jp" },
              { label: "Address", value: "〒984-0051 宮城県仙台市若林区新寺3丁目13-30 1F", href: undefined },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p style={labelStyle}>{label}</p>
                {href ? (
                  <a href={href} style={{
                    fontFamily: "var(--font-noto-sans-jp), sans-serif",
                    fontSize: "14px", fontWeight: 300, color: "var(--white)",
                    textDecoration: "none", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--red)")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--white)", lineHeight: 1.7 }}>
                    {value}
                  </p>
                )}
              </div>
            ))}
            <div>
              <p style={labelStyle}>SNS</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {["IG", "TT", "YT", "X"].map((icon) => (
                  <div key={icon} style={{
                    width: "36px", height: "36px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "9px", color: "var(--gray-light)",
                    cursor: "none", transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--red)";
                    el.style.color = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(255,255,255,0.15)";
                    el.style.color = "var(--gray-light)";
                  }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div style={{ padding: "48px 0", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif", fontSize: "16px", color: "var(--white)" }}>
                  メーラーが開きました。送信をお願いします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>お名前 *</label>
                    <input name="name" type="text" required placeholder="山田 太郎" style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--red)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>会社名</label>
                    <input name="company" type="text" placeholder="株式会社〇〇" style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--red)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>メールアドレス *</label>
                  <input name="email" type="email" required placeholder="info@example.com" style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--red)")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>お問い合わせ種別</label>
                  <select name="type" style={{ ...inputStyle, cursor: "none" }}>
                    <option value="">選択してください</option>
                    <option>映像制作のご依頼</option>
                    <option>SNS運用のご相談</option>
                    <option>TikTok / ショート動画</option>
                    <option>キャスティング</option>
                    <option>採用応募</option>
                    <option>その他</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>メッセージ *</label>
                  <textarea name="message" required rows={5} placeholder="プロジェクトの概要・ご予算・ご希望納期などをお聞かせください。" style={{ ...inputStyle, resize: "vertical", height: "140px" }}
                    onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--red)")}
                    onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                  送信する →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        select option { background: #1a1a1a; }
      `}</style>
    </section>
  );
}
