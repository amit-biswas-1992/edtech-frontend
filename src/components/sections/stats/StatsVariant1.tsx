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
  items: [
    { label: "Students Enrolled", value: "5,000", suffix: "+" },
    { label: "Courses Available", value: "120", suffix: "+" },
    { label: "Success Rate", value: "95", suffix: "%" },
    { label: "Expert Teachers", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  return (
    <section
      className="py-16 px-4"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {c.title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14" style={{ color: "#ffffff" }}>
            {c.title}
          </h2>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: { label: string; value: string; suffix?: string }, i: number) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2" style={{ color: "#ffffff" }}>
                {item.value}
                <span style={{ color: colorTheme.accent }}>{item.suffix || ""}</span>
              </div>
              <p className="text-sm sm:text-base font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
