"use client";

import React, { useRef } from "react";
import type { Teacher } from "@/lib/types";

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
  teachers?: Teacher[];
}

const defaultMembers = [
  { name: "Dr. Mohammad Ali", designation: "Principal", subject: "Physics", image: "" },
  { name: "Prof. Ayesha Rahman", designation: "Vice Principal", subject: "Mathematics", image: "" },
  { name: "Mr. Shahidul Haque", designation: "Senior Lecturer", subject: "Chemistry", image: "" },
  { name: "Ms. Taslima Begum", designation: "Lecturer", subject: "English", image: "" },
  { name: "Dr. Kamal Uddin", designation: "Associate Professor", subject: "Biology", image: "" },
  { name: "Mrs. Nasreen Akter", designation: "Senior Lecturer", subject: "Bangla", image: "" },
];

const defaults = {
  title: "Our Faculty",
  members: defaultMembers,
};

function mapDynamicTeachers(teachers: Teacher[]): { name: string; designation: string; subject: string; image: string }[] {
  return teachers.filter(t => t.isActive).map((t) => ({
    name: t.name,
    designation: t.designation || "",
    subject: t.subject || "",
    image: t.image || "",
  }));
}

export default function FacultyVariant2({ content, colorTheme, teachers }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = teachers && teachers.length > 0;
  const members = hasDynamic ? mapDynamicTeachers(teachers) : (c.members?.length ? c.members : defaultMembers);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
              style={{
                backgroundColor: `${colorTheme.primary}12`,
                color: colorTheme.primary,
              }}
            >
              Faculty
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                border: `2px solid ${colorTheme.primary}30`,
                color: colorTheme.primary,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: colorTheme.primary,
                color: "#ffffff",
                boxShadow: `0 4px 12px ${colorTheme.primary}33`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {members.map((member: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="flex-shrink-0 w-72 snap-start rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  border: `1px solid ${cardColor}20`,
                  backgroundColor: colorTheme.background,
                }}
              >
                {/* Image area */}
                <div
                  className="h-56 relative flex items-center justify-center"
                  style={{
                    background: member.image
                      ? `url(${member.image}) center/cover no-repeat`
                      : `linear-gradient(160deg, ${cardColor}25, ${cardColor}08)`,
                  }}
                >
                  {!member.image && (
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold"
                      style={{
                        backgroundColor: `${cardColor}15`,
                        color: cardColor,
                        border: `3px solid ${cardColor}25`,
                      }}
                    >
                      {member.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h4
                    className="text-lg font-bold mb-1"
                    style={{ color: colorTheme.text }}
                  >
                    {member.name}
                  </h4>
                  <p
                    className="text-sm mb-3"
                    style={{ color: `${colorTheme.text}88` }}
                  >
                    {member.designation}
                  </p>
                  {member.subject && (
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${cardColor}12`,
                        color: cardColor,
                      }}
                    >
                      {member.subject}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
