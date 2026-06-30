"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolio, useLangToggle } from "@/i18n/provider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const portfolio = usePortfolio();
  const { lang, toggleLang } = useLangToggle();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.07)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-[#f0f0f0]">
          {portfolio.name.split(" ")[0]}<span className="text-[#38bdf8]">.</span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {portfolio.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-[#888888] transition-colors hover:text-[#f0f0f0]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleLang}
            className="rounded-full border border-[rgba(255,255,255,0.15)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#888888] transition-all hover:border-[#38bdf8] hover:text-[#38bdf8]"
            aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <button
            className="relative z-50 flex h-8 w-8 items-center justify-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? portfolio.ui.navLabelClose : portfolio.ui.navLabelOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 z-40 border-b border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] px-6 pb-8 pt-20 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {portfolio.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-[#888888] transition-colors hover:text-[#f0f0f0]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
