"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { en } from "./en";
import { es } from "./es";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "Frontend" | "Backend" | "Full Stack";
  /** null shows a placeholder until a screenshot is available */
  image: string | null;
  github: string | null;
  live: string | null;
  /** code exists but the repository is private (shown as a note instead of a link) */
  privateRepo?: boolean;
  /** short badge such as "In development" */
  status?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  date: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  role: string;
  bio: string;
  status: { text: string; type: string };
  social: { github: string; linkedin: string; email: string };
  cv: string;
  nav: NavItem[];
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  ui: {
    heroViewWork: string;
    heroContactMe: string;
    heroDownloadCV: string;
    scrollDown: string;
    aboutTitle: string;
    projectsTitle: string;
    projectFilterAll: string;
    projectFilterFrontend: string;
    projectFilterBackend: string;
    projectFilterFullStack: string;
    projectPrivateRepo: string;
    experienceTitle: string;
    educationTitle: string;
    contactHeading: string;
    contactCopied: string;
    contactCopyEmailAria: string;
    navLabelClose: string;
    navLabelOpen: string;
    notFoundTitle: string;
    notFoundMessage1: string;
    notFoundMessage2: string;
    notFoundGoHome: string;
    loadingText: string;
    socialGithub: string;
    socialLinkedin: string;
    socialEmail: string;
  };
}

type Lang = "en" | "es";

const languages: Record<Lang, PortfolioData> = { en, es };

interface LangContextValue {
  lang: Lang;
  portfolio: PortfolioData;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function usePortfolio() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("usePortfolio must be used within LangProvider");
  return ctx.portfolio;
}

export function useLangToggle() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLangToggle must be used within LangProvider");
  return { lang: ctx.lang, toggleLang: ctx.toggleLang };
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "es" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, portfolio: languages[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
