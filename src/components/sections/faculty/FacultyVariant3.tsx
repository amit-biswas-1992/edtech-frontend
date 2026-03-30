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

const goldAccent = "#D4A853";

export default function FacultyVariant3({ content, colorTheme, teachers }: SectionProps) {
  const c = { ...defaults, ...content };
  const hasDynamic = teachers && teachers.length > 0;
  const members = hasDynamic ? mapDynamicTeachers(teachers) : (c.members?.length ? c.members : defaultMembers);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle ambient light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04] blur-3xl"
        style={{ backgroundColor: goldAccent }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] mb-6"
            style={{
              border: `1px solid ${goldAccent}25`,
              color: goldAccent,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: goldAccent }}
            />
            Faculty
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              color: "#ffffff",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {c.title}
          </h2>
          <p
            className="text-sm mt-4 max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.8 }}
          >
            Distinguished educators committed to shaping the next generation of leaders and thinkers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member: any, i: number) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden transition-all duration-500 cursor-default"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${goldAccent}30`;
                e.currentTarget.style.boxShadow = `0 0 30px ${goldAccent}08, inset 0 1px 0 ${goldAccent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Photo area with spotlight overlay */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                  style={{
                    background: member.image
                      ? `url(${member.image}) center/cover no-repeat`
                      : `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
                  }}
                >
                  {!member.image && (
                    <span
                      className="text-6xl font-bold transition-all duration-500 group-hover:scale-110"
                      style={{
                        color: `${goldAccent}20`,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {member.name?.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Spotlight overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at center top, ${goldAccent}08 0%, transparent 70%)`,
                  }}
                />

                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background: "linear-gradient(to top, #0A0A0F, transparent)",
                  }}
                />

                {/* Subject badge */}
                {member.subject && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded text-[10px] uppercase tracking-wider font-semibold"
                    style={{
                      backgroundColor: "rgba(10,10,15,0.7)",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${goldAccent}20`,
                      color: goldAccent,
                    }}
                  >
                    {member.subject}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 pt-2">
                <h4
                  className="text-lg font-semibold mb-1 transition-colors duration-300"
                  style={{
                    color: "#ffffff",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {member.name}
                </h4>
                <p
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: `${goldAccent}90` }}
                >
                  {member.designation}
                </p>

                {/* Social links - revealed on hover */}
                <div className="flex items-center gap-3 mt-5 pt-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                  {["facebook", "linkedin", "mail"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${goldAccent}50`;
                        e.currentTarget.style.color = goldAccent;
                        e.currentTarget.style.boxShadow = `0 0 12px ${goldAccent}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                        e.currentTarget.style.boxShadow = "none";
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
