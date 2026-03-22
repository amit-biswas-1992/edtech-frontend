"use client";

import React from "react";
import SuccessVariant1 from "./SuccessVariant1";
import SuccessVariant2 from "./SuccessVariant2";
import SuccessVariant3 from "./SuccessVariant3";

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

export default function SuccessStoriesSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <SuccessVariant2 {...props} />;
    case 3:
      return <SuccessVariant3 {...props} />;
    default:
      return <SuccessVariant1 {...props} />;
  }
}
