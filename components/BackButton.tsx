"use client";

import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: Props) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--gray-light)", textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "48px",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--white)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gray-light)")}
    >
      {label}
    </Link>
  );
}
