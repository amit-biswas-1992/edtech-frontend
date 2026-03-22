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
  title: "Ready to Start Your Learning Journey?",
  subtitle: "Join thousands of students who have transformed their careers with our courses. Enroll today and take the first step toward a brighter future.",
  buttonText: "Enroll Now",
  buttonLink: "#",
};

export default function CTAVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10"
          style={{
            backgroundColor: `${colorTheme.primary}08`,
            border: `2px solid ${colorTheme.primary}12`,
          }}
        >
          {/* Left - Text */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight" style={{ color: colorTheme.primary }}>
              {c.title}
            </h2>
            {c.subtitle && (
              <p className="text-base leading-relaxed" style={{ color: `${colorTheme.text}bb` }}>
                {c.subtitle}
              </p>
            )}
          </div>

          {/* Right - Button + Decorative */}
          <div className="flex-shrink-0 text-center">
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-6 rounded-full opacity-20 animate-pulse"
                style={{ border: `3px dashed ${colorTheme.accent}` }}
              />
              <a
                href={c.buttonLink}
                className="relative inline-block px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: colorTheme.accent,
                  color: "#ffffff",
                  boxShadow: `0 8px 30px ${colorTheme.accent}40`,
                }}
              >
                {c.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
