"use client";

import React, { useState } from "react";
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
  { name: "Science", description: "Comprehensive science program covering Physics, Chemistry, and Biology with practical lab work. Students engage in hands-on experiments and research projects that develop critical thinking and analytical skills.", duration: "2 Years", fee: "BDT 50,000/yr" },
  { name: "Commerce", description: "Business-focused curriculum with Accounting, Finance, and Economics for future entrepreneurs. Includes real-world case studies and business simulation projects.", duration: "2 Years", fee: "BDT 45,000/yr" },
  { name: "Arts & Humanities", description: "Broad curriculum exploring Literature, History, and Social Sciences for well-rounded education. Encourages creative expression and critical analysis of culture and society.", duration: "2 Years", fee: "BDT 40,000/yr" },
  { name: "Computer Science", description: "Modern technology curriculum with programming, web development, and data science. Hands-on projects with industry-standard tools and technologies.", duration: "2 Years", fee: "BDT 55,000/yr" },
];

const defaults = {
  title: "Our Programs",
  subtitle: "Explore our comprehensive range of academic programs.",
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

export default function CoursesVariant3({ content, colorTheme, courses: dynamicCourses }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = dynamicCourses && dynamicCourses.length > 0;
  const courses = hasDynamic ? mapDynamicCourses(dynamicCourses) : (c.courses?.length ? c.courses : defaultCourses);
  const [activeTab, setActiveTab] = useState(0);
  const activeCourse: any = courses[activeTab] || courses[0];

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {courses.map((course: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                activeTab === i
                  ? {
                      backgroundColor: colorTheme.primary,
                      color: "#ffffff",
                      boxShadow: `0 4px 15px ${colorTheme.primary}44`,
                    }
                  : {
                      backgroundColor: `${colorTheme.primary}08`,
                      color: `${colorTheme.text}99`,
                      border: `1px solid ${colorTheme.primary}15`,
                    }
              }
            >
              {course.name}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="rounded-3xl p-8 sm:p-12 transition-all duration-300"
          style={{
            backgroundColor: colorTheme.background,
            border: `1px solid ${colorTheme.primary}15`,
            boxShadow: `0 8px 30px ${colorTheme.primary}08`,
          }}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left info */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <h3
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: colorTheme.text }}
                >
                  {activeCourse.name}
                </h3>
                {activeCourse.category && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${colorTheme.accent}15`,
                      color: colorTheme.accent,
                    }}
                  >
                    {activeCourse.category}
                  </span>
                )}
              </div>

              <div
                className="w-16 h-1 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                }}
              />

              <p
                className="text-lg leading-relaxed"
                style={{ color: `${colorTheme.text}aa` }}
              >
                {activeCourse.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: colorTheme.primary,
                  color: "#ffffff",
                  boxShadow: `0 4px 15px ${colorTheme.primary}33`,
                }}
              >
                Apply Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right details */}
            <div className="lg:w-72 space-y-4">
              <div
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: `${colorTheme.primary}08`,
                  border: `1px solid ${colorTheme.primary}12`,
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  Duration
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: colorTheme.primary }}
                >
                  {activeCourse.duration || "N/A"}
                </div>
              </div>

              <div
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: `${colorTheme.accent}08`,
                  border: `1px solid ${colorTheme.accent}12`,
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  Tuition Fee
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: colorTheme.accent }}
                >
                  {activeCourse.fee || "Contact Us"}
                </div>
              </div>

              <div
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: `${colorTheme.secondary}08`,
                  border: `1px solid ${colorTheme.secondary}12`,
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  Program Index
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: colorTheme.secondary }}
                >
                  #{activeTab + 1} of {courses.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
