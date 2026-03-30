'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineSave,
  HiOutlineColorSwatch,
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineTranslate,
  HiOutlineReply,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useStore } from 'zustand';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import ColorPicker from './ColorPicker';
import SeoEditor from './SeoEditor';
import FontSettings from './FontSettings';
import type { Language } from '@/lib/translations';

function UndoRedoButtons() {
  const temporalStore = useAppStore.temporal;
  const pastStates = useStore(temporalStore, (s) => s.pastStates);
  const futureStates = useStore(temporalStore, (s) => s.futureStates);
  const undo = useStore(temporalStore, (s) => s.undo);
  const redo = useStore(temporalStore, (s) => s.redo);

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => undo()}
        disabled={!canUndo}
        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
          canUndo
            ? 'text-gray-700 hover:bg-white hover:shadow-sm'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <HiOutlineReply className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">Undo</span>
      </button>
      <button
        onClick={() => redo()}
        disabled={!canRedo}
        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
          canRedo
            ? 'text-gray-700 hover:bg-white hover:shadow-sm'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Shift+Z)"
      >
        <HiOutlineReply className="w-3.5 h-3.5 -scale-x-100" />
        <span className="hidden lg:inline">Redo</span>
      </button>
    </div>
  );
}

export default function BuilderHeader() {
  const router = useRouter();
  const currentSite = useAppStore((s) => s.currentSite);
  const sections = useAppStore((s) => s.sections);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSeoEditor, setShowSeoEditor] = useState(false);
  const [showFontSettings, setShowFontSettings] = useState(false);
  const [editingSubdomain, setEditingSubdomain] = useState(false);
  const [subdomainValue, setSubdomainValue] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editingName]);

  useEffect(() => {
    if (!showColorPicker) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  const startEditingName = useCallback(() => {
    if (!currentSite) return;
    setNameValue(currentSite.name);
    setEditingName(true);
  }, [currentSite]);

  const saveName = useCallback(async () => {
    if (!currentSite || !nameValue.trim()) return;
    try {
      const updated = await api.sites.updateSite(currentSite.id, {
        name: nameValue.trim(),
      });
      setCurrentSite({ ...currentSite, ...updated });
      toast.success('Site name updated');
    } catch {
      toast.error('Failed to update name');
    }
    setEditingName(false);
  }, [currentSite, nameValue, setCurrentSite]);

  const handleSaveAll = useCallback(async () => {
    if (!currentSite) return;
    setSaving(true);
    try {
      await api.sites.updateSite(currentSite.id, {
        name: currentSite.name,
        colorTheme: currentSite.colorTheme,
        seoTitle: currentSite.seoTitle,
        seoDescription: currentSite.seoDescription,
        seoKeywords: currentSite.seoKeywords,
        themeMode: currentSite.themeMode,
        language: currentSite.language,
      });
      for (const section of sections) {
        await api.sections.updateSection(currentSite.id, section.id, {
          designVariant: section.designVariant,
          isVisible: section.isVisible,
          content: section.content,
        });
      }
      toast.success('All changes saved');
    } catch {
      toast.error('Failed to save changes');
    }
    setSaving(false);
  }, [currentSite, sections]);

  const handleTogglePublish = useCallback(async () => {
    if (!currentSite) return;
    setPublishing(true);
    try {
      const updated = await api.sites.updateSite(currentSite.id, {
        isPublished: !currentSite.isPublished,
      });
      setCurrentSite({ ...currentSite, ...updated });
      toast.success(
        updated.isPublished ? 'Site published!' : 'Site unpublished'
      );
    } catch {
      toast.error('Failed to update publish status');
    }
    setPublishing(false);
  }, [currentSite, setCurrentSite]);

  const handleThemeModeChange = useCallback(
    async (mode: 'light' | 'dark' | 'system') => {
      if (!currentSite) return;
      const prev = currentSite.themeMode;
      setCurrentSite({ ...currentSite, themeMode: mode });
      try {
        await api.sites.updateSite(currentSite.id, { themeMode: mode });
      } catch {
        setCurrentSite({ ...currentSite, themeMode: prev });
        toast.error('Failed to update theme mode');
      }
    },
    [currentSite, setCurrentSite]
  );

  const handleLanguageChange = useCallback(
    async (lang: Language) => {
      if (!currentSite) return;
      const prev = currentSite.language;
      setCurrentSite({ ...currentSite, language: lang });
      try {
        await api.sites.updateSite(currentSite.id, { language: lang });
      } catch {
        setCurrentSite({ ...currentSite, language: prev });
        toast.error('Failed to update language');
      }
    },
    [currentSite, setCurrentSite]
  );

  if (!currentSite) return null;

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-50">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="w-px h-6 bg-gray-200" />

          {editingName ? (
            <div className="flex items-center gap-1.5">
              <input
                ref={nameInputRef}
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveName();
                  if (e.key === 'Escape') setEditingName(false);
                }}
                className="text-sm font-semibold text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
              />
              <button
                onClick={saveName}
                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
              >
                <HiOutlineCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingName(false)}
                className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors"
              >
                <HiOutlineX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={startEditingName}
              className="flex items-center gap-1.5 group"
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {currentSite.name}
              </span>
              <HiOutlinePencil className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {/* Subdomain badge/editor */}
          <div className="w-px h-6 bg-gray-200" />
          {editingSubdomain ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={subdomainValue}
                onChange={(e) => setSubdomainValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (!currentSite) return;
                    api.sites.updateSite(currentSite.id, { subdomain: subdomainValue || undefined } as any)
                      .then((updated) => {
                        setCurrentSite({ ...currentSite, ...updated });
                        toast.success('Subdomain updated');
                        setEditingSubdomain(false);
                      })
                      .catch(() => toast.error('Subdomain may be taken'));
                  }
                  if (e.key === 'Escape') setEditingSubdomain(false);
                }}
                placeholder="my-site"
                className="text-xs border border-gray-300 rounded px-2 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-400">.localhost</span>
              <button
                onClick={() => {
                  if (!currentSite) return;
                  api.sites.updateSite(currentSite.id, { subdomain: subdomainValue || undefined } as any)
                    .then((updated) => {
                      setCurrentSite({ ...currentSite, ...updated });
                      toast.success('Subdomain updated');
                      setEditingSubdomain(false);
                    })
                    .catch(() => toast.error('Subdomain may be taken'));
                }}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <HiOutlineCheck className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setEditingSubdomain(false)} className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                <HiOutlineX className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setSubdomainValue(currentSite?.subdomain || '');
                setEditingSubdomain(true);
              }}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="Set subdomain"
            >
              <HiOutlineGlobeAlt className="w-3.5 h-3.5" />
              {currentSite?.subdomain ? (
                <span className="font-medium">{currentSite.subdomain}.localhost</span>
              ) : (
                <span className="italic">Set subdomain</span>
              )}
            </button>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Color Theme */}
          <div className="relative" ref={colorPickerRef}>
            <button
              onClick={() => setShowColorPicker((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiOutlineColorSwatch className="w-4 h-4" />
              <span className="hidden md:inline">Theme</span>
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: currentSite.colorTheme.primary }}
              />
            </button>
            {showColorPicker && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <ColorPicker onClose={() => setShowColorPicker(false)} />
              </div>
            )}
          </div>

          {/* Theme Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => handleThemeModeChange('light')}
              className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
                (currentSite.themeMode ?? 'light') === 'light'
                  ? 'bg-white text-yellow-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Light mode"
            >
              <HiOutlineSun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeModeChange('system')}
              className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
                currentSite.themeMode === 'system'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="System mode"
            >
              <HiOutlineEye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeModeChange('dark')}
              className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
                currentSite.themeMode === 'dark'
                  ? 'bg-gray-800 text-yellow-300 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Dark mode"
            >
              <HiOutlineMoon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => handleLanguageChange('bn')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                (currentSite.language ?? 'bn') === 'bn'
                  ? 'bg-white text-green-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Bangla"
            >
              {'\u09AC\u09BE\u0982\u09B2\u09BE'}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                currentSite.language === 'en'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                currentSite.language === 'hi'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Hindi"
            >
              {'\u0939\u093F\u0902\u0926\u0940'}
            </button>
          </div>

          {/* Font Settings */}
          <button
            onClick={() => setShowFontSettings(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Font Settings"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span className="hidden md:inline">Fonts</span>
          </button>

          {/* Undo / Redo */}
          <UndoRedoButtons />

          {/* SEO */}
          <button
            onClick={() => setShowSeoEditor(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineSearch className="w-4 h-4" />
            <span className="hidden md:inline">SEO</span>
          </button>

          <div className="w-px h-6 bg-gray-200" />

          {/* Preview */}
          <a
            href={`/preview/${currentSite.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiOutlineEye className="w-4 h-4" />
            <span className="hidden md:inline">Preview</span>
          </a>

          {/* Publish Toggle */}
          <button
            onClick={handleTogglePublish}
            disabled={publishing}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              currentSite.isPublished
                ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            <HiOutlineGlobeAlt className="w-4 h-4" />
            <span className="hidden sm:inline">
              {publishing
                ? '...'
                : currentSite.isPublished
                  ? 'Published'
                  : 'Publish'}
            </span>
          </button>

          {/* Save All */}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
          >
            <HiOutlineSave className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </header>

      {/* SEO Slide-over */}
      {showSeoEditor && (
        <SeoEditor onClose={() => setShowSeoEditor(false)} />
      )}

      {/* Font Settings Modal */}
      {showFontSettings && (
        <FontSettings onClose={() => setShowFontSettings(false)} />
      )}
    </>
  );
}
