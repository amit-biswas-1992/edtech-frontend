'use client';

import { useCallback } from 'react';
import { HiOutlineTemplate } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import { variantLabels } from '@/lib/section-labels';
import type { SiteSection } from '@/lib/types';

interface DesignVariantPickerProps {
  section: SiteSection;
}

export default function DesignVariantPicker({
  section,
}: DesignVariantPickerProps) {
  const currentSite = useAppStore((s) => s.currentSite);
  const updateSectionInStore = useAppStore((s) => s.updateSectionInStore);

  const labels = variantLabels[section.sectionType] ?? [
    'Variant 1',
    'Variant 2',
    'Variant 3',
  ];

  const handleSelect = useCallback(
    async (variant: number) => {
      if (!currentSite || variant === section.designVariant) return;
      updateSectionInStore(section.id, { designVariant: variant });
      try {
        await api.sections.updateSection(currentSite.id, section.id, {
          designVariant: variant,
        });
      } catch {
        updateSectionInStore(section.id, {
          designVariant: section.designVariant,
        });
        toast.error('Failed to update variant');
      }
    },
    [currentSite, section, updateSectionInStore]
  );

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        <HiOutlineTemplate className="w-3.5 h-3.5" />
        Design Variant
      </label>
      <div className="grid grid-cols-3 gap-2">
        {labels.map((label, idx) => {
          const variant = idx + 1;
          const isSelected = section.designVariant === variant;
          return (
            <button
              key={variant}
              onClick={() => handleSelect(variant)}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-8 h-6 rounded border ${
                  isSelected
                    ? 'border-blue-300 bg-blue-100'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {/* Mini layout preview icon based on variant index */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 p-0.5">
                  {idx === 0 && (
                    <>
                      <div
                        className={`w-full h-0.5 rounded ${isSelected ? 'bg-blue-400' : 'bg-gray-300'}`}
                      />
                      <div
                        className={`w-3/4 h-0.5 rounded ${isSelected ? 'bg-blue-300' : 'bg-gray-200'}`}
                      />
                    </>
                  )}
                  {idx === 1 && (
                    <div className="flex gap-0.5 w-full h-full">
                      <div
                        className={`flex-1 rounded ${isSelected ? 'bg-blue-300' : 'bg-gray-200'}`}
                      />
                      <div
                        className={`flex-1 rounded ${isSelected ? 'bg-blue-400' : 'bg-gray-300'}`}
                      />
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`rounded ${isSelected ? 'bg-blue-300' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`text-[10px] leading-tight font-medium ${
                  isSelected ? 'text-blue-700' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
