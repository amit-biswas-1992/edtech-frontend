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
  title: "Campus Gallery",
  subtitle: "Browse through our campus and event photos.",
  images: [
    { src: "", caption: "Modern Classrooms", alt: "Classroom" },
    { src: "", caption: "Science Laboratory", alt: "Lab" },
    { src: "", caption: "Library & Study Area", alt: "Library" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair" },
    { src: "", caption: "Student Orientation", alt: "Orientation" },
    { src: "", caption: "Award Ceremony", alt: "Awards" },
  ],
};

export default function GalleryVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (index < 0) setActiveIndex(images.length - 1);
    else if (index >= images.length) setActiveIndex(0);
    else setActiveIndex(index);
  };

  const current = images[activeIndex];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colorTheme.background }}>
      <div className="max-w-5xl mx-auto">
        {c.title && (
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ color: colorTheme.primary }}
          >
            {c.title}
          </h2>
        )}
        {c.subtitle && (
          <p
            className="text-center text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: `${colorTheme.text}99` }}
          >
            {c.subtitle}
          </p>
        )}

        {/* Main carousel image */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] mb-6"
          style={{ backgroundColor: `${colorTheme.primary}10` }}
        >
          {current?.src ? (
            <img
              src={current.src}
              alt={current.alt || current.caption}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <svg
                className="w-20 h-20 opacity-20"
                style={{ color: colorTheme.primary }}
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
                className="text-sm font-medium opacity-40"
                style={{ color: colorTheme.primary }}
              >
                {current?.caption}
              </span>
            </div>
          )}

          {/* Caption bar */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4"
            style={{
              background: `linear-gradient(to top, ${colorTheme.primary}cc 0%, transparent 100%)`,
            }}
          >
            <p className="text-white font-semibold text-lg">{current?.caption}</p>
            <p className="text-white/70 text-sm">
              {activeIndex + 1} / {images.length}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: colorTheme.primary,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: colorTheme.primary,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map(
            (
              img: { src: string; caption: string; alt: string },
              i: number
            ) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width: "96px",
                  height: "64px",
                  backgroundColor: `${colorTheme.primary}12`,
                  border: activeIndex === i
                    ? `3px solid ${colorTheme.accent}`
                    : "3px solid transparent",
                  opacity: activeIndex === i ? 1 : 0.6,
                }}
              >
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || img.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 opacity-30"
                      style={{ color: colorTheme.primary }}
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
                  </div>
                )}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
