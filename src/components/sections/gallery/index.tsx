"use client";

import React from "react";
import GalleryVariant1 from "./GalleryVariant1";
import GalleryVariant2 from "./GalleryVariant2";
import GalleryVariant3 from "./GalleryVariant3";

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

export default function GallerySection(props: SectionProps) {
  switch (props.designVariant) {
    case 2:
      return <GalleryVariant2 {...props} />;
    case 3:
      return <GalleryVariant3 {...props} />;
    default:
      return <GalleryVariant1 {...props} />;
  }
}
