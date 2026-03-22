'use client';

import { Course, Promo, Site, SiteSection, SectionType, Teacher } from '@/lib/types';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import CoursesSection from '@/components/sections/courses';
import AdmissionInfoSection from '@/components/sections/admission_info';
import SuccessStoriesSection from '@/components/sections/success_stories';
import FacultySection from '@/components/sections/faculty';
import TestimonialsSection from '@/components/sections/testimonials';
import FaqSection from '@/components/sections/faq';
import ContactSection from '@/components/sections/contact';
import FooterSection from '@/components/sections/footer';
import FeaturesSection from '@/components/sections/features';
import PricingSection from '@/components/sections/pricing';
import CtaSection from '@/components/sections/cta';
import StatsSection from '@/components/sections/stats';
import GallerySection from '@/components/sections/gallery';

const sectionComponents: Record<SectionType, React.ComponentType<any>> = {
  hero: HeroSection,
  about: AboutSection,
  courses: CoursesSection,
  admission_info: AdmissionInfoSection,
  success_stories: SuccessStoriesSection,
  faculty: FacultySection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  contact: ContactSection,
  footer: FooterSection,
  features: FeaturesSection,
  pricing: PricingSection,
  cta: CtaSection,
  stats: StatsSection,
  gallery: GallerySection,
};

interface SiteRendererProps {
  site: Site;
  courses?: Course[];
  teachers?: Teacher[];
  promos?: Promo[];
}

export default function SiteRenderer({ site, courses = [], teachers = [], promos = [] }: SiteRendererProps) {
  const visibleSections = site.sections
    .filter((s: SiteSection) => s.isVisible)
    .sort((a: SiteSection, b: SiteSection) => a.order - b.order);

  return (
    <div
      style={{
        backgroundColor: site.colorTheme.background,
        color: site.colorTheme.text,
        minHeight: '100vh',
      }}
    >
      {visibleSections.map((section: SiteSection) => {
        const Component = sectionComponents[section.sectionType];
        if (!Component) return null;

        // Pass dynamic data to relevant sections
        const extraProps: Record<string, unknown> = {};
        if (section.sectionType === 'courses' && courses.length > 0) {
          extraProps.courses = courses;
        }
        if (section.sectionType === 'faculty' && teachers.length > 0) {
          extraProps.teachers = teachers;
        }
        if ((section.sectionType === 'pricing' || section.sectionType === 'cta') && promos.length > 0) {
          extraProps.promos = promos;
        }

        return (
          <Component
            key={section.id}
            content={section.content}
            colorTheme={site.colorTheme}
            designVariant={section.designVariant}
            {...extraProps}
          />
        );
      })}
    </div>
  );
}
