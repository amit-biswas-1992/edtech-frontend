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
  title: "Empowering Education, Shaping Futures",
  subtitle:
    "Discover world-class learning experiences designed to unlock your full potential and prepare you for tomorrow's challenges.",
  ctaText: "Start Your Journey",
  ctaLink: "#",
  backgroundImage: "",
};

export default function HeroVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background: c.backgroundImage
          ? `url(${c.backgroundImage}) center/cover no-repeat`
          : `linear-gradient(160deg, ${colorTheme.primary}dd 0%, #0a0a0a 40%, #0a0a0a 60%, ${colorTheme.secondary}99 100%)`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated line pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, ${colorTheme.primary}40 50px, ${colorTheme.primary}40 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, ${colorTheme.primary}40 50px, ${colorTheme.primary}40 51px)`,
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: colorTheme.primary }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: colorTheme.accent }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
          {c.title.split(" ").map((word: string, i: number) => (
            <span key={i} className="inline-block mr-4 mb-2">
              <span
                className="relative"
                style={{ color: "#ffffff" }}
              >
                {word}
                {i === 0 && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-1.5 rounded-full"
                    style={{
                      backgroundColor: colorTheme.accent,
                      animation: "heroUnderline 2s ease-in-out infinite alternate",
                    }}
                  />
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="text-xl sm:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto font-light tracking-wide"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {c.subtitle}
        </p>

        <a
          href={c.ctaLink}
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-500 hover:scale-105 hover:gap-5"
          style={{
            background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
            color: "#ffffff",
            boxShadow: `0 12px 40px ${colorTheme.primary}55`,
          }}
        >
          {c.ctaText}
          <svg
            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <div
              className="w-1.5 h-3 rounded-full"
              style={{
                backgroundColor: colorTheme.accent,
                animation: "heroScroll 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroUnderline {
          0% { width: 0%; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes heroScroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
