"use client";

import React from "react";
import ContactVariant1 from "./ContactVariant1";
import ContactVariant2 from "./ContactVariant2";
import ContactVariant3 from "./ContactVariant3";

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

export default function ContactSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <ContactVariant2 {...props} />;
    case 3:
      return <ContactVariant3 {...props} />;
    default:
      return <ContactVariant1 {...props} />;
  }
}
