"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = "primary", href, onClick, className = "" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";
  const styles = {
    primary: "bg-[#38bdf8] text-[#0a0a0a] hover:bg-[#38bdf8]/90 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]",
    ghost: "border border-[rgba(255,255,255,0.15)] text-[#f0f0f0] hover:border-[#38bdf8] hover:text-[#38bdf8]",
  };

  const Component = motion.create(href ? "a" : "button");

  return (
    <Component
      className={`${base} ${styles[variant]} ${className}`}
      {...(href ? { href } : { onClick })}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
}
