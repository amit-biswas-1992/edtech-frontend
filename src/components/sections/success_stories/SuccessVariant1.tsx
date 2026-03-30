"use client";

import React, { useState, useEffect, useRef } from "react";

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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function SuccessVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const stories = c.stories?.length ? c.stories : defaultStories;

  const stats = [
    { value: 10000, suffix: "+", label: "Students Graduated" },
    { value: 95, suffix: "%", label: "Success Rate" },
    { value: 500, suffix: "+", label: "Merit Positions" },
    { value: 25, suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: colorTheme.background }}
    >
      {/* Decorative floating orbs */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.primary}, transparent)` }}
      />
      <div
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.accent}, transparent)` }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.secondary}, transparent)` }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-xl"
            style={{
              backgroundColor: `${colorTheme.primary}15`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}20`,
              boxShadow: `0 0 20px ${colorTheme.primary}08`,
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Achievements
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Stats counters - glass card */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 p-8 sm:p-10 rounded-3xl backdrop-blur-xl"
          style={{
            background: `linear-gradient(135deg, ${colorTheme.primary}20, ${colorTheme.secondary}15, ${colorTheme.accent}10)`,
            border: `1px solid ${colorTheme.primary}20`,
            boxShadow: `0 20px 60px ${colorTheme.primary}15, inset 0 1px 0 ${colorTheme.primary}15`,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: `${colorTheme.primary}08`,
                border: `1px solid ${colorTheme.primary}10`,
              }}
            >
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1"
                style={{ color: colorTheme.primary }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium" style={{ color: `${colorTheme.text}88` }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl cursor-default overflow-hidden"
                style={{
                  backgroundColor: `${cardColor}06`,
                  border: `1px solid ${cardColor}15`,
                  boxShadow: `0 4px 20px ${cardColor}05, inset 0 1px 0 ${cardColor}10`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 48px ${cardColor}15, inset 0 1px 0 ${cardColor}15`;
                  e.currentTarget.style.borderColor = `${cardColor}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 20px ${cardColor}05, inset 0 1px 0 ${cardColor}10`;
                  e.currentTarget.style.borderColor = `${cardColor}15`;
                }}
              >
                {/* Shimmer overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, ${cardColor}08 45%, ${cardColor}12 50%, ${cardColor}08 55%, transparent 60%)`,
                    backgroundSize: "200% 100%",
                    animation: "shimmerCard 2s ease-in-out infinite",
                  }}
                />

                <div className="relative flex items-center gap-4 mb-5">
                  {/* Avatar with gradient ring */}
                  <div
                    className="relative w-16 h-16 rounded-full p-0.5 flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${cardColor}, ${cardColor}60)`,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        background: story.image
                          ? `url(${story.image}) center/cover no-repeat`
                          : colorTheme.background,
                        color: cardColor,
                      }}
                    >
                      {!story.image && story.name?.charAt(0)}
                    </div>
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 20px ${cardColor}40`,
                      }}
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-base" style={{ color: colorTheme.text }}>
                      {story.name}
                    </h4>
                    {story.year && (
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full backdrop-blur-sm"
                        style={{
                          color: `${colorTheme.text}77`,
                          backgroundColor: `${cardColor}10`,
                        }}
                      >
                        Batch of {story.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Achievement badge */}
                <div
                  className="relative px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 backdrop-blur-sm overflow-hidden"
                  style={{
                    backgroundColor: `${cardColor}10`,
                    color: cardColor,
                    border: `1px solid ${cardColor}15`,
                  }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {story.result}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmerCard {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
