"use client";

import { usePortfolio } from "@/i18n/provider";

export default function Footer() {
  const portfolio = usePortfolio();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#888888] md:flex-row">
        <p>&copy; {new Date().getFullYear()} {portfolio.name}.</p>
        <p>{portfolio.ui.footerTagline}</p>
      </div>
    </footer>
  );
}
