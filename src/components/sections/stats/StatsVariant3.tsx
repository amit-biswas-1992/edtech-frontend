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
  title: "সংখ্যায় আমাদের প্রভাব",
  subtitle: "শিক্ষার প্রতি আমাদের প্রতিশ্রুতি প্রতিফলিত সংখ্যাসমূহ।",
  items: [
    { label: "শিক্ষার্থী ভর্তি", value: "5,000", suffix: "+" },
    { label: "কোর্স সংখ্যা", value: "120", suffix: "+" },
    { label: "সাফল্যের হার", value: "95", suffix: "%" },
    { label: "অভিজ্ঞ শিক্ষক", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0f",
      }}
    >
      <style>{`
        @keyframes statsDarkFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes statsGlowPulse {
          0%, 100% { text-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color); }
          50% { text-shadow: 0 0 30px var(--glow-color), 0 0 60px var(--glow-color), 0 0 80px var(--glow-color); }
        }
        @keyframes statsGridFade {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
      `}</style>

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "statsGridFade 8s ease-in-out infinite",
        }}
      />

      {/* Ambient glow spots */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: `${colorTheme.primary}15`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: `${colorTheme.accent}12`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-20"
          style={{ animation: "statsDarkFadeIn 0.7s ease-out both" }}
        >
          {c.title && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                color: "#ffffff",
                textShadow: `0 0 40px ${colorTheme.primary}30`,
              }}
            >
              {c.title}
            </h2>
          )}
          {c.subtitle && (
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map(
            (
              item: { label: string; value: string; suffix?: string },
              i: number
            ) => {
              const glowColor =
                i % 2 === 0 ? colorTheme.primary : colorTheme.accent;

              return (
                <div
                  key={i}
                  className="group relative text-center py-8 transition-all duration-300"
                  style={{
                    animation: `statsDarkFadeIn 0.7s ease-out ${
                      0.2 + i * 0.12
                    }s both`,
                  }}
                >
                  {/* Glow number */}
                  <div
                    className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 transition-all duration-500 group-hover:scale-105"
                    style={
                      {
                        color: glowColor,
                        "--glow-color": `${glowColor}40`,
                        textShadow: `0 0 20px ${glowColor}30, 0 0 40px ${glowColor}15`,
                        animation: `statsGlowPulse 4s ease-in-out ${
                          i * 0.5
                        }s infinite`,
                      } as React.CSSProperties
                    }
                  >
                    {item.value}
                    <span
                      className="text-3xl sm:text-4xl"
                      style={{
                        color: `${glowColor}88`,
                      }}
                    >
                      {item.suffix || ""}
                    </span>
                  </div>

                  {/* Label */}
                  <p
                    className="text-sm sm:text-base font-medium tracking-wide uppercase"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {item.label}
                  </p>

                  {/* Subtle bottom line */}
                  <div
                    className="w-12 h-px mx-auto mt-5 opacity-20 group-hover:opacity-50 group-hover:w-20 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
                    }}
                  />

                  {/* Divider between items (desktop) */}
                  {i < items.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-1/2 -right-4 lg:-right-6 w-px h-20 -translate-y-1/2"
                      style={{
                        background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)`,
                      }}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
