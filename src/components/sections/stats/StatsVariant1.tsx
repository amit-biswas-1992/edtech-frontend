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
  title: "আমাদের অর্জন",
  items: [
    { label: "শিক্ষার্থী ভর্তি", value: "5,000", suffix: "+" },
    { label: "কোর্স সংখ্যা", value: "120", suffix: "+" },
    { label: "সাফল্যের হার", value: "95", suffix: "%" },
    { label: "অভিজ্ঞ শিক্ষক", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 50%, ${colorTheme.accent} 100%)`,
      }}
    >
      <style>{`
        @keyframes statsCounterSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes statsPulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes statsBarShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Animated background shapes */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.08)",
          animation: "statsPulseGlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          animation: "statsPulseGlow 8s ease-in-out 2s infinite",
        }}
      />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            animation: "statsBarShimmer 5s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {c.title && (
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0,0,0,0.15)",
              animation: "statsCounterSlide 0.7s ease-out both",
            }}
          >
            {c.title}
          </h2>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {items.map(
            (
              item: { label: string; value: string; suffix?: string },
              i: number
            ) => (
              <div
                key={i}
                className="relative text-center group"
                style={{
                  animation: `statsCounterSlide 0.7s ease-out ${
                    0.2 + i * 0.1
                  }s both`,
                }}
              >
                {/* Large number */}
                <div
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 4px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  {item.value}
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.suffix || ""}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="text-sm sm:text-base font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {item.label}
                </p>

                {/* Underline */}
                <div
                  className="w-10 h-[2px] rounded-full mx-auto mt-4 opacity-30 group-hover:opacity-60 group-hover:w-16 transition-all duration-300"
                  style={{ backgroundColor: "#ffffff" }}
                />

                {/* Divider between items (not last) */}
                {i < items.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-5 w-px h-16 -translate-y-1/2 opacity-20"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
