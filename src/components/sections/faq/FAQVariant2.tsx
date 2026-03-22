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
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: `${colorTheme.primary}08` }}
    >
      <div className="max-w-4xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <button
                className="w-full text-left flex items-start justify-between gap-3"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span
                  className="font-semibold text-base"
                  style={{ color: colorTheme.text }}
                >
                  {faq.question}
                </span>
                <span
                  className="mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-sm"
                  style={{ backgroundColor: colorTheme.primary }}
                >
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p
                  className="mt-3 text-sm leading-relaxed opacity-70"
                  style={{ color: colorTheme.text }}
                >
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
