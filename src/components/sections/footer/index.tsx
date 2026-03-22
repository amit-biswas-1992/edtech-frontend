"use client";

import React from "react";
import FooterVariant1 from "./FooterVariant1";
import FooterVariant2 from "./FooterVariant2";
import FooterVariant3 from "./FooterVariant3";

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

export default function FooterSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <FooterVariant2 {...props} />;
    case 3:
      return <FooterVariant3 {...props} />;
    default:
      return <FooterVariant1 {...props} />;
  }
}
