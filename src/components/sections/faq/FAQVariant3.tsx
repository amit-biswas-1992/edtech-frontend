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

export default function FAQVariant3({ content, colorTheme }: SectionProps) {
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

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0F",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6"
            style={{
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B",
              background: "rgba(245,158,11,0.05)",
            }}
          >
            FAQ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight"
            style={{ color: "#F4F4F5" }}
          >
            {heading}
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(244,244,245,0.4)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: isOpen
                    ? "1px solid rgba(245,158,11,0.2)"
                    : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: isOpen
                    ? "0 0 30px rgba(245,158,11,0.04), inset 0 1px 0 rgba(255,255,255,0.04)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.02)";
                  }
                }}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-all duration-300"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span
                    className="font-medium text-base sm:text-lg transition-colors duration-300"
                    style={{
                      color: isOpen ? "#F59E0B" : "#F4F4F5",
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Animated chevron */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500"
                    style={{
                      backgroundColor: isOpen ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke={isOpen ? "#F59E0B" : "rgba(244,244,245,0.4)"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer with smooth height transition */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="px-6 pb-6 text-sm sm:text-base leading-relaxed"
                    style={{
                      color: "rgba(244,244,245,0.55)",
                      borderTop: "1px solid rgba(245,158,11,0.08)",
                      paddingTop: "1rem",
                    }}
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
