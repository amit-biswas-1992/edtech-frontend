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

export default function FacultyVariant3({ content, colorTheme, teachers }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = teachers && teachers.length > 0;
  const members = hasDynamic ? mapDynamicTeachers(teachers) : (c.members?.length ? c.members : defaultMembers);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-5xl mx-auto">
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

        {/* List view */}
        <div className="space-y-4">
          {members.map((member: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: colorTheme.background,
                  border: `1px solid ${cardColor}15`,
                }}
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{
                    background: member.image
                      ? `url(${member.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${cardColor}25, ${cardColor}10)`,
                    color: cardColor,
                    border: `2px solid ${cardColor}20`,
                  }}
                >
                  {!member.image && member.name?.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-lg font-bold mb-0.5"
                    style={{ color: colorTheme.text }}
                  >
                    {member.name}
                  </h4>
                  <p
                    className="text-sm mb-2"
                    style={{ color: `${colorTheme.text}88` }}
                  >
                    {member.designation}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${colorTheme.text}77` }}
                  >
                    Experienced educator specializing in {member.subject || "their field"}, dedicated to nurturing academic excellence and student development.
                  </p>
                </div>

                {/* Subject tag */}
                {member.subject && (
                  <span
                    className="inline-block text-xs font-semibold px-4 py-2 rounded-xl flex-shrink-0"
                    style={{
                      backgroundColor: `${cardColor}10`,
                      color: cardColor,
                      border: `1px solid ${cardColor}20`,
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
