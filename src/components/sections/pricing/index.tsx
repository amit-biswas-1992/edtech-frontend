"use client";

import React from "react";
import PricingVariant1 from "./PricingVariant1";
import PricingVariant2 from "./PricingVariant2";
import PricingVariant3 from "./PricingVariant3";
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

export default function PricingSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <PricingVariant2 {...props} />;
    case 3:
      return <PricingVariant3 {...props} />;
    default:
      return <PricingVariant1 {...props} />;
  }
}
