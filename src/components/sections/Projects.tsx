"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/i18n/provider";
import type { Project } from "@/i18n/provider";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const portfolio = usePortfolio();
  const { projectFilterAll, projectFilterFrontend, projectFilterBackend, projectFilterFullStack } = portfolio.ui;
  const [active, setActive] = useState<string>(projectFilterAll);

  useEffect(() => {
    setActive(projectFilterAll);
  }, [projectFilterAll]);

  const categories = [projectFilterAll, projectFilterFrontend, projectFilterBackend, projectFilterFullStack];
  const categoryMap: Record<string, "Frontend" | "Backend" | "Full Stack"> = {
    [projectFilterFrontend]: "Frontend",
    [projectFilterBackend]: "Backend",
    [projectFilterFullStack]: "Full Stack",
  };

  const filtered: Project[] =
    active === projectFilterAll
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === categoryMap[active]);

  const sorted = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#f0f0f0] sm:text-5xl">
            {portfolio.ui.projectsTitle}
          </h2>
          <div className="mt-6 h-px w-12 bg-[#00ff87]" />
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-[#00ff87] text-[#0a0a0a]"
                  : "border border-[rgba(255,255,255,0.07)] text-[#888888] hover:text-[#f0f0f0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sorted.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={project.featured ? "sm:col-span-2 sm:row-span-1" : ""}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
