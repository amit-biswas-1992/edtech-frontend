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

export default function FAQVariant2({ content, colorTheme }: SectionProps) {
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
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      {/* Top accent line */}
      <div
        className="w-20 h-1 mx-auto mb-6"
        style={{ backgroundColor: colorTheme.primary }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ color: colorTheme.text }}
          >
            {heading}
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: `${colorTheme.text}60` }}
          >
            {subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div
          className="divide-y"
          style={{ borderColor: `${colorTheme.text}10` }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className="transition-all duration-300"
                style={{
                  borderColor: `${colorTheme.text}10`,
                  borderLeftWidth: "3px",
                  borderLeftColor: isOpen ? colorTheme.primary : "transparent",
                }}
              >
                <button
                  className="w-full text-left py-6 px-5 flex items-center gap-5 transition-all duration-300 group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    backgroundColor: isOpen ? `${colorTheme.primary}05` : "transparent",
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-sm font-bold flex-shrink-0 tracking-wide transition-colors duration-300"
                    style={{
                      color: isOpen ? colorTheme.primary : `${colorTheme.text}30`,
                    }}
                  >
                    {number}
                  </span>

                  {/* Question */}
                  <span
                    className="font-semibold text-base sm:text-lg flex-1 transition-colors duration-300"
                    style={{
                      color: isOpen ? colorTheme.primary : colorTheme.text,
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Plus/Minus toggle */}
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: isOpen ? colorTheme.primary : `${colorTheme.text}08`,
                      color: isOpen ? "#ffffff" : colorTheme.text,
                    }}
                  >
                    <span className="text-lg font-light leading-none">
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="pb-6 px-5 pl-[3.75rem] text-sm sm:text-base leading-relaxed"
                    style={{ color: `${colorTheme.text}70` }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div
          className="w-full h-px mt-0"
          style={{ backgroundColor: `${colorTheme.text}10` }}
        />
      </div>
    </section>
  );
}
