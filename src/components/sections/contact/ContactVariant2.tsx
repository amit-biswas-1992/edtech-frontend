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

export default function ContactVariant2({ content, colorTheme }: SectionProps) {
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
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: colorTheme.primary }}
        >
          {c.title}
        </h2>
        <p className="mb-10 opacity-80" style={{ color: colorTheme.text }}>
          We would love to hear from you. Reach out using the information below or fill out the form.
        </p>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: `${colorTheme.primary}08`, border: `1px solid ${colorTheme.primary}15` }}
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Address</h4>
            <p className="text-sm" style={{ color: `${colorTheme.text}bb` }}>{c.address}</p>
          </div>

          <div
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: `${colorTheme.primary}08`, border: `1px solid ${colorTheme.primary}15` }}
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Phone</h4>
            <p className="text-sm" style={{ color: `${colorTheme.text}bb` }}>{c.phone}</p>
          </div>

          <div
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: `${colorTheme.primary}08`, border: `1px solid ${colorTheme.primary}15` }}
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke={colorTheme.accent} viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h4 className="font-semibold mb-1" style={{ color: colorTheme.primary }}>Email</h4>
            <p className="text-sm" style={{ color: `${colorTheme.text}bb` }}>{c.email}</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: `${colorTheme.primary}25`,
                  backgroundColor: colorTheme.background,
                  color: colorTheme.text,
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: `${colorTheme.primary}25`,
                  backgroundColor: colorTheme.background,
                  color: colorTheme.text,
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colorTheme.text }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
              style={{
                borderColor: `${colorTheme.primary}25`,
                backgroundColor: colorTheme.background,
                color: colorTheme.text,
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{
                backgroundColor: colorTheme.accent,
                boxShadow: `0 4px 14px ${colorTheme.accent}40`,
              }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
