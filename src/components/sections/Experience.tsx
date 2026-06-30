"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/i18n/provider";

export default function Experience() {
  const portfolio = usePortfolio();

  return (
    <section id="experience" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#f0f0f0] sm:text-5xl">
            {portfolio.ui.experienceTitle}
          </h2>
          <div className="mt-6 h-px w-12 bg-[#38bdf8]" />
        </motion.div>

        <div className="mt-16 space-y-0">
          {portfolio.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border-l border-[rgba(255,255,255,0.07)] pl-8 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2">
                <div className="h-3 w-3 rounded-full border-2 border-[#38bdf8] bg-[#0a0a0a]" />
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#f0f0f0]">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#888888]">{exp.company}</p>
                </div>
                <span className="text-xs text-[#888888]">{exp.date}</span>
              </div>

              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-[#888888]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#888888]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
