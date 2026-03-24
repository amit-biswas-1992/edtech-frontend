'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import toast from 'react-hot-toast';
import type { PageType, BuilderType, SitePage } from '@/lib/types';

interface PageManagerProps {
  siteId: string;
}

const PAGE_TYPE_ICONS: Record<PageType, string> = {
  landing: '\u{1F3E0}',
  course_details: '\u{1F4DA}',
  enrolled_courses: '\u{1F4CB}',
  login: '\u{1F511}',
  signup: '\u{270F}\u{FE0F}',
  checkout: '\u{1F6D2}',
  payment_success: '\u2705',
  payment_fail: '\u274C',
  exam_details: '\u{1F4DD}',
  exam_live: '\u23F1\u{FE0F}',
  exam_practice: '\u{1F9E9}',
  exam_result: '\u{1F4CA}',
  exam_leaderboard: '\u{1F3C6}',
  custom: '\u2699\u{FE0F}',
};

const PAGE_TYPE_LABELS: Record<PageType, string> = {
  landing: 'Landing Page',
  course_details: 'Course Details',
  enrolled_courses: 'Enrolled Courses',
  login: 'Login',
  signup: 'Sign Up',
  checkout: 'Checkout',
  payment_success: 'Payment Success',
  payment_fail: 'Payment Failed',
  exam_details: 'Exam Details',
  exam_live: 'Live Exam',
  exam_practice: 'Practice Exam',
  exam_result: 'Exam Result',
  exam_leaderboard: 'Leaderboard',
  custom: 'Custom Page',
};

const ALL_PAGE_TYPES: PageType[] = [
  'landing', 'course_details', 'enrolled_courses', 'login', 'signup',
  'checkout', 'payment_success', 'payment_fail', 'exam_details',
  'exam_live', 'exam_practice', 'exam_result', 'exam_leaderboard', 'custom',
];

export default function PageManager({ siteId }: PageManagerProps) {
  const pages = useAppStore((s) => s.pages);
  const selectedPageId = useAppStore((s) => s.selectedPageId);
  const setPages = useAppStore((s) => s.setPages);
  const selectPage = useAppStore((s) => s.selectPage);

  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const sorted = [...pages].sort((a, b) => a.order - b.order);

  const handleCreate = useCallback(async (pageType: PageType) => {
    setCreating(true);
    setShowAddDropdown(false);
    try {
      const builderType: BuilderType = (pageType === 'landing' || pageType === 'custom') ? 'sections' : 'template';
      const newPage = await api.pages.createPage(siteId, {
        title: PAGE_TYPE_LABELS[pageType],
        slug: pageType.replace(/_/g, '-'),
        pageType,
        builderType,
        order: pages.length,
        isPublished: true,
        isHomepage: pageType === 'landing' && pages.length === 0,
      });
      setPages([...pages, newPage]);
      toast.success('Page created');
    } catch {
      toast.error('Failed to create page');
    }
    setCreating(false);
  }, [siteId, pages, setPages]);

  const handleDelete = useCallback(async (pageId: string) => {
    if (!confirm('Delete this page?')) return;
    try {
      await api.pages.deletePage(siteId, pageId);
      setPages(pages.filter((p) => p.id !== pageId));
      if (selectedPageId === pageId) selectPage(null);
      toast.success('Page deleted');
    } catch {
      toast.error('Failed to delete page');
    }
  }, [siteId, pages, setPages, selectedPageId, selectPage]);

  const handleTogglePublish = useCallback(async (page: SitePage) => {
    try {
      const updated = await api.pages.updatePage(siteId, page.id, { isPublished: !page.isPublished });
      setPages(pages.map((p) => (p.id === page.id ? { ...p, ...updated } : p)));
    } catch {
      toast.error('Failed to update page');
    }
  }, [siteId, pages, setPages]);

  const handleSetHomepage = useCallback(async (page: SitePage) => {
    try {
      const updatedPages = await Promise.all(
        pages.map(async (p) => {
          if (p.id === page.id && !p.isHomepage) {
            const u = await api.pages.updatePage(siteId, p.id, { isHomepage: true });
            return { ...p, ...u };
          } else if (p.id !== page.id && p.isHomepage) {
            const u = await api.pages.updatePage(siteId, p.id, { isHomepage: false });
            return { ...p, ...u };
          }
          return p;
        })
      );
      setPages(updatedPages);
      toast.success('Homepage set');
    } catch {
      toast.error('Failed to set homepage');
    }
  }, [siteId, pages, setPages]);

  const handleSaveTitle = useCallback(async (pageId: string) => {
    if (!editTitle.trim()) return;
    try {
      const updated = await api.pages.updatePage(siteId, pageId, { title: editTitle.trim() });
      setPages(pages.map((p) => (p.id === pageId ? { ...p, ...updated } : p)));
      setEditingId(null);
      toast.success('Title updated');
    } catch {
      toast.error('Failed to update title');
    }
  }, [siteId, pages, setPages, editTitle]);

  const handleMoveUp = useCallback(async (index: number) => {
    if (index === 0) return;
    const newPages = [...sorted];
    [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
    const reordered = newPages.map((p, i) => ({ ...p, order: i }));
    setPages(reordered);
    try {
      await api.pages.reorderPages(siteId, reordered.map((p) => ({ id: p.id, order: p.order })));
    } catch {
      toast.error('Failed to reorder');
    }
  }, [siteId, sorted, setPages]);

  const handleMoveDown = useCallback(async (index: number) => {
    if (index >= sorted.length - 1) return;
    const newPages = [...sorted];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    const reordered = newPages.map((p, i) => ({ ...p, order: i }));
    setPages(reordered);
    try {
      await api.pages.reorderPages(siteId, reordered.map((p) => ({ id: p.id, order: p.order })));
    } catch {
      toast.error('Failed to reorder');
    }
  }, [siteId, sorted, setPages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Pages ({pages.length})</h3>
          <div className="relative">
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              disabled={creating}
              className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
            >
              {creating ? '...' : '+ Add Page'}
            </button>
            {showAddDropdown && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                {ALL_PAGE_TYPES.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => handleCreate(pt)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>{PAGE_TYPE_ICONS[pt]}</span>
                    <span>{PAGE_TYPE_LABELS[pt]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {sorted.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-400">
            No pages yet. Add a page to get started.
          </div>
        )}
        {sorted.map((page, index) => (
          <div
            key={page.id}
            onClick={() => selectPage(page.id === selectedPageId ? null : page.id)}
            className={`group p-2.5 rounded-lg border transition-all cursor-pointer ${
              selectedPageId === page.id
                ? 'border-blue-300 bg-blue-50 shadow-sm'
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5">{PAGE_TYPE_ICONS[page.pageType]}</span>
              <div className="flex-1 min-w-0">
                {editingId === page.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveTitle(page.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs border border-gray-300 rounded px-1.5 py-0.5 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSaveTitle(page.id); }}
                      className="text-green-600 text-xs font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-900 truncate">{page.title}</span>
                    {page.isHomepage && (
                      <span className="text-yellow-500 text-xs" title="Homepage">&#9733;</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded ${
                    page.builderType === 'sections'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {page.builderType === 'sections' ? 'Section Builder' : 'Template'}
                  </span>
                  <span className="text-[10px] text-gray-400">/{page.slug}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                title="Move up"
              >
                &#9650;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }}
                disabled={index >= sorted.length - 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs"
                title="Move down"
              >
                &#9660;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTitle(page.title);
                  setEditingId(page.id);
                }}
                className="p-1 text-gray-400 hover:text-blue-600 text-xs"
                title="Edit title"
              >
                &#9998;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleSetHomepage(page); }}
                className={`p-1 text-xs ${page.isHomepage ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                title="Set as homepage"
              >
                &#9733;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleTogglePublish(page); }}
                className={`p-1 text-xs ${page.isPublished ? 'text-green-600' : 'text-gray-400'}`}
                title={page.isPublished ? 'Published' : 'Unpublished'}
              >
                {page.isPublished ? '\u25CF' : '\u25CB'}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(page.id); }}
                className="p-1 text-gray-400 hover:text-red-600 text-xs ml-auto"
                title="Delete"
              >
                &#10005;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
