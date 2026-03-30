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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${colorTheme.background}, ${colorTheme.primary}08, ${colorTheme.background})`,
        }}
      />

      {/* Floating decorative orbs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colorTheme.primary }}
      />
      <div
        className="absolute -bottom-40 -left-24 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colorTheme.secondary }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colorTheme.accent }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-xl"
            style={{
              background: `rgba(255,255,255,0.1)`,
              border: `1px solid ${colorTheme.primary}25`,
              color: colorTheme.primary,
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="group text-center p-7 rounded-2xl transition-all duration-500 hover:-translate-y-3 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.boxShadow = `0 20px 50px ${cardColor}15, 0 4px 30px rgba(0,0,0,0.06)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.04)";
                }}
              >
                {/* Avatar with gradient border ring */}
                <div className="relative mx-auto mb-6 w-28 h-28">
                  {/* Gradient ring */}
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${cardColor}, ${colorTheme.accent})`,
                      padding: "3px",
                    }}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: colorTheme.background }} />
                  </div>
                  {/* Avatar content */}
                  <div
                    className="absolute inset-1 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: member.image
                        ? `url(${member.image}) center/cover no-repeat`
                        : `linear-gradient(135deg, ${cardColor}20, ${cardColor}08)`,
                      color: cardColor,
                    }}
                  >
                    {!member.image && member.name?.charAt(0)}
                  </div>
                </div>

                <h4
                  className="text-lg font-bold mb-1"
                  style={{ color: colorTheme.text }}
                >
                  {member.name}
                </h4>

                <p
                  className="text-sm mb-4"
                  style={{ color: `${colorTheme.text}88` }}
                >
                  {member.designation}
                </p>

                {member.subject && (
                  <span
                    className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
                    style={{
                      background: `${cardColor}10`,
                      color: cardColor,
                      border: `1px solid ${cardColor}20`,
                    }}
                  >
                    {member.subject}
                  </span>
                )}

                {/* Glass pill social links on hover */}
                <div className="flex items-center justify-center gap-2 mt-5 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {["facebook", "linkedin", "mail"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
                      style={{
                        background: `${cardColor}10`,
                        border: `1px solid ${cardColor}20`,
                        color: cardColor,
                      }}
                    >
                      {platform === "facebook" && (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                      {platform === "linkedin" && (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {platform === "mail" && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
