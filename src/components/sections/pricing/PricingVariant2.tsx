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
  title: "প্ল্যান তুলনা করুন",
  plans: [
    {
      name: "বেসিক",
      price: "২,৫০০",
      currency: "৳",
      features: ["৫টি কোর্সে অ্যাক্সেস", "ইমেইল সাপোর্ট", "কোর্স সার্টিফিকেট"],
      isPopular: false,
    },
    {
      name: "স্ট্যান্ডার্ড",
      price: "৫,০০০",
      currency: "৳",
      features: ["৫টি কোর্সে অ্যাক্সেস", "ইমেইল সাপোর্ট", "কোর্স সার্টিফিকেট", "লাইভ সেশন", "ডাউনলোডযোগ্য রিসোর্স"],
      isPopular: true,
    },
    {
      name: "প্রিমিয়াম",
      price: "৯,৫০০",
      currency: "৳",
      features: ["৫টি কোর্সে অ্যাক্সেস", "ইমেইল সাপোর্ট", "কোর্স সার্টিফিকেট", "লাইভ সেশন", "ডাউনলোডযোগ্য রিসোর্স", "১-অন-১ মেন্টরিং", "চাকরি সহায়তা"],
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
      className="mb-10 mx-auto max-w-2xl text-center px-6 py-4 rounded-2xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.primary})`,
        color: "#ffffff",
      }}
    >
      <div className="relative flex items-center justify-center gap-4 flex-wrap">
        <span className="text-sm font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg">{discountText}</span>
        <span className="text-sm opacity-90">{promo.description || `কোড ব্যবহার করুন`}</span>
        <span className="px-4 py-1.5 bg-white/25 rounded-xl text-sm font-black font-mono tracking-widest backdrop-blur-sm border border-white/20">
          {promo.code}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Variant 2 — Corporate Table
   Clean comparison table with checkmarks,
   highlighted popular column
   ────────────────────────────────────────────── */
export default function PricingVariant2({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const activePromos = getActivePromos(promos);

  const allFeatures = Array.from(
    new Set(plans.flatMap((p: { features: string[] }) => p.features))
  );

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colorTheme.background }}
    >
      <style>{`
        @keyframes pv2FadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pv2-table { animation: pv2FadeIn 0.6s ease-out both; animation-delay: 0.2s; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] rounded-full" style={{ backgroundColor: colorTheme.primary }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: colorTheme.primary }}>
              মূল্য তালিকা
            </span>
            <div className="w-10 h-[2px] rounded-full" style={{ backgroundColor: colorTheme.primary }} />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        <PromoBanner promos={activePromos} colorTheme={colorTheme} />

        {/* Table */}
        <div className="pv2-table overflow-x-auto rounded-2xl" style={{ border: `1px solid ${colorTheme.primary}10` }}>
          <table className="w-full border-collapse min-w-[650px]">
            <thead>
              <tr>
                <th
                  className="text-left py-6 px-6 text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: `${colorTheme.text}55`,
                    backgroundColor: `${colorTheme.primary}03`,
                    borderBottom: `2px solid ${colorTheme.primary}10`,
                  }}
                >
                  বৈশিষ্ট্যসমূহ
                </th>
                {plans.map((plan: any, i: number) => {
                  const currency = plan.currency || "৳";
                  return (
                    <th
                      key={i}
                      className="text-center py-6 px-6 min-w-[160px]"
                      style={{
                        borderBottom: `2px solid ${plan.isPopular ? colorTheme.accent : colorTheme.primary}15`,
                        backgroundColor: plan.isPopular ? `${colorTheme.primary}06` : `${colorTheme.primary}02`,
                      }}
                    >
                      {plan.isPopular && (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                          style={{ backgroundColor: colorTheme.accent, color: "#ffffff" }}
                        >
                          জনপ্রিয়
                        </span>
                      )}
                      <div className="font-bold text-lg mb-1" style={{ color: colorTheme.text }}>{plan.name}</div>
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-sm font-medium" style={{ color: `${colorTheme.text}66` }}>{currency}</span>
                        <span className="text-2xl font-extrabold" style={{ color: colorTheme.primary }}>{plan.price}</span>
                        <span className="text-xs" style={{ color: `${colorTheme.text}55` }}>/মাস</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature: string, fi: number) => (
                <tr
                  key={fi}
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${colorTheme.primary}04`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <td
                    className="py-4 px-6 text-sm font-medium"
                    style={{
                      borderBottom: `1px solid ${colorTheme.primary}06`,
                      color: `${colorTheme.text}bb`,
                    }}
                  >
                    {feature}
                  </td>
                  {plans.map((plan: any, pi: number) => {
                    const has = plan.features.includes(feature);
                    return (
                      <td
                        key={pi}
                        className="text-center py-4 px-6"
                        style={{
                          borderBottom: `1px solid ${colorTheme.primary}06`,
                          backgroundColor: plan.isPopular ? `${colorTheme.primary}03` : "transparent",
                        }}
                      >
                        {has ? (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center mx-auto"
                            style={{ backgroundColor: `${colorTheme.accent}12` }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke={colorTheme.accent}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: `${colorTheme.text}06` }}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${colorTheme.text}25`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-8 px-6" style={{ borderTop: `2px solid ${colorTheme.primary}08` }}></td>
                {plans.map((plan: any, i: number) => (
                  <td key={i} className="text-center py-8 px-6" style={{ borderTop: `2px solid ${colorTheme.primary}08` }}>
                    <button
                      className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: plan.isPopular ? colorTheme.primary : "transparent",
                        color: plan.isPopular ? "#ffffff" : colorTheme.primary,
                        border: plan.isPopular ? "none" : `2px solid ${colorTheme.primary}`,
                        boxShadow: plan.isPopular ? `0 4px 20px ${colorTheme.primary}30` : "none",
                      }}
                    >
                      প্ল্যান নিন
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
