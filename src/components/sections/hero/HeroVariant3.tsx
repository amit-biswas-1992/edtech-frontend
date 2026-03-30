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
  designVariant?: number;
}

const defaults = {
  title: "\u09AD\u09B0\u09CD\u09A4\u09BF \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u09BF \u09A8\u09BE\u0993 \u09B8\u09C7\u09B0\u09BE\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7",
  subtitle: "Prepare for Admission Tests with the Best",
  ctaText: "\u098F\u0996\u09A8\u0987 \u09AD\u09B0\u09CD\u09A4\u09BF \u09B9\u09CB\u09A8",
  ctaLink: "#",
  backgroundImage: "",
  stats: [] as { label: string; value: string }[],
};

/* Deterministic pseudo-random positions for star particles */
function generateStars(count: number) {
  const stars: { x: number; y: number; size: number; delay: number; dur: number }[] = [];
  for (let i = 0; i < count; i++) {
    const seed = (i * 7919 + 104729) % 100000;
    stars.push({
      x: (seed % 1000) / 10,
      y: ((seed * 3) % 1000) / 10,
      size: 1 + (seed % 3),
      delay: (seed % 5000) / 1000,
      dur: 3 + (seed % 4000) / 1000,
    });
  }
  return stars;
}

const stars = generateStars(60);

export default function HeroVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const stats: { label: string; value: string }[] =
    c.stats && c.stats.length > 0
      ? c.stats
      : [
          { value: "10,000+", label: "Students" },
          { value: "95%", label: "Success" },
          { value: "200+", label: "Courses" },
          { value: "50+", label: "Mentors" },
        ];

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* Scoped keyframes */}
      <style>{`
        @keyframes hero3-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
        @keyframes hero3-neon-pulse {
          0%, 100% {
            box-shadow: 0 0 12px var(--neon-color),
                        0 0 36px var(--neon-color),
                        0 0 72px var(--neon-color);
          }
          50% {
            box-shadow: 0 0 18px var(--neon-color),
                        0 0 48px var(--neon-color),
                        0 0 96px var(--neon-color);
          }
        }
        @keyframes hero3-text-glow {
          0%, 100% { text-shadow: 0 0 20px var(--glow-color), 0 0 60px var(--glow-color); }
          50% { text-shadow: 0 0 30px var(--glow-color), 0 0 80px var(--glow-color), 0 0 120px var(--glow-color); }
        }
      `}</style>

      {/* Dark background with tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, #06061a 0%, #0a0a1a 40%, #0d0b1f 60%, #08081a 100%)`,
        }}
      />

      {/* Subtle colour bleed from theme */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${colorTheme.primary}, transparent 60%), radial-gradient(ellipse at 80% 50%, ${colorTheme.secondary}, transparent 60%)`,
        }}
      />

      {/* Scanline / noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Star particles */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: i % 3 === 0 ? colorTheme.primary : i % 3 === 1 ? colorTheme.accent : "#ffffff",
            animation: `hero3-twinkle ${star.dur}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0.2,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        {/* Title with text glow */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-5 tracking-tight"
          style={
            {
              color: "#ffffff",
              "--glow-color": `${colorTheme.primary}55`,
              animation: "hero3-text-glow 4s ease-in-out infinite",
              textShadow: `0 0 20px ${colorTheme.primary}44, 0 0 60px ${colorTheme.primary}22`,
            } as React.CSSProperties
          }
        >
          {c.title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {c.subtitle}
        </p>

        {/* CTA with neon glow */}
        <a
          href={c.ctaLink}
          className="inline-block px-9 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105"
          style={
            {
              background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
              color: "#ffffff",
              border: `1px solid ${colorTheme.primary}88`,
              "--neon-color": `${colorTheme.primary}66`,
              animation: "hero3-neon-pulse 3s ease-in-out infinite",
            } as React.CSSProperties
          }
        >
          {c.ctaText}
        </a>
      </div>

      {/* Bottom glassmorphic stats bar */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-8 sm:pb-12">
        <div
          className="max-w-4xl mx-auto rounded-2xl px-4 sm:px-8 py-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow: `0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center px-3"
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
                paddingRight: i < stats.length - 1 ? "1.5rem" : undefined,
              }}
            >
              <div
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{
                  color: colorTheme.accent,
                  textShadow: `0 0 12px ${colorTheme.accent}33`,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs sm:text-sm mt-1 uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
