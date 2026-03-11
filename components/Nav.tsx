"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Service", href: "/#service" },
  { label: "Works",   href: "/works" },
  { label: "Blog",    href: "/blog" },
  { label: "Company", href: "/#company" },
  { label: "Recruit", href: "/#recruit" },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-space-mono), monospace",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--gray-light)",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "16px 48px" : "24px 48px",
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.4s ease, padding 0.4s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: "var(--font-bebas-neue), sans-serif",
        fontSize: "28px", letterSpacing: "0.12em",
        color: "var(--white)", textDecoration: "none",
      }}>
        MARKE<span style={{ color: "var(--red)" }}>T</span>IK
      </Link>

      {/* Desktop Links */}
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={navLinkStyle}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--white)")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--gray-light)")}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/#contact" className="btn-primary">Contact</Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-hamburger"
        style={{ display: "none", background: "none", border: "none", color: "var(--white)", fontSize: "24px", cursor: "pointer" }}
        aria-label="メニュー"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(8,8,8,0.96)", backdropFilter: "blur(12px)",
          padding: "24px", display: "flex", flexDirection: "column", gap: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ ...navLinkStyle, color: "var(--white)", fontSize: "12px" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
