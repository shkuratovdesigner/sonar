import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ABC Room — Daylight's primary sans (UI + body)
const room = localFont({
  variable: "--font-room",
  display: "swap",
  src: [
    { path: "../../public/fonts/b8e1ebd9eacea57f-s.woff", weight: "300", style: "normal" },
    { path: "../../public/fonts/7de162a2d8e5b515-s.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/8479164baf2058f3-s.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/67cf96b09cf013ed-s.woff", weight: "800", style: "normal" },
  ],
});

// ABC Arizona Flare — distinctive flared serif used for display headings
const arizona = localFont({
  variable: "--font-arizona",
  display: "swap",
  src: [
    { path: "../../public/fonts/f266e704a846645b-s.p.woff", weight: "300", style: "normal" },
    { path: "../../public/fonts/3fdf84c9117473e8-s.p.woff", weight: "300", style: "italic" },
    { path: "../../public/fonts/d1a880a377472427-s.p.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/caab3d42782e8e69-s.p.woff", weight: "400", style: "italic" },
  ],
});

// ABC Room Extended — wide cut used for small labels / eyebrows
const roomExtended = localFont({
  variable: "--font-room-extended",
  display: "swap",
  src: [
    { path: "../../public/fonts/50706da9550df9e5-s.woff", weight: "400", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daylight | A More Caring Computer",
  description:
    "Meet DC-1. A new kind of computer, designed for deep focus and wellbeing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${room.variable} ${arizona.variable} ${roomExtended.variable} ${geistMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
