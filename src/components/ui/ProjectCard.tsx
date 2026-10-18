"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Lock } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { usePortfolio } from "@/i18n/provider";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const portfolio = usePortfolio();
  const isFeatured = project.featured;
  const hasLinks = Boolean(project.github || project.live);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#111111] ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#38bdf8]/15 via-[#111111] to-[#0a0a0a]">
            <span className="font-display text-3xl font-bold tracking-tight text-[#f0f0f0]/80">
              {project.title}
            </span>
          </div>
        )}
        {project.status && (
          <span className="absolute left-3 top-3 rounded-full bg-[#0a0a0a]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#38bdf8] backdrop-blur-sm">
            {project.status}
          </span>
        )}
      </div>

      {hasLinks && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[#0a0a0a]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f0f0] text-[#0a0a0a] transition-transform hover:scale-110"
              aria-label={`${project.title} GitHub repository`}
            >
              <Code2 size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#38bdf8] text-[#0a0a0a] transition-transform hover:scale-110"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#38bdf8]/10 px-2 py-0.5 text-[10px] font-medium text-[#38bdf8]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-semibold text-[#f0f0f0]">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#888888]">{project.description}</p>
        {project.privateRepo && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#888888]">
            <Lock size={12} />
            {portfolio.ui.projectPrivateRepo}
          </p>
        )}
      </div>
    </motion.article>
  );
}
