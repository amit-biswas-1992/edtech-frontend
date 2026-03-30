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
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - corporate left aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1" style={{ backgroundColor: colorTheme.primary }} />
              <span
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: colorTheme.primary }}
              >
                Achievements
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-sm lg:text-right"
            style={{ color: `${colorTheme.text}77` }}
          >
            Our students consistently achieve outstanding results in national and university-level examinations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {stories.map((story: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group relative transition-all duration-300 hover:z-10"
                style={{
                  border: `1px solid ${colorTheme.text}08`,
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: cardColor }}
                />

                <div className="p-8">
                  {/* Student number */}
                  <div
                    className="text-6xl font-black mb-6 select-none leading-none"
                    style={{ color: `${cardColor}10` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 flex items-center justify-center text-xl font-black flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${cardColor}10`,
                        color: cardColor,
                      }}
                    >
                      {story.image ? (
                        <div
                          className="w-full h-full"
                          style={{ background: `url(${story.image}) center/cover no-repeat` }}
                        />
                      ) : (
                        story.name?.charAt(0)
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4
                        className="text-lg font-black tracking-tight truncate"
                        style={{ color: colorTheme.text }}
                      >
                        {story.name}
                      </h4>
                      {story.year && (
                        <span
                          className="text-xs font-bold tracking-widest uppercase"
                          style={{ color: `${colorTheme.text}55` }}
                        >
                          Batch {story.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Achievement tag */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 flex-shrink-0"
                      style={{ backgroundColor: cardColor }}
                    />
                    <span
                      className="text-sm font-bold tracking-tight"
                      style={{ color: cardColor }}
                    >
                      {story.result}
                    </span>
                  </div>
                </div>

                {/* Bottom border on hover */}
                <div
                  className="h-0 group-hover:h-1 transition-all duration-300"
                  style={{ backgroundColor: cardColor }}
                />
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        <div
          className="mt-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: `${colorTheme.primary}06`,
            borderLeft: `4px solid ${colorTheme.primary}`,
          }}
        >
          <p
            className="text-sm font-bold tracking-wide uppercase"
            style={{ color: colorTheme.primary }}
          >
            {stories.length} success stories and counting
          </p>
          <div className="flex items-center gap-6">
            {["GPA 5.00", "BUET", "Scholarships"].map((tag, i) => (
              <span
                key={i}
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: `${colorTheme.text}55` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
