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
  { name: "Science", description: "Comprehensive science program covering Physics, Chemistry, and Biology with practical lab work.", duration: "2 Years", fee: "BDT 50,000/yr" },
  { name: "Commerce", description: "Business-focused curriculum with Accounting, Finance, and Economics for future entrepreneurs.", duration: "2 Years", fee: "BDT 45,000/yr" },
  { name: "Arts & Humanities", description: "Broad curriculum exploring Literature, History, and Social Sciences for well-rounded education.", duration: "2 Years", fee: "BDT 40,000/yr" },
  { name: "Computer Science", description: "Modern technology curriculum with programming, web development, and data science.", duration: "2 Years", fee: "BDT 55,000/yr" },
  { name: "Engineering Prep", description: "Intensive preparation for engineering entrance exams with advanced Mathematics and Physics.", duration: "1 Year", fee: "BDT 60,000/yr" },
  { name: "Medical Prep", description: "Comprehensive preparation for medical admission tests with Biology and Chemistry focus.", duration: "1 Year", fee: "BDT 65,000/yr" },
];

const defaults = {
  title: "Our Programs",
  subtitle: "Explore our comprehensive range of academic programs designed to prepare students for success.",
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
    fee: c.fee !== null ? `\u09F3${c.fee.toLocaleString()}` : "",
    category: c.category,
  }));
}

export default function CoursesVariant1({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
            style={{
              backgroundColor: `${colorTheme.primary}12`,
              color: colorTheme.primary,
            }}
          >
            Programs
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: `${colorTheme.text}aa` }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = course.category && categoryColorMap[course.category]
              ? categoryColorMap[course.category]
              : colors[i % colors.length];

            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                style={{
                  backgroundColor: colorTheme.background,
                  border: `1px solid ${cardColor}20`,
                  boxShadow: `0 4px 15px ${cardColor}08`,
                }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${cardColor}, ${cardColor}88)`,
                  }}
                />

                {/* Category badge */}
                {course.category && (
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-3"
                    style={{
                      backgroundColor: `${cardColor}15`,
                      color: cardColor,
                    }}
                  >
                    {course.category}
                  </span>
                )}

                {/* Course icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${cardColor}12`,
                    color: cardColor,
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colorTheme.text }}
                >
                  {course.name}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: `${colorTheme.text}aa` }}
                >
                  {course.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-3 flex-wrap">
                  {course.duration && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${cardColor}10`,
                        color: cardColor,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                  )}
                  {course.fee && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${colorTheme.accent}10`,
                        color: colorTheme.accent,
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
