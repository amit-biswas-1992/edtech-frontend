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
  title: "About Our Institution",
  description:
    "We are a leading educational institution committed to providing quality education that transforms lives. Founded with the vision of making education accessible to all, we have been nurturing young minds and building future leaders for over two decades. Our comprehensive curriculum, experienced faculty, and state-of-the-art facilities create an environment where students thrive and excel.",
  mission: "To provide accessible, high-quality education that empowers students to achieve their dreams.",
  vision: "To be the most trusted educational institution shaping tomorrow's leaders.",
  image: "",
};

export default function AboutVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase"
              style={{
                backgroundColor: `${colorTheme.primary}12`,
                color: colorTheme.primary,
              }}
            >
              About Us
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>

            <div
              className="w-20 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
              }}
            />

            <p
              className="text-lg leading-relaxed"
              style={{ color: `${colorTheme.text}bb` }}
            >
              {c.description}
            </p>

            {c.mission && (
              <div
                className="p-5 rounded-xl border-l-4"
                style={{
                  borderColor: colorTheme.primary,
                  backgroundColor: `${colorTheme.primary}08`,
                }}
              >
                <h4
                  className="font-bold text-sm uppercase tracking-wide mb-1"
                  style={{ color: colorTheme.primary }}
                >
                  Our Mission
                </h4>
                <p style={{ color: `${colorTheme.text}cc` }}>{c.mission}</p>
              </div>
            )}

            {c.vision && (
              <div
                className="p-5 rounded-xl border-l-4"
                style={{
                  borderColor: colorTheme.accent,
                  backgroundColor: `${colorTheme.accent}08`,
                }}
              >
                <h4
                  className="font-bold text-sm uppercase tracking-wide mb-1"
                  style={{ color: colorTheme.accent }}
                >
                  Our Vision
                </h4>
                <p style={{ color: `${colorTheme.text}cc` }}>{c.vision}</p>
              </div>
            )}
          </div>

          {/* Right image/card */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <div
                className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: c.image
                    ? `url(${c.image}) center/cover no-repeat`
                    : `linear-gradient(135deg, ${colorTheme.primary}20, ${colorTheme.secondary}40, ${colorTheme.accent}20)`,
                }}
              >
                {!c.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-20 h-20 opacity-20"
                      fill={colorTheme.primary}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
                style={{
                  border: `3px solid ${colorTheme.primary}25`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
