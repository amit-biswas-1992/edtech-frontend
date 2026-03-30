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
  description: "Empowering education through technology. We provide world-class learning experiences for students across Bangladesh.",
  links: [
    { label: "Home", url: "#" },
    { label: "About Us", url: "#" },
    { label: "Courses", url: "#" },
    { label: "Admissions", url: "#" },
    { label: "Faculty", url: "#" },
    { label: "Contact", url: "#" },
  ],
  socialLinks: {
    facebook: "#",
    youtube: "#",
    phone: "+880 1700-000000",
  },
};

export default function FooterVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const links = c.links || defaults.links;
  const social = c.socialLinks || defaults.socialLinks;
  const [email, setEmail] = useState("");

  const halfLinks = Math.ceil(links.length / 2);
  const linksCol1 = links.slice(0, halfLinks);
  const linksCol2 = links.slice(halfLinks);

  const goldAccent = "#D4A853";

  return (
    <footer
      className="relative"
      style={{ backgroundColor: "#0A0A0F", color: "#ffffff" }}
    >
      {/* Gradient glow border at top */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${goldAccent}60, ${goldAccent}, ${goldAccent}60, transparent)`,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand + Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center text-lg"
                style={{
                  border: `1px solid ${goldAccent}40`,
                  color: goldAccent,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 700,
                }}
              >
                {c.companyName.charAt(0)}
              </div>
              <span
                className="text-xl tracking-wide"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {c.companyName}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              {c.description}
            </p>

            {/* Newsletter CTA with glow */}
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: `1px solid ${goldAccent}15`,
              }}
            >
              <h4
                className="text-sm font-semibold mb-3"
                style={{
                  color: goldAccent,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  letterSpacing: "0.05em",
                }}
              >
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none transition-all duration-300 placeholder:text-white/25"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#ffffff",
                    border: `1px solid rgba(255,255,255,0.08)`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `${goldAccent}50`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${goldAccent}10`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  className="px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: goldAccent,
                    color: "#0A0A0F",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${goldAccent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{
                color: goldAccent,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Pages
            </h4>
            <ul className="space-y-3">
              {linksCol1.map((link: { label: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm transition-all duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = goldAccent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{
                color: goldAccent,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              More
            </h4>
            <ul className="space-y-3">
              {linksCol2.map((link: { label: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm transition-all duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = goldAccent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div className="lg:col-span-3">
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{
                color: goldAccent,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 mb-8">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    color: "rgba(255,255,255,0.5)",
                  }}
                  aria-label="Facebook"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${goldAccent}60`;
                    e.currentTarget.style.color = goldAccent;
                    e.currentTarget.style.boxShadow = `0 0 15px ${goldAccent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    color: "rgba(255,255,255,0.5)",
                  }}
                  aria-label="YouTube"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${goldAccent}60`;
                    e.currentTarget.style.color = goldAccent;
                    e.currentTarget.style.boxShadow = `0 0 15px ${goldAccent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {social.phone && (
                <a
                  href={`tel:${social.phone}`}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    color: "rgba(255,255,255,0.5)",
                  }}
                  aria-label="Phone"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${goldAccent}60`;
                    e.currentTarget.style.color = goldAccent;
                    e.currentTarget.style.boxShadow = `0 0 15px ${goldAccent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>

            {social.phone && (
              <div>
                <p
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{
                    color: goldAccent,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  Call Us
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{social.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="relative z-10 py-6 px-4 sm:px-6 lg:px-8"
        style={{
          borderTop: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a
              href="#"
              className="transition-colors duration-300"
              onMouseEnter={(e) => { e.currentTarget.style.color = goldAccent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              onMouseEnter={(e) => { e.currentTarget.style.color = goldAccent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
