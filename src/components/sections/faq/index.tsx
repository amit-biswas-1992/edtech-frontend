"use client";

import React from "react";
import FAQVariant1 from "./FAQVariant1";
import FAQVariant2 from "./FAQVariant2";
import FAQVariant3 from "./FAQVariant3";

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

export default function FAQSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <FAQVariant2 {...props} />;
    case 3:
      return <FAQVariant3 {...props} />;
    default:
      return <FAQVariant1 {...props} />;
  }
}
