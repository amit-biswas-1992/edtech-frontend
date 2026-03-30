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

function mapDynamicCourses(dynamicCourses: Course[]): { name: string; description: string; duration: string; fee: string; category?: string }[] {
  return dynamicCourses.filter(c => c.isActive).map((c) => ({
    name: c.title,
    description: c.description || "",
    duration: c.duration || "",
    fee: c.fee !== null ? `৳${c.fee.toLocaleString()}` : "",
    category: c.category,
  }));
}

/* Bento gradient palettes */
const tileGradients = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#fccb90", "#d57eeb"],
  ["#e0c3fc", "#8ec5fc"],
];

/* ──────────────────────────────────────────────
   Variant 3 — Colorful Tiles
   Bento/tile layout, each course a different
   gradient, large typography
   ────────────────────────────────────────────── */
export default function CoursesVariant3({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);

  /* Dynamic bento sizing — alternate large/small tiles */
  const getSpanClass = (i: number, total: number): string => {
    if (total <= 3) return "col-span-1";
    // First and last items can be wide
    if (i === 0) return "md:col-span-2";
    if (total >= 5 && i === 3) return "md:col-span-2";
    return "col-span-1";
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes cv3Pop {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .cv3-tile {
          animation: cv3Pop 0.5s ease-out both;
        }
        .cv3-tile:nth-child(1) { animation-delay: 0s; }
        .cv3-tile:nth-child(2) { animation-delay: 0.08s; }
        .cv3-tile:nth-child(3) { animation-delay: 0.16s; }
        .cv3-tile:nth-child(4) { animation-delay: 0.24s; }
        .cv3-tile:nth-child(5) { animation-delay: 0.32s; }
        .cv3-tile:nth-child(6) { animation-delay: 0.40s; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg sm:text-xl leading-relaxed"
            style={{ color: `${colorTheme.text}88` }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course: any, i: number) => {
            const gradientPair = tileGradients[i % tileGradients.length];
            const spanClass = getSpanClass(i, courses.length);

            return (
              <div
                key={i}
                className={`cv3-tile group relative ${spanClass} rounded-3xl p-8 sm:p-10 min-h-[240px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
                style={{
                  background: `linear-gradient(135deg, ${gradientPair[0]}, ${gradientPair[1]})`,
                }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700"
                  style={{ backgroundColor: "#ffffff" }}
                />
                <div
                  className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
                  style={{ backgroundColor: "#ffffff" }}
                />

                {/* Top row: category + duration */}
                <div className="relative z-10 flex items-center justify-between mb-auto">
                  <div className="flex items-center gap-2">
                    {course.category && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">
                        {course.category}
                      </span>
                    )}
                  </div>
                  {course.duration && (
                    <span className="text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                      {course.duration}
                    </span>
                  )}
                </div>

                {/* Main content */}
                <div className="relative z-10 mt-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
                    {course.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-5 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Fee badge */}
                  {course.fee && (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-2xl px-5 py-2.5 border border-white/10">
                      <span className="text-lg font-black text-white tracking-tight">
                        {course.fee}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom-right arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
