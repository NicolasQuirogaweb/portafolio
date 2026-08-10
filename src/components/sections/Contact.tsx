"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Code2, Globe, Mail } from "lucide-react";
import { usePortfolio } from "@/i18n/provider";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const portfolio = usePortfolio();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(portfolio.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#f0f0f0] sm:text-6xl">
            {portfolio.ui.contactHeading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 ? <br /> : null}
              </span>
            ))}
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-px w-12 bg-[#38bdf8]" />
          </div>
        </motion.div>

        <div className="mx-auto mt-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={copyEmail}
              className="group inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] px-8 py-4 text-base text-[#f0f0f0] transition-all duration-300 hover:border-[#38bdf8] hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
              aria-label={portfolio.ui.contactCopyEmailAria}
            >
              <Mail size={18} className="text-[#38bdf8]" />
              {portfolio.social.email}
              <motion.span
                animate={copied ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                className="flex items-center gap-1 text-[#38bdf8]"
              >
                <Check size={16} />
                {portfolio.ui.contactCopied}
              </motion.span>
            </button>

            <div className="flex items-center gap-4">
              {[
                { icon: Code2, href: portfolio.social.github, label: portfolio.ui.socialGithub },
                { icon: Globe, href: portfolio.social.linkedin, label: portfolio.ui.socialLinkedin },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] text-[#888888] transition-all duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
