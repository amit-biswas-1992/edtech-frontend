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
  { title: "Online Application", description: "Fill out the online application form with your personal and academic details." },
  { title: "Document Submission", description: "Submit required documents including transcripts, certificates, and photographs." },
  { title: "Admission Test", description: "Appear for the written admission test on the scheduled date." },
  { title: "Interview", description: "Attend a personal interview with the admission committee." },
  { title: "Enrollment", description: "Complete the enrollment process with fee payment and registration." },
];

const defaults = {
  title: "Admission Process",
  steps: defaultSteps,
  deadline: "Applications close on December 31, 2026",
  eligibility: "Minimum GPA 3.5 in SSC or equivalent examination from a recognized board.",
};

export default function AdmissionVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const steps = c.steps?.length ? c.steps : defaultSteps;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: colorTheme.background }}
    >
      {/* Decorative floating orbs */}
      <div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.primary}, transparent)` }}
      />
      <div
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.accent}, transparent)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.secondary}, transparent)` }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-xl"
            style={{
              backgroundColor: `${colorTheme.primary}18`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}25`,
              boxShadow: `0 0 20px ${colorTheme.primary}10`,
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colorTheme.primary }} />
            Admissions Open
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Timeline steps */}
        <div className="relative mb-20">
          {/* Gradient connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-1 rounded-full overflow-hidden">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colorTheme.primary}40, ${colorTheme.accent}60, ${colorTheme.secondary}40)`,
              }}
            />
            {/* Animated shimmer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${colorTheme.primary}50, transparent)`,
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step: any, i: number) => {
              const isHovered = hoveredStep === i;
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center group cursor-pointer"
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step number badge with glass effect */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-all duration-500 backdrop-blur-xl"
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`
                        : `${colorTheme.primary}12`,
                      color: isHovered ? "#ffffff" : colorTheme.primary,
                      border: `1px solid ${isHovered ? "transparent" : `${colorTheme.primary}30`}`,
                      boxShadow: isHovered
                        ? `0 8px 32px ${colorTheme.primary}40, 0 0 0 4px ${colorTheme.primary}15`
                        : `0 4px 16px ${colorTheme.primary}10`,
                      transform: isHovered ? "translateY(-4px) scale(1.1)" : "translateY(0) scale(1)",
                    }}
                  >
                    {i + 1}
                    {/* Glow ring on hover */}
                    {isHovered && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                        style={{ border: `2px solid ${colorTheme.primary}` }}
                      />
                    )}
                  </div>

                  {/* Glass card */}
                  <div
                    className="w-full p-5 rounded-2xl transition-all duration-500 backdrop-blur-xl"
                    style={{
                      backgroundColor: `${colorTheme.primary}06`,
                      border: `1px solid ${isHovered ? `${colorTheme.primary}40` : `${colorTheme.primary}12`}`,
                      boxShadow: isHovered
                        ? `0 12px 40px ${colorTheme.primary}15, inset 0 1px 0 ${colorTheme.primary}15`
                        : `0 4px 16px transparent, inset 0 1px 0 ${colorTheme.primary}08`,
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      maxHeight: isHovered ? "300px" : "160px",
                    }}
                  >
                    <h4
                      className="text-base font-bold mb-2 transition-colors duration-300"
                      style={{ color: isHovered ? colorTheme.primary : colorTheme.text }}
                    >
                      {step.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed transition-all duration-500"
                      style={{
                        color: `${colorTheme.text}88`,
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Vertical connector for mobile */}
                  {i < steps.length - 1 && (
                    <div
                      className="lg:hidden w-0.5 h-8 my-2 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${colorTheme.primary}40, ${colorTheme.primary}10)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info boxes with glass effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {c.deadline && (
            <div
              className="group p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl cursor-default"
              style={{
                backgroundColor: `${colorTheme.accent}08`,
                border: `1px solid ${colorTheme.accent}20`,
                boxShadow: `0 4px 24px ${colorTheme.accent}08, inset 0 1px 0 ${colorTheme.accent}15`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${colorTheme.accent}20, ${colorTheme.accent}08)`,
                  color: colorTheme.accent,
                  border: `1px solid ${colorTheme.accent}25`,
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4
                  className="font-bold text-sm uppercase tracking-wide mb-1"
                  style={{ color: colorTheme.accent }}
                >
                  Deadline
                </h4>
                <p className="leading-relaxed" style={{ color: `${colorTheme.text}bb` }}>{c.deadline}</p>
              </div>
            </div>
          )}

          {c.eligibility && (
            <div
              className="group p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl cursor-default"
              style={{
                backgroundColor: `${colorTheme.primary}08`,
                border: `1px solid ${colorTheme.primary}20`,
                boxShadow: `0 4px 24px ${colorTheme.primary}08, inset 0 1px 0 ${colorTheme.primary}15`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${colorTheme.primary}20, ${colorTheme.primary}08)`,
                  color: colorTheme.primary,
                  border: `1px solid ${colorTheme.primary}25`,
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4
                  className="font-bold text-sm uppercase tracking-wide mb-1"
                  style={{ color: colorTheme.primary }}
                >
                  Eligibility
                </h4>
                <p className="leading-relaxed" style={{ color: `${colorTheme.text}bb` }}>{c.eligibility}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
