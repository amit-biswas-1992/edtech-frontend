'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineArrowLeft,
  HiOutlineExternalLink,
} from 'react-icons/hi';

interface PreviewToolbarProps {
  siteId: string;
  siteName: string;
  slug: string;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';

export default function PreviewToolbar({ siteId, siteName, slug }: PreviewToolbarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const viewModes: { key: ViewMode; label: string; icon: React.ReactNode; width: string }[] = [
    {
      key: 'desktop',
      label: 'Desktop',
      icon: <HiOutlineDesktopComputer className="w-4 h-4" />,
      width: '100%',
    },
    {
      key: 'tablet',
      label: 'Tablet',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2} strokeLinecap="round" />
        </svg>
      ),
      width: '768px',
    },
    {
      key: 'mobile',
      label: 'Mobile',
      icon: <HiOutlineDeviceMobile className="w-4 h-4" />,
      width: '375px',
    },
  ];

  return (
    <>
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Back button */}
          <div className="flex items-center gap-3">
            <Link
              href={`/builder/${siteId}`}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Builder</span>
            </Link>
            <div className="w-px h-5 bg-gray-300 hidden sm:block" />
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors hidden sm:inline"
            >
              Dashboard
            </Link>
          </div>

          {/* Center: Site name + view toggles */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800 hidden md:inline truncate max-w-[200px]">
              {siteName}
            </span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
              {viewModes.map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === mode.key
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={mode.label}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Open in new tab */}
          <a
            href={`/preview/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <HiOutlineExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Open</span>
          </a>
        </div>
      </div>

      {/* Viewport container - uses iframe for mobile/tablet so Tailwind breakpoints work */}
      {viewMode !== 'desktop' ? (
        <div className="flex justify-center bg-gray-100 min-h-[calc(100vh-56px)] py-4 px-4">
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300"
            style={{
              width: viewModes.find(m => m.key === viewMode)?.width || '375px',
              maxHeight: 'calc(100vh - 88px)',
            }}
          >
            <iframe
              src={`/preview/${slug}?embed=1`}
              className="w-full border-0"
              style={{
                height: viewMode === 'mobile' ? '812px' : '1024px',
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
              title="Preview"
            />
          </div>
        </div>
      ) : null}

      {/* Hide main content when in mobile/tablet mode (iframe replaces it) */}
      <style>{`
        ${viewMode !== 'desktop' ? `
        .preview-viewport { display: none !important; }
        ` : ''}
      `}</style>
    </>
  );
}
