'use client';

import { useState, useCallback } from 'react';
import { HiOutlineX, HiOutlineGlobeAlt, HiOutlineSave } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';

interface SeoEditorProps {
  onClose: () => void;
}

export default function SeoEditor({ onClose }: SeoEditorProps) {
  const currentSite = useAppStore((s) => s.currentSite);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);

  const [seoTitle, setSeoTitle] = useState(currentSite?.seoTitle ?? '');
  const [seoDescription, setSeoDescription] = useState(
    currentSite?.seoDescription ?? ''
  );
  const [seoKeywords, setSeoKeywords] = useState(
    currentSite?.seoKeywords ?? ''
  );
  const [saving, setSaving] = useState(false);

  const SEO_TITLE_MAX = 60;
  const SEO_DESC_MAX = 160;

  const handleSave = useCallback(async () => {
    if (!currentSite) return;
    setSaving(true);
    try {
      const updated = await api.sites.updateSite(currentSite.id, {
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
      });
      setCurrentSite({ ...currentSite, ...updated });
      toast.success('SEO settings saved');
      onClose();
    } catch {
      toast.error('Failed to save SEO settings');
    }
    setSaving(false);
  }, [currentSite, seoTitle, seoDescription, seoKeywords, setCurrentSite, onClose]);

  if (!currentSite) return null;

  const previewTitle = seoTitle || currentSite.name;
  const previewDesc =
    seoDescription || 'No description set for this website.';
  const previewUrl = `example.com/${currentSite.slug}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <HiOutlineGlobeAlt className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              SEO Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* SEO Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <span
                className={`text-xs font-mono ${
                  seoTitle.length > SEO_TITLE_MAX
                    ? 'text-red-500'
                    : 'text-gray-400'
                }`}
              >
                {seoTitle.length}/{SEO_TITLE_MAX}
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Enter page title for search engines"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {seoTitle.length > SEO_TITLE_MAX && (
              <p className="text-xs text-red-500 mt-1">
                Title may be truncated in search results
              </p>
            )}
          </div>

          {/* SEO Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                SEO Description
              </label>
              <span
                className={`text-xs font-mono ${
                  seoDescription.length > SEO_DESC_MAX
                    ? 'text-red-500'
                    : 'text-gray-400'
                }`}
              >
                {seoDescription.length}/{SEO_DESC_MAX}
              </span>
            </div>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Enter a meta description for search engines"
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            {seoDescription.length > SEO_DESC_MAX && (
              <p className="text-xs text-red-500 mt-1">
                Description may be truncated in search results
              </p>
            )}
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              SEO Keywords
            </label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate keywords with commas
            </p>
          </div>

          {/* Google Preview */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Search Preview
            </label>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
              <div className="text-xs text-gray-500 truncate">
                {previewUrl}
              </div>
              <div className="text-lg text-blue-700 font-medium truncate leading-tight hover:underline cursor-default">
                {previewTitle}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2 leading-snug">
                {previewDesc}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
            >
              <HiOutlineSave className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save SEO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
