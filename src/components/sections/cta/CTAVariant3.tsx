"use client";

import React from "react";

interface SectionProps {
  content: Record<string, any>;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    name: string;
  };
  designVariant: number;
}

const defaults = {
  title: "আজই শেখা শুরু করুন",
  subtitle: "আপনার উজ্জ্বল ভবিষ্যতের যাত্রা এখান থেকেই শুরু।",
  buttonText: "শুরু করুন",
  buttonLink: "#",
};

/* ──────────────────────────────────────────────
   Variant 3 — Minimal
   Clean white section, centered text,
   subtle underline, elegant button
   ────────────────────────────────────────────── */
export default function CTAVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes ctav3FadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cta3-content { animation: ctav3FadeUp 0.7s ease-out both; }
        .cta3-btn { animation: ctav3FadeUp 0.7s ease-out 0.2s both; }
        .cta3-underline {
          position: relative;
          display: inline-block;
        }
        .cta3-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <div className="max-w-3xl mx-auto text-center">
        <div className="cta3-content">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            <span
              className="cta3-underline"
              style={{
                textDecorationColor: colorTheme.accent,
              }}
            >
              {c.title}
            </span>
            <span
              className="block w-20 h-[3px] rounded-full mx-auto mt-4 opacity-40"
              style={{
                background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
              }}
            />
          </h2>
          {c.subtitle && (
            <p
              className="text-lg sm:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
              style={{ color: `${colorTheme.text}77` }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        <a
          href={c.buttonLink}
          className="cta3-btn inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group"
          style={{
            backgroundColor: colorTheme.text,
            color: colorTheme.background,
          }}
        >
          {c.buttonText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${colorTheme.primary}30` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${colorTheme.accent}40` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${colorTheme.primary}30` }} />
        </div>
      </div>
    </section>
  );
}
