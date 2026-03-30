"use client";

import React from "react";
import type { Course } from "@/lib/types";

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
  courses?: Course[];
}

const defaultCourses = [
  { name: "বিজ্ঞান বিভাগ", description: "পদার্থবিদ্যা, রসায়ন ও জীববিদ্যা সহ ব্যবহারিক ল্যাব ওয়ার্ক।", duration: "২ বছর", fee: "৳৫০,০০০/বছর" },
  { name: "ব্যবসায় শিক্ষা", description: "হিসাববিজ্ঞান, অর্থনীতি ও ব্যবসায় উদ্যোগ কেন্দ্রিক পাঠ্যক্রম।", duration: "২ বছর", fee: "৳৪৫,০০০/বছর" },
  { name: "কলা বিভাগ", description: "সাহিত্য, ইতিহাস ও সমাজবিজ্ঞান নিয়ে সমৃদ্ধ পাঠ্যক্রম।", duration: "২ বছর", fee: "৳৪০,০০০/বছর" },
  { name: "কম্পিউটার সায়েন্স", description: "প্রোগ্রামিং, ওয়েব ডেভেলপমেন্ট ও ডেটা সায়েন্স।", duration: "২ বছর", fee: "৳৫৫,০০০/বছর" },
  { name: "ইঞ্জিনিয়ারিং প্রস্তুতি", description: "উচ্চতর গণিত ও পদার্থবিদ্যা কেন্দ্রিক নিবিড় প্রস্তুতি।", duration: "১ বছর", fee: "৳৬০,০০০/বছর" },
  { name: "মেডিকেল প্রস্তুতি", description: "জীববিদ্যা ও রসায়ন কেন্দ্রিক ভর্তি পরীক্ষা প্রস্তুতি।", duration: "১ বছর", fee: "৳৬৫,০০০/বছর" },
];

const defaults = {
  title: "আমাদের প্রোগ্রামসমূহ",
  subtitle: "শিক্ষার্থীদের সাফল্যের জন্য ডিজাইন করা আমাদের একাডেমিক প্রোগ্রামগুলো দেখুন।",
  courses: defaultCourses,
};

const categoryColorMap: Record<string, string> = {
  engineering: "#3b82f6",
  medical: "#22c55e",
  university: "#a855f7",
  hsc: "#f97316",
  ssc: "#14b8a6",
};

function mapDynamicCourses(dynamicCourses: Course[]): { name: string; description: string; duration: string; fee: string; category?: string }[] {
  return dynamicCourses.filter(c => c.isActive).map((c) => ({
    name: c.title,
    description: c.description || "",
    duration: c.duration || "",
    fee: c.fee !== null ? `৳${c.fee.toLocaleString()}` : "",
    category: c.category,
  }));
}

/* ──────────────────────────────────────────────
   Variant 1 — Glass Cards
   Frosted glass cards with category badges,
   hover glow, price in accent
   ────────────────────────────────────────────── */
export default function CoursesVariant1({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary}08 0%, ${colorTheme.background} 40%, ${colorTheme.accent}06 100%)`,
      }}
    >
      {/* Ambient background orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ backgroundColor: colorTheme.primary }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ backgroundColor: colorTheme.accent }}
      />

      <style>{`
        @keyframes coursesV1FadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cv1-card {
          animation: coursesV1FadeUp 0.6s ease-out both;
        }
        .cv1-card:nth-child(1) { animation-delay: 0.05s; }
        .cv1-card:nth-child(2) { animation-delay: 0.1s; }
        .cv1-card:nth-child(3) { animation-delay: 0.15s; }
        .cv1-card:nth-child(4) { animation-delay: 0.2s; }
        .cv1-card:nth-child(5) { animation-delay: 0.25s; }
        .cv1-card:nth-child(6) { animation-delay: 0.3s; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}15, ${colorTheme.accent}15)`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}20`,
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorTheme.accent }} />
            প্রোগ্রামসমূহ
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: `${colorTheme.text}99` }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* Glass card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course: any, i: number) => {
            const themeColors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = course.category && categoryColorMap[course.category]
              ? categoryColorMap[course.category]
              : themeColors[i % themeColors.length];

            return (
              <div
                key={i}
                className="cv1-card group relative rounded-3xl p-7 transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{
                  background: `linear-gradient(145deg, ${colorTheme.background}e6, ${colorTheme.background}cc)`,
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: `1px solid ${cardColor}18`,
                  boxShadow: `0 4px 30px ${cardColor}06`,
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 60px ${cardColor}18, inset 0 0 60px ${cardColor}05`,
                  }}
                />
                {/* Top gradient accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)`,
                  }}
                />

                {/* Category badge */}
                {course.category && (
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                    style={{
                      background: `${cardColor}12`,
                      color: cardColor,
                      border: `1px solid ${cardColor}20`,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: cardColor }} />
                    {course.category}
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${cardColor}15, ${cardColor}08)`,
                    border: `1px solid ${cardColor}15`,
                  }}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={cardColor} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>

                <h3
                  className="text-xl font-bold mb-2.5 tracking-tight"
                  style={{ color: colorTheme.text }}
                >
                  {course.name}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6 line-clamp-3"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  {course.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-2.5 flex-wrap mt-auto pt-5" style={{ borderTop: `1px solid ${colorTheme.text}08` }}>
                  {course.duration && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: `${cardColor}0a`,
                        color: `${colorTheme.text}99`,
                        border: `1px solid ${cardColor}12`,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {course.duration}
                    </span>
                  )}
                  {course.fee && (
                    <span
                      className="inline-flex items-center text-sm font-bold px-3.5 py-1.5 rounded-full ml-auto"
                      style={{
                        background: `${colorTheme.accent}10`,
                        color: colorTheme.accent,
                        border: `1px solid ${colorTheme.accent}18`,
                      }}
                    >
                      {course.fee}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
