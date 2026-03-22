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
  { name: "Arts & Humanities", description: "Broad curriculum exploring Literature, History, and Social Sciences.", duration: "2 Years", fee: "BDT 40,000/yr" },
  { name: "Computer Science", description: "Modern technology curriculum with programming, web development, and data science.", duration: "2 Years", fee: "BDT 55,000/yr" },
];

const defaults = {
  title: "Our Programs",
  subtitle: "Explore our comprehensive range of academic programs designed to prepare students for success.",
  courses: defaultCourses,
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

export default function CoursesVariant2({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-6xl mx-auto">
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

        {/* List items */}
        <div className="space-y-4">
          {courses.map((course: any, i: number) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor:
                  i % 2 === 0 ? `${colorTheme.primary}06` : colorTheme.background,
                border: `1px solid ${colorTheme.primary}10`,
              }}
            >
              {/* Number */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{
                  backgroundColor: `${colorTheme.primary}12`,
                  color: colorTheme.primary,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Course name */}
              <h3
                className="text-lg font-bold flex-shrink-0 min-w-[160px]"
                style={{ color: colorTheme.text }}
              >
                {course.name}
              </h3>

              {/* Description */}
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: `${colorTheme.text}99` }}
              >
                {course.description}
              </p>

              {/* Duration & Fee */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {course.category && (
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase"
                    style={{
                      backgroundColor: `${colorTheme.primary}10`,
                      color: colorTheme.primary,
                    }}
                  >
                    {course.category}
                  </span>
                )}
                {course.duration && (
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${colorTheme.secondary}15`,
                      color: colorTheme.secondary,
                    }}
                  >
                    {course.duration}
                  </span>
                )}
                {course.fee && (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${colorTheme.accent}15`,
                      color: colorTheme.accent,
                    }}
                  >
                    {course.fee}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 hidden sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke={colorTheme.primary}
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
