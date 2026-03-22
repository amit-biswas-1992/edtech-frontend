"use client";

import React, { useState } from "react";

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
  title: "Student Testimonials",
  testimonials: [
    {
      name: "Rafiq Ahmed",
      designation: "Admitted to BUET, EEE",
      text: "The coaching sessions were incredibly well-structured. I went from struggling with physics to scoring in the top 5% of the admission test. The teachers made complex concepts feel simple and approachable.",
      image: "",
    },
    {
      name: "Fatima Akter",
      designation: "Admitted to Dhaka University, IBA",
      text: "I owe my admission success entirely to this platform. The personalized study plans, weekly mock tests, and one-on-one mentoring sessions gave me the confidence I needed to excel.",
      image: "",
    },
    {
      name: "Tanvir Hasan",
      designation: "Admitted to Dhaka Medical College",
      text: "After trying multiple coaching centers, I finally found the right guidance here. The biology and chemistry preparation was outstanding, and the mock tests were almost identical to the real exam.",
      image: "",
    },
  ],
};

export default function TestimonialsVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const testimonials = c.testimonials || defaults.testimonials;
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section
      className="py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary}08 0%, ${colorTheme.secondary}12 100%)`,
        backgroundColor: colorTheme.background,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {c.title && (
          <h2
            className="text-3xl sm:text-4xl font-bold mb-16"
            style={{ color: colorTheme.primary }}
          >
            {c.title}
          </h2>
        )}

        {/* Large quote icon */}
        <div className="mb-8">
          <svg
            className="w-16 h-16 mx-auto"
            style={{ color: colorTheme.accent, opacity: 0.3 }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
          </svg>
        </div>

        {/* Testimonial text */}
        <p
          className="text-xl sm:text-2xl leading-relaxed mb-10 font-light italic max-w-3xl mx-auto"
          style={{ color: colorTheme.text }}
        >
          &ldquo;{current.text}&rdquo;
        </p>

        {/* Avatar and info */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg"
            style={{
              backgroundColor: current.image ? "transparent" : colorTheme.primary,
              backgroundImage: current.image ? `url(${current.image})` : "none",
              backgroundSize: "cover",
              boxShadow: `0 8px 24px ${colorTheme.primary}33`,
            }}
          >
            {!current.image && current.name.charAt(0)}
          </div>
          <p className="font-bold text-lg" style={{ color: colorTheme.text }}>
            {current.name}
          </p>
          <p className="text-sm font-medium" style={{ color: colorTheme.accent }}>
            {current.designation}
          </p>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "2rem" : "0.75rem",
                height: "0.75rem",
                backgroundColor: active === i ? colorTheme.accent : `${colorTheme.primary}30`,
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
