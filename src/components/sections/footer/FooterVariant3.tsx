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

  return (
    <footer
      style={{
        backgroundColor: colorTheme.primary,
        color: "#ffffff",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Logo + Description + Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: colorTheme.accent }}
              >
                {c.companyName.charAt(0)}
              </div>
              <span className="text-xl font-bold">{c.companyName}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              {c.description}
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
                <button
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: colorTheme.accent, color: "#ffffff" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              Pages
            </h4>
            <ul className="space-y-2">
              {linksCol1.map((link: { label: string; url: string }, i: number) => (
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

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              More
            </h4>
            <ul className="space-y-2">
              {linksCol2.map((link: { label: string; url: string }, i: number) => (
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

          {/* Social + Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: colorTheme.accent }}>
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
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
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
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
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  aria-label="Phone"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}
            </div>

            {social.phone && (
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <p className="font-medium mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>Call Us</p>
                <p>{social.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="py-5 px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.5)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>&copy; {new Date().getFullYear()} {c.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
