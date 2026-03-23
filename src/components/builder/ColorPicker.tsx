'use client';

import { useState, useCallback } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import { colorThemes } from '@/lib/themes';
import type { ColorTheme } from '@/lib/types';

interface ColorPickerProps {
  onClose: () => void;
}

export default function ColorPicker({ onClose }: ColorPickerProps) {
  const currentSite = useAppStore((s) => s.currentSite);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);

  const [isCustom, setIsCustom] = useState(() => {
    if (!currentSite) return false;
    return !colorThemes.some(
      (t) => t.name === currentSite.colorTheme.name
    );
  });

  const [customColors, setCustomColors] = useState<ColorTheme>(() => ({
    name: 'Custom',
    primary: currentSite?.colorTheme.primary ?? '#2563EB',
    secondary: currentSite?.colorTheme.secondary ?? '#1E40AF',
    accent: currentSite?.colorTheme.accent ?? '#38BDF8',
    background: currentSite?.colorTheme.background ?? '#FFFFFF',
    text: currentSite?.colorTheme.text ?? '#1F2937',
  }));

  const applyTheme = useCallback(
    async (theme: ColorTheme) => {
      if (!currentSite) return;
      const updated = { ...currentSite, colorTheme: theme };
      setCurrentSite(updated);
      try {
        await api.sites.updateSite(currentSite.id, { colorTheme: theme });
        toast.success(`Theme "${theme.name}" applied`);
      } catch {
        setCurrentSite(currentSite);
        toast.error('Failed to update theme');
      }
    },
    [currentSite, setCurrentSite]
  );

  const handlePresetClick = useCallback(
    (theme: ColorTheme) => {
      setIsCustom(false);
      applyTheme(theme);
    },
    [applyTheme]
  );

  const handleCustomChange = useCallback(
    (key: keyof Omit<ColorTheme, 'name'>, value: string) => {
      setCustomColors((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyCustom = useCallback(() => {
    applyTheme(customColors);
  }, [applyTheme, customColors]);

  const isSelectedPreset = (theme: ColorTheme) =>
    !isCustom && currentSite?.colorTheme.name === theme.name;

  const colorFields: { key: keyof Omit<ColorTheme, 'name'>; label: string }[] =
    [
      { key: 'primary', label: 'Primary' },
      { key: 'secondary', label: 'Secondary' },
      { key: 'accent', label: 'Accent' },
      { key: 'background', label: 'Background' },
      { key: 'text', label: 'Text' },
    ];

  return (
    <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Color Theme</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Choose a preset or customize colors
        </p>
      </div>

      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
        {colorThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handlePresetClick(theme)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              isSelectedPreset(theme)
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex gap-1">
              {[theme.primary, theme.secondary, theme.accent].map(
                (color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
            <span
              className={`text-sm font-medium flex-1 text-left ${
                isSelectedPreset(theme) ? 'text-blue-700' : 'text-gray-700'
              }`}
            >
              {theme.name}
            </span>
            {isSelectedPreset(theme) && (
              <HiOutlineCheck className="w-4 h-4 text-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-100">
        <button
          onClick={() => setIsCustom(true)}
          className={`w-full px-4 py-2.5 text-sm font-medium text-left transition-colors ${
            isCustom
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Custom Colors
        </button>

        {isCustom && (
          <div className="px-4 pb-4 space-y-3">
            {colorFields.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-600 w-20">
                  {label}
                </label>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="color"
                    value={customColors[key]}
                    onChange={(e) => handleCustomChange(key, e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={customColors[key]}
                    onChange={(e) => handleCustomChange(key, e.target.value)}
                    className="flex-1 text-xs font-mono px-2 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={applyCustom}
              className="w-full py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Apply Custom Theme
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
