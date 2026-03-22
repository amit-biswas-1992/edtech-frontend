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
  title: "Compare Plans",
  plans: [
    {
      name: "Basic",
      price: "2,500",
      currency: "\u09F3",
      features: ["Access to 5 courses", "Email support", "Course certificates"],
      isPopular: false,
    },
    {
      name: "Standard",
      price: "5,000",
      currency: "\u09F3",
      features: ["Access to 5 courses", "Email support", "Course certificates", "Live sessions", "Downloadable resources"],
      isPopular: true,
    },
    {
      name: "Premium",
      price: "9,500",
      currency: "\u09F3",
      features: ["Access to 5 courses", "Email support", "Course certificates", "Live sessions", "Downloadable resources", "1-on-1 mentoring", "Job placement"],
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

export default function PricingVariant2({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const activePromos = getActivePromos(promos);

  // Collect all unique features
  const allFeatures = Array.from(
    new Set(plans.flatMap((p: { features: string[] }) => p.features))
  );

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6" style={{ color: colorTheme.primary }}>
          {c.title}
        </h2>

        <PromoBanner promos={activePromos} colorTheme={colorTheme} />

        <div className="overflow-x-auto mt-8">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th
                  className="text-left py-4 px-6 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: `${colorTheme.text}88`, borderBottom: `2px solid ${colorTheme.primary}15` }}
                >
                  Features
                </th>
                {plans.map((plan: { name: string; price: string; currency?: string; isPopular?: boolean }, i: number) => {
                  const currency = plan.currency || "\u09F3";
                  return (
                    <th
                      key={i}
                      className="text-center py-4 px-6"
                      style={{
                        borderBottom: `2px solid ${colorTheme.primary}15`,
                        backgroundColor: plan.isPopular ? `${colorTheme.primary}08` : "transparent",
                      }}
                    >
                      {plan.isPopular && (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                          style={{ backgroundColor: colorTheme.accent, color: "#ffffff" }}
                        >
                          Popular
                        </span>
                      )}
                      <div className="font-bold text-lg" style={{ color: colorTheme.primary }}>{plan.name}</div>
                      <div className="text-sm mt-1" style={{ color: `${colorTheme.text}aa` }}>
                        {currency}{plan.price}/mo
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature: string, fi: number) => (
                <tr key={fi}>
                  <td
                    className="py-3.5 px-6 text-sm"
                    style={{
                      borderBottom: `1px solid ${colorTheme.primary}08`,
                      color: `${colorTheme.text}cc`,
                    }}
                  >
                    {feature}
                  </td>
                  {plans.map((plan: { features: string[]; isPopular?: boolean }, pi: number) => {
                    const has = plan.features.includes(feature);
                    return (
                      <td
                        key={pi}
                        className="text-center py-3.5 px-6"
                        style={{
                          borderBottom: `1px solid ${colorTheme.primary}08`,
                          backgroundColor: plan.isPopular ? `${colorTheme.primary}05` : "transparent",
                        }}
                      >
                        {has ? (
                          <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke={colorTheme.accent}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={`${colorTheme.text}33`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-6 px-6"></td>
                {plans.map((plan: { isPopular?: boolean }, i: number) => (
                  <td key={i} className="text-center py-6 px-6">
                    <button
                      className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:opacity-90"
                      style={{
                        backgroundColor: plan.isPopular ? colorTheme.primary : "transparent",
                        color: plan.isPopular ? "#ffffff" : colorTheme.primary,
                        border: plan.isPopular ? "none" : `2px solid ${colorTheme.primary}`,
                      }}
                    >
                      Choose Plan
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
