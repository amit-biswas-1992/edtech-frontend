"use client";

import React from "react";
import FacultyVariant1 from "./FacultyVariant1";
import FacultyVariant2 from "./FacultyVariant2";
import FacultyVariant3 from "./FacultyVariant3";
import type { Teacher } from "@/lib/types";

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
  teachers?: Teacher[];
}

export default function FacultySection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <FacultyVariant2 {...props} />;
    case 3:
      return <FacultyVariant3 {...props} />;
    default:
      return <FacultyVariant1 {...props} />;
  }
}
