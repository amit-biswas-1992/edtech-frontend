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
  title: "Our Campus & Activities",
  subtitle: "A glimpse into our learning environment and student life.",
  images: [
    { src: "", caption: "Modern Classrooms", alt: "Classroom" },
    { src: "", caption: "Science Laboratory", alt: "Lab" },
    { src: "", caption: "Library & Study Area", alt: "Library" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair" },
    { src: "", caption: "Student Orientation", alt: "Orientation" },
    { src: "", caption: "Award Ceremony", alt: "Awards" },
  ],
};

export default function GalleryVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colorTheme.background }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(
            (
              img: { src: string; caption: string; alt: string },
              i: number
            ) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
                style={{
                  backgroundColor: `${colorTheme.primary}12`,
                }}
              >
                {/* Image or placeholder */}
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || img.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 opacity-30"
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

                {/* Hover overlay with caption */}
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, ${colorTheme.primary}dd 0%, transparent 60%)`,
                  }}
                >
                  <p className="text-white font-semibold text-base p-6 w-full">
                    {img.caption}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
