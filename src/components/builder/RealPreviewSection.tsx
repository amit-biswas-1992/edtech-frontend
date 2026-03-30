'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/lib/store';
import { sectionMeta } from '@/lib/section-labels';
import type { SiteSection, ColorTheme, SectionType } from '@/lib/types';

const sectionComponents: Record<SectionType, React.ComponentType<{ content: Record<string, any>; colorTheme: ColorTheme; designVariant: number }>> = {
  hero: dynamic(() => import('@/components/sections/hero'), { ssr: false }),
  about: dynamic(() => import('@/components/sections/about'), { ssr: false }),
  courses: dynamic(() => import('@/components/sections/courses'), { ssr: false }),
  admission_info: dynamic(() => import('@/components/sections/admission_info'), { ssr: false }),
  success_stories: dynamic(() => import('@/components/sections/success_stories'), { ssr: false }),
  faculty: dynamic(() => import('@/components/sections/faculty'), { ssr: false }),
  testimonials: dynamic(() => import('@/components/sections/testimonials'), { ssr: false }),
  faq: dynamic(() => import('@/components/sections/faq'), { ssr: false }),
  contact: dynamic(() => import('@/components/sections/contact'), { ssr: false }),
  footer: dynamic(() => import('@/components/sections/footer'), { ssr: false }),
  features: dynamic(() => import('@/components/sections/features'), { ssr: false }),
  pricing: dynamic(() => import('@/components/sections/pricing'), { ssr: false }),
  cta: dynamic(() => import('@/components/sections/cta'), { ssr: false }),
  stats: dynamic(() => import('@/components/sections/stats'), { ssr: false }),
  gallery: dynamic(() => import('@/components/sections/gallery'), { ssr: false }),
};

interface RealPreviewSectionProps {
  section: SiteSection;
  colorTheme: ColorTheme;
  isSelected: boolean;
}

export default function RealPreviewSection({
  section,
  colorTheme,
  isSelected,
}: RealPreviewSectionProps) {
  const selectSection = useAppStore((s) => s.selectSection);
  const meta = sectionMeta[section.sectionType];
  const Component = sectionComponents[section.sectionType];

  const handleClick = useCallback(() => {
    selectSection(section.id);
  }, [selectSection, section.id]);

  if (!Component) {
    return (
      <div className="py-8 px-6 text-center text-sm text-gray-400">
        Unknown section type: {section.sectionType}
      </div>
    );
  }

  return (
    <div
      id={`section-${section.id}`}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all group ${
        isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''
      }`}
    >
      {/* Hover overlay label */}
      <div
        className={`absolute top-2 left-2 z-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-opacity pointer-events-none ${
          isSelected
            ? 'bg-blue-600 text-white opacity-100'
            : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
        }`}
      >
        {meta?.label ?? section.sectionType}
      </div>

      {/* Actual section component */}
      <div className="border-b border-gray-100 last:border-b-0 pointer-events-none">
        <Component
          content={section.content ?? {}}
          colorTheme={colorTheme}
          designVariant={section.designVariant}
        />
      </div>
    </div>
  );
}
