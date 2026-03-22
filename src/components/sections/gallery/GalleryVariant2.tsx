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
  title: "Photo Gallery",
  subtitle: "Explore moments from our campus and events.",
  images: [
    { src: "", caption: "Modern Classrooms", alt: "Classroom" },
    { src: "", caption: "Science Laboratory", alt: "Lab" },
    { src: "", caption: "Library & Study Area", alt: "Library" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair" },
    { src: "", caption: "Student Orientation", alt: "Orientation" },
    { src: "", caption: "Award Ceremony", alt: "Awards" },
    { src: "", caption: "Computer Lab", alt: "Computer Lab" },
    { src: "", caption: "Sports Day", alt: "Sports" },
  ],
};

// Predefined varying heights for masonry effect
const heightClasses = [
  "h-48",
  "h-64",
  "h-56",
  "h-72",
  "h-52",
  "h-60",
  "h-44",
  "h-68",
];

export default function GalleryVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;

  return (
    <section
      className="py-20 px-4"
      style={{
        backgroundColor: colorTheme.background,
        background: `linear-gradient(180deg, ${colorTheme.primary}05 0%, ${colorTheme.background} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
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
            className="text-center text-lg mb-14 max-w-2xl mx-auto"
            style={{ color: `${colorTheme.text}99` }}
          >
            {c.subtitle}
          </p>
        )}

        {/* Masonry layout using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map(
            (
              img: { src: string; caption: string; alt: string },
              i: number
            ) => {
              const heights = [192, 256, 224, 288, 208, 240, 176, 272];
              const h = heights[i % heights.length];

              return (
                <div
                  key={i}
                  className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
                  style={{ height: `${h}px`, backgroundColor: `${colorTheme.primary}10` }}
                >
                  {img.src ? (
                    <img
                      src={img.src}
                      alt={img.alt || img.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <svg
                        className="w-12 h-12 opacity-20"
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
                        className="text-xs font-medium opacity-40"
                        style={{ color: colorTheme.primary }}
                      >
                        {img.caption}
                      </span>
                    </div>
                  )}

                  {/* Caption overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${colorTheme.primary}cc 0%, transparent 100%)`,
                    }}
                  >
                    <p className="text-white text-sm font-semibold">{img.caption}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
