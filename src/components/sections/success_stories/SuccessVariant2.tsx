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

export default function SuccessVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const stories = c.stories?.length ? c.stories : defaultStories;

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  border: `1px solid ${cardColor}20`,
                }}
              >
                {/* Image / gradient header */}
                <div
                  className="h-36 relative"
                  style={{
                    background: story.image
                      ? `url(${story.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${cardColor}40, ${cardColor}20)`,
                  }}
                >
                  {/* Year badge */}
                  {story.year && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: cardColor,
                        color: "#ffffff",
                      }}
                    >
                      {story.year}
                    </div>
                  )}

                  {/* Avatar overlapping bottom */}
                  <div className="absolute -bottom-8 left-6">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-4"
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
                  </div>
                </div>

                {/* Content */}
                <div
                  className="pt-12 pb-6 px-6"
                  style={{ backgroundColor: colorTheme.background }}
                >
                  <h4
                    className="text-lg font-bold mb-1"
                    style={{ color: colorTheme.text }}
                  >
                    {story.name}
                  </h4>

                  <div className="flex items-center gap-2 mt-3">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill={cardColor}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: cardColor }}
                    >
                      {story.result}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
