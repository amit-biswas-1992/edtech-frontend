'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Site, SitePage } from '@/lib/types';

interface SiteNavigationProps {
  site: Site;
  pages?: SitePage[];
  currentPath?: string;
}

export default function SiteNavigation({ site, pages, currentPath }: SiteNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = site.colorTheme;
  const basePath = `/preview/${site.slug}`;

  const navLinks: { label: string; href: string }[] = [
    { label: 'Home', href: basePath },
  ];

  if (pages && pages.length > 0) {
    const publishedPages = pages.filter((p) => p.isPublished && !p.isHomepage);
    publishedPages.forEach((p) => {
      if (p.pageType === 'course_details') return;
      if (p.pageType === 'checkout') return;
      if (p.pageType === 'payment_success') return;
      if (p.pageType === 'payment_fail') return;
      if (p.pageType === 'exam_live') return;
      if (p.pageType === 'exam_practice') return;
      if (p.pageType === 'exam_result') return;

      let href = basePath;
      switch (p.pageType) {
        case 'enrolled_courses': href = `${basePath}/dashboard`; break;
        case 'exam_details': href = `${basePath}/exams`; break;
        case 'exam_leaderboard': href = `${basePath}/exams`; break;
        case 'login': href = `${basePath}/login`; break;
        case 'signup': href = `${basePath}/signup`; break;
        default: href = `${basePath}/${p.slug}`; break;
      }
      navLinks.push({ label: p.title, href });
    });
  } else {
    navLinks.push(
      { label: 'Courses', href: `${basePath}#courses` },
      { label: 'Exams', href: `${basePath}/exams` },
    );
  }

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm"
      style={{ backgroundColor: theme.primary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Name */}
          <Link href={basePath} className="flex items-center gap-2 shrink-0">
            {site.logo ? (
              <img src={site.logo} alt={site.name} className="h-8 w-8 rounded object-cover" />
            ) : (
              <div
                className="h-8 w-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.accent, color: '#fff' }}
              >
                {site.name.charAt(0)}
              </div>
            )}
            <span className="text-white font-semibold text-sm hidden sm:block">
              {site.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  currentPath === link.href
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={`${basePath}/login`}
              className="px-3 py-1.5 text-sm text-white/90 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href={`${basePath}/signup`}
              className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
              style={{ backgroundColor: theme.accent, color: '#fff' }}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-2 mt-2 flex items-center gap-2 px-3">
              <Link
                href={`${basePath}/login`}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/90 hover:text-white"
              >
                Login
              </Link>
              <Link
                href={`${basePath}/signup`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-1 text-sm font-medium rounded-md"
                style={{ backgroundColor: theme.accent, color: '#fff' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
