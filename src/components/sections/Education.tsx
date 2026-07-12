"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/i18n/provider";

export default function Education() {
  const portfolio = usePortfolio();

  return (
    <section id="education" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#f0f0f0] sm:text-5xl">
            {portfolio.ui.educationTitle}
          </h2>
          <div className="mt-6 h-px w-12 bg-[#38bdf8]" />
        </motion.div>

        <div className="mt-16 space-y-0">
          {portfolio.education.map((edu, i) => (
            <motion.div
              key={edu.institution}
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
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-[#888888]">{edu.institution}</p>
                </div>
                <span className="text-xs text-[#888888]">{edu.date}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#888888]">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
