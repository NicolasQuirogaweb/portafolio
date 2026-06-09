"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Code2, Globe, Mail } from "lucide-react";
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
            <div className="h-px w-12 bg-[#00ff87]" />
          </div>
        </motion.div>

        <div className="mt-16 mx-auto max-w-xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="sr-only">{portfolio.ui.contactNamePlaceholder}</label>
              <input
                id="name"
                type="text"
                placeholder={portfolio.ui.contactNamePlaceholder}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#111111] px-5 py-3.5 text-sm text-[#f0f0f0] placeholder-[#888888] outline-none transition-colors focus:border-[#00ff87]"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">{portfolio.ui.contactEmailPlaceholder}</label>
              <input
                id="email"
                type="email"
                placeholder={portfolio.ui.contactEmailPlaceholder}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#111111] px-5 py-3.5 text-sm text-[#f0f0f0] placeholder-[#888888] outline-none transition-colors focus:border-[#00ff87]"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">{portfolio.ui.contactMessagePlaceholder}</label>
              <textarea
                id="message"
                rows={4}
                placeholder={portfolio.ui.contactMessagePlaceholder}
                className="w-full resize-none rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#111111] px-5 py-3.5 text-sm text-[#f0f0f0] placeholder-[#888888] outline-none transition-colors focus:border-[#00ff87]"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00ff87] px-6 py-3.5 text-sm font-medium text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,135,0.3)]"
            >
              <Send size={16} />
              {portfolio.ui.contactSend}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.07)] text-[#888888] transition-all duration-300 hover:border-[#00ff87] hover:text-[#00ff87]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <button
              onClick={copyEmail}
              className="group flex items-center gap-2 text-sm text-[#888888] transition-colors hover:text-[#00ff87]"
              aria-label={portfolio.ui.contactCopyEmailAria}
            >
              <Mail size={14} />
              {portfolio.social.email}
              <motion.span
                animate={copied ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                className="flex items-center gap-1 text-[#00ff87]"
              >
                <Check size={14} />
                {portfolio.ui.contactCopied}
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
