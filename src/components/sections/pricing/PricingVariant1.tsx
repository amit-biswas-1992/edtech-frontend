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
  title: "আপনার প্ল্যান বেছে নিন",
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
      features: ["২০টি কোর্সে অ্যাক্সেস", "প্রায়োরিটি সাপোর্ট", "কোর্স সার্টিফিকেট", "কমিউনিটি অ্যাক্সেস", "লাইভ সেশন", "ডাউনলোডযোগ্য রিসোর্স"],
      isPopular: true,
    },
    {
      name: "প্রিমিয়াম",
      price: "৯,৫০০",
      currency: "৳",
      features: ["সকল কোর্সে অ্যাক্সেস", "২৪/৭ ফোন সাপোর্ট", "কোর্স সার্টিফিকেট", "কমিউনিটি অ্যাক্সেস", "লাইভ সেশন", "ডাউনলোডযোগ্য রিসোর্স", "১-অন-১ মেন্টরিং"],
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
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
      }} />
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
   Variant 1 — Glass Cards
   3 frosted glass pricing cards, popular one
   elevated with glow border
   ────────────────────────────────────────────── */
export default function PricingVariant1({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const activePromos = getActivePromos(promos);

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colorTheme.background} 0%, ${colorTheme.primary}06 50%, ${colorTheme.background} 100%)`,
      }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: colorTheme.primary }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: colorTheme.accent }}
      />

      <style>{`
        @keyframes pv1Rise {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pv1-card {
          animation: pv1Rise 0.6s ease-out both;
        }
        .pv1-card:nth-child(1) { animation-delay: 0.1s; }
        .pv1-card:nth-child(2) { animation-delay: 0.2s; }
        .pv1-card:nth-child(3) { animation-delay: 0.3s; }
        @keyframes pv1Shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}12, ${colorTheme.accent}12)`,
              color: colorTheme.primary,
              border: `1px solid ${colorTheme.primary}18`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorTheme.accent }} />
            মূল্য তালিকা
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            style={{ color: colorTheme.text }}
          >
            {c.title}
          </h2>
        </div>

        <PromoBanner promos={activePromos} colorTheme={colorTheme} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan: any, i: number) => {
            const isPopular = plan.isPopular;
            const currency = plan.currency || "৳";

            return (
              <div
                key={i}
                className={`pv1-card group relative rounded-3xl p-8 sm:p-9 flex flex-col transition-all duration-500 ${isPopular ? "lg:-mt-6 lg:mb-6 hover:-translate-y-3" : "hover:-translate-y-2"}`}
                style={{
                  background: isPopular
                    ? `linear-gradient(145deg, ${colorTheme.primary}f2, ${colorTheme.primary})`
                    : `linear-gradient(145deg, ${colorTheme.background}f0, ${colorTheme.background}cc)`,
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: isPopular
                    ? `1px solid ${colorTheme.accent}40`
                    : `1px solid ${colorTheme.primary}12`,
                  boxShadow: isPopular
                    ? `0 0 80px ${colorTheme.primary}25, 0 20px 60px ${colorTheme.primary}15`
                    : `0 4px 30px ${colorTheme.primary}06`,
                  color: isPopular ? "#ffffff" : colorTheme.text,
                }}
              >
                {/* Popular glow ring */}
                {isPopular && (
                  <div
                    className="absolute -inset-[1px] rounded-3xl opacity-60 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${colorTheme.accent}60, transparent 40%, ${colorTheme.accent}40)`,
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      WebkitMaskComposite: "xor" as any,
                      padding: "1px",
                    }}
                  />
                )}

                {/* Popular badge */}
                {isPopular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                    style={{
                      backgroundColor: colorTheme.accent,
                      color: "#ffffff",
                      boxShadow: `0 4px 20px ${colorTheme.accent}50`,
                    }}
                  >
                    সবচেয়ে জনপ্রিয়
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-lg font-bold mb-6 mt-2" style={{ opacity: 0.9 }}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-2xl font-medium" style={{ opacity: 0.7 }}>{currency}</span>
                  <span className="text-5xl sm:text-6xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium ml-1" style={{ opacity: 0.6 }}>/মাস</span>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-8"
                  style={{
                    background: isPopular
                      ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                      : `linear-gradient(90deg, transparent, ${colorTheme.primary}15, transparent)`,
                  }}
                />

                {/* Features */}
                <ul className="space-y-3.5 mb-10 flex-1">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: isPopular ? "rgba(255,255,255,0.15)" : `${colorTheme.accent}12`,
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke={isPopular ? "#ffffff" : colorTheme.accent}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span style={{ opacity: 0.85 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: isPopular ? "#ffffff" : colorTheme.primary,
                    color: isPopular ? colorTheme.primary : "#ffffff",
                    boxShadow: isPopular ? "0 8px 30px rgba(0,0,0,0.15)" : `0 8px 30px ${colorTheme.primary}25`,
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
