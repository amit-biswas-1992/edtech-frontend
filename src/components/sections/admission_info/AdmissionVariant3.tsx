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

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Accordion - main content */}
          <div className="flex-1 space-y-3">
            {steps.map((step: any, i: number) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: `1px solid ${isOpen ? colorTheme.primary + "30" : colorTheme.primary + "12"}`,
                    boxShadow: isOpen ? `0 4px 15px ${colorTheme.primary}10` : "none",
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-4 p-5 text-left transition-all duration-200"
                    style={{
                      backgroundColor: isOpen ? `${colorTheme.primary}08` : "transparent",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{
                        backgroundColor: isOpen ? colorTheme.primary : `${colorTheme.primary}15`,
                        color: isOpen ? "#ffffff" : colorTheme.primary,
                      }}
                    >
                      {i + 1}
                    </div>

                    <span
                      className="flex-1 font-semibold"
                      style={{ color: colorTheme.text }}
                    >
                      {step.title}
                    </span>

                    <svg
                      className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: colorTheme.primary,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 pl-19">
                      <p
                        className="leading-relaxed ml-14"
                        style={{ color: `${colorTheme.text}aa` }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {c.deadline && (
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.accent}cc)`,
                  boxShadow: `0 8px 25px ${colorTheme.accent}33`,
                }}
              >
                <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">
                  Application Deadline
                </h4>
                <p className="text-white/90 font-medium">{c.deadline}</p>
              </div>
            )}

            {c.eligibility && (
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.primary}cc)`,
                  boxShadow: `0 8px 25px ${colorTheme.primary}33`,
                }}
              >
                <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">
                  Eligibility Criteria
                </h4>
                <p className="text-white/90 font-medium">{c.eligibility}</p>
              </div>
            )}

            <div
              className="p-6 rounded-2xl text-center"
              style={{
                backgroundColor: `${colorTheme.secondary}08`,
                border: `1px solid ${colorTheme.secondary}20`,
              }}
            >
              <h4
                className="font-bold mb-3"
                style={{ color: colorTheme.text }}
              >
                Need Help?
              </h4>
              <p
                className="text-sm mb-4"
                style={{ color: `${colorTheme.text}99` }}
              >
                Contact our admission office for any queries.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: colorTheme.secondary,
                  color: "#ffffff",
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
