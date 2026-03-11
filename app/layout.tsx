import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display, Space_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Marketik株式会社 | 映像・SNS・ドローンショー・キャスティング",
  description: "映像とSNSの力で、ブランドのストーリーを動かす。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${spaceMono.variable} ${notoSansJP.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
