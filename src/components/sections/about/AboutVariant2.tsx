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

const defaults = {
  title: "About Our Institution",
  description:
    "We are a leading educational institution committed to providing quality education that transforms lives.",
  mission: "To provide accessible, high-quality education that empowers students to achieve their dreams and contribute meaningfully to society.",
  vision: "To be the most trusted educational institution in the region, known for academic excellence and holistic development.",
  image: "",
};

export default function AboutVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  const cards = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Our Mission",
      text: c.mission,
      color: colorTheme.primary,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Our Vision",
      text: c.vision,
      color: colorTheme.secondary,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Our Values",
      text: "Integrity, excellence, inclusivity, and a passion for lifelong learning guide everything we do.",
      color: colorTheme.accent,
    },
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
            About Us
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: `${colorTheme.text}aa` }}
          >
            {c.description}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                backgroundColor: colorTheme.background,
                border: `1px solid ${card.color}20`,
                boxShadow: `0 4px 20px ${card.color}10`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `${card.color}12`,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colorTheme.text }}
              >
                {card.title}
              </h3>

              <p
                className="leading-relaxed"
                style={{ color: `${colorTheme.text}aa` }}
              >
                {card.text}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${card.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
