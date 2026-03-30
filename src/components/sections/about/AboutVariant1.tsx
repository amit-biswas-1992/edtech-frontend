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
  title: "আমাদের প্রতিষ্ঠান সম্পর্কে",
  description:
    "আমরা একটি অগ্রণী শিক্ষা প্রতিষ্ঠান যা জীবন বদলে দেওয়ার মতো মানসম্পন্ন শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ। সবার জন্য শিক্ষাকে সহজলভ্য করার লক্ষ্যে প্রতিষ্ঠিত, আমরা দুই দশকেরও বেশি সময় ধরে তরুণ মেধাবীদের লালন করছি এবং ভবিষ্যতের নেতা তৈরি করছি।",
  mission:
    "সকলের জন্য সহজলভ্য, উচ্চমানের শিক্ষা প্রদান করা যা শিক্ষার্থীদের স্বপ্ন পূরণে সক্ষম করে।",
  vision:
    "আগামীর নেতাদের গড়ে তোলায় সবচেয়ে বিশ্বস্ত শিক্ষা প্রতিষ্ঠান হওয়া।",
  image: "",
};

export default function AboutVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary}08 0%, ${colorTheme.secondary}12 50%, ${colorTheme.accent}08 100%)`,
      }}
    >
      {/* Animated decorative orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.primary}, transparent)`,
          animation: "aboutOrb1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.accent}, transparent)`,
          animation: "aboutOrb2 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colorTheme.secondary}, transparent)`,
          animation: "aboutOrb3 12s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes aboutOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes aboutOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.15); }
        }
        @keyframes aboutOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes glassFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{ animation: "glassFadeUp 0.8s ease-out both" }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}18, ${colorTheme.accent}18)`,
              color: colorTheme.primary,
              backdropFilter: "blur(10px)",
              border: `1px solid ${colorTheme.primary}20`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colorTheme.primary }}
            />
            About Us
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>

          <p
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: `${colorTheme.text}aa` }}
          >
            {c.description}
          </p>
        </div>

        {/* Glassmorphism cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          {c.mission && (
            <div
              className="group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${colorTheme.primary}20`,
                boxShadow: `0 8px 32px ${colorTheme.primary}10`,
                animation: "glassFadeUp 0.8s ease-out 0.2s both",
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${colorTheme.primary}15, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.primary}25, ${colorTheme.primary}10)`,
                    border: `1px solid ${colorTheme.primary}30`,
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={colorTheme.primary}
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </div>

                <h3
                  className="text-xl font-bold mb-3 tracking-tight"
                  style={{ color: colorTheme.primary }}
                >
                  আমাদের মিশন
                </h3>
                <p
                  className="leading-relaxed text-base"
                  style={{ color: `${colorTheme.text}bb` }}
                >
                  {c.mission}
                </p>
              </div>

              {/* Bottom gradient line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colorTheme.primary}, transparent)`,
                }}
              />
            </div>
          )}

          {/* Vision Card */}
          {c.vision && (
            <div
              className="group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${colorTheme.accent}20`,
                boxShadow: `0 8px 32px ${colorTheme.accent}10`,
                animation: "glassFadeUp 0.8s ease-out 0.4s both",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${colorTheme.accent}15, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.accent}25, ${colorTheme.accent}10)`,
                    border: `1px solid ${colorTheme.accent}30`,
                  }}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={colorTheme.accent}
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <h3
                  className="text-xl font-bold mb-3 tracking-tight"
                  style={{ color: colorTheme.accent }}
                >
                  আমাদের ভিশন
                </h3>
                <p
                  className="leading-relaxed text-base"
                  style={{ color: `${colorTheme.text}bb` }}
                >
                  {c.vision}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colorTheme.accent}, transparent)`,
                }}
              />
            </div>
          )}
        </div>

        {/* Image placeholder at bottom */}
        {c.image && (
          <div
            className="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
            style={{ animation: "glassFadeUp 0.8s ease-out 0.6s both" }}
          >
            <div
              className="w-full aspect-[21/9]"
              style={{
                background: `url(${c.image}) center/cover no-repeat`,
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
