"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Globe, Mail, Download } from "lucide-react";
import { usePortfolio } from "@/i18n/provider";
import Button from "@/components/ui/Button";
import Typewriter from "@/components/ui/Typewriter";

export default function Hero() {
  const portfolio = usePortfolio();
  const letters = Array.from(portfolio.headline);

  return (
    <section
      id="work"
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      <div className="z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.07)] bg-[#111111] px-4 py-1.5 text-xs text-[#888888]">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
            {portfolio.status.text}
          </span>
        </motion.div>

        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-[#f0f0f0] sm:text-7xl md:text-8xl">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0, 1] }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="text-[#38bdf8]"
          >
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-4 text-xl text-[#888888] sm:text-2xl"
        >
          <Typewriter text={portfolio.role} delay={40} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#projects">{portfolio.ui.heroViewWork}</Button>
          <Button href="#contact" variant="ghost">{portfolio.ui.heroContactMe}</Button>
          <a
            href={portfolio.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-6 py-3 text-sm font-medium text-[#f0f0f0] transition-all duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
          >
            <Download size={16} />
            {portfolio.ui.heroDownloadCV}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {[
            { icon: Code2, href: portfolio.social.github, label: portfolio.ui.socialGithub },
            { icon: Globe, href: portfolio.social.linkedin, label: portfolio.ui.socialLinkedin },
            { icon: Mail, href: `mailto:${portfolio.social.email}`, label: portfolio.ui.socialEmail },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] text-[#888888] transition-all duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
            >
              <Icon size={18} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#888888] opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#888888]"
        aria-label={portfolio.ui.scrollDown}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
