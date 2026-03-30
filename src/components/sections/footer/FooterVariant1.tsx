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
  companyName: "EduSite",
  description: "Empowering education through technology.",
  links: [
    { label: "Home", url: "#" },
    { label: "About", url: "#" },
    { label: "Courses", url: "#" },
    { label: "Contact", url: "#" },
  ],
  socialLinks: {
    facebook: "#",
    youtube: "#",
    phone: "+880 1700-000000",
  },
};

export default function FooterVariant1({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const links = c.links || defaults.links;
  const social = c.socialLinks || defaults.socialLinks;
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary}cc, ${colorTheme.primary}ee)`,
        }}
      />

      {/* Decorative gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorTheme.accent}, ${colorTheme.secondary}, ${colorTheme.accent}, transparent)`,
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colorTheme.accent }}
      />
      <div
        className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colorTheme.secondary }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colorTheme.accent }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + Description */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#ffffff",
                }}
              >
                {c.companyName.charAt(0)}
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{c.companyName}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              {c.description}
            </p>

            {/* Glowing social icons */}
            <div className="flex items-center gap-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  aria-label="Facebook"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.boxShadow = `0 0 20px ${colorTheme.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  aria-label="YouTube"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.boxShadow = `0 0 20px ${colorTheme.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {social.phone && (
                <a
                  href={`tel:${social.phone}`}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  aria-label="Phone"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.boxShadow = `0 0 20px ${colorTheme.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-5 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((link: { label: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: colorTheme.accent }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter with glass effect */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h4 className="text-lg font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                Subscribe to our newsletter for the latest updates and courses.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/40"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `${colorTheme.accent}80`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${colorTheme.accent}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.secondary})`,
                    color: "#ffffff",
                    boxShadow: `0 4px 15px ${colorTheme.accent}30`,
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
          }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          <p>&copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
