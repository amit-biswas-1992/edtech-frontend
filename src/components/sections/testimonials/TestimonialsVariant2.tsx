"use client";

import React, { useState, useCallback } from "react";

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
  title: "শিক্ষার্থীদের অভিজ্ঞতা",
  testimonials: [
    {
      name: "রফিক আহমেদ",
      designation: "বুয়েট, ইইই-তে ভর্তি",
      text: "কোচিং সেশনগুলো অবিশ্বাস্যভাবে সুগঠিত ছিল। পদার্থবিজ্ঞানে দুর্বল থেকে ভর্তি পরীক্ষায় শীর্ষ ৫%-এ পৌঁছেছি। শিক্ষকরা জটিল বিষয়গুলোকে সহজ করে বুঝিয়েছেন।",
      rating: 5,
      image: "",
    },
    {
      name: "ফাতেমা আক্তার",
      designation: "ঢাকা বিশ্ববিদ্যালয়, আইবিএ-তে ভর্তি",
      text: "আমার ভর্তি সাফল্যের পুরো কৃতিত্ব এই প্ল্যাটফর্মের। ব্যক্তিগত পড়াশোনার পরিকল্পনা, সাপ্তাহিক মক টেস্ট এবং মেন্টরিং সেশন আমাকে আত্মবিশ্বাসী করে তুলেছে।",
      rating: 5,
      image: "",
    },
    {
      name: "তানভীর হাসান",
      designation: "ঢাকা মেডিকেল কলেজে ভর্তি",
      text: "অনেক কোচিং সেন্টারে চেষ্টা করার পর এখানে সঠিক গাইডেন্স পেয়েছি। জীববিজ্ঞান ও রসায়নের প্রস্তুতি অসাধারণ ছিল। মক টেস্টগুলো আসল পরীক্ষার প্রায় হুবহু ছিল।",
      rating: 4,
      image: "",
    },
  ],
};

export default function TestimonialsVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const testimonials = c.testimonials || defaults.testimonials;
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: colorTheme.background }}
    >
      {/* Accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: colorTheme.primary }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with accent line */}
        <div className="mb-20">
          <div
            className="w-16 h-1 mb-6"
            style={{ backgroundColor: colorTheme.primary }}
          />
          {c.title && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          )}
        </div>

        {/* Main testimonial area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-start">
          {/* Left: Quote content */}
          <div>
            {/* Large quote icon */}
            <svg
              className="w-14 h-14 mb-8"
              style={{ color: colorTheme.primary, opacity: 0.15 }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
            </svg>

            {/* Testimonial text */}
            <div className="min-h-[140px] sm:min-h-[120px]">
              <p
                className="text-xl sm:text-2xl lg:text-3xl leading-snug font-light"
                style={{ color: colorTheme.text }}
                key={active}
              >
                {current.text}
              </p>
            </div>

            {/* Author block with left accent border */}
            <div
              className="mt-10 pl-6 py-1"
              style={{ borderLeft: `3px solid ${colorTheme.primary}` }}
            >
              <p
                className="font-bold text-lg tracking-tight"
                style={{ color: colorTheme.text }}
              >
                {current.name}
              </p>
              <p
                className="text-sm font-medium mt-1 uppercase tracking-wider"
                style={{ color: `${colorTheme.text}70` }}
              >
                {current.designation}
              </p>
            </div>

            {/* Navigation row */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={goPrev}
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  border: `2px solid ${colorTheme.text}20`,
                  color: colorTheme.text,
                }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goNext}
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: colorTheme.primary,
                  color: "#ffffff",
                }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Counter */}
              <span
                className="text-sm font-mono ml-2 tracking-widest"
                style={{ color: `${colorTheme.text}50` }}
              >
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: Avatar column + thumbnail list */}
          <div className="hidden lg:flex flex-col items-center gap-5">
            {/* Main avatar */}
            <div
              className="w-28 h-28 flex items-center justify-center text-white font-black text-3xl transition-all duration-500"
              style={{
                backgroundColor: current.image ? "transparent" : colorTheme.primary,
                backgroundImage: current.image ? `url(${current.image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!current.image && current.name.charAt(0)}
            </div>

            {/* Thumbnail selectors */}
            <div className="flex flex-col gap-2 mt-2">
              {testimonials.map(
                (
                  t: { name: string; designation: string; text: string; rating: number; image: string },
                  i: number
                ) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="w-12 h-12 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: active === i
                        ? colorTheme.primary
                        : `${colorTheme.text}08`,
                      color: active === i ? "#ffffff" : `${colorTheme.text}60`,
                      border: active === i ? "none" : `1px solid ${colorTheme.text}15`,
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    {t.image ? (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${t.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: active === i ? 1 : 0.5,
                        }}
                      />
                    ) : (
                      t.name.charAt(0)
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
          {testimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-400"
              style={{
                width: active === i ? "2rem" : "0.5rem",
                height: "0.5rem",
                backgroundColor: active === i ? colorTheme.primary : `${colorTheme.text}20`,
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
