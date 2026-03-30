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

/* ──────────────────────────────────────────────
   Variant 2 — Corporate List
   Clean structured list with borders, fee
   aligned right, hover highlight row
   ────────────────────────────────────────────── */
export default function CoursesVariant2({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes cv2SlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .cv2-row {
          animation: cv2SlideIn 0.5s ease-out both;
        }
        .cv2-row:nth-child(1) { animation-delay: 0.05s; }
        .cv2-row:nth-child(2) { animation-delay: 0.1s; }
        .cv2-row:nth-child(3) { animation-delay: 0.15s; }
        .cv2-row:nth-child(4) { animation-delay: 0.2s; }
        .cv2-row:nth-child(5) { animation-delay: 0.25s; }
        .cv2-row:nth-child(6) { animation-delay: 0.3s; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] rounded-full" style={{ backgroundColor: colorTheme.primary }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: colorTheme.primary }}>
              প্রোগ্রামসমূহ
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg max-w-2xl leading-relaxed"
            style={{ color: `${colorTheme.text}88` }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* Table header */}
        <div
          className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: `${colorTheme.text}55` }}
        >
          <div className="col-span-1">#</div>
          <div className="col-span-3">প্রোগ্রাম</div>
          <div className="col-span-4">বিবরণ</div>
          <div className="col-span-2 text-center">সময়কাল</div>
          <div className="col-span-2 text-right">ফি</div>
        </div>

        <div
          className="w-full h-px mb-1"
          style={{ backgroundColor: `${colorTheme.text}12` }}
        />

        {/* List rows */}
        <div>
          {courses.map((course: any, i: number) => (
            <div
              key={i}
              className="cv2-row group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center px-6 py-5 transition-all duration-300 rounded-xl hover:scale-[1.01] cursor-pointer"
              style={{
                borderBottom: `1px solid ${colorTheme.text}08`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${colorTheme.primary}06`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 20px ${colorTheme.primary}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Number */}
              <div
                className="hidden sm:flex col-span-1 w-8 h-8 rounded-lg items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: `${colorTheme.primary}08`,
                  color: colorTheme.primary,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Name + category */}
              <div className="sm:col-span-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold" style={{ color: colorTheme.text }}>
                    {course.name}
                  </h3>
                  {course.category && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${colorTheme.secondary}12`,
                        color: colorTheme.secondary,
                      }}
                    >
                      {course.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p
                className="sm:col-span-4 text-sm leading-relaxed line-clamp-2"
                style={{ color: `${colorTheme.text}77` }}
              >
                {course.description}
              </p>

              {/* Duration */}
              <div className="sm:col-span-2 text-center">
                {course.duration && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${colorTheme.text}06`,
                      color: `${colorTheme.text}88`,
                    }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {course.duration}
                  </span>
                )}
              </div>

              {/* Fee — aligned right */}
              <div className="sm:col-span-2 text-right">
                {course.fee && (
                  <span
                    className="text-base font-extrabold tabular-nums"
                    style={{ color: colorTheme.accent }}
                  >
                    {course.fee}
                  </span>
                )}
              </div>

              {/* Arrow (desktop) */}
              <svg
                className="hidden sm:block absolute right-6 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke={colorTheme.primary}
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div className="mt-8 flex justify-center">
          <div
            className="w-24 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
