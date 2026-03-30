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
  title: "আপনার শেখার যাত্রা শুরু করুন",
  subtitle: "হাজারো শিক্ষার্থী ইতিমধ্যে তাদের ক্যারিয়ার গড়েছে আমাদের কোর্সের মাধ্যমে। আজই ভর্তি হন।",
  buttonText: "এখনই ভর্তি হন",
  buttonLink: "#",
};

/* ──────────────────────────────────────────────
   Variant 1 — Gradient Banner
   Full-width gradient with large text,
   floating button with glow
   ────────────────────────────────────────────── */
export default function CTAVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 50%, ${colorTheme.accent} 100%)`,
      }}
    >
      <style>{`
        @keyframes ctav1Float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes ctav1Pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .cta1-btn {
          animation: ctav1Pulse 3s ease-in-out infinite;
        }
        .cta1-btn:hover {
          animation: none;
        }
      `}</style>

      {/* Decorative elements */}
      <div
        className="absolute top-10 left-[10%] w-72 h-72 rounded-full opacity-[0.08] pointer-events-none"
        style={{ backgroundColor: "#ffffff", animation: "ctav1Float 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 right-[10%] w-56 h-56 rounded-full opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: "#ffffff", animation: "ctav1Float 6s ease-in-out infinite 2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04] pointer-events-none blur-3xl"
        style={{ backgroundColor: "#ffffff" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-white">
          {c.title}
        </h2>
        {c.subtitle && (
          <p className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto text-white/80">
            {c.subtitle}
          </p>
        )}
        <a
          href={c.buttonLink}
          className="cta1-btn inline-flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-black transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
          style={{
            backgroundColor: "#ffffff",
            color: colorTheme.primary,
            boxShadow: `0 8px 40px rgba(0,0,0,0.25), 0 0 80px ${colorTheme.accent}30`,
          }}
        >
          {c.buttonText}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
