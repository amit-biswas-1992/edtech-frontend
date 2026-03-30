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
  companyName: "EduSite",
  description: "Empowering education through technology. We provide world-class learning experiences for students across Bangladesh.",
  links: [
    { label: "Home", url: "#" },
    { label: "About Us", url: "#" },
    { label: "Courses", url: "#" },
    { label: "Admissions", url: "#" },
    { label: "Contact", url: "#" },
  ],
  socialLinks: {
    facebook: "#",
    youtube: "#",
    phone: "+880 1700-000000",
  },
};

export default function FooterVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const links = c.links || defaults.links;
  const social = c.socialLinks || defaults.socialLinks;

  return (
    <footer
      style={{
        backgroundColor: colorTheme.primary,
        color: "#ffffff",
      }}
    >
      {/* Accent line at top */}
      <div
        className="h-1"
        style={{ backgroundColor: colorTheme.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 flex items-center justify-center font-black text-lg"
                style={{
                  backgroundColor: colorTheme.accent,
                  color: "#ffffff",
                }}
              >
                {c.companyName.charAt(0)}
              </div>
              <span className="text-xl font-black tracking-tight uppercase">{c.companyName}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              {c.description}
            </p>
            {/* Accent bar */}
            <div
              className="w-12 h-0.5 mt-6"
              style={{ backgroundColor: colorTheme.accent }}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3"
              style={{
                color: "#ffffff",
                borderBottom: `2px solid ${colorTheme.accent}`,
                display: "inline-block",
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.map((link: { label: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colorTheme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    <span
                      className="w-0 h-px transition-all duration-200 group-hover:w-4"
                      style={{ backgroundColor: colorTheme.accent }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3"
              style={{
                color: "#ffffff",
                borderBottom: `2px solid ${colorTheme.accent}`,
                display: "inline-block",
              }}
            >
              Contact
            </h4>
            <div className="space-y-4 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              {social.phone && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${colorTheme.accent}20` }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: colorTheme.accent }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Phone</p>
                    <p>{social.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${colorTheme.accent}20` }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: colorTheme.accent }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Email</p>
                  <p>info@example.edu.bd</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-6 pb-3"
              style={{
                color: "#ffffff",
                borderBottom: `2px solid ${colorTheme.accent}`,
                display: "inline-block",
              }}
            >
              Follow Us
            </h4>
            <div className="flex items-center gap-2">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    border: `1px solid rgba(255,255,255,0.15)`,
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="Facebook"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colorTheme.accent;
                    e.currentTarget.style.borderColor = colorTheme.accent;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    border: `1px solid rgba(255,255,255,0.15)`,
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="YouTube"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colorTheme.accent;
                    e.currentTarget.style.borderColor = colorTheme.accent;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {social.phone && (
                <a
                  href={`tel:${social.phone}`}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    border: `1px solid rgba(255,255,255,0.15)`,
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="Phone"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colorTheme.accent;
                    e.currentTarget.style.borderColor = colorTheme.accent;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Monochromatic stat */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Trusted by
              </p>
              <p className="text-2xl font-black text-white">10,000+</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Students nationwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="py-5 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: "rgba(0,0,0,0.25)",
          borderTop: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            &copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            <a
              href="#"
              className="transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = colorTheme.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              Privacy Policy
            </a>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <a
              href="#"
              className="transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = colorTheme.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
