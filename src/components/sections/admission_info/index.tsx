"use client";

import React from "react";
import AdmissionVariant1 from "./AdmissionVariant1";
import AdmissionVariant2 from "./AdmissionVariant2";
import AdmissionVariant3 from "./AdmissionVariant3";

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

export default function AdmissionInfoSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <AdmissionVariant2 {...props} />;
    case 3:
      return <AdmissionVariant3 {...props} />;
    default:
      return <AdmissionVariant1 {...props} />;
  }
}
