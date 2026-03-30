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
  subtitle: "হাজারো শিক্ষার্থী ইতিমধ্যে তাদের ক্যারিয়ার গড়েছে আমাদের কোর্সের মাধ্যমে। আজই ভর্তি হন এবং উজ্জ্বল ভবিষ্যতের দিকে প্রথম পদক্ষেপ নিন।",
  buttonText: "এখনই ভর্তি হন",
  buttonLink: "#",
};

/* ──────────────────────────────────────────────
   Variant 2 — Split Card
   Two-tone card (dark left, accent right),
   text on left, button on right
   ────────────────────────────────────────────── */
export default function CTAVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes ctav2SlideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes ctav2SlideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .cta2-left { animation: ctav2SlideLeft 0.7s ease-out both; }
        .cta2-right { animation: ctav2SlideRight 0.7s ease-out 0.15s both; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: "280px" }}>
          {/* Two-tone background */}
          <div className="absolute inset-0 flex">
            {/* Dark left panel */}
            <div
              className="w-full lg:w-[60%] relative"
              style={{ backgroundColor: "#0f0f14" }}
            >
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
            {/* Accent right panel */}
            <div
              className="hidden lg:block w-[40%] relative"
              style={{
                background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.primary})`,
              }}
            >
              {/* Decorative circles */}
              <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/5" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-10 sm:p-12 lg:p-16">
            {/* Left text */}
            <div className="cta2-left flex-1 lg:pr-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-[1.1] tracking-tight text-white">
                {c.title}
              </h2>
              {c.subtitle && (
                <p className="text-base sm:text-lg leading-relaxed text-white/50 max-w-lg">
                  {c.subtitle}
                </p>
              )}
            </div>

            {/* Right button */}
            <div className="cta2-right flex-shrink-0">
              <div className="relative">
                {/* Glow ring */}
                <div
                  className="absolute -inset-4 rounded-full opacity-20 blur-xl pointer-events-none"
                  style={{ backgroundColor: colorTheme.accent }}
                />
                <a
                  href={c.buttonLink}
                  className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.primary})`,
                    color: "#ffffff",
                    boxShadow: `0 8px 30px ${colorTheme.accent}40`,
                  }}
                >
                  {c.buttonText}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
