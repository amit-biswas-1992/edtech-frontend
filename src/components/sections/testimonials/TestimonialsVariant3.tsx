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
  title: "Voices of Success",
  subtitle: "Real stories from students who transformed their futures through our programs.",
  testimonials: [
    {
      name: "Rafiq Ahmed",
      designation: "Admitted to BUET",
      text: "The coaching sessions were incredibly well-structured. My physics score improved by 40% in just three months.",
      image: "",
    },
    {
      name: "Fatima Akter",
      designation: "Admitted to Dhaka University",
      text: "I owe my admission success entirely to this platform. The personalized study plans and weekly mock tests gave me the confidence I needed. The mentoring sessions were life-changing.",
      image: "",
    },
    {
      name: "Tanvir Hasan",
      designation: "Admitted to DMC",
      text: "Outstanding biology and chemistry prep. The mock tests were almost identical to the real exam.",
      image: "",
    },
    {
      name: "Nusrat Jahan",
      designation: "Admitted to CUET",
      text: "I was losing hope after failing two attempts. This coaching center rebuilt my foundation from scratch and helped me finally get through. The teachers never gave up on me.",
      image: "",
    },
    {
      name: "Imran Hossain",
      designation: "Admitted to RU",
      text: "Affordable, effective, and genuinely caring. Best investment I made for my academic career.",
      image: "",
    },
    {
      name: "Sabrina Islam",
      designation: "Admitted to JU",
      text: "The online classes were just as effective as in-person. The recorded lectures helped me revise efficiently before exams. Highly recommend for students outside Dhaka.",
      image: "",
    },
  ],
};

export default function TestimonialsVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const testimonials = c.testimonials || defaults.testimonials;

  // Split into columns for masonry effect
  const col1 = testimonials.filter((_: any, i: number) => i % 3 === 0);
  const col2 = testimonials.filter((_: any, i: number) => i % 3 === 1);
  const col3 = testimonials.filter((_: any, i: number) => i % 3 === 2);

  function TestimonialBubble({
    t,
    index,
  }: {
    t: { name: string; designation: string; text: string; image: string };
    index: number;
  }) {
    const bgColors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
    const bubbleBg = bgColors[index % bgColors.length];

    return (
      <div
        className="rounded-2xl p-6 mb-6 relative shadow-md hover:shadow-lg transition-shadow duration-300"
        style={{
          backgroundColor: "#ffffff",
          borderLeft: `4px solid ${bubbleBg}`,
        }}
      >
        {/* Speech bubble tail */}
        <div
          className="absolute -bottom-2 left-8 w-4 h-4 rotate-45"
          style={{ backgroundColor: "#ffffff" }}
        />

        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: colorTheme.text }}>
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{
              backgroundColor: t.image ? "transparent" : bubbleBg,
              backgroundImage: t.image ? `url(${t.image})` : "none",
              backgroundSize: "cover",
            }}
          >
            {!t.image && t.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: colorTheme.text }}>
              {t.name}
            </p>
            <p className="text-xs" style={{ color: bubbleBg }}>
              {t.designation}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderColumn(items: typeof testimonials, startIndex: number) {
    return items.map(
      (
        t: { name: string; designation: string; text: string; image: string },
        i: number
      ) => <TestimonialBubble key={startIndex + i} t={t} index={startIndex + i} />
    );
  }

  return (
    <section
      className="py-20 px-4"
      style={{
        backgroundColor: colorTheme.background,
        background: `linear-gradient(180deg, ${colorTheme.primary}05 0%, ${colorTheme.background} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {c.title && (
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ color: colorTheme.primary }}
          >
            {c.title}
          </h2>
        )}
        {c.subtitle && (
          <p
            className="text-center text-lg mb-14 max-w-2xl mx-auto"
            style={{ color: `${colorTheme.text}99` }}
          >
            {c.subtitle}
          </p>
        )}

        {/* Masonry columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-0">
          {/* On mobile, single column. On larger, true masonry via columns CSS */}
          <div className="break-inside-avoid">{renderColumn(col1, 0)}</div>
          <div className="break-inside-avoid">{renderColumn(col2, 1)}</div>
          <div className="break-inside-avoid">{renderColumn(col3, 2)}</div>
        </div>
      </div>
    </section>
  );
}
