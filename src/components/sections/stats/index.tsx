"use client";

import React from "react";
import StatsVariant1 from "./StatsVariant1";
import StatsVariant2 from "./StatsVariant2";
import StatsVariant3 from "./StatsVariant3";

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

export default function StatsSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <StatsVariant2 {...props} />;
    case 3:
      return <StatsVariant3 {...props} />;
    default:
      return <StatsVariant1 {...props} />;
  }
}
