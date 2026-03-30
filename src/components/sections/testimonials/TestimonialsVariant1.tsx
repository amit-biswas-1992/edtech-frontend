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
  title: "আমাদের শিক্ষার্থীরা যা বলছেন",
  subtitle: "যারা আমাদের গাইডেন্সে স্বপ্নের প্রতিষ্ঠানে ভর্তি হয়েছেন, তাদের অভিজ্ঞতা শুনুন।",
  testimonials: [
    {
      name: "রফিক আহমেদ",
      designation: "বুয়েটে ভর্তি",
      text: "কোচিং সেশনগুলো অসাধারণভাবে গোছানো ছিল। পদার্থবিজ্ঞানে দুর্বল থেকে ভর্তি পরীক্ষায় শীর্ষ ৫%-এ উঠে এসেছি।",
      rating: 5,
      image: "",
    },
    {
      name: "ফাতেমা আক্তার",
      designation: "ঢাকা বিশ্ববিদ্যালয়ে ভর্তি",
      text: "এখানকার শিক্ষকরা প্রতিটি শিক্ষার্থীর প্রতি যত্নশীল। ব্যক্তিগত দুর্বলতা কাটিয়ে ভর্তি নিশ্চিত করতে সাহায্য করেছেন।",
      rating: 5,
      image: "",
    },
    {
      name: "তানভীর হাসান",
      designation: "ঢাকা মেডিকেলে ভর্তি",
      text: "অনেক কোচিং সেন্টারে চেষ্টা করেছি। এখানকার পড়ানোর মান এবং মক টেস্ট প্রস্তুতি সত্যিই অসাধারণ।",
      rating: 4,
      image: "",
    },
  ],
};

function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4 drop-shadow-sm"
          style={{
            filter: star <= rating ? `drop-shadow(0 0 4px ${accentColor}60)` : "none",
          }}
          fill={star <= rating ? "#F59E0B" : "rgba(255,255,255,0.2)"}
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
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary}18, ${colorTheme.background}, ${colorTheme.accent}12)`,
      }}
    >
      {/* Floating decorative orbs */}
      <div
        className="absolute top-[-5rem] left-[10%] w-[30rem] h-[30rem] rounded-full pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colorTheme.primary}20, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-8rem] right-[5%] w-[25rem] h-[25rem] rounded-full pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colorTheme.accent}18, transparent 70%)`,
          filter: "blur(60px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute top-[40%] left-[50%] w-[20rem] h-[20rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.secondary}12, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          {c.title && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          )}
          {c.subtitle && (
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: `${colorTheme.text}80` }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(
            (
              t: { name: string; designation: string; text: string; rating: number; image: string },
              i: number
            ) => (
              <div
                key={i}
                className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-default"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.2))`,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: `1px solid rgba(255,255,255,0.45)`,
                  boxShadow: `0 8px 40px ${colorTheme.primary}08, inset 0 1px 0 rgba(255,255,255,0.6)`,
                }}
              >
                {/* Hover gradient glow behind card */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.primary}25, ${colorTheme.accent}20, ${colorTheme.secondary}15)`,
                    filter: "blur(24px)",
                  }}
                />

                {/* Large decorative quote mark */}
                <div className="absolute top-5 right-6 pointer-events-none">
                  <svg
                    className="w-16 h-16 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                    fill={colorTheme.primary}
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                {/* Gradient accent quote icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                    boxShadow: `0 6px 20px ${colorTheme.primary}35`,
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                {/* Testimonial text */}
                <p
                  className="text-sm sm:text-[0.95rem] leading-relaxed mb-6 min-h-[4.5rem]"
                  style={{ color: `${colorTheme.text}dd` }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Star rating */}
                <div className="mb-6">
                  <StarRating rating={t.rating} accentColor={colorTheme.accent} />
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-5 transition-all duration-500 group-hover:opacity-100 opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colorTheme.primary}30, transparent)`,
                  }}
                />

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: t.image ? "transparent" : colorTheme.primary,
                        backgroundImage: t.image ? `url(${t.image})` : `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: `0 4px 14px ${colorTheme.primary}30`,
                      }}
                    >
                      {!t.image && t.name.charAt(0)}
                    </div>
                    {/* Glow ring around avatar */}
                    <div
                      className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${colorTheme.primary}40, ${colorTheme.accent}40)`,
                        filter: "blur(6px)",
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: colorTheme.text }}>
                      {t.name}
                    </p>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{
                        background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
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
