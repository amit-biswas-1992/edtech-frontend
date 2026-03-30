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
    { src: "", caption: "Modern Classrooms", alt: "Classroom", category: "Campus" },
    { src: "", caption: "Science Laboratory", alt: "Lab", category: "Facilities" },
    { src: "", caption: "Library & Study Area", alt: "Library", category: "Facilities" },
    { src: "", caption: "Annual Science Fair", alt: "Science Fair", category: "Events" },
    { src: "", caption: "Student Orientation", alt: "Orientation", category: "Events" },
    { src: "", caption: "Award Ceremony", alt: "Awards", category: "Campus" },
  ],
};

export default function GalleryVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const images = c.images || defaults.images;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map((img: any) => img.category || "General")))];
  const filteredImages = activeFilter === "All"
    ? images
    : images.filter((img: any) => (img.category || "General") === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex >= filteredImages.length - 1 ? 0 : lightboxIndex + 1);
  };

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex <= 0 ? filteredImages.length - 1 : lightboxIndex - 1);
  };

  // Gold accent color
  const gold = "#D4A853";
  const goldLight = "#E8C878";
  const darkBg = "#0A0A0F";
  const darkCard = "#12121A";
  const darkBorder = "#1E1E2A";

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: darkBg }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${gold}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - elegant serif feel */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: `${gold}40` }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: gold }}
            >
              Gallery
            </span>
            <div className="h-px w-12" style={{ backgroundColor: `${gold}40` }} />
          </div>
          {c.title && (
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
              style={{
                color: "#F5F5F5",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              {c.title}
            </h2>
          )}
          {c.subtitle && (
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "#888899" }}
            >
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Category filter with gold accents */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-400"
              style={{
                backgroundColor: activeFilter === cat ? gold : "transparent",
                color: activeFilter === cat ? darkBg : "#888899",
                border: `1px solid ${activeFilter === cat ? gold : darkBorder}`,
                borderRadius: "2px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dark cinematic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map(
            (
              img: { src: string; caption: string; alt: string; category?: string },
              i: number
            ) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer transition-all duration-500"
                style={{
                  aspectRatio: "4/3",
                  backgroundColor: darkCard,
                  border: `1px solid ${darkBorder}`,
                  borderRadius: "4px",
                }}
                onClick={() => openLightbox(i)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${gold}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${gold}10, inset 0 0 30px ${gold}05`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = darkBorder;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image or placeholder */}
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || img.caption}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div
                      className="w-14 h-14 flex items-center justify-center"
                      style={{
                        border: `1px solid ${darkBorder}`,
                        borderRadius: "2px",
                      }}
                    >
                      <svg
                        className="w-7 h-7 opacity-30"
                        style={{ color: gold }}
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
                    <span
                      className="text-xs font-medium tracking-wider uppercase"
                      style={{ color: "#555566" }}
                    >
                      {img.caption}
                    </span>
                  </div>
                )}

                {/* Golden caption overlay on hover */}
                <div
                  className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to top, ${darkBg}ee 0%, ${darkBg}80 40%, transparent 70%)`,
                  }}
                >
                  <div className="p-6">
                    <div className="w-8 h-px mb-3" style={{ backgroundColor: gold }} />
                    <p
                      className="font-semibold text-lg tracking-tight"
                      style={{
                        color: "#F5F5F5",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {img.caption}
                    </p>
                    {img.category && (
                      <span
                        className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-2 inline-block"
                        style={{ color: gold }}
                      >
                        {img.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Corner expand icon */}
                <div
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    backgroundColor: `${gold}20`,
                    border: `1px solid ${gold}40`,
                    borderRadius: "2px",
                  }}
                >
                  <svg className="w-4 h-4" style={{ color: gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
              </div>
            )
          )}
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="h-px w-16" style={{ backgroundColor: `${gold}25` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: gold }} />
          <div className="h-px w-16" style={{ backgroundColor: `${gold}25` }} />
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: `${darkBg}f5` }}
          onClick={closeLightbox}
        >
          {/* Ambient glow behind image */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.08] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${gold}, transparent)` }}
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-50"
            style={{
              border: `1px solid ${gold}40`,
              borderRadius: "2px",
              color: gold,
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox content */}
          <div
            className="relative max-w-5xl w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "16/10",
                backgroundColor: darkCard,
                border: `1px solid ${gold}20`,
                borderRadius: "4px",
                boxShadow: `0 0 60px ${gold}08`,
              }}
            >
              {filteredImages[lightboxIndex]?.src ? (
                <img
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt || filteredImages[lightboxIndex].caption}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <svg
                    className="w-20 h-20 opacity-20"
                    style={{ color: gold }}
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
                    className="text-sm font-medium"
                    style={{ color: "#555566" }}
                  >
                    {filteredImages[lightboxIndex]?.caption}
                  </span>
                </div>
              )}
            </div>

            {/* Caption bar below image */}
            <div className="flex items-center justify-between mt-5 px-1">
              <div>
                <p
                  className="text-xl font-semibold tracking-tight"
                  style={{
                    color: "#F5F5F5",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {filteredImages[lightboxIndex]?.caption}
                </p>
                {filteredImages[lightboxIndex]?.category && (
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-1 inline-block"
                    style={{ color: gold }}
                  >
                    {filteredImages[lightboxIndex].category}
                  </span>
                )}
              </div>
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: "#555566" }}
              >
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{
                border: `1px solid ${gold}30`,
                borderRadius: "2px",
                color: gold,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${gold}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{
                border: `1px solid ${gold}30`,
                borderRadius: "2px",
                color: gold,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${gold}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
