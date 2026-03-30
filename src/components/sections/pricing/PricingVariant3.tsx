"use client";

import React from "react";
import type { Promo } from "@/lib/types";

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
  promos?: Promo[];
}

const defaults = {
  title: "সহজ, স্বচ্ছ মূল্য",
  plans: [
    {
      name: "বেসিক",
      price: "২,৫০০",
      currency: "৳",
      features: ["৫টি কোর্সে অ্যাক্সেস", "ইমেইল সাপোর্ট", "কোর্স সার্টিফিকেট", "কমিউনিটি অ্যাক্সেস"],
      isPopular: false,
    },
    {
      name: "স্ট্যান্ডার্ড",
      price: "৫,০০০",
      currency: "৳",
      features: ["২০টি কোর্সে অ্যাক্সেস", "প্রায়োরিটি সাপোর্ট", "কোর্স সার্টিফিকেট", "কমিউনিটি অ্যাক্সেস", "লাইভ সেশন"],
      isPopular: true,
    },
    {
      name: "প্রিমিয়াম",
      price: "৯,৫০০",
      currency: "৳",
      features: ["সকল কোর্সে অ্যাক্সেস", "২৪/৭ সাপোর্ট", "কোর্স সার্টিফিকেট", "কমিউনিটি অ্যাক্সেস", "লাইভ সেশন", "১-অন-১ মেন্টরিং"],
      isPopular: false,
    },
  ],
};

function getActivePromos(promos?: Promo[]): Promo[] {
  if (!promos || promos.length === 0) return [];
  const now = new Date();
  return promos.filter(
    (p) => p.isActive && new Date(p.startDate) <= now && new Date(p.endDate) >= now
  );
}

function PromoBanner({ promos, colorTheme }: { promos: Promo[]; colorTheme: SectionProps["colorTheme"] }) {
  if (promos.length === 0) return null;
  const promo = promos[0];
  const discountText = promo.type === "percentage" ? `${promo.value}% ছাড়` : `৳${promo.value} ছাড়`;

  return (
    <div
      className="mb-12 mx-auto max-w-2xl text-center px-6 py-4 rounded-2xl relative overflow-hidden border border-amber-400/30"
      style={{
        background: `linear-gradient(135deg, #fbbf24, #f59e0b)`,
        color: "#1a1a1a",
      }}
    >
      <div className="relative flex items-center justify-center gap-4 flex-wrap">
        <span className="text-sm font-black uppercase tracking-wider bg-black/10 px-3 py-1 rounded-lg">{discountText}</span>
        <span className="text-sm font-medium">{promo.description || `কোড ব্যবহার করুন`}</span>
        <span className="px-4 py-1.5 bg-black/10 rounded-xl text-sm font-black font-mono tracking-widest">
          {promo.code}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Variant 3 — Dark Premium Cards
   Dark background, cards with border glow,
   gold accent for popular
   ────────────────────────────────────────────── */
export default function PricingVariant3({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const activePromos = getActivePromos(promos);

  const goldAccent = "#f59e0b";

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: colorTheme.primary }}
      />

      <style>{`
        @keyframes pv3Float {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pv3-card {
          animation: pv3Float 0.6s ease-out both;
        }
        .pv3-card:nth-child(1) { animation-delay: 0.1s; }
        .pv3-card:nth-child(2) { animation-delay: 0.2s; }
        .pv3-card:nth-child(3) { animation-delay: 0.3s; }
        @keyframes pv3GlowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white">
            {c.title}
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন
          </p>
        </div>

        <PromoBanner promos={activePromos} colorTheme={colorTheme} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan: any, i: number) => {
            const isPopular = plan.isPopular;
            const currency = plan.currency || "৳";
            const accentColor = isPopular ? goldAccent : colorTheme.primary;

            return (
              <div
                key={i}
                className={`pv3-card group relative rounded-3xl p-8 sm:p-9 flex flex-col transition-all duration-500 ${isPopular ? "lg:-mt-4 lg:mb-4 hover:-translate-y-3" : "hover:-translate-y-2"}`}
                style={{
                  backgroundColor: isPopular ? "#1a1a24" : "#14141c",
                  border: `1px solid ${isPopular ? `${goldAccent}30` : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isPopular
                    ? `0 0 60px ${goldAccent}10, 0 20px 60px rgba(0,0,0,0.5)`
                    : "0 4px 30px rgba(0,0,0,0.3)",
                }}
              >
                {/* Border glow on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px ${accentColor}08, 0 0 40px ${accentColor}08`,
                  }}
                />

                {/* Popular badge */}
                {isPopular && (
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: goldAccent,
                        boxShadow: `0 0 10px ${goldAccent}60`,
                        animation: "pv3GlowPulse 2s ease-in-out infinite",
                      }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em]"
                      style={{ color: goldAccent }}
                    >
                      সুপারিশকৃত
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: isPopular ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-xl text-white/40">{currency}</span>
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight"
                    style={{ color: isPopular ? goldAccent : "#ffffff" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/30 ml-1">/মাস</span>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-8"
                  style={{
                    background: isPopular
                      ? `linear-gradient(90deg, transparent, ${goldAccent}30, transparent)`
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                  }}
                />

                {/* Features */}
                <ul className="space-y-3.5 mb-10 flex-1">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: isPopular ? `${goldAccent}15` : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke={isPopular ? goldAccent : "rgba(255,255,255,0.4)"}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isPopular
                      ? `linear-gradient(135deg, ${goldAccent}, #d97706)`
                      : "transparent",
                    color: isPopular ? "#1a1a1a" : "rgba(255,255,255,0.7)",
                    border: isPopular ? "none" : "1px solid rgba(255,255,255,0.12)",
                    boxShadow: isPopular ? `0 8px 30px ${goldAccent}25` : "none",
                  }}
                >
                  শুরু করুন
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
