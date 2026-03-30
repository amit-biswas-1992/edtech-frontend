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
  title: "আমাদের যাত্রা",
  description:
    "একাডেমিক উৎকর্ষের প্রতিশ্রুতি নিয়ে প্রতিষ্ঠিত। আমরা প্রথম স্নাতক প্রোগ্রাম চালু করেছিলাম, ২০০ জন শিক্ষার্থী নিয়ে। ১৫টি বিভাগে ২,০০০ এরও বেশি শিক্ষার্থীতে প্রসারিত। অনলাইন শিক্ষা ও গবেষণা প্রোগ্রাম চালু করেছি। জাতীয় স্বীকৃতি ও আন্তর্জাতিক বিশ্ববিদ্যালয়ের সাথে অংশীদারিত্ব অর্জন। পরবর্তী প্রজন্মের নেতাদের ক্ষমতায়নে উদ্ভাবন অব্যাহত।",
  mission: "সকলের জন্য সহজলভ্য, উচ্চমানের শিক্ষা প্রদান করা।",
  vision: "সবচেয়ে বিশ্বস্ত শিক্ষা প্রতিষ্ঠান হওয়া।",
  image: "",
};

export default function AboutVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };

  const paragraphs = c.description
    .split(/\.\s+/)
    .filter((p: string) => p.trim().length > 0)
    .map((p: string) => (p.endsWith(".") ? p : p + "."));

  const milestones = paragraphs.map((text: string, i: number) => ({
    year: `${2010 + i * 2}`,
    text,
  }));

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes timelineFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes timelineLineGrow {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes timelineDotPulse {
          0%, 100% { box-shadow: 0 0 0 0 ${colorTheme.primary}40; }
          50% { box-shadow: 0 0 0 10px ${colorTheme.primary}00; }
        }
        @keyframes timelineSlideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes timelineSlideRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-20"
          style={{ animation: "timelineFadeIn 0.8s ease-out both" }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6"
            style={{
              backgroundColor: `${colorTheme.primary}10`,
              color: colorTheme.primary,
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colorTheme.primary}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Our Story
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>

          {/* Mission & Vision pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {c.mission && (
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{
                  backgroundColor: `${colorTheme.primary}08`,
                  border: `1px solid ${colorTheme.primary}18`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.primary}15` }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={colorTheme.primary}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: colorTheme.primary }}
                  >
                    Mission
                  </div>
                  <div
                    className="text-xs leading-snug"
                    style={{ color: `${colorTheme.text}99` }}
                  >
                    {c.mission}
                  </div>
                </div>
              </div>
            )}
            {c.vision && (
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{
                  backgroundColor: `${colorTheme.accent}08`,
                  border: `1px solid ${colorTheme.accent}18`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.accent}15` }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={colorTheme.accent}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: colorTheme.accent }}
                  >
                    Vision
                  </div>
                  <div
                    className="text-xs leading-snug"
                    style={{ color: `${colorTheme.text}99` }}
                  >
                    {c.vision}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colorTheme.primary}40, ${colorTheme.accent}40, transparent)`,
            }}
          />

          <div className="space-y-16">
            {milestones.map(
              (milestone: { year: string; text: string }, i: number) => {
                const isLeft = i % 2 === 0;
                const delay = `${0.3 + i * 0.15}s`;

                return (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    style={{
                      animation: `${
                        isLeft ? "timelineSlideRight" : "timelineSlideLeft"
                      } 0.7s ease-out ${delay} both`,
                    }}
                  >
                    {/* Content card */}
                    <div
                      className={`ml-20 md:ml-0 flex-1 group relative p-7 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        isLeft ? "md:mr-12" : "md:ml-12"
                      }`}
                      style={{
                        backgroundColor: colorTheme.background,
                        border: `1px solid ${
                          isLeft ? colorTheme.primary : colorTheme.accent
                        }15`,
                        boxShadow: `0 4px 20px ${
                          isLeft ? colorTheme.primary : colorTheme.accent
                        }08`,
                      }}
                    >
                      {/* Year badge */}
                      <div
                        className="inline-flex items-center gap-2 text-sm font-bold px-4 py-1.5 rounded-full mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${
                            isLeft ? colorTheme.primary : colorTheme.accent
                          }15, ${
                            isLeft ? colorTheme.primary : colorTheme.accent
                          }08)`,
                          color: isLeft
                            ? colorTheme.primary
                            : colorTheme.accent,
                          border: `1px solid ${
                            isLeft ? colorTheme.primary : colorTheme.accent
                          }20`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: isLeft
                              ? colorTheme.primary
                              : colorTheme.accent,
                          }}
                        />
                        {milestone.year}
                      </div>

                      <p
                        className={`leading-relaxed ${
                          isLeft ? "md:text-left" : "md:text-right"
                        }`}
                        style={{ color: `${colorTheme.text}bb` }}
                      >
                        {milestone.text}
                      </p>

                      {/* Hover line */}
                      <div
                        className={`absolute bottom-0 ${
                          isLeft ? "left-6 right-6" : "left-6 right-6"
                        } h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        style={{
                          background: `linear-gradient(90deg, ${
                            isLeft ? colorTheme.primary : "transparent"
                          }, ${
                            isLeft ? "transparent" : colorTheme.accent
                          })`,
                        }}
                      />
                    </div>

                    {/* Center dot */}
                    <div
                      className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 z-10"
                      style={{
                        animation: `timelineDotPulse 3s ease-in-out ${delay} infinite`,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-[3px]"
                        style={{
                          borderColor: isLeft
                            ? colorTheme.primary
                            : colorTheme.accent,
                          backgroundColor: colorTheme.background,
                        }}
                      />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              }
            )}
          </div>

          {/* End dot */}
          <div className="flex justify-center mt-12">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
