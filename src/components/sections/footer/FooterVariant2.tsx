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
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">{c.companyName}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {c.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link: { label: string; url: string }, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-sm hover:underline transition-opacity hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              Contact Info
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              {social.phone && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{social.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@example.edu.bd</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {social.phone && (
                <a
                  href={`tel:${social.phone}`}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Phone"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="py-4 px-4 text-center text-xs"
        style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.5)" }}
      >
        &copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.
      </div>
    </footer>
  );
}
