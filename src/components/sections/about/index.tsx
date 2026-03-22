"use client";

import React from "react";
import AboutVariant1 from "./AboutVariant1";
import AboutVariant2 from "./AboutVariant2";
import AboutVariant3 from "./AboutVariant3";

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

export default function AboutSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <AboutVariant2 {...props} />;
    case 3:
      return <AboutVariant3 {...props} />;
    default:
      return <AboutVariant1 {...props} />;
  }
}
