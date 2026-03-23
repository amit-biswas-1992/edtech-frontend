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
      {/* Animated blobs */}
      <div
        className="absolute w-96 h-96 opacity-20 animate-blob blur-xl"
        style={{
          backgroundColor: colorTheme.primary,
          top: '5%',
          left: '10%',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-80 h-80 opacity-15 animate-blob blur-xl"
        style={{
          backgroundColor: colorTheme.accent,
          top: '40%',
          right: '5%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-72 h-72 opacity-10 animate-blob blur-xl"
        style={{
          backgroundColor: colorTheme.secondary,
          bottom: '5%',
          left: '30%',
          animationDelay: '4s',
        }}
      />

      {/* Floating particle dots */}
      {[
        { top: '15%', left: '20%', delay: '0s', size: 'w-2 h-2' },
        { top: '30%', right: '25%', delay: '1s', size: 'w-3 h-3' },
        { top: '60%', left: '12%', delay: '2s', size: 'w-2 h-2' },
        { top: '25%', left: '70%', delay: '3s', size: 'w-1.5 h-1.5' },
        { top: '70%', right: '15%', delay: '4s', size: 'w-2 h-2' },
        { top: '45%', left: '5%', delay: '5s', size: 'w-1.5 h-1.5' },
        { top: '80%', left: '60%', delay: '1.5s', size: 'w-2.5 h-2.5' },
        { top: '10%', right: '10%', delay: '3.5s', size: 'w-2 h-2' },
      ].map((dot, i) => (
        <div
          key={i}
          className={`absolute ${dot.size} rounded-full bg-white/30 animate-float`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* Grid/dot pattern overlay */}
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
          <span
            className="bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff, ${colorTheme.accent}, #ffffff)`,
              backgroundSize: '200% 200%',
            }}
          >
            {c.title}
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto font-light"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {c.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
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
          <a
            href="#"
            className="inline-block px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 glassmorphism text-white hover:bg-white/20"
          >
            Learn More
          </a>
        </div>

        {/* Animated SVG wave at bottom */}
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
