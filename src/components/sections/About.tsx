"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/i18n/provider";
import { Code2, Database, Wrench } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  react: <Code2 size={14} />,
  nextjs: <Code2 size={14} />,
  typescript: <Code2 size={14} />,
  tailwind: <Code2 size={14} />,
  javascript: <Code2 size={14} />,
  nodejs: <Database size={14} />,
  postgresql: <Database size={14} />,
  mongodb: <Database size={14} />,
  graphql: <Database size={14} />,
  python: <Database size={14} />,
  figma: <Wrench size={14} />,
  docker: <Wrench size={14} />,
  git: <Wrench size={14} />,
  bitbucket: <Wrench size={14} />,
  aws: <Wrench size={14} />,
};

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 size={16} />,
  Backend: <Database size={16} />,
  Tools: <Wrench size={16} />,
  Herramientas: <Wrench size={16} />,
};

export default function About() {
  const portfolio = usePortfolio();

  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#f0f0f0] sm:text-5xl">
              {portfolio.ui.aboutTitle}
            </h2>
            <div className="mt-6 h-px w-12 bg-[#38bdf8]" />
            <p className="mt-6 text-lg leading-relaxed text-[#888888]">{portfolio.bio}</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
              </span>
              <span className="text-sm text-[#f0f0f0]">{portfolio.status.text}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {portfolio.skills.map((group) => (
              <div key={group.category}>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#888888]">
                  {categoryIcons[group.category]}
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.07)] bg-[#111111] px-3 py-1.5 text-sm text-[#f0f0f0] transition-all duration-300 hover:border-[#38bdf8]/30 hover:text-[#38bdf8]"
                    >
                      {iconMap[skill.icon]}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
