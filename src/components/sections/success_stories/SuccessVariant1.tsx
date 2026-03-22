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
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Stats counters */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 p-8 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
            boxShadow: `0 12px 40px ${colorTheme.primary}33`,
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any, i: number) => (
            <div
              key={i}
              className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: colorTheme.background,
                border: `1px solid ${colorTheme.primary}15`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{
                    background: story.image
                      ? `url(${story.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${colorTheme.primary}30, ${colorTheme.accent}30)`,
                    color: colorTheme.primary,
                  }}
                >
                  {!story.image && story.name?.charAt(0)}
                </div>
                <div>
                  <h4
                    className="font-bold"
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
                </div>
              </div>

              <div
                className="px-4 py-3 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: `${colorTheme.accent}10`,
                  color: colorTheme.accent,
                }}
              >
                {story.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
