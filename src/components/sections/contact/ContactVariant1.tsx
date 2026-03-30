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
   Variant 1 — Glass Form
   Frosted glass contact form on gradient
   background, info cards below
   ────────────────────────────────────────────── */
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 50%, ${colorTheme.accent} 100%)`,
      }}
    >
      <style>{`
        @keyframes cv1FadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact1-form { animation: cv1FadeUp 0.6s ease-out 0.1s both; }
        .contact1-cards { animation: cv1FadeUp 0.6s ease-out 0.3s both; }
        .contact1-input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact1-input:focus {
          border-color: rgba(255,255,255,0.4) !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="absolute top-10 left-[15%] w-80 h-80 rounded-full bg-white/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-60 h-60 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-lg text-white/60 max-w-lg mx-auto">
            আমাদের সাথে যোগাযোগ করুন, আমরা সাহায্য করতে প্রস্তুত
          </p>
        </div>

        {/* Glass form card */}
        <div
          className="contact1-form rounded-3xl p-8 sm:p-12 mb-10"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.15)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">নাম</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার পুরো নাম"
                  className="contact1-input w-full px-5 py-4 rounded-xl text-white placeholder-white/30 focus:outline-none text-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">ইমেইল</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="contact1-input w-full px-5 py-4 rounded-xl text-white placeholder-white/30 focus:outline-none text-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">বার্তা</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="আপনার বার্তা লিখুন..."
                rows={5}
                className="contact1-input w-full px-5 py-4 rounded-xl text-white placeholder-white/30 focus:outline-none text-sm resize-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: "#ffffff",
                color: colorTheme.primary,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              }}
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>

        {/* Info cards */}
        <div className="contact1-cards grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "ঠিকানা",
              value: c.address,
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              ),
            },
            {
              label: "ফোন",
              value: c.phone,
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              ),
            },
            {
              label: "ইমেইল",
              value: c.email,
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center bg-white/10 text-white/80">
                {item.icon}
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
              <div className="text-sm font-medium text-white/80">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Map area */}
        {c.mapEmbed && (
          <div className="mt-10 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
            <div dangerouslySetInnerHTML={{ __html: c.mapEmbed }} className="w-full h-64" />
          </div>
        )}
      </div>
    </section>
  );
}
