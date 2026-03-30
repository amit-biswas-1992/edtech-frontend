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

export default function HeroVariant1({ content, colorTheme }: SectionProps) {
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* --- Scoped keyframes --- */}
      <style>{`
        @keyframes hero1-mesh {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(10px, 40px) scale(1.05); }
        }
        @keyframes hero1-orb {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-40px) scale(1.15); opacity: 0.8; }
        }
        @keyframes hero1-orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          33% { transform: translate(25px, -30px) scale(1.1); opacity: 0.7; }
          66% { transform: translate(-15px, 20px) scale(0.9); opacity: 0.5; }
        }
        @keyframes hero1-float-pill {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes hero1-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px var(--glow-color), 0 0 60px var(--glow-color); }
          50% { box-shadow: 0 0 30px var(--glow-color), 0 0 80px var(--glow-color); }
        }
      `}</style>

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0" style={{ backgroundColor: "#0f0f1a" }}>
        {/* Mesh gradient blobs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${colorTheme.primary}88 0%, transparent 70%)`,
            top: "-10%",
            left: "-5%",
            animation: "hero1-mesh 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${colorTheme.secondary}77 0%, transparent 70%)`,
            top: "30%",
            right: "-10%",
            animation: "hero1-mesh 15s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px]"
          style={{
            background: `radial-gradient(circle, ${colorTheme.accent}66 0%, transparent 70%)`,
            bottom: "-5%",
            left: "30%",
            animation: "hero1-mesh 10s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      {[
        { top: "12%", left: "8%", size: 16, delay: "0s", dur: "7s" },
        { top: "20%", right: "12%", size: 12, delay: "1s", dur: "8s" },
        { bottom: "25%", left: "15%", size: 10, delay: "2s", dur: "6s" },
        { top: "55%", right: "20%", size: 14, delay: "0.5s", dur: "9s" },
        { bottom: "15%", right: "10%", size: 8, delay: "3s", dur: "7s" },
        { top: "40%", left: "5%", size: 6, delay: "1.5s", dur: "8s" },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${i % 2 === 0 ? colorTheme.primary : colorTheme.accent}cc, ${i % 2 === 0 ? colorTheme.primary : colorTheme.accent}33)`,
            animation: `${i % 2 === 0 ? "hero1-orb" : "hero1-orb2"} ${orb.dur} ease-in-out infinite`,
            animationDelay: orb.delay,
            boxShadow: `0 0 ${orb.size * 2}px ${i % 2 === 0 ? colorTheme.primary : colorTheme.accent}55`,
          }}
        />
      ))}

      {/* Content container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col items-center">
        {/* Frosted glass card */}
        <div
          className="w-full max-w-3xl rounded-3xl px-6 sm:px-12 py-10 sm:py-14 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Title with gradient text */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent}, ${colorTheme.primary})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 6s ease infinite",
            }}
          >
            {c.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto font-light"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {c.subtitle}
          </p>

          {/* CTA button with glass + glow */}
          <a
            href={c.ctaLink}
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            style={
              {
                background: `linear-gradient(135deg, ${colorTheme.primary}cc, ${colorTheme.accent}cc)`,
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.15)",
                "--glow-color": `${colorTheme.primary}44`,
                animation: "hero1-glow-pulse 3s ease-in-out infinite",
              } as React.CSSProperties
            }
          >
            {c.ctaText}
          </a>
        </div>

        {/* Stats pills floating around the card */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-5 py-3 rounded-2xl text-center"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                animation: `hero1-float-pill 4s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div
                className="text-xl sm:text-2xl font-bold"
                style={{ color: colorTheme.accent }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs sm:text-sm mt-0.5"
                style={{ color: "rgba(255,255,255,0.5)" }}
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
