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
  ctaText: "Get Started",
  ctaLink: "#",
  backgroundImage: "",
};

export default function HeroVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "85vh",
        background: c.backgroundImage
          ? `url(${c.backgroundImage}) center/cover no-repeat`
          : `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 50%, ${colorTheme.accent} 100%)`,
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight"
          style={{ color: "#ffffff" }}
        >
          {c.title}
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto font-light"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {c.subtitle}
        </p>

        <a
          href={c.ctaLink}
          className="inline-block px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
          style={{
            backgroundColor: colorTheme.accent,
            color: "#ffffff",
            boxShadow: `0 8px 30px ${colorTheme.accent}66`,
          }}
        >
          {c.ctaText}
        </a>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill={colorTheme.background}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
