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

  const gold = "#D4A853";
  const darkBg = "#0A0A0F";
  const darkCard = "#12121A";

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: darkBg }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${gold}, transparent)` }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header with navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div>
            <div
              className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: gold }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: gold }} />
              Achievements
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                color: "#E8E8EC",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              {c.title}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                border: `1px solid ${gold}30`,
                color: gold,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${gold}15`;
                e.currentTarget.style.borderColor = `${gold}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = `${gold}30`;
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: gold,
                color: darkBg,
                boxShadow: `0 0 20px ${gold}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${gold}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${gold}30`;
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {stories.map((story: any, i: number) => (
            <div
              key={i}
              className="group flex-shrink-0 w-80 snap-start rounded-lg overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: darkCard,
                border: `1px solid #1E1E2A`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${gold}25`;
                e.currentTarget.style.boxShadow = `0 0 40px ${gold}08`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E1E2A";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top section with spotlight effect on avatar */}
              <div className="relative p-8 pb-6 text-center">
                {/* Spotlight glow behind avatar */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: gold }}
                />

                {/* Avatar with gold ring */}
                <div
                  className="relative inline-flex w-20 h-20 rounded-full p-0.5 mb-5 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${gold}60, ${gold}20)`,
                    boxShadow: `0 0 0 0 ${gold}00`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-xl font-bold"
                    style={{
                      backgroundColor: "#1A1A25",
                      background: story.image
                        ? `url(${story.image}) center/cover no-repeat`
                        : undefined,
                      color: gold,
                    }}
                  >
                    {!story.image && story.name?.charAt(0)}
                  </div>
                </div>

                {/* Name */}
                <h4
                  className="text-lg font-bold mb-1"
                  style={{
                    color: "#E8E8EC",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {story.name}
                </h4>

                {story.year && (
                  <span
                    className="text-xs font-medium tracking-wider uppercase"
                    style={{ color: "#6B6B80" }}
                  >
                    Batch of {story.year}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="mx-8">
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${gold}25, transparent)`,
                  }}
                />
              </div>

              {/* Achievement section */}
              <div className="p-8 pt-5">
                {/* Serif quote style */}
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-40"
                    fill={gold}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span
                    className="text-sm font-semibold leading-relaxed"
                    style={{ color: gold }}
                  >
                    {story.result}
                  </span>
                </div>

                {/* Glowing achievement badge */}
                <div
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: `${gold}08`,
                    color: `${gold}cc`,
                    border: `1px solid ${gold}15`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: gold,
                      boxShadow: `0 0 6px ${gold}80`,
                    }}
                  />
                  Merit Achiever
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
