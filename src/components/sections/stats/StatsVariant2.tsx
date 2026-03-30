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
    { label: "Students Enrolled", value: "5,000", suffix: "+" },
    { label: "Courses Available", value: "120", suffix: "+" },
    { label: "Success Rate", value: "95", suffix: "%" },
    { label: "Expert Teachers", value: "50", suffix: "+" },
  ],
};

export default function StatsVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const items = c.items || defaults.items;

  const cardColors = [
    colorTheme.primary,
    colorTheme.accent,
    colorTheme.secondary,
    colorTheme.primary,
  ];

  const icons = [
    // Users
    <svg key="u" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>,
    // Book
    <svg key="b" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>,
    // Chart
    <svg key="c" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>,
    // Star
    <svg key="s" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>,
  ];

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes statsCardFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {c.title && (
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16"
            style={{
              color: colorTheme.text,
              animation: "statsCardFadeUp 0.7s ease-out both",
            }}
          >
            {c.title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(
            (
              item: { label: string; value: string; suffix?: string },
              i: number
            ) => {
              const color = cardColors[i % cardColors.length];
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: colorTheme.background,
                    border: `1px solid ${color}15`,
                    boxShadow: `0 4px 20px ${color}08`,
                    animation: `statsCardFadeUp 0.7s ease-out ${
                      0.15 + i * 0.1
                    }s both`,
                  }}
                >
                  {/* Decorative top border */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${
                        i % 2 === 0 ? colorTheme.accent : colorTheme.primary
                      })`,
                    }}
                  />

                  <div className="p-7">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${color}10`,
                        color: color,
                      }}
                    >
                      {icons[i % icons.length]}
                    </div>

                    {/* Value */}
                    <div
                      className="text-4xl sm:text-5xl font-extrabold mb-2 transition-colors duration-300"
                      style={{ color: color }}
                    >
                      {item.value}
                      <span
                        className="text-2xl sm:text-3xl ml-0.5"
                        style={{ color: `${color}88` }}
                      >
                        {item.suffix || ""}
                      </span>
                    </div>

                    {/* Label */}
                    <p
                      className="text-sm font-medium"
                      style={{ color: `${colorTheme.text}88` }}
                    >
                      {item.label}
                    </p>
                  </div>

                  {/* Corner glow on hover */}
                  <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${color}12, transparent 70%)`,
                    }}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
