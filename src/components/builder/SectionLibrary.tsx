'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineViewBoards,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlineColorSwatch,
  HiOutlineX,
  HiOutlineSearch,
} from 'react-icons/hi';
import { sectionMeta, variantLabels } from '@/lib/section-labels';
import type { SectionType } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineViewBoards,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlineColorSwatch,
};

function getSectionIcon(sectionType: SectionType) {
  const meta = sectionMeta[sectionType];
  return iconMap[meta?.icon] ?? HiOutlineViewBoards;
}

interface Category {
  name: string;
  types: SectionType[];
}

const categories: Category[] = [
  { name: 'Layout', types: ['hero', 'cta'] },
  { name: 'Content', types: ['about', 'features', 'courses'] },
  { name: 'Social', types: ['testimonials', 'success_stories', 'faculty'] },
  {
    name: 'Utility',
    types: [
      'faq',
      'contact',
      'footer',
      'gallery',
      'stats',
      'pricing',
      'admission_info',
    ],
  },
];

const variantDescriptions: Record<SectionType, string[]> = {
  hero: [
    'Centered text with gradient background and CTA button',
    'Split layout with image on one side and text on the other',
    'Full-width video background with overlay text',
  ],
  about: [
    'Text content aligned to the left with supporting image',
    'Information presented in card-based grid layout',
    'Chronological timeline showing milestones',
  ],
  courses: [
    'Courses displayed in a responsive grid of cards',
    'Vertical list view with detailed descriptions',
    'Tabbed interface to organize courses by category',
  ],
  admission_info: [
    'Step-by-step numbered process with icons',
    'Two-column layout for requirements and process',
    'Expandable accordion for detailed information',
  ],
  success_stories: [
    'Auto-scrolling carousel of student stories',
    'Grid of story cards with photos and achievements',
    'Large featured story with supporting highlights',
  ],
  faculty: [
    'Photo grid with names and designations',
    'List view with detailed bios and qualifications',
    'Compact card layout for large teams',
  ],
  testimonials: [
    'Horizontal slider with rating stars',
    'Pinterest-style masonry layout of testimonials',
    'Single large highlighted testimonial with rotation',
  ],
  faq: [
    'Expandable accordion with smooth animations',
    'Questions split into two columns',
    'Searchable FAQ with instant filtering',
  ],
  contact: [
    'Contact form on the left, details on the right',
    'Centered form with contact info below',
    'Embedded map alongside the contact form',
  ],
  footer: [
    'Multi-column layout with links and social icons',
    'Clean minimal footer with essential links',
    'Centered layout with stacked elements',
  ],
  features: [
    'Grid of features with icons and descriptions',
    'Alternating left-right feature blocks',
    'Feature cards with hover effects',
  ],
  pricing: [
    'Three pricing tiers side by side',
    'Two plan comparison with feature list',
    'Monthly and yearly toggle with savings badge',
  ],
  cta: [
    'Full-width gradient banner with button',
    'Split layout with image and call to action',
    'Floating card style with subtle animation',
  ],
  stats: [
    'Animated counters displayed in a horizontal row',
    'Stat cards with icons and descriptions',
    'Visual infographic style with progress bars',
  ],
  gallery: [
    'Pinterest-style masonry image layout',
    'Equal-size grid with hover effects',
    'Lightbox carousel with captions',
  ],
};

interface SectionLibraryProps {
  onAdd: (sectionType: SectionType, designVariant: number) => void;
  onClose: () => void;
}

export default function SectionLibrary({ onAdd, onClose }: SectionLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Layout');
  const [selectedType, setSelectedType] = useState<SectionType>('hero');
  const [search, setSearch] = useState('');

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        types: cat.types.filter((t) => {
          const meta = sectionMeta[t];
          return (
            meta.label.toLowerCase().includes(q) ||
            t.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((cat) => cat.types.length > 0);
  }, [search]);

  // When search changes, auto-select first match
  useEffect(() => {
    if (filteredCategories.length > 0 && filteredCategories[0].types.length > 0) {
      const firstType = filteredCategories[0].types[0];
      setSelectedCategory(filteredCategories[0].name);
      setSelectedType(firstType);
    }
  }, [filteredCategories]);

  const handleAdd = useCallback(
    (variant: number) => {
      onAdd(selectedType, variant);
    },
    [onAdd, selectedType]
  );

  const variants = variantLabels[selectedType] ?? [];
  const descriptions = variantDescriptions[selectedType] ?? [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[900px] max-w-[95vw] max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Section Library
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose a section type and variant to add to your page
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar: section type list */}
          <div className="w-[240px] border-r border-gray-200 overflow-y-auto py-2">
            {filteredCategories.map((cat) => (
              <div key={cat.name} className="mb-2">
                <p className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {cat.name}
                </p>
                {cat.types.map((type) => {
                  const Icon = getSectionIcon(type);
                  const meta = sectionMeta[type];
                  const isActive = selectedType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setSelectedCategory(cat.name);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      />
                      <span className="text-sm font-medium truncate">
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No sections match your search
              </div>
            )}
          </div>

          {/* Right area: variant cards */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">
                {sectionMeta[selectedType]?.label}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose a design variant
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {variants.map((variantName, i) => {
                const variantNum = i + 1;
                const Icon = getSectionIcon(selectedType);
                return (
                  <div
                    key={variantNum}
                    className="group border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleAdd(variantNum)}
                  >
                    {/* Preview area */}
                    <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 relative">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Variant {variantNum}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg">
                          Add Section
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-3 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {variantName}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                        {descriptions[i] || 'A beautiful design variant'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
