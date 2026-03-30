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
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - left aligned corporate style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1" style={{ backgroundColor: colorTheme.primary }} />
              <span
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: colorTheme.primary }}
              >
                Admissions
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-md lg:text-right"
            style={{ color: `${colorTheme.text}77` }}
          >
            Follow our structured admission process to secure your place. Each step is designed for a smooth experience.
          </p>
        </div>

        {/* Horizontal timeline - desktop */}
        <div className="hidden lg:block mb-16">
          {/* Timeline bar */}
          <div className="relative mb-12">
            <div
              className="h-0.5 w-full"
              style={{ backgroundColor: `${colorTheme.primary}15` }}
            />
            {/* Step indicators on the line */}
            <div className="absolute inset-0 flex justify-between items-center">
              {steps.map((_: any, i: number) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  <div
                    className="w-12 h-12 rounded-none flex items-center justify-center text-sm font-black transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: colorTheme.primary,
                      color: "#ffffff",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step cards below timeline */}
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step: any, i: number) => (
              <div key={i} className="group">
                <div
                  className="p-5 border-t-2 transition-all duration-300 hover:border-t-4"
                  style={{
                    borderTopColor: colorTheme.primary,
                    backgroundColor: `${colorTheme.primary}04`,
                  }}
                >
                  <div
                    className="mb-3 transition-all duration-300 group-hover:scale-110 inline-block"
                    style={{ color: colorTheme.primary }}
                  >
                    {stepIcons[i % stepIcons.length]}
                  </div>
                  <h4
                    className="text-base font-bold mb-2 tracking-tight"
                    style={{ color: colorTheme.text }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: `${colorTheme.text}77` }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/tablet: alternating left-right layout */}
        <div className="lg:hidden mb-16 space-y-0">
          {steps.map((step: any, i: number) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className="flex items-stretch">
                {/* Left content or spacer */}
                <div className={`flex-1 ${isEven ? "pr-6" : ""}`}>
                  {isEven && (
                    <div
                      className="p-5 text-right border-r-2 h-full flex flex-col justify-center"
                      style={{ borderRightColor: colorTheme.primary }}
                    >
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <h4 className="text-base font-bold tracking-tight" style={{ color: colorTheme.text }}>
                          {step.title}
                        </h4>
                        <span
                          className="w-8 h-8 flex items-center justify-center text-xs font-black flex-shrink-0"
                          style={{ backgroundColor: colorTheme.primary, color: "#ffffff" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: `${colorTheme.text}77` }}>
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center line */}
                <div className="relative flex flex-col items-center" style={{ width: "2px" }}>
                  <div className="w-full h-full" style={{ backgroundColor: `${colorTheme.primary}20` }} />
                </div>

                {/* Right content or spacer */}
                <div className={`flex-1 ${!isEven ? "pl-6" : ""}`}>
                  {!isEven && (
                    <div
                      className="p-5 border-l-2 h-full flex flex-col justify-center"
                      style={{ borderLeftColor: colorTheme.primary }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-8 h-8 flex items-center justify-center text-xs font-black flex-shrink-0"
                          style={{ backgroundColor: colorTheme.primary, color: "#ffffff" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-base font-bold tracking-tight" style={{ color: colorTheme.text }}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: `${colorTheme.text}77` }}>
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info boxes - corporate style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto">
          {c.deadline && (
            <div
              className="p-8 flex items-start gap-5 transition-all duration-300 hover:bg-opacity-80 border-l-4"
              style={{
                borderLeftColor: colorTheme.accent,
                backgroundColor: `${colorTheme.accent}06`,
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: colorTheme.accent,
                  color: "#ffffff",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4
                  className="font-black text-xs uppercase tracking-widest mb-2"
                  style={{ color: colorTheme.accent }}
                >
                  Application Deadline
                </h4>
                <p className="font-medium leading-relaxed" style={{ color: `${colorTheme.text}cc` }}>
                  {c.deadline}
                </p>
              </div>
            </div>
          )}

          {c.eligibility && (
            <div
              className="p-8 flex items-start gap-5 transition-all duration-300 hover:bg-opacity-80 border-l-4"
              style={{
                borderLeftColor: colorTheme.primary,
                backgroundColor: `${colorTheme.primary}06`,
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: colorTheme.primary,
                  color: "#ffffff",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4
                  className="font-black text-xs uppercase tracking-widest mb-2"
                  style={{ color: colorTheme.primary }}
                >
                  Eligibility Criteria
                </h4>
                <p className="font-medium leading-relaxed" style={{ color: `${colorTheme.text}cc` }}>
                  {c.eligibility}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
