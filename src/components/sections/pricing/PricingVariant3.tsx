"use client";

import React, { useState } from "react";
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
  title: "Simple, Transparent Pricing",
  plans: [
    {
      name: "Basic",
      price: "2,500",
      currency: "\u09F3",
      features: ["Access to 5 courses", "Email support", "Course certificates", "Community access"],
      isPopular: false,
    },
    {
      name: "Standard",
      price: "5,000",
      currency: "\u09F3",
      features: ["Access to 20 courses", "Priority support", "Course certificates", "Community access", "Live sessions"],
      isPopular: true,
    },
    {
      name: "Premium",
      price: "9,500",
      currency: "\u09F3",
      features: ["Unlimited courses", "24/7 support", "Course certificates", "Community access", "Live sessions", "1-on-1 mentoring"],
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
  const discountText = promo.type === "percentage" ? `${promo.value}% OFF` : `\u09F3${promo.value} OFF`;

  return (
    <div
      className="mb-8 mx-auto max-w-lg text-center px-6 py-3 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.primary})`,
        color: "#ffffff",
      }}
    >
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-sm font-bold uppercase tracking-wider">{discountText}</span>
        <span className="text-xs opacity-90">{promo.description || `Use code ${promo.code}`}</span>
        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold font-mono tracking-wider">
          {promo.code}
        </span>
      </div>
    </div>
  );
}

export default function PricingVariant3({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const [isYearly, setIsYearly] = useState(false);
  const activePromos = getActivePromos(promos);

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colorTheme.primary }}>
            {c.title}
          </h2>

          <PromoBanner promos={activePromos} colorTheme={colorTheme} />

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className="text-sm font-medium"
              style={{ color: !isYearly ? colorTheme.primary : `${colorTheme.text}88` }}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full transition-colors duration-300"
              style={{ backgroundColor: isYearly ? colorTheme.accent : `${colorTheme.primary}30` }}
            >
              <div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300"
                style={{ transform: isYearly ? "translateX(30px)" : "translateX(2px)" }}
              />
            </button>
            <span
              className="text-sm font-medium"
              style={{ color: isYearly ? colorTheme.primary : `${colorTheme.text}88` }}
            >
              Yearly
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${colorTheme.accent}15`, color: colorTheme.accent }}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {plans.map((plan: { name: string; price: string; currency?: string; features: string[]; isPopular?: boolean }, i: number) => {
            const currency = plan.currency || "\u09F3";
            const isPopular = plan.isPopular;
            return (
              <div
                key={i}
                className="relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: colorTheme.background,
                  border: `2px solid ${isPopular ? colorTheme.accent : `${colorTheme.primary}12`}`,
                }}
              >
                {isPopular && (
                  <div
                    className="absolute top-0 right-6 px-4 py-1 rounded-b-lg text-xs font-bold"
                    style={{ backgroundColor: colorTheme.accent, color: "#ffffff" }}
                  >
                    Recommended
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-2" style={{ color: colorTheme.primary }}>
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xl" style={{ color: `${colorTheme.text}88` }}>{currency}</span>
                  <span className="text-4xl font-extrabold" style={{ color: colorTheme.primary }}>
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: `${colorTheme.text}88` }}>
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>

                <div
                  className="w-full h-px mb-6"
                  style={{ backgroundColor: `${colorTheme.primary}12` }}
                />

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${colorTheme.accent}15` }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke={colorTheme.accent}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span style={{ color: `${colorTheme.text}cc` }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: isPopular ? colorTheme.accent : `${colorTheme.primary}10`,
                    color: isPopular ? "#ffffff" : colorTheme.primary,
                  }}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
