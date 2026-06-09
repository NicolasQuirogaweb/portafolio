"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePortfolio } from "@/i18n/provider";

export default function NotFound() {
  const portfolio = usePortfolio();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-8xl font-bold text-[#00ff87]">{portfolio.ui.notFoundTitle}</h1>
        <p className="mt-4 text-xl text-[#888888]">{portfolio.ui.notFoundMessage1}</p>
        <p className="mt-2 text-sm text-[#888888]">{portfolio.ui.notFoundMessage2}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-6 py-3 text-sm font-medium text-[#f0f0f0] transition-all duration-300 hover:border-[#00ff87] hover:text-[#00ff87]"
        >
          {portfolio.ui.notFoundGoHome}
        </Link>
      </motion.div>
    </div>
  );
}
