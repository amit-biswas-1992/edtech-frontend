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
   Variant 2 — Corporate Split
   Two columns: left - contact info with icons,
   right - form
   ────────────────────────────────────────────── */
export default function ContactVariant2({ content, colorTheme }: SectionProps) {
  const c = { ...defaults, ...content };
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const contactItems = [
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
  ];

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes cv2FadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact2-left { animation: cv2FadeIn 0.6s ease-out both; }
        .contact2-right { animation: cv2FadeIn 0.6s ease-out 0.15s both; }
        .contact2-input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] rounded-full" style={{ backgroundColor: colorTheme.primary }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: colorTheme.primary }}>
              যোগাযোগ
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Contact info */}
          <div className="contact2-left lg:col-span-2 space-y-8">
            <p
              className="text-base leading-relaxed"
              style={{ color: `${colorTheme.text}77` }}
            >
              আমরা সবসময় আপনার পাশে আছি। যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: `${colorTheme.primary}04` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${colorTheme.primary}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${colorTheme.primary}04`;
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${colorTheme.primary}10`,
                      color: colorTheme.primary,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: `${colorTheme.text}55` }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: colorTheme.text }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            {c.mapEmbed ? (
              <div
                className="rounded-2xl overflow-hidden h-48"
                style={{ border: `1px solid ${colorTheme.primary}12` }}
              >
                <div dangerouslySetInnerHTML={{ __html: c.mapEmbed }} className="w-full h-full" />
              </div>
            ) : (
              <div
                className="rounded-2xl h-48 flex items-center justify-center"
                style={{
                  backgroundColor: `${colorTheme.primary}06`,
                  border: `1px dashed ${colorTheme.primary}15`,
                }}
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke={`${colorTheme.primary}44`}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                  <p className="text-xs" style={{ color: `${colorTheme.primary}44` }}>ম্যাপ এরিয়া</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — Form */}
          <div
            className="contact2-right lg:col-span-3 rounded-3xl p-8 sm:p-10"
            style={{
              backgroundColor: `${colorTheme.primary}04`,
              border: `1px solid ${colorTheme.primary}08`,
            }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: colorTheme.text }}
            >
              বার্তা পাঠান
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${colorTheme.text}55` }}>
                    নাম
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    className="contact2-input w-full px-4 py-3.5 rounded-xl focus:outline-none text-sm"
                    style={{
                      backgroundColor: colorTheme.background,
                      border: `1px solid ${colorTheme.primary}12`,
                      color: colorTheme.text,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = colorTheme.primary;
                      (e.target as HTMLInputElement).style.boxShadow = `0 0 0 3px ${colorTheme.primary}12`;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = `${colorTheme.primary}12`;
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${colorTheme.text}55` }}>
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="contact2-input w-full px-4 py-3.5 rounded-xl focus:outline-none text-sm"
                    style={{
                      backgroundColor: colorTheme.background,
                      border: `1px solid ${colorTheme.primary}12`,
                      color: colorTheme.text,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = colorTheme.primary;
                      (e.target as HTMLInputElement).style.boxShadow = `0 0 0 3px ${colorTheme.primary}12`;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = `${colorTheme.primary}12`;
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${colorTheme.text}55` }}>
                  বিষয়
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="বার্তার বিষয়"
                  className="contact2-input w-full px-4 py-3.5 rounded-xl focus:outline-none text-sm"
                  style={{
                    backgroundColor: colorTheme.background,
                    border: `1px solid ${colorTheme.primary}12`,
                    color: colorTheme.text,
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = colorTheme.primary;
                    (e.target as HTMLInputElement).style.boxShadow = `0 0 0 3px ${colorTheme.primary}12`;
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = `${colorTheme.primary}12`;
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${colorTheme.text}55` }}>
                  বার্তা
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="আপনার বার্তা লিখুন..."
                  rows={5}
                  className="contact2-input w-full px-4 py-3.5 rounded-xl focus:outline-none text-sm resize-none"
                  style={{
                    backgroundColor: colorTheme.background,
                    border: `1px solid ${colorTheme.primary}12`,
                    color: colorTheme.text,
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = colorTheme.primary;
                    (e.target as HTMLTextAreaElement).style.boxShadow = `0 0 0 3px ${colorTheme.primary}12`;
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = `${colorTheme.primary}12`;
                    (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  backgroundColor: colorTheme.primary,
                  color: "#ffffff",
                  boxShadow: `0 4px 20px ${colorTheme.primary}25`,
                }}
              >
                বার্তা পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
