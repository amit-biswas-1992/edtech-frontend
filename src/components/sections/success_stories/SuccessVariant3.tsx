"use client";

import React, { useRef } from "react";

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

const defaultStories = [
  { name: "Rafiqul Islam", result: "GPA 5.00 in HSC", year: "2024", image: "" },
  { name: "Fatema Akter", result: "Admitted to BUET", year: "2024", image: "" },
  { name: "Kamal Hossain", result: "National Science Olympiad Winner", year: "2023", image: "" },
  { name: "Nusrat Jahan", result: "Full Scholarship to DU", year: "2023", image: "" },
  { name: "Arif Rahman", result: "GPA 5.00 in SSC & HSC", year: "2024", image: "" },
  { name: "Sumaiya Begum", result: "Medical College Admission", year: "2024", image: "" },
];

const defaults = {
  title: "Our Success Stories",
  stories: defaultStories,
};

export default function SuccessVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const stories = c.stories?.length ? c.stories : defaultStories;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
              style={{
                backgroundColor: `${colorTheme.primary}12`,
                color: colorTheme.primary,
              }}
            >
              Achievements
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                border: `2px solid ${colorTheme.primary}30`,
                color: colorTheme.primary,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: colorTheme.primary,
                color: "#ffffff",
                boxShadow: `0 4px 12px ${colorTheme.primary}33`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {stories.map((story: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="flex-shrink-0 w-80 snap-start rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  border: `1px solid ${cardColor}20`,
                  backgroundColor: colorTheme.background,
                }}
              >
                {/* Top gradient */}
                <div
                  className="h-28 relative"
                  style={{
                    background: story.image
                      ? `url(${story.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${cardColor}50, ${cardColor}20)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                </div>

                <div className="p-6 -mt-8 relative">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold border-4 mb-4"
                    style={{
                      background: story.image
                        ? `url(${story.image}) center/cover no-repeat`
                        : `linear-gradient(135deg, ${cardColor}, ${cardColor}cc)`,
                      borderColor: colorTheme.background,
                      color: "#ffffff",
                    }}
                  >
                    {!story.image && story.name?.charAt(0)}
                  </div>

                  <h4
                    className="text-lg font-bold mb-1"
                    style={{ color: colorTheme.text }}
                  >
                    {story.name}
                  </h4>

                  {story.year && (
                    <span
                      className="text-xs font-medium"
                      style={{ color: `${colorTheme.text}88` }}
                    >
                      Batch of {story.year}
                    </span>
                  )}

                  <div
                    className="mt-4 px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      backgroundColor: `${cardColor}10`,
                      color: cardColor,
                    }}
                  >
                    {story.result}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
