"use client";

import React from "react";
import HeroVariant1 from "./HeroVariant1";
import HeroVariant2 from "./HeroVariant2";
import HeroVariant3 from "./HeroVariant3";

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

export default function HeroSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <HeroVariant2 {...props} />;
    case 3:
      return <HeroVariant3 {...props} />;
    default:
      return <HeroVariant1 {...props} />;
  }
}
