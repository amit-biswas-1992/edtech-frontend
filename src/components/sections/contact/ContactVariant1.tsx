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

export default function ContactVariant1({ content, colorTheme }: SectionProps) {
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
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: colorTheme.primary }}
        >
          {c.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: `${colorTheme.primary}33`,

                    backgroundColor: `${colorTheme.background}`,
                    color: colorTheme.text,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: `${colorTheme.primary}33`,
                    backgroundColor: colorTheme.background,
                    color: colorTheme.text,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: `${colorTheme.primary}33`,
                    backgroundColor: colorTheme.background,
                    color: colorTheme.text,
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                style={{
                  backgroundColor: colorTheme.primary,
                  boxShadow: `0 4px 14px ${colorTheme.primary}40`,
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Contact Info + Map */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.primary}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.primary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Address</h4>
                  <p style={{ color: `${colorTheme.text}cc` }}>{c.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.primary}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.primary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Phone</h4>
                  <p style={{ color: `${colorTheme.text}cc` }}>{c.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colorTheme.primary}15` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={colorTheme.primary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Email</h4>
                  <p style={{ color: `${colorTheme.text}cc` }}>{c.email}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              className="w-full h-56 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${colorTheme.primary}10`, border: `2px dashed ${colorTheme.primary}30` }}
            >
              {c.mapEmbed ? (
                <div dangerouslySetInnerHTML={{ __html: c.mapEmbed }} className="w-full h-full rounded-xl overflow-hidden" />
              ) : (
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke={`${colorTheme.primary}66`} viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  <p style={{ color: `${colorTheme.primary}88` }} className="text-sm">Map Embed Area</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
