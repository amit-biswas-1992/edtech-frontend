'use client';

import { useMemo } from 'react';
import { ColorTheme, Course, Notice, Promo, Result, ResultStats, Schedule, Site, SiteSection, SectionType, Teacher } from '@/lib/types';
import ScrollReveal from '@/components/animations/ScrollReveal';
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
import NoticeBoard from '@/components/preview/NoticeBoard';
import ScheduleView from '@/components/preview/ScheduleView';
import ResultShowcase from '@/components/preview/ResultShowcase';
import EnrollmentForm from '@/components/preview/EnrollmentForm';
import FloatingChatWidget from '@/components/preview/FloatingChatWidget';

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
  schedules?: Schedule[];
  results?: Result[];
  resultStats?: ResultStats | null;
  notices?: Notice[];
}

export default function SiteRenderer({
  site,
  courses = [],
  teachers = [],
  promos = [],
  schedules = [],
  results = [],
  resultStats = null,
  notices = [],
}: SiteRendererProps) {
  const visibleSections = site.sections
    .filter((s: SiteSection) => s.isVisible)
    .sort((a: SiteSection, b: SiteSection) => a.order - b.order);

  const publishedNotices = notices.filter((n) => n.isPublished);
  const activeSchedules = schedules.filter((s) => s.isActive);
  const showChatWidget = site.chatConfig &&
    ((site.chatConfig.showWhatsapp && site.chatConfig.whatsappNumber) ||
     (site.chatConfig.showMessenger && site.chatConfig.messengerPageId));

  // Feature 2: Dark mode support for generated sites
  const effectiveTheme: ColorTheme = useMemo(() => {
    if (site.themeMode === 'dark') {
      return {
        ...site.colorTheme,
        background: '#111827',
        text: '#F9FAFB',
      };
    }
    return site.colorTheme;
  }, [site.colorTheme, site.themeMode]);

  return (
    <div
      className={site.themeMode === 'dark' ? 'dark' : ''}
      style={{
        backgroundColor: effectiveTheme.background,
        color: effectiveTheme.text,
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

        // First section (hero) renders immediately, others scroll-reveal
        const isHero = section.sectionType === 'hero';

        return isHero ? (
          <Component
            key={section.id}
            content={section.content}
            colorTheme={effectiveTheme}
            designVariant={section.designVariant}
            {...extraProps}
          />
        ) : (
          <ScrollReveal key={section.id} direction="up" delay={0.05}>
            <Component
              content={section.content}
              colorTheme={effectiveTheme}
              designVariant={section.designVariant}
              {...extraProps}
            />
          </ScrollReveal>
        );
      })}

      {/* New Sections - After existing sections */}
      {publishedNotices.length > 0 && (
        <ScrollReveal direction="up">
          <NoticeBoard notices={publishedNotices} colorTheme={effectiveTheme} />
        </ScrollReveal>
      )}

      {activeSchedules.length > 0 && (
        <ScrollReveal direction="up">
          <ScheduleView schedules={activeSchedules} colorTheme={effectiveTheme} />
        </ScrollReveal>
      )}

      {results.length > 0 && (
        <ScrollReveal direction="up">
          <ResultShowcase results={results} resultStats={resultStats} colorTheme={effectiveTheme} />
        </ScrollReveal>
      )}

      {/* Enrollment form is always shown - this is the conversion point */}
      <ScrollReveal direction="up">
        <EnrollmentForm siteId={site.id} courses={courses} colorTheme={effectiveTheme} />
      </ScrollReveal>

      {/* Floating Chat Widget */}
      {showChatWidget && site.chatConfig && (
        <FloatingChatWidget chatConfig={site.chatConfig} />
      )}
    </div>
  );
}
