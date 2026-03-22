"use client";

import React from "react";
import CoursesVariant1 from "./CoursesVariant1";
import CoursesVariant2 from "./CoursesVariant2";
import CoursesVariant3 from "./CoursesVariant3";
import type { Course } from "@/lib/types";

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
  courses?: Course[];
}

export default function CoursesSection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <CoursesVariant2 {...props} />;
    case 3:
      return <CoursesVariant3 {...props} />;
    default:
      return <CoursesVariant1 {...props} />;
  }
}
