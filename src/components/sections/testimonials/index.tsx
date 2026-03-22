"use client";

import React from "react";
import TestimonialsVariant1 from "./TestimonialsVariant1";
import TestimonialsVariant2 from "./TestimonialsVariant2";
import TestimonialsVariant3 from "./TestimonialsVariant3";

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

export default function TestimonialsSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <TestimonialsVariant2 {...props} />;
    case 3:
      return <TestimonialsVariant3 {...props} />;
    default:
      return <TestimonialsVariant1 {...props} />;
  }
}
