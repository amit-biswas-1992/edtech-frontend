'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import toast from 'react-hot-toast';
import type { FontConfig } from '@/lib/types';

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Poppins', label: 'Poppins', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Roboto', label: 'Roboto', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Open Sans', label: 'Open Sans', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Lato', label: 'Lato', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Montserrat', label: 'Montserrat', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Nunito', label: 'Nunito', category: 'sans-serif', sample: 'The quick brown fox' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'serif', sample: 'The quick brown fox' },
  { value: 'Merriweather', label: 'Merriweather', category: 'serif', sample: 'The quick brown fox' },
  { value: 'Georgia', label: 'Georgia', category: 'serif', sample: 'The quick brown fox' },
  { value: 'Source Code Pro', label: 'Source Code Pro', category: 'monospace', sample: 'The quick brown fox' },
];

const BANGLA_FONT_OPTIONS = [
  { value: 'Noto Sans Bengali', label: 'Noto Sans Bengali', sample: 'বাংলা ফন্ট প্রিভিউ' },
  { value: 'Hind Siliguri', label: 'Hind Siliguri', sample: 'বাংলা ফন্ট প্রিভিউ' },
  { value: 'Baloo Da 2', label: 'Baloo Da 2', sample: 'বাংলা ফন্ট প্রিভিউ' },
  { value: 'Tiro Bangla', label: 'Tiro Bangla', sample: 'বাংলা ফন্ট প্রিভিউ' },
  { value: 'Galada', label: 'Galada', sample: 'বাংলা ফন্ট প্রিভিউ' },
  { value: 'Anek Bangla', label: 'Anek Bangla', sample: 'বাংলা ফন্ট প্রিভিউ' },
];

const SIZE_OPTIONS: { value: FontConfig['fontSize']; label: string; desc: string }[] = [
  { value: 'small', label: 'Small', desc: 'Compact, more content visible' },
  { value: 'medium', label: 'Medium', desc: 'Default balanced size' },
  { value: 'large', label: 'Large', desc: 'Bigger text, better readability' },
];

const DEFAULT_FONT_CONFIG: FontConfig = {
  headingFont: 'Poppins',
  bodyFont: 'Inter',
  banglaFont: 'Hind Siliguri',
  fontSize: 'medium',
};

interface FontSettingsProps {
  onClose: () => void;
}

export default function FontSettings({ onClose }: FontSettingsProps) {
  const currentSite = useAppStore((s) => s.currentSite);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);
  const [config, setConfig] = useState<FontConfig>(
    (currentSite?.fontConfig as FontConfig) || DEFAULT_FONT_CONFIG
  );
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!currentSite) return;
    setSaving(true);
    try {
      await api.sites.updateSite(currentSite.id, { fontConfig: config });
      setCurrentSite({ ...currentSite, fontConfig: config });
      toast.success('Font settings saved');
      onClose();
    } catch {
      toast.error('Failed to save font settings');
    } finally {
      setSaving(false);
    }
  }, [currentSite, config, setCurrentSite, onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Font Settings</h2>
            <p className="text-sm text-gray-500">Customize typography for your site</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Heading Font */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Heading Font</label>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.slice(0, 8).map((font) => (
                <button
                  key={font.value}
                  onClick={() => setConfig({ ...config, headingFont: font.value })}
                  className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                    config.headingFont === font.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs text-gray-500">{font.category}</span>
                  <p className="text-sm font-medium" style={{ fontFamily: font.value }}>
                    {font.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Body Font */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Body Font</label>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setConfig({ ...config, bodyFont: font.value })}
                  className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                    config.bodyFont === font.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs text-gray-500">{font.category}</span>
                  <p className="text-sm" style={{ fontFamily: font.value }}>
                    {font.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Bangla Font */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bangla Font / বাংলা ফন্ট
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BANGLA_FONT_OPTIONS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setConfig({ ...config, banglaFont: font.value })}
                  className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                    config.banglaFont === font.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm" style={{ fontFamily: font.value }}>
                    {font.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: font.value }}>
                    {font.sample}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setConfig({ ...config, fontSize: size.value })}
                  className={`flex-1 text-center px-3 py-3 rounded-lg border-2 transition-all ${
                    config.fontSize === size.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm font-medium">{size.label}</p>
                  <p className="text-[10px] text-gray-500">{size.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-lg border p-4 bg-gray-50">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Preview</p>
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: config.headingFont }}
            >
              Heading Text Example
            </h3>
            <p
              className="text-sm text-gray-600 mb-2"
              style={{ fontFamily: config.bodyFont }}
            >
              This is how body text will look on your site. Clean and readable.
            </p>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: config.banglaFont }}
            >
              বাংলা লেখা এইভাবে দেখাবে আপনার সাইটে।
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Fonts'}
          </button>
        </div>
      </div>
    </div>
  );
}
