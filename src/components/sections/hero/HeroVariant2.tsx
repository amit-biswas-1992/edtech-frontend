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
  ctaText: "Explore Programs",
  ctaLink: "#",
  backgroundImage: "",
};

export default function HeroVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "85vh",
        backgroundColor: colorTheme.background,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-0"
        style={{ minHeight: "85vh" }}
      >
        {/* Left content */}
        <div className="flex-1 space-y-8 pt-10 lg:pt-0">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${colorTheme.primary}15`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}30`,
            }}
          >
            Welcome to Excellence
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title.split(" ").map((word: string, i: number) =>
              i % 3 === 0 ? (
                <span key={i} style={{ color: colorTheme.primary }}>
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <p
            className="text-lg lg:text-xl leading-relaxed max-w-xl"
            style={{ color: `${colorTheme.text}aa` }}
          >
            {c.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href={c.ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                backgroundColor: colorTheme.primary,
                color: "#ffffff",
                boxShadow: `0 8px 25px ${colorTheme.primary}44`,
              }}
            >
              {c.ctaText}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                border: `2px solid ${colorTheme.primary}30`,
                color: colorTheme.primary,
              }}
            >
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 pt-4">
            {[
              { num: "10K+", label: "Students" },
              { num: "95%", label: "Success Rate" },
              { num: "50+", label: "Courses" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  className="text-2xl font-bold"
                  style={{ color: colorTheme.primary }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-sm"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image/gradient area */}
        <div className="flex-1 w-full lg:w-auto">
          <div
            className="relative w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: c.backgroundImage
                ? `url(${c.backgroundImage}) center/cover no-repeat`
                : `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 60%, ${colorTheme.accent} 100%)`,
            }}
          >
            {/* Decorative floating elements */}
            <div
              className="absolute top-8 right-8 w-20 h-20 rounded-2xl opacity-30"
              style={{ backgroundColor: "#ffffff" }}
            />
            <div
              className="absolute bottom-12 left-8 w-16 h-16 rounded-full opacity-20"
              style={{ backgroundColor: "#ffffff" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: "#ffffff" }}
            />

            {/* Graduation cap icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 opacity-40"
                fill="#ffffff"
                viewBox="0 0 24 24"
              >
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: colorTheme.primary }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5"
        style={{ backgroundColor: colorTheme.secondary }}
      />
    </section>
  );
}
