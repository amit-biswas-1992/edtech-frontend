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
  title: "Our Achievements",
  subtitle: "Numbers that reflect our commitment to education.",
  items: [
    { label: "Students Enrolled", value: "5,000", suffix: "+" },
    { label: "Courses Available", value: "120", suffix: "+" },
    { label: "Success Rate", value: "95", suffix: "%" },
    { label: "Expert Teachers", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          {c.title && (
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          )}
          {c.subtitle && (
            <p className="text-lg opacity-70" style={{ color: colorTheme.text }}>
              {c.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(
            (
              item: { label: string; value: string; suffix?: string },
              i: number
            ) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border"
                style={{ borderColor: `${colorTheme.primary}20` }}
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-2"
                  style={{ color: colorTheme.primary }}
                >
                  {item.value}
                  <span style={{ color: colorTheme.accent }}>
                    {item.suffix || ""}
                  </span>
                </div>
                <p
                  className="text-sm font-medium opacity-70"
                  style={{ color: colorTheme.text }}
                >
                  {item.label}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
