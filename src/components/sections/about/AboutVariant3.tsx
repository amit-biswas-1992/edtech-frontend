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
  title: "Our Journey",
  description:
    "Founded with a commitment to academic excellence. We introduced our first undergraduate programs, serving 200 students. Expanded to 15 departments with over 2,000 students. Launched online learning and research programs. Achieved national accreditation and partnerships with international universities. Continuing to innovate and empower the next generation of leaders.",
  mission: "To provide accessible, high-quality education.",
  vision: "To be the most trusted educational institution.",
  image: "",
};

export default function AboutVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  const paragraphs = c.description
    .split(/\.\s+/)
    .filter((p: string) => p.trim().length > 0)
    .map((p: string) => (p.endsWith(".") ? p : p + "."));

  const milestones = paragraphs.map((text: string, i: number) => ({
    year: `${2010 + i * 2}`,
    text,
  }));

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
            style={{
              backgroundColor: `${colorTheme.primary}12`,
              color: colorTheme.primary,
            }}
          >
            Our Story
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${colorTheme.primary}, ${colorTheme.accent})`,
            }}
          />

          <div className="space-y-12">
            {milestones.map((milestone: { year: string; text: string }, i: number) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 flex-1 p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                  style={{
                    backgroundColor: colorTheme.background,
                    border: `1px solid ${colorTheme.primary}15`,
                  }}
                >
                  <span
                    className="inline-block text-sm font-bold px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: `${colorTheme.primary}12`,
                      color: colorTheme.primary,
                    }}
                  >
                    {milestone.year}
                  </span>
                  <p
                    className="leading-relaxed"
                    style={{ color: `${colorTheme.text}bb` }}
                  >
                    {milestone.text}
                  </p>
                </div>

                {/* Center dot */}
                <div
                  className="absolute left-6 md:left-1/2 top-6 w-4 h-4 rounded-full -translate-x-1/2 border-4 z-10"
                  style={{
                    borderColor: i % 2 === 0 ? colorTheme.primary : colorTheme.accent,
                    backgroundColor: colorTheme.background,
                  }}
                />

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
