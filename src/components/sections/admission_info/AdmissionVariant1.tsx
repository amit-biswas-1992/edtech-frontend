"use client";

import React from "react";

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
            Admissions
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        {/* Horizontal steps */}
        <div className="relative mb-16">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
            style={{ backgroundColor: `${colorTheme.primary}20` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step: any, i: number) => (
              <div key={i} className="relative text-center group">
                {/* Step number circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                    color: "#ffffff",
                    boxShadow: `0 4px 15px ${colorTheme.primary}33`,
                  }}
                >
                  {i + 1}
                </div>

                {/* Step content */}
                <h4
                  className="text-base font-bold mb-2"
                  style={{ color: colorTheme.text }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${colorTheme.text}99` }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {c.deadline && (
            <div
              className="p-6 rounded-2xl flex items-start gap-4"
              style={{
                backgroundColor: `${colorTheme.accent}08`,
                border: `1px solid ${colorTheme.accent}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${colorTheme.accent}15`,
                  color: colorTheme.accent,
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
                <p style={{ color: `${colorTheme.text}cc` }}>{c.deadline}</p>
              </div>
            </div>
          )}

          {c.eligibility && (
            <div
              className="p-6 rounded-2xl flex items-start gap-4"
              style={{
                backgroundColor: `${colorTheme.primary}08`,
                border: `1px solid ${colorTheme.primary}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${colorTheme.primary}15`,
                  color: colorTheme.primary,
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
                <p style={{ color: `${colorTheme.text}cc` }}>{c.eligibility}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
