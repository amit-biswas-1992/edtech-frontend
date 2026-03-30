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

export default function FaqVariant1({ content, colorTheme }: SectionProps) {
  const heading = content.heading || "Frequently Asked Questions";
  const subtitle =
    content.subtitle || "Find answers to common questions about our programs.";
  const faqs: { question: string; answer: string }[] = content.faqs || [
    {
      question: "What programs do you offer?",
      answer:
        "We offer comprehensive admission coaching programs for medical, engineering, and university entrance exams.",
    },
    {
      question: "How long are the courses?",
      answer:
        "Our courses range from 3 months to 1 year depending on the program and your preparation needs.",
    },
    {
      question: "What is the class schedule?",
      answer:
        "We offer flexible scheduling with morning, afternoon, and evening batches to suit your convenience.",
    },
    {
      question: "Do you provide study materials?",
      answer:
        "Yes, all enrolled students receive comprehensive study materials, practice tests, and access to our online resource library.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${colorTheme.primary}12, ${colorTheme.background}, ${colorTheme.accent}08)`,
      }}
    >
      {/* Floating decorative blobs */}
      <div
        className="absolute top-[-6rem] right-[10%] w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.primary}15, transparent 70%)`,
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-[-4rem] left-[5%] w-[22rem] h-[22rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.accent}12, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[50%] left-[60%] w-[16rem] h-[16rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.secondary}10, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {heading}
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: `${colorTheme.text}70` }}
          >
            {subtitle}
          </p>
        </div>

        {/* Accordion items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))`
                    : `linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0.2))`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isOpen
                    ? `1px solid ${colorTheme.primary}30`
                    : `1px solid rgba(255,255,255,0.4)`,
                  boxShadow: isOpen
                    ? `0 12px 40px ${colorTheme.primary}12, inset 0 1px 0 rgba(255,255,255,0.5)`
                    : `0 4px 16px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)`,
                }}
              >
                {/* Gradient accent bar on top when active */}
                {isOpen && (
                  <div
                    className="h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                    }}
                  />
                )}

                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors duration-300"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span
                    className="font-semibold text-base sm:text-lg"
                    style={{
                      color: isOpen ? colorTheme.primary : colorTheme.text,
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Chevron with rotation */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                    style={{
                      background: isOpen
                        ? `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`
                        : `${colorTheme.primary}10`,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke={isOpen ? "#ffffff" : colorTheme.primary}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer with max-height animation */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="px-6 pb-6 text-sm sm:text-base leading-relaxed"
                    style={{ color: `${colorTheme.text}90` }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
