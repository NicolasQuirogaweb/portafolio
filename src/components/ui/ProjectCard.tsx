"use client";

import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, ExternalLink, Lock } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { usePortfolio } from "@/i18n/provider";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const SWIPE_THRESHOLD = 50;

function ImageCarousel({ project }: { project: Project }) {
  const portfolio = usePortfolio();
  const [[current, direction], setSlide] = useState<[number, number]>([0, 0]);
  const total = project.images.length;

  const go = (step: number) =>
    setSlide(([i]) => [(i + step + total) % total, step]);

  if (total === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#38bdf8]/15 via-[#111111] to-[#0a0a0a]">
        <span className="font-display text-3xl font-bold tracking-tight text-[#f0f0f0]/80">
          {project.title}
        </span>
      </div>
    );
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  return (
    <div
      className="relative h-full w-full"
      role="group"
      aria-roledescription="carousel"
      aria-label={project.title}
      tabIndex={total > 1 ? 0 : undefined}
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          src={project.images[current]}
          alt={`${project.title} — ${current + 1}/${total}`}
          loading="lazy"
          draggable={false}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
          drag={total > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          className="absolute inset-0 h-full w-full cursor-grab object-cover object-top active:cursor-grabbing"
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={portfolio.ui.carouselPrev}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0a0a]/70 text-[#f0f0f0] backdrop-blur-sm transition-all duration-300 hover:bg-[#38bdf8] hover:text-[#0a0a0a] md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={portfolio.ui.carouselNext}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0a0a]/70 text-[#f0f0f0] backdrop-blur-sm transition-all duration-300 hover:bg-[#38bdf8] hover:text-[#0a0a0a] md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#0a0a0a]/60 px-2.5 py-1.5 backdrop-blur-sm">
            {project.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide([i, i > current ? 1 : -1])}
                aria-label={`${i + 1}/${total}`}
                aria-current={i === current}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-[#38bdf8]" : "w-1.5 bg-[#f0f0f0]/50 hover:bg-[#f0f0f0]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const portfolio = usePortfolio();
  const isFeatured = project.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#111111] transition-colors duration-300 hover:border-[#38bdf8]/30 ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a]">
        <ImageCarousel project={project} />
        {project.status && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#0a0a0a]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#38bdf8] backdrop-blur-sm">
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
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

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.12)] px-3 py-1.5 text-xs font-medium text-[#f0f0f0] transition-colors duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
            >
              <Code2 size={14} />
              {portfolio.ui.projectViewCode}
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#38bdf8] px-3 py-1.5 text-xs font-medium text-[#0a0a0a] transition-opacity duration-300 hover:opacity-85"
            >
              <ExternalLink size={14} />
              {portfolio.ui.projectViewLive}
            </a>
          )}
          {project.privateRepo && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#888888]">
              <Lock size={12} />
              {portfolio.ui.projectPrivateRepo}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
