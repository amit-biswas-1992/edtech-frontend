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
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colorTheme.text }}
          >
            {heading}
          </h2>
          <p className="text-lg opacity-70" style={{ color: colorTheme.text }}>
            {subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
              style={{ borderColor: `${colorTheme.primary}20` }}
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span
                  className="font-medium text-base"
                  style={{ color: colorTheme.text }}
                >
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  style={{ color: colorTheme.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div
                  className="px-6 pb-4 text-sm leading-relaxed opacity-70"
                  style={{ color: colorTheme.text }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
