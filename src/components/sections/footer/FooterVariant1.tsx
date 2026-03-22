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

  return (
    <footer
      className="py-8 px-4"
      style={{
        backgroundColor: colorTheme.primary,
        color: "#ffffff",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/20">
          {/* Company Name */}
          <div className="font-bold text-xl tracking-wide">{c.companyName}</div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            {links.map((link: { label: string; url: string }, i: number) => (
              <a
                key={i}
                href={link.url}
                className="text-sm hover:underline transition-opacity hover:opacity-80"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {social.facebook && (
              <a href={social.facebook} className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} className="hover:opacity-80 transition-opacity" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
            {social.phone && (
              <a href={`tel:${social.phone}`} className="hover:opacity-80 transition-opacity" aria-label="Phone">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          &copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
