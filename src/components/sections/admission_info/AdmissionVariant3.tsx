"use client";

import React, { useState } from "react";

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
}

const defaultSteps = [
  { title: "Online Application", description: "Fill out the online application form with your personal and academic details. Make sure to have your SSC/equivalent results ready, along with a recent passport-size photograph." },
  { title: "Document Submission", description: "Submit required documents including transcripts, certificates, and photographs. You can upload digital copies through our portal or submit physical copies at the admission office." },
  { title: "Admission Test", description: "Appear for the written admission test on the scheduled date. The test covers English, Mathematics, and General Knowledge. Bring your admit card and a valid photo ID." },
  { title: "Interview", description: "Attend a personal interview with the admission committee. This is an opportunity to demonstrate your motivation and goals. Dress formally and bring your portfolio if applicable." },
  { title: "Enrollment", description: "Complete the enrollment process with fee payment and registration. Collect your student ID, class schedule, and orientation materials from the administration office." },
];

const defaults = {
  title: "Admission Process",
  steps: defaultSteps,
  deadline: "Applications close on December 31, 2026",
  eligibility: "Minimum GPA 3.5 in SSC or equivalent examination from a recognized board.",
};

export default function AdmissionVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const steps = c.steps?.length ? c.steps : defaultSteps;
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  const gold = "#D4A853";
  const darkBg = "#0A0A0F";
  const darkCard = "#12121A";
  const darkBorder = "#1E1E2A";

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: darkBg }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${gold}, transparent)` }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6"
            style={{
              border: `1px solid ${gold}30`,
              color: gold,
            }}
          >
            <span className="w-6 h-px" style={{ backgroundColor: gold }} />
            Admissions
            <span className="w-6 h-px" style={{ backgroundColor: gold }} />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              color: "#E8E8EC",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {c.title}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Timeline accordion */}
          <div className="flex-1 relative">
            {/* Vertical glowing line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{
                background: `linear-gradient(180deg, ${gold}00, ${gold}40, ${gold}00)`,
              }}
            />

            <div className="space-y-3">
              {steps.map((step: any, i: number) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className="relative pl-16 group"
                  >
                    {/* Step number on the line */}
                    <div
                      className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 z-10"
                      style={{
                        backgroundColor: isOpen ? gold : darkCard,
                        color: isOpen ? darkBg : `${gold}99`,
                        border: `1px solid ${isOpen ? gold : `${gold}30`}`,
                        boxShadow: isOpen ? `0 0 20px ${gold}40, 0 0 40px ${gold}15` : "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Glowing connector dot */}
                    {isOpen && (
                      <div
                        className="absolute left-[22px] top-[26px] w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: gold,
                          boxShadow: `0 0 12px ${gold}80`,
                        }}
                      />
                    )}

                    <button
                      onClick={() => toggle(i)}
                      className="w-full text-left p-5 rounded-lg transition-all duration-500"
                      style={{
                        backgroundColor: isOpen ? `${gold}08` : "transparent",
                        border: `1px solid ${isOpen ? `${gold}20` : darkBorder}`,
                        boxShadow: isOpen ? `0 0 30px ${gold}06, inset 0 1px 0 ${gold}10` : "none",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h4
                          className="font-semibold text-lg transition-colors duration-300"
                          style={{
                            color: isOpen ? gold : "#A0A0B0",
                            fontFamily: "Georgia, 'Times New Roman', serif",
                          }}
                        >
                          {step.title}
                        </h4>
                        <svg
                          className="w-5 h-5 flex-shrink-0 transition-transform duration-500 ml-4"
                          style={{
                            color: isOpen ? gold : "#555",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          maxHeight: isOpen ? "500px" : "0px",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <p
                          className="mt-3 leading-relaxed text-sm"
                          style={{ color: "#8888A0" }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {c.deadline && (
              <div
                className="group p-6 rounded-lg transition-all duration-300 hover:border-opacity-50"
                style={{
                  backgroundColor: darkCard,
                  border: `1px solid ${gold}15`,
                  boxShadow: `0 0 0 0 ${gold}00`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${gold}10`;
                  e.currentTarget.style.borderColor = `${gold}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${gold}00`;
                  e.currentTarget.style.borderColor = `${gold}15`;
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={gold} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4
                    className="font-bold text-xs uppercase tracking-[0.15em]"
                    style={{ color: gold }}
                  >
                    Application Deadline
                  </h4>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#A0A0B0" }}>{c.deadline}</p>
              </div>
            )}

            {c.eligibility && (
              <div
                className="group p-6 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: darkCard,
                  border: `1px solid ${gold}15`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${gold}10`;
                  e.currentTarget.style.borderColor = `${gold}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${gold}15`;
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={gold} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4
                    className="font-bold text-xs uppercase tracking-[0.15em]"
                    style={{ color: gold }}
                  >
                    Eligibility Criteria
                  </h4>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#A0A0B0" }}>{c.eligibility}</p>
              </div>
            )}

            <div
              className="p-6 rounded-lg text-center"
              style={{
                backgroundColor: darkCard,
                border: `1px solid ${gold}15`,
              }}
            >
              <h4
                className="font-bold mb-3"
                style={{ color: "#E8E8EC", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Need Help?
              </h4>
              <p className="text-sm mb-5" style={{ color: "#6B6B80" }}>
                Contact our admission office for any queries.
              </p>
              <a
                href="#"
                className="inline-block px-8 py-3 rounded text-sm font-semibold tracking-wide uppercase transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: gold,
                  border: `1px solid ${gold}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = gold;
                  e.currentTarget.style.color = darkBg;
                  e.currentTarget.style.boxShadow = `0 0 20px ${gold}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = gold;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
