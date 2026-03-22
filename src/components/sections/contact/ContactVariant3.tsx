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
  title: "Get In Touch",
  address: "123 Education Street, Dhaka, Bangladesh",
  phone: "+880 1700-000000",
  email: "info@example.edu.bd",
  mapEmbed: "",
};

export default function ContactVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="relative"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      {/* Large Map Area */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: "400px",
          backgroundColor: `${colorTheme.primary}12`,
          backgroundImage: `linear-gradient(135deg, ${colorTheme.primary}15 25%, transparent 25%, transparent 50%, ${colorTheme.primary}15 50%, ${colorTheme.primary}15 75%, transparent 75%, transparent)`,
          backgroundSize: "40px 40px",
        }}
      >
        {c.mapEmbed ? (
          <div dangerouslySetInnerHTML={{ __html: c.mapEmbed }} className="w-full h-full" />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke={`${colorTheme.primary}44`} viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            <p style={{ color: `${colorTheme.primary}66` }} className="text-lg font-medium">Interactive Map Area</p>
            <p style={{ color: `${colorTheme.primary}44` }} className="text-sm mt-1">{c.address}</p>
          </div>
        )}
      </div>

      {/* Overlaid Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10 pb-16">
        <div
          className="rounded-2xl shadow-2xl p-8 sm:p-10"
          style={{
            backgroundColor: colorTheme.background,
            boxShadow: `0 20px 60px ${colorTheme.primary}15`,
          }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8"
            style={{ color: colorTheme.primary }}
          >
            {c.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.accent}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: `${colorTheme.text}88` }}>Address</p>
                  <p className="text-sm font-medium" style={{ color: colorTheme.text }}>{c.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.accent}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: `${colorTheme.text}88` }}>Phone</p>
                  <p className="text-sm font-medium" style={{ color: colorTheme.text }}>{c.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.accent}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: `${colorTheme.text}88` }}>Email</p>
                  <p className="text-sm font-medium" style={{ color: colorTheme.text }}>{c.email}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-sm"
                    style={{
                      borderColor: `${colorTheme.primary}20`,
                      backgroundColor: `${colorTheme.primary}05`,
                      color: colorTheme.text,
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-sm"
                    style={{
                      borderColor: `${colorTheme.primary}20`,
                      backgroundColor: `${colorTheme.primary}05`,
                      color: colorTheme.text,
                    }}
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none text-sm"
                  style={{
                    borderColor: `${colorTheme.primary}20`,
                    backgroundColor: `${colorTheme.primary}05`,
                    color: colorTheme.text,
                  }}
                />
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.accent})`,
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
