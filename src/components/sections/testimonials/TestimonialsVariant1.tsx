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
  title: "What Our Students Say",
  subtitle: "Hear from students who achieved their dream admissions with our guidance.",
  testimonials: [
    {
      name: "Rafiq Ahmed",
      designation: "Admitted to BUET",
      text: "The coaching sessions were incredibly well-structured. I went from struggling with physics to scoring in the top 5% of the admission test.",
      rating: 5,
      image: "",
    },
    {
      name: "Fatima Akter",
      designation: "Admitted to Dhaka University",
      text: "The teachers here truly care about each student. Their personalized approach helped me overcome my weaknesses and secure admission.",
      rating: 5,
      image: "",
    },
    {
      name: "Tanvir Hasan",
      designation: "Admitted to DMC",
      text: "I tried multiple coaching centers before finding this one. The difference in teaching quality and mock test preparation was remarkable.",
      rating: 4,
      image: "",
    },
  ],
};

function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-5 h-5"
          fill={star <= rating ? accentColor : "#e5e7eb"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const testimonials = c.testimonials || defaults.testimonials;

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colorTheme.background }}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(
            (
              t: { name: string; designation: string; text: string; rating: number; image: string },
              i: number
            ) => (
              <div
                key={i}
                className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                style={{ backgroundColor: "#ffffff", border: `1px solid ${colorTheme.primary}15` }}
              >
                {/* Quote icon */}
                <div
                  className="absolute -top-4 left-8 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colorTheme.accent }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                <p
                  className="text-base leading-relaxed mb-6 mt-4"
                  style={{ color: colorTheme.text }}
                >
                  {t.text}
                </p>

                <StarRating rating={t.rating} accentColor={colorTheme.accent} />

                <div className="flex items-center gap-4 mt-6 pt-6 border-t" style={{ borderColor: `${colorTheme.primary}15` }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      backgroundColor: t.image ? "transparent" : colorTheme.primary,
                      backgroundImage: t.image ? `url(${t.image})` : "none",
                      backgroundSize: "cover",
                    }}
                  >
                    {!t.image && t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: colorTheme.text }}>
                      {t.name}
                    </p>
                    <p className="text-sm" style={{ color: colorTheme.accent }}>
                      {t.designation}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
