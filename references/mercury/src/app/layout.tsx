import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Arcadia — Mercury's primary variable typeface (body + UI)
const arcadia = localFont({
  variable: "--font-arcadia",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/66786c931e084141-s.p.woff2",
      weight: "360 500",
      style: "normal",
    },
  ],
});

// Arcadia Display — variable display cut used for large headlines
const arcadiaDisplay = localFont({
  variable: "--font-arcadia-display",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/92d547acff458051-s.p.woff2",
      weight: "320 480",
      style: "normal",
    },
  ],
});

// Tiempos Headline — serif used for occasional editorial accents
const tiempos = localFont({
  variable: "--font-tiempos",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/b8e7c140d2eeafb4-s.p.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/1bf268c77b3001c9-s.p.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/cac75d8208a23b56-s.p.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/e23f2cfd0cb342af-s.p.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Online Business Banking For Startups, Small Businesses & Scaling Companies",
  description:
    "Apply online in 10 minutes to experience banking unlike anything that's come before.",
  icons: {
    icon: "/images/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arcadia.variable} ${arcadiaDisplay.variable} ${tiempos.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-dark text-white">{children}</body>
    </html>
  );
}
