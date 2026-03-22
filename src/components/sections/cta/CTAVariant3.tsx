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
  title: "Start Learning Today",
  subtitle: "",
  buttonText: "Get Started",
  buttonLink: "#",
};

export default function CTAVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-6 px-4"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: colorTheme.accent }}
        >
          <div className="flex items-center gap-4">
            <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="#ffffff" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold" style={{ color: "#ffffff" }}>
                {c.title}
              </h3>
              {c.subtitle && (
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {c.subtitle}
                </p>
              )}
            </div>
          </div>

          <a
            href={c.buttonLink}
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
            style={{
              backgroundColor: "#ffffff",
              color: colorTheme.accent,
            }}
          >
            {c.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
