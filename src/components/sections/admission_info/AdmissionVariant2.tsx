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

export default function AdmissionVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const steps = c.steps?.length ? c.steps : defaultSteps;

  const stepIcons = [
    <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  ];

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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step: any, i: number) => {
            const colors = [colorTheme.primary, colorTheme.secondary, colorTheme.accent];
            const cardColor = colors[i % colors.length];

            return (
              <div
                key={i}
                className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                style={{
                  backgroundColor: colorTheme.background,
                  border: `1px solid ${cardColor}20`,
                }}
              >
                {/* Step number watermark */}
                <div
                  className="absolute -top-3 -right-2 text-7xl font-black opacity-5 select-none"
                  style={{ color: cardColor }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${cardColor}12`,
                    color: cardColor,
                  }}
                >
                  {stepIcons[i % stepIcons.length]}
                </div>

                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: cardColor }}
                >
                  Step {i + 1}
                </div>

                <h4
                  className="text-lg font-bold mb-2"
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
            );
          })}
        </div>

        {/* Deadline & Eligibility info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {c.deadline && (
            <div
              className="p-6 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${colorTheme.accent}10, ${colorTheme.accent}05)`,
                border: `1px solid ${colorTheme.accent}20`,
              }}
            >
              <svg className="w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke={colorTheme.accent} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4
                className="font-bold text-sm uppercase tracking-wide mb-2"
                style={{ color: colorTheme.accent }}
              >
                Application Deadline
              </h4>
              <p className="font-medium" style={{ color: colorTheme.text }}>
                {c.deadline}
              </p>
            </div>
          )}

          {c.eligibility && (
            <div
              className="p-6 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${colorTheme.primary}10, ${colorTheme.primary}05)`,
                border: `1px solid ${colorTheme.primary}20`,
              }}
            >
              <svg className="w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke={colorTheme.primary} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h4
                className="font-bold text-sm uppercase tracking-wide mb-2"
                style={{ color: colorTheme.primary }}
              >
                Eligibility Criteria
              </h4>
              <p className="font-medium" style={{ color: colorTheme.text }}>
                {c.eligibility}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
