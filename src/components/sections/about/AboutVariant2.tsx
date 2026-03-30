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
    "We are a leading educational institution committed to providing quality education that transforms lives. Founded with the vision of making education accessible to all, we have been nurturing young minds and building future leaders for over two decades.",
  mission:
    "To provide accessible, high-quality education that empowers students to achieve their dreams and contribute meaningfully to society.",
  vision:
    "To be the most trusted educational institution in the region, known for academic excellence and holistic development.",
  image: "",
};

export default function AboutVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes aboutCorporateSlideIn {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes aboutCorporateSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes aboutAccentGrow {
          from { width: 0; }
          to { width: 80px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div
            className="space-y-8"
            style={{ animation: "aboutCorporateSlideIn 0.8s ease-out both" }}
          >
            {/* Accent bar + label */}
            <div className="flex items-center gap-4">
              <div
                className="h-1 rounded-full"
                style={{
                  backgroundColor: colorTheme.primary,
                  animation: "aboutAccentGrow 0.6s ease-out both",
                }}
              />
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: colorTheme.primary }}
              >
                About Us
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>

            <p
              className="text-lg leading-relaxed"
              style={{ color: `${colorTheme.text}99` }}
            >
              {c.description}
            </p>

            {/* Mission & Vision structured grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {c.mission && (
                <div
                  className="relative pl-6 py-4"
                  style={{
                    borderLeft: `3px solid ${colorTheme.primary}`,
                  }}
                >
                  <h4
                    className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                    style={{ color: colorTheme.primary }}
                  >
                    Mission
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${colorTheme.text}aa` }}
                  >
                    {c.mission}
                  </p>
                </div>
              )}

              {c.vision && (
                <div
                  className="relative pl-6 py-4"
                  style={{
                    borderLeft: `3px solid ${colorTheme.accent}`,
                  }}
                >
                  <h4
                    className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                    style={{ color: colorTheme.accent }}
                  >
                    Vision
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${colorTheme.text}aa` }}
                  >
                    {c.vision}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div
            className="relative"
            style={{ animation: "aboutCorporateSlideRight 0.8s ease-out 0.2s both" }}
          >
            {/* Decorative corner accent */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 opacity-20"
              style={{
                borderTop: `4px solid ${colorTheme.primary}`,
                borderRight: `4px solid ${colorTheme.primary}`,
              }}
            />

            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                background: c.image
                  ? `url(${c.image}) center/cover no-repeat`
                  : `linear-gradient(160deg, ${colorTheme.primary}12, ${colorTheme.secondary}18, ${colorTheme.accent}12)`,
              }}
            >
              {!c.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(${colorTheme.primary} 1px, transparent 1px), linear-gradient(90deg, ${colorTheme.primary} 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <svg
                    className="w-24 h-24 opacity-15"
                    fill={colorTheme.primary}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>
              )}

              {/* Bottom stat bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{
                  background: `linear-gradient(to top, ${colorTheme.primary}dd, ${colorTheme.primary}00)`,
                }}
              >
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="text-2xl font-bold">20+</div>
                    <div className="text-xs opacity-80">Years of Excellence</div>
                  </div>
                  <div
                    className="w-px h-10 opacity-30"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-xs opacity-80">Alumni Network</div>
                  </div>
                  <div
                    className="w-px h-10 opacity-30"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs opacity-80">Commitment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left decorative corner */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-20"
              style={{
                borderBottom: `4px solid ${colorTheme.accent}`,
                borderLeft: `4px solid ${colorTheme.accent}`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
