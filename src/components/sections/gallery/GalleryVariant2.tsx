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
  title: "Photo Gallery",
  subtitle: "Explore moments from our campus and events.",
  images: [
    { src: "", caption: "Modern Classrooms", alt: "Classroom", category: "Campus" },
    { src: "", caption: "Science Laboratory", alt: "Lab", category: "Facilities" },
    { src: "", caption: "Library & Study Area", alt: "Library", category: "Facilities" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair", category: "Events" },
    { src: "", caption: "Student Orientation", alt: "Orientation", category: "Events" },
    { src: "", caption: "Award Ceremony", alt: "Awards", category: "Campus" },
    { src: "", caption: "Computer Lab", alt: "Computer Lab", category: "Facilities" },
    { src: "", caption: "Sports Day", alt: "Sports", category: "Events" },
  ],
};

export default function GalleryVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map((img: any) => img.category || "General")))];
  const filteredImages = activeTab === "All"
    ? images
    : images.filter((img: any) => (img.category || "General") === activeTab);

  return (
    <section className="py-24 px-4" style={{ backgroundColor: colorTheme.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with accent line */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <div>
            <div
              className="w-12 h-1 mb-6"
              style={{ backgroundColor: colorTheme.primary }}
            />
            {c.title && (
              <h2
                className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight"
                style={{ color: colorTheme.text }}
              >
                {c.title}
              </h2>
            )}
            {c.subtitle && (
              <p
                className="text-lg mt-3 max-w-lg"
                style={{ color: `${colorTheme.text}70` }}
              >
                {c.subtitle}
              </p>
            )}
          </div>

          {/* Category tabs - corporate style */}
          <div
            className="flex gap-0 border-b-2 self-start sm:self-auto"
            style={{ borderColor: `${colorTheme.text}15` }}
          >
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className="px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative whitespace-nowrap"
                style={{
                  color: activeTab === cat ? colorTheme.primary : `${colorTheme.text}60`,
                }}
              >
                {cat}
                {/* Active tab indicator */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300"
                  style={{
                    backgroundColor: activeTab === cat ? colorTheme.primary : "transparent",
                    transform: activeTab === cat ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Clean structured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {filteredImages.map(
            (
              img: { src: string; caption: string; alt: string; category?: string },
              i: number
            ) => {
              // First two items span 2 columns on large screens
              const isWide = i < 2;
              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden cursor-pointer ${
                    isWide ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                  style={{
                    aspectRatio: isWide ? "16/9" : "1/1",
                    backgroundColor: `${colorTheme.text}06`,
                  }}
                >
                  {/* Image or placeholder */}
                  {img.src ? (
                    <img
                      src={img.src}
                      alt={img.alt || img.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <svg
                        className="w-10 h-10 opacity-15"
                        style={{ color: colorTheme.text }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                      <span
                        className="text-xs font-semibold tracking-wider uppercase opacity-30"
                        style={{ color: colorTheme.text }}
                      >
                        {img.caption}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay with accent color */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end transition-all duration-500 translate-y-full group-hover:translate-y-0"
                    style={{
                      backgroundColor: `${colorTheme.primary}ee`,
                    }}
                  >
                    <div className="p-6">
                      {/* Accent line */}
                      <div className="w-8 h-0.5 bg-white/60 mb-3" />
                      <p className="text-white font-bold text-lg tracking-tight">
                        {img.caption}
                      </p>
                      {img.category && (
                        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-2">
                          {img.category}
                        </p>
                      )}
                      {/* View indicator */}
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-white/80 text-xs font-medium uppercase tracking-wider">View</span>
                        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Index number in corner */}
                  <div
                    className="absolute top-4 left-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Bottom bar with count */}
        <div
          className="mt-12 pt-6 flex justify-between items-center"
          style={{ borderTop: `2px solid ${colorTheme.text}10` }}
        >
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ color: `${colorTheme.text}40` }}
          >
            {filteredImages.length} {filteredImages.length === 1 ? "Photo" : "Photos"}
          </span>
          <div
            className="w-16 h-0.5"
            style={{ backgroundColor: colorTheme.primary }}
          />
        </div>
      </div>
    </section>
  );
}
