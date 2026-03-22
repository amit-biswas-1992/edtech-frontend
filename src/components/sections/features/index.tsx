"use client";

import React from "react";
import FeaturesVariant1 from "./FeaturesVariant1";
import FeaturesVariant2 from "./FeaturesVariant2";
import FeaturesVariant3 from "./FeaturesVariant3";

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

export default function FeaturesSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <FeaturesVariant2 {...props} />;
    case 3:
      return <FeaturesVariant3 {...props} />;
    default:
      return <FeaturesVariant1 {...props} />;
  }
}
