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
  title: "Choose Your Plan",
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
      features: ["Access to 20 courses", "Priority email support", "Course certificates", "Community access", "Live sessions", "Downloadable resources"],
      isPopular: true,
    },
    {
      name: "Premium",
      price: "9,500",
      currency: "\u09F3",
      features: ["Unlimited courses", "24/7 phone support", "Course certificates", "Community access", "Live sessions", "Downloadable resources", "1-on-1 mentoring"],
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

export default function PricingVariant1({ content, colorTheme, promos }: SectionProps) {
  const c = { ...defaults, ...content };
  const plans = c.plans || defaults.plans;
  const activePromos = getActivePromos(promos);

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6" style={{ color: colorTheme.primary }}>
          {c.title}
        </h2>

        <PromoBanner promos={activePromos} colorTheme={colorTheme} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-8">
          {plans.map((plan: { name: string; price: string; currency?: string; features: string[]; isPopular?: boolean }, i: number) => {
            const isPopular = plan.isPopular;
            const currency = plan.currency || "\u09F3";
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-xl flex flex-col ${isPopular ? "-mt-4 mb-4 lg:-mt-6 lg:mb-6" : ""}`}
                style={{
                  backgroundColor: isPopular ? colorTheme.primary : colorTheme.background,
                  color: isPopular ? "#ffffff" : colorTheme.text,
                  border: isPopular ? "none" : `2px solid ${colorTheme.primary}15`,
                  boxShadow: isPopular ? `0 20px 60px ${colorTheme.primary}30` : undefined,
                }}
              >
                {isPopular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: colorTheme.accent, color: "#ffffff" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-medium">{currency}</span>
                    <span className="text-5xl font-extrabold">{plan.price}</span>
                    <span className="text-sm opacity-70">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                        stroke={isPopular ? "#ffffff" : colorTheme.accent}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span style={{ opacity: 0.9 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{
                    backgroundColor: isPopular ? "#ffffff" : colorTheme.primary,
                    color: isPopular ? colorTheme.primary : "#ffffff",
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
