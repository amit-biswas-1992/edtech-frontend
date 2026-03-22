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
  title: "Ready to Start Your Learning Journey?",
  subtitle: "Join thousands of students who have transformed their careers with our courses. Enroll today and take the first step.",
  buttonText: "Enroll Now",
  buttonLink: "#",
};

export default function CTAVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 50%, ${colorTheme.accent} 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10"
        style={{ backgroundColor: "#ffffff" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-10"
        style={{ backgroundColor: "#ffffff" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#ffffff" }}>
          {c.title}
        </h2>
        {c.subtitle && (
          <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            {c.subtitle}
          </p>
        )}
        <a
          href={c.buttonLink}
          className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            backgroundColor: "#ffffff",
            color: colorTheme.primary,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          {c.buttonText}
        </a>
      </div>
    </section>
  );
}
