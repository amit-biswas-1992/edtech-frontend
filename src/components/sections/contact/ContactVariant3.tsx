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
  title: "যোগাযোগ করুন",
  address: "১২৩ শিক্ষা সড়ক, ঢাকা, বাংলাদেশ",
  phone: "+৮৮০ ১৭০০-০০০০০০",
  email: "info@example.edu.bd",
  mapEmbed: "",
};

/* ──────────────────────────────────────────────
   Variant 3 — Dark Minimal
   Dark background, centered form, neon accent
   borders on focus
   ────────────────────────────────────────────── */
export default function ContactVariant3({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusField, setFocusField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const neonColor = colorTheme.accent;

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #08080c 0%, #0e0e16 50%, #08080c 100%)",
      }}
    >
      <style>{`
        @keyframes cv3FadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact3-content { animation: cv3FadeUp 0.7s ease-out both; }
        .contact3-form { animation: cv3FadeUp 0.7s ease-out 0.15s both; }
        .contact3-info { animation: cv3FadeUp 0.7s ease-out 0.3s both; }
      `}</style>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: neonColor }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="contact3-content text-center mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-base text-white/35 max-w-md mx-auto">
            আপনার প্রশ্ন বা মতামত আমাদের জানান
          </p>
          {/* Accent line */}
          <div
            className="w-16 h-[2px] mx-auto mt-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${neonColor}, transparent)`,
            }}
          />
        </div>

        {/* Dark form card */}
        <div
          className="contact3-form rounded-3xl p-8 sm:p-10 mb-10"
          style={{
            backgroundColor: "#12121a",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", label: "নাম", type: "text", placeholder: "আপনার নাম" },
              { name: "email", label: "ইমেইল", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/30">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-5 py-4 rounded-xl text-white placeholder-white/20 focus:outline-none text-sm transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: `1px solid ${focusField === field.name ? neonColor : "rgba(255,255,255,0.06)"}`,
                    boxShadow: focusField === field.name ? `0 0 20px ${neonColor}15, 0 0 0 3px ${neonColor}10` : "none",
                  }}
                  onFocus={() => setFocusField(field.name)}
                  onBlur={() => setFocusField(null)}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/30">
                বার্তা
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="আপনার বার্তা লিখুন..."
                rows={5}
                className="w-full px-5 py-4 rounded-xl text-white placeholder-white/20 focus:outline-none text-sm resize-none transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: `1px solid ${focusField === "message" ? neonColor : "rgba(255,255,255,0.06)"}`,
                  boxShadow: focusField === "message" ? `0 0 20px ${neonColor}15, 0 0 0 3px ${neonColor}10` : "none",
                }}
                onFocus={() => setFocusField("message")}
                onBlur={() => setFocusField(null)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: `linear-gradient(135deg, ${neonColor}, ${colorTheme.primary})`,
                color: "#ffffff",
                boxShadow: `0 4px 30px ${neonColor}20`,
              }}
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>

        {/* Contact info row */}
        <div className="contact3-info grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "ঠিকানা",
              value: c.address,
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              ),
            },
            {
              label: "ফোন",
              value: c.phone,
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              ),
            },
            {
              label: "ইমেইল",
              value: c.email,
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-2xl transition-all duration-300 group cursor-pointer"
              style={{
                backgroundColor: "#12121a",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${neonColor}25`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${neonColor}06`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: `${neonColor}10`, color: `${neonColor}aa` }}
              >
                {item.icon}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-white/60 font-medium">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        {c.mapEmbed && (
          <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div dangerouslySetInnerHTML={{ __html: c.mapEmbed }} className="w-full h-56" />
          </div>
        )}
      </div>
    </section>
  );
}
