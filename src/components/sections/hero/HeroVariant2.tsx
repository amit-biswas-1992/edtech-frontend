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

export default function HeroVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const stats: { label: string; value: string }[] =
    c.stats && c.stats.length > 0
      ? c.stats
      : [
          { value: "10,000+", label: "Students" },
          { value: "95%", label: "Success Rate" },
          { value: "200+", label: "Courses" },
        ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "80vh",
        backgroundColor: colorTheme.background,
      }}
    >
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-14 lg:py-0"
        style={{ minHeight: "80vh" }}
      >
        {/* ---- Left: Text content ---- */}
        <div className="flex-1 space-y-7 pt-8 lg:pt-0 max-w-xl lg:max-w-none">
          {/* Accent divider line */}
          <div
            className="w-16 h-1 rounded-full"
            style={{ backgroundColor: colorTheme.primary }}
          />

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h1>

          <p
            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg"
            style={{ color: `${colorTheme.text}99` }}
          >
            {c.subtitle}
          </p>

          {/* CTA with arrow */}
          <div className="flex flex-wrap gap-4 items-center pt-1">
            <a
              href={c.ctaLink}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={{
                backgroundColor: colorTheme.primary,
                color: "#ffffff",
                boxShadow: `0 6px 24px ${colorTheme.primary}33`,
              }}
            >
              {c.ctaText}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Stats row as mini cards */}
          <div className="flex flex-wrap gap-4 pt-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 min-w-[110px] px-4 py-4 rounded-xl border transition-shadow duration-300 hover:shadow-md"
                style={{
                  borderColor: `${colorTheme.primary}18`,
                  backgroundColor: `${colorTheme.primary}06`,
                }}
              >
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: colorTheme.primary }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs sm:text-sm mt-1 font-medium uppercase tracking-wider"
                  style={{ color: `${colorTheme.text}77` }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: Abstract geometric SVG ---- */}
        <div className="flex-1 w-full lg:w-auto flex items-center justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Dot grid pattern */}
              {Array.from({ length: 12 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={60 + col * 35}
                    cy={60 + row * 35}
                    r="2"
                    fill={colorTheme.primary}
                    opacity={0.15}
                  />
                ))
              )}

              {/* Large circle */}
              <circle
                cx="250"
                cy="250"
                r="160"
                stroke={colorTheme.primary}
                strokeWidth="1.5"
                opacity="0.2"
                fill="none"
              />
              <circle
                cx="250"
                cy="250"
                r="120"
                stroke={colorTheme.secondary}
                strokeWidth="1"
                opacity="0.15"
                fill="none"
                strokeDasharray="8 6"
              />

              {/* Filled accent circle */}
              <circle
                cx="320"
                cy="150"
                r="50"
                fill={colorTheme.primary}
                opacity="0.12"
              />
              <circle
                cx="320"
                cy="150"
                r="50"
                stroke={colorTheme.primary}
                strokeWidth="1.5"
                opacity="0.3"
                fill="none"
              />

              {/* Secondary filled circle */}
              <circle
                cx="160"
                cy="360"
                r="40"
                fill={colorTheme.accent}
                opacity="0.1"
              />
              <circle
                cx="160"
                cy="360"
                r="40"
                stroke={colorTheme.accent}
                strokeWidth="1.5"
                opacity="0.25"
                fill="none"
              />

              {/* Diagonal lines */}
              <line
                x1="80"
                y1="420"
                x2="420"
                y2="80"
                stroke={colorTheme.primary}
                strokeWidth="1"
                opacity="0.1"
              />
              <line
                x1="100"
                y1="440"
                x2="440"
                y2="100"
                stroke={colorTheme.primary}
                strokeWidth="0.5"
                opacity="0.08"
              />

              {/* Horizontal connector lines */}
              <line
                x1="100"
                y1="250"
                x2="200"
                y2="250"
                stroke={colorTheme.accent}
                strokeWidth="2"
                opacity="0.3"
              />
              <line
                x1="300"
                y1="250"
                x2="400"
                y2="250"
                stroke={colorTheme.accent}
                strokeWidth="2"
                opacity="0.3"
              />

              {/* Center filled circle */}
              <circle
                cx="250"
                cy="250"
                r="8"
                fill={colorTheme.primary}
                opacity="0.5"
              />

              {/* Small decorative circles */}
              <circle cx="100" cy="250" r="5" fill={colorTheme.accent} opacity="0.4" />
              <circle cx="400" cy="250" r="5" fill={colorTheme.accent} opacity="0.4" />
              <circle cx="250" cy="100" r="5" fill={colorTheme.primary} opacity="0.4" />
              <circle cx="250" cy="400" r="5" fill={colorTheme.primary} opacity="0.4" />

              {/* Rectangle outlines */}
              <rect
                x="340"
                y="300"
                width="80"
                height="80"
                rx="8"
                stroke={colorTheme.secondary}
                strokeWidth="1.5"
                opacity="0.18"
                fill="none"
              />
              <rect
                x="80"
                y="100"
                width="70"
                height="70"
                rx="6"
                stroke={colorTheme.primary}
                strokeWidth="1"
                opacity="0.15"
                fill={colorTheme.primary}
                fillOpacity="0.04"
              />

              {/* Plus signs */}
              {[
                { x: 420, y: 180 },
                { x: 80, y: 300 },
                { x: 370, y: 420 },
              ].map((p, i) => (
                <g key={`plus-${i}`} opacity="0.2">
                  <line
                    x1={p.x - 8}
                    y1={p.y}
                    x2={p.x + 8}
                    y2={p.y}
                    stroke={colorTheme.accent}
                    strokeWidth="1.5"
                  />
                  <line
                    x1={p.x}
                    y1={p.y - 8}
                    x2={p.x}
                    y2={p.y + 8}
                    stroke={colorTheme.accent}
                    strokeWidth="1.5"
                  />
                </g>
              ))}

              {/* Triangle */}
              <polygon
                points="250,130 290,200 210,200"
                stroke={colorTheme.accent}
                strokeWidth="1.5"
                fill={colorTheme.accent}
                fillOpacity="0.06"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorTheme.primary}, ${colorTheme.accent}, transparent)`,
        }}
      />
    </section>
  );
}
