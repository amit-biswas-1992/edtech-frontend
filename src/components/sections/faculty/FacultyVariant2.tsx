"use client";

import React from "react";
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

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
          <div>
            {/* Accent line */}
            <div
              className="w-12 h-1 mb-5"
              style={{ backgroundColor: colorTheme.accent }}
            />
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none tracking-tight uppercase"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
            <p
              className="text-base mt-3 max-w-md"
              style={{ color: `${colorTheme.text}70` }}
            >
              Meet the experienced educators behind our academic excellence.
            </p>
          </div>
          <div
            className="text-sm font-bold uppercase tracking-[0.15em] px-6 py-3 transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              border: `2px solid ${colorTheme.primary}`,
              color: colorTheme.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colorTheme.primary;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colorTheme.primary;
            }}
          >
            View All Faculty
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: `${colorTheme.text}10` }}>
          {members.map((member: any, i: number) => (
            <div
              key={i}
              className="group relative transition-all duration-300 cursor-default"
              style={{ backgroundColor: colorTheme.background }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 40px ${colorTheme.primary}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="p-8">
                {/* Top row: number + subject */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-xs font-black tracking-widest"
                    style={{ color: `${colorTheme.text}25` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {member.subject && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1"
                      style={{
                        backgroundColor: `${colorTheme.accent}10`,
                        color: colorTheme.accent,
                        border: `1px solid ${colorTheme.accent}20`,
                      }}
                    >
                      {member.subject}
                    </span>
                  )}
                </div>

                {/* Avatar - sharp crop */}
                <div className="flex items-center gap-5 mb-5">
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: member.image
                        ? `url(${member.image}) center/cover no-repeat`
                        : `linear-gradient(135deg, ${colorTheme.primary}15, ${colorTheme.primary}05)`,
                      color: colorTheme.primary,
                    }}
                  >
                    {!member.image && member.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className="text-lg font-black tracking-tight leading-tight"
                      style={{ color: colorTheme.text }}
                    >
                      {member.name}
                    </h4>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: `${colorTheme.text}60` }}
                    >
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Accent line at bottom */}
                <div
                  className="h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: colorTheme.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
