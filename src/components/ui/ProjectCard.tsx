"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isFeatured = project.featured;

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
      <div className="aspect-video w-full overflow-hidden bg-[#1a1a1a]">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[#0a0a0a]/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f0f0] text-[#0a0a0a] transition-transform hover:scale-110"
          aria-label={`${project.title} GitHub repository`}
        >
          <Code2 size={18} />
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ff87] text-[#0a0a0a] transition-transform hover:scale-110"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#00ff87]/10 px-2 py-0.5 text-[10px] font-medium text-[#00ff87]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-semibold text-[#f0f0f0]">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#888888]">{project.description}</p>
      </div>
    </motion.article>
  );
}
