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
  title: "Our Impact in Numbers",
  items: [
    { label: "Students Enrolled", value: "5000", suffix: "+" },
    { label: "Courses Available", value: "120", suffix: "+" },
    { label: "Success Rate", value: "95", suffix: "%" },
    { label: "Expert Teachers", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  // Parse numeric value for progress bar (extract digits)
  function getNumericPercentage(value: string, suffix?: string): number {
    const num = parseFloat(value.replace(/,/g, ""));
    if (suffix === "%") return Math.min(num, 100);
    // For non-percentage, scale to a visual percentage
    if (num >= 1000) return 90;
    if (num >= 100) return 75;
    if (num >= 50) return 60;
    return 45;
  }

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-4xl mx-auto">
        {c.title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14" style={{ color: colorTheme.primary }}>
            {c.title}
          </h2>
        )}

        <div className="space-y-8">
          {items.map((item: { label: string; value: string; suffix?: string }, i: number) => {
            const pct = getNumericPercentage(item.value, item.suffix);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium" style={{ color: colorTheme.text }}>
                    {item.label}
                  </span>
                  <span className="text-xl font-bold" style={{ color: colorTheme.primary }}>
                    {item.value}{item.suffix || ""}
                  </span>
                </div>
                <div
                  className="w-full h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${colorTheme.primary}12` }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
