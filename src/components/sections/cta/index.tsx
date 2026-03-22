"use client";

import React from "react";
import CTAVariant1 from "./CTAVariant1";
import CTAVariant2 from "./CTAVariant2";
import CTAVariant3 from "./CTAVariant3";

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

export default function CTASection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <CTAVariant2 {...props} />;
    case 3:
      return <CTAVariant3 {...props} />;
    default:
      return <CTAVariant1 {...props} />;
  }
}
