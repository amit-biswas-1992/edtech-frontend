'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import { sectionMeta } from '@/lib/section-labels';
import BuilderHeader from '@/components/builder/BuilderHeader';
import BuilderSidebar from '@/components/builder/BuilderSidebar';
import SectionEditor from '@/components/builder/SectionEditor';
import RealPreviewSection from '@/components/builder/RealPreviewSection';
import type { ColorTheme } from '@/lib/types';

export default function BuilderPage() {
  const params = useParams<{ siteId: string }>();
  const router = useRouter();
  const siteId = params.siteId;

  const initAuth = useAppStore((s) => s.initAuth);
  const user = useAppStore((s) => s.user);
  const currentSite = useAppStore((s) => s.currentSite);
  const sections = useAppStore((s) => s.sections);
  const selectedSectionId = useAppStore((s) => s.selectedSectionId);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);
  const setCourses = useAppStore((s) => s.setCourses);
  const setTeachers = useAppStore((s) => s.setTeachers);
  const setPromos = useAppStore((s) => s.setPromos);
  const setEnrollments = useAppStore((s) => s.setEnrollments);
  const setEnrollmentStats = useAppStore((s) => s.setEnrollmentStats);
  const setSchedules = useAppStore((s) => s.setSchedules);
  const setResults = useAppStore((s) => s.setResults);
  const setResultStats = useAppStore((s) => s.setResultStats);
  const setNotices = useAppStore((s) => s.setNotices);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Redirect if not authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  // Fetch site data + courses/teachers/promos
  useEffect(() => {
    if (!siteId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      api.sites.getSite(siteId),
      api.courses.getCourses(siteId).catch(() => []),
      api.teachers.getTeachers(siteId).catch(() => []),
      api.promos.getPromos(siteId).catch(() => []),
      api.enrollments.getEnrollments(siteId).catch(() => []),
      api.enrollments.getEnrollmentStats(siteId).catch(() => null),
      api.schedules.getSchedules(siteId).catch(() => []),
      api.results.getResults(siteId).catch(() => []),
      api.results.getResultStats(siteId).catch(() => null),
      api.notices.getNotices(siteId).catch(() => []),
    ])
      .then(([site, coursesData, teachersData, promosData, enrollmentsData, enrollmentStatsData, schedulesData, resultsData, resultStatsData, noticesData]) => {
        setCurrentSite(site);
        setCourses(coursesData);
        setTeachers(teachersData);
        setPromos(promosData);
        setEnrollments(enrollmentsData);
        setEnrollmentStats(enrollmentStatsData);
        setSchedules(schedulesData);
        setResults(resultsData);
        setResultStats(resultStatsData);
        setNotices(noticesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load site');
        setLoading(false);
      });
  }, [siteId, setCurrentSite, setCourses, setTeachers, setPromos, setEnrollments, setEnrollmentStats, setSchedules, setResults, setResultStats, setNotices]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setCurrentSite(null);
    };
  }, [setCurrentSite]);

  // Feature 1: Auto-scroll to newly selected section (must be before early returns)
  useEffect(() => {
    if (selectedSectionId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`section-${selectedSectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSectionId]);

  // Feature 2: Dark mode preview support (must be before early returns)
  const effectiveTheme: ColorTheme = useMemo(() => {
    if (currentSite?.themeMode === 'dark') {
      return {
        ...currentSite.colorTheme,
        background: '#111827',
        text: '#F9FAFB',
      };
    }
    return currentSite?.colorTheme ?? {
      primary: '#3B82F6',
      secondary: '#6366F1',
      accent: '#38BDF8',
      background: '#FFFFFF',
      text: '#1F2937',
      name: 'Default',
    };
  }, [currentSite?.colorTheme, currentSite?.themeMode]);

  // Keyboard shortcuts for undo/redo (A3)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useAppStore.temporal.getState().undo();
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        useAppStore.temporal.getState().redo();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">
            Loading builder...
          </p>
        </div>
      </div>
    );
  }

  if (error || !currentSite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Unable to Load Site
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {error || 'The site could not be found.'}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const sorted = [...sections].sort((a, b) => a.order - b.order);
  const visibleSections = sorted.filter((s) => s.isVisible);
  const hasSelectedSection = selectedSectionId !== null;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            borderRadius: '8px',
          },
        }}
      />

      {/* Top bar */}
      <BuilderHeader />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Section List */}
        <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col shrink-0">
          <BuilderSidebar siteId={siteId} />
        </aside>

        {/* CENTER - Live Preview */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-5xl mx-auto py-6 px-6">
            {/* Site preview header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: currentSite.colorTheme.primary,
                  }}
                />
                <span className="text-xs font-medium text-gray-500">
                  Live Preview
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {visibleSections.length} visible section
                {visibleSections.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Preview frame */}
            <div
              className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${currentSite.themeMode === 'dark' ? 'dark' : ''}`}
              style={{
                backgroundColor: effectiveTheme.background,
                color: effectiveTheme.text,
              }}
            >
              {visibleSections.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-400">
                    No visible sections
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Add sections from the left panel
                  </p>
                </div>
              ) : (
                visibleSections.map((section) => (
                  <RealPreviewSection
                    key={section.id}
                    section={section}
                    colorTheme={effectiveTheme}
                    isSelected={selectedSectionId === section.id}
                  />
                ))
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - Section Editor */}
        <aside
          className={`bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 ${
            hasSelectedSection ? 'w-[320px]' : 'w-0'
          } overflow-hidden`}
        >
          <SectionEditor />
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview Section Component                                          */
/* ------------------------------------------------------------------ */

interface PreviewSectionProps {
  section: import('@/lib/types').SiteSection;
  colorTheme: import('@/lib/types').ColorTheme;
  isSelected: boolean;
  language?: string;
}

function PreviewSection({
  section,
  colorTheme,
  isSelected,
  language = 'bn',
}: PreviewSectionProps) {
  const selectSection = useAppStore((s) => s.selectSection);
  const meta = sectionMeta[section.sectionType];
  const c = section.content ?? {};

  // Helper: pick localized field based on language
  const loc = (field: string, fallback?: string) => {
    if (language === 'bn') return c[`${field}Bn`] || c[field] || fallback || '';
    if (language === 'hi') return c[`${field}Hi`] || c[field] || fallback || '';
    return c[field] || fallback || '';
  };

  return (
    <div
      id={`section-${section.id}`}
      onClick={() => selectSection(section.id)}
      className={`relative cursor-pointer transition-all group ${
        isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''
      }`}
    >
      {/* Hover overlay label */}
      <div
        className={`absolute top-2 left-2 z-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-opacity ${
          isSelected
            ? 'bg-blue-600 text-white opacity-100'
            : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
        }`}
      >
        {meta?.label ?? section.sectionType}
      </div>

      {/* Section content preview */}
      <div className="border-b border-gray-100 last:border-b-0">
        {section.sectionType === 'hero' && (
          <div
            className="relative py-24 px-8 text-center overflow-hidden"
            style={{
              background: c.backgroundImage
                ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${c.backgroundImage}) center/cover`
                : `linear-gradient(135deg, ${colorTheme.primary}ee 0%, ${colorTheme.secondary}dd 50%, ${colorTheme.primary}cc 100%)`,
            }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-20 animate-blob"
              style={{ background: colorTheme.secondary, filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-15 animate-blob"
              style={{ background: colorTheme.accent, filter: 'blur(70px)', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 animate-blob"
              style={{ background: `linear-gradient(${colorTheme.primary}, ${colorTheme.accent})`, filter: 'blur(80px)', animationDelay: '4s' }} />
            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                {loc('title', 'Hero Title')}
              </h1>
              <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
                {loc('subtitle', 'Your subtitle goes here')}
              </p>
              {c.ctaText && (
                <span
                  className="inline-block px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-transform hover:scale-105 backdrop-blur-sm border border-white/30"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    color: colorTheme.primary,
                    boxShadow: `0 8px 30px ${colorTheme.primary}33`,
                  }}
                >
                  {c.ctaText} →
                </span>
              )}
            </div>
            {/* Wave divider */}
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: '30px' }}>
              <path d="M0,40 C360,0 720,60 1080,20 C1260,0 1380,40 1440,30 L1440,60 L0,60 Z" fill={colorTheme.background || '#fff'} />
            </svg>
          </div>
        )}

        {section.sectionType === 'about' && (
          <div className="py-14 px-8" style={{ backgroundColor: colorTheme.background }}>
            <h2
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: colorTheme.primary }}
            >
              {loc('title', 'About Us')}
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.accent})` }} />
            <p className="text-center max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: `${colorTheme.text}aa` }}>
              {loc('description', 'Tell your story here...')}
            </p>
            {(c.mission || c.vision) && (
              <div className="grid grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
                {c.mission && (
                  <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: `${colorTheme.primary}08`, borderColor: colorTheme.primary }}>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: colorTheme.accent }}>Mission</h3>
                    <p className="text-xs leading-relaxed" style={{ color: `${colorTheme.text}99` }}>{c.mission}</p>
                  </div>
                )}
                {c.vision && (
                  <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: `${colorTheme.accent}08`, borderColor: colorTheme.accent }}>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: colorTheme.primary }}>Vision</h3>
                    <p className="text-xs leading-relaxed" style={{ color: `${colorTheme.text}99` }}>{c.vision}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {section.sectionType === 'courses' && (
          <div className="py-12 px-8">
            <h2
              className="text-2xl font-bold mb-2 text-center"
              style={{ color: colorTheme.primary }}
            >
              {loc('title', 'Our Courses')}
            </h2>
            {c.subtitle && (
              <p className="text-gray-600 text-center text-sm mb-8">{c.subtitle}</p>
            )}
            <div className="grid grid-cols-3 gap-4">
              {(c.courses ?? []).slice(0, 6).map((course: Record<string, string>, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="font-semibold text-sm mb-1">{course.name || 'Course'}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                    {course.duration && <span>{course.duration}</span>}
                    {course.fee && <span className="font-semibold" style={{ color: colorTheme.accent }}>{course.fee}</span>}
                  </div>
                </div>
              ))}
              {(!c.courses || c.courses.length === 0) && (
                <div className="col-span-3 text-center text-xs text-gray-400 py-4">
                  No courses added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'admission_info' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Admissions')}
            </h2>
            {c.deadline && (
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                  Deadline: {c.deadline}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {(c.steps ?? []).map((step: Record<string, string>, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: colorTheme.primary }}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{step.title || `Step ${i + 1}`}</h4>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.sectionType === 'success_stories' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Success Stories')}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(c.stories ?? []).slice(0, 6).map((story: Record<string, string>, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-2 overflow-hidden">
                    {story.image && (
                      <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <h4 className="font-semibold text-sm">{story.name || 'Student'}</h4>
                  <p className="text-xs font-medium" style={{ color: colorTheme.accent }}>{story.result}</p>
                  {story.year && <p className="text-[10px] text-gray-400">{story.year}</p>}
                </div>
              ))}
              {(!c.stories || c.stories.length === 0) && (
                <div className="col-span-3 text-center text-xs text-gray-400 py-4">
                  No stories added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'faculty' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Our Faculty')}
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {(c.members ?? []).slice(0, 8).map((member: Record<string, string>, i: number) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2 overflow-hidden">
                    {member.image && (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <h4 className="font-semibold text-xs">{member.name || 'Faculty'}</h4>
                  <p className="text-[10px] text-gray-500">{member.designation}</p>
                  <p className="text-[10px]" style={{ color: colorTheme.accent }}>{member.subject}</p>
                </div>
              ))}
              {(!c.members || c.members.length === 0) && (
                <div className="col-span-4 text-center text-xs text-gray-400 py-4">
                  No faculty members added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'testimonials' && (
          <div className="py-12 px-8" style={{ backgroundColor: `${colorTheme.primary}08` }}>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Testimonials')}
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {(c.items ?? []).slice(0, 3).map((item: Record<string, string>, i: number) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: parseInt(item.rating) || 5 }).map((_, j) => (
                      <svg key={j} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic mb-3 line-clamp-3">&ldquo;{item.text || 'Testimonial text'}&rdquo;</p>
                  <p className="text-xs font-semibold">{item.name || 'Student'}</p>
                </div>
              ))}
              {(!c.items || c.items.length === 0) && (
                <div className="col-span-3 text-center text-xs text-gray-400 py-4">
                  No testimonials added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'faq' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'FAQ')}
            </h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {(c.items ?? []).map((item: Record<string, string>, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h4 className="font-semibold text-sm mb-1">{item.question || 'Question?'}</h4>
                  <p className="text-xs text-gray-600">{item.answer || 'Answer goes here.'}</p>
                </div>
              ))}
              {(!c.items || c.items.length === 0) && (
                <div className="text-center text-xs text-gray-400 py-4">
                  No FAQ items added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'contact' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Contact Us')}
            </h2>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              {c.address && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Address</p>
                  <p className="text-xs text-gray-700">{c.address}</p>
                </div>
              )}
              {c.phone && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Phone</p>
                  <p className="text-xs text-gray-700">{c.phone}</p>
                </div>
              )}
              {c.email && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Email</p>
                  <p className="text-xs text-gray-700">{c.email}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'footer' && (
          <div className="py-8 px-8" style={{ backgroundColor: colorTheme.text, color: colorTheme.background }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm mb-1">{c.companyName || 'Company'}</h3>
                <p className="text-xs opacity-70 max-w-xs">{c.description}</p>
              </div>
              <div className="flex gap-4">
                {(c.links ?? []).slice(0, 4).map((link: Record<string, string>, i: number) => (
                  <span key={i} className="text-xs opacity-70 hover:opacity-100">{link.label}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {section.sectionType === 'features' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Features')}
            </h2>
            {c.subtitle && (
              <p className="text-gray-600 text-center text-sm mb-8">{c.subtitle}</p>
            )}
            <div className="grid grid-cols-3 gap-4">
              {(c.items ?? []).slice(0, 6).map((item: Record<string, string>, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${colorTheme.primary}15` }}>
                    <svg className="w-5 h-5" style={{ color: colorTheme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.title || 'Feature'}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                </div>
              ))}
              {(!c.items || c.items.length === 0) && (
                <div className="col-span-3 text-center text-xs text-gray-400 py-4">
                  No features added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'pricing' && (
          <div className="py-12 px-8" style={{ backgroundColor: `${colorTheme.primary}05` }}>
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Pricing')}
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {(c.plans ?? []).slice(0, 3).map((plan: Record<string, any>, i: number) => (
                <div key={i} className={`bg-white rounded-lg p-5 text-center border-2 ${plan.isPopular ? 'border-blue-500 shadow-lg relative' : 'border-gray-100'}`}>
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold text-white rounded-full" style={{ backgroundColor: colorTheme.accent }}>
                      POPULAR
                    </span>
                  )}
                  <h4 className="font-semibold text-sm mb-2">{plan.name || 'Plan'}</h4>
                  <div className="text-2xl font-bold mb-1" style={{ color: colorTheme.primary }}>
                    {plan.currency || '$'}{plan.price}
                  </div>
                  <div className="text-[10px] text-gray-400 mb-3">per month</div>
                  <div className="space-y-1">
                    {(String(plan.features || '')).split(',').filter(Boolean).map((f: string, j: number) => (
                      <p key={j} className="text-xs text-gray-600">{f.trim()}</p>
                    ))}
                  </div>
                </div>
              ))}
              {(!c.plans || c.plans.length === 0) && (
                <div className="col-span-3 text-center text-xs text-gray-400 py-4">
                  No pricing plans added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'cta' && (
          <div
            className="py-16 px-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              {loc('title', 'Ready to Get Started?')}
            </h2>
            <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
              {c.subtitle || 'Join us today'}
            </p>
            {c.buttonText && (
              <span
                className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm"
                style={{
                  backgroundColor: colorTheme.accent,
                  color: '#fff',
                }}
              >
                {c.buttonText}
              </span>
            )}
          </div>
        )}

        {section.sectionType === 'stats' && (
          <div className="py-12 px-8" style={{ backgroundColor: `${colorTheme.primary}08` }}>
            {c.title && (
              <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: colorTheme.primary }}>
                {c.title}
              </h2>
            )}
            <div className="flex justify-center gap-12">
              {(c.items ?? []).slice(0, 4).map((item: Record<string, string>, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold" style={{ color: colorTheme.primary }}>
                    {item.value || '0'}{item.suffix}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.label || 'Stat'}</p>
                </div>
              ))}
              {(!c.items || c.items.length === 0) && (
                <div className="text-center text-xs text-gray-400 py-4">
                  No stats added yet
                </div>
              )}
            </div>
          </div>
        )}

        {section.sectionType === 'gallery' && (
          <div className="py-12 px-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colorTheme.primary }}>
              {loc('title', 'Gallery')}
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {(c.images ?? []).slice(0, 8).map((img: Record<string, string>, i: number) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                  {img.url ? (
                    <img src={img.url} alt={img.caption ?? ''} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
              {(!c.images || c.images.length === 0) && (
                <div className="col-span-4 text-center text-xs text-gray-400 py-4">
                  No images added yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
