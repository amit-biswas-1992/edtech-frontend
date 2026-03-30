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

const defaults = {
  title: "Our Campus & Activities",
  subtitle: "A glimpse into our learning environment and student life.",
  images: [
    { src: "", caption: "Modern Classrooms", alt: "Classroom", category: "Campus" },
    { src: "", caption: "Science Laboratory", alt: "Lab", category: "Facilities" },
    { src: "", caption: "Library & Study Area", alt: "Library", category: "Facilities" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair", category: "Events" },
    { src: "", caption: "Student Orientation", alt: "Orientation", category: "Events" },
    { src: "", caption: "Award Ceremony", alt: "Awards", category: "Campus" },
  ],
};

export default function GalleryVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map((img: any) => img.category || "General")))];
  const filteredImages = activeFilter === "All"
    ? images
    : images.filter((img: any) => (img.category || "General") === activeFilter);

  // Masonry-style varying spans
  const getSpan = (i: number) => {
    const patterns = [
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 sm:col-span-2 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ];
    return patterns[i % patterns.length];
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ backgroundColor: colorTheme.background }}>
      {/* Decorative floating orbs */}
      <div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.primary}, transparent)` }}
      />
      <div
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.accent}, transparent)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colorTheme.secondary}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        {c.title && (
          <div className="text-center mb-4">
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: `${colorTheme.primary}15`,
                color: colorTheme.primary,
                backdropFilter: "blur(10px)",
                border: `1px solid ${colorTheme.primary}20`,
              }}
            >
              Gallery
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: colorTheme.text }}
            >
              {c.title}
            </h2>
          </div>
        )}
        {c.subtitle && (
          <p
            className="text-center text-lg mb-12 max-w-2xl mx-auto"
            style={{ color: `${colorTheme.text}80` }}
          >
            {c.subtitle}
          </p>
        )}

        {/* Glassmorphism category filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: activeFilter === cat ? `${colorTheme.primary}` : `${colorTheme.primary}10`,
                color: activeFilter === cat ? "#fff" : colorTheme.text,
                backdropFilter: "blur(12px)",
                border: `1px solid ${activeFilter === cat ? colorTheme.primary : `${colorTheme.primary}25`}`,
                boxShadow: activeFilter === cat
                  ? `0 8px 32px ${colorTheme.primary}40`
                  : "0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-5">
          {filteredImages.map(
            (
              img: { src: string; caption: string; alt: string; category?: string },
              i: number
            ) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${getSpan(i)}`}
                style={{
                  background: `linear-gradient(135deg, ${colorTheme.primary}08, ${colorTheme.accent}08)`,
                  boxShadow: `0 8px 32px ${colorTheme.primary}10`,
                  border: `1px solid ${colorTheme.primary}12`,
                }}
              >
                {/* Image or placeholder */}
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || img.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${colorTheme.primary}10`,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${colorTheme.primary}15`,
                      }}
                    >
                      <svg
                        className="w-8 h-8 opacity-40"
                        style={{ color: colorTheme.primary }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-xs font-medium opacity-50"
                      style={{ color: colorTheme.text }}
                    >
                      {img.caption}
                    </span>
                  </div>
                )}

                {/* Glassmorphism hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to top, ${colorTheme.primary}90 0%, ${colorTheme.primary}40 40%, transparent 70%)`,
                  }}
                >
                  <div
                    className="mx-4 mb-4 px-5 py-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <p className="text-white font-semibold text-base">{img.caption}</p>
                    {img.category && (
                      <span className="text-white/70 text-xs font-medium mt-1 inline-block">
                        {img.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Corner glass accent */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            )
          )}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div
            className="h-1 w-24 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${colorTheme.primary}, transparent)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
