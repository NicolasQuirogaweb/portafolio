import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/i18n/provider";
import { en } from "@/i18n/en";
import Cursor from "@/components/ui/Cursor";
import FloatingShapes from "@/components/ui/FloatingShapes";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${en.name} — ${en.role}`,
  description: en.bio,
  openGraph: {
    title: `${en.name} — ${en.role}`,
    description: en.bio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0a] text-[#f0f0f0] antialiased">
        <LangProvider>
          <Cursor />
          <FloatingShapes />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
