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
  { name: "Mr. Habibur Rahman", designation: "Lecturer", subject: "Computer Science", image: "" },
  { name: "Dr. Farhana Islam", designation: "Associate Professor", subject: "Economics", image: "" },
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

export default function FacultyVariant1({ content, colorTheme, teachers }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = teachers && teachers.length > 0;
  const members = hasDynamic ? mapDynamicTeachers(teachers) : (c.members?.length ? c.members : defaultMembers);

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
            Faculty
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: colorTheme.background,
                  border: `1px solid ${cardColor}15`,
                }}
              >
                {/* Avatar circle */}
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-bold transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: member.image
                      ? `url(${member.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${cardColor}25, ${cardColor}10)`,
                    color: cardColor,
                    border: `3px solid ${cardColor}20`,
                  }}
                >
                  {!member.image && member.name?.charAt(0)}
                </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}
