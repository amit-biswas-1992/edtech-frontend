'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Notice, NoticeType } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface NoticeManagerProps {
  siteId: string;
}

const typeColors: Record<NoticeType, string> = {
  urgent: 'bg-red-100 text-red-700',
  exam: 'bg-orange-100 text-orange-700',
  schedule: 'bg-blue-100 text-blue-700',
  admission: 'bg-green-100 text-green-700',
  result: 'bg-purple-100 text-purple-700',
  general: 'bg-gray-100 text-gray-600',
};

const emptyForm = {
  title: '',
  titleBn: '',
  content: '',
  contentBn: '',
  type: 'general' as NoticeType,
  isPinned: false,
  isPublished: true,
  publishDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
};

type NoticeForm = typeof emptyForm;

export default function NoticeManager({ siteId }: NoticeManagerProps) {
  const notices = useAppStore((s) => s.notices);
  const setNotices = useAppStore((s) => s.setNotices);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NoticeForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await api.notices.getNotices(siteId);
      setNotices(data);
    } catch {
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  }, [siteId, setNotices]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, publishDate: new Date().toISOString().split('T')[0] });
    setModalOpen(true);
  };

  const openEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setForm({
      title: notice.title,
      titleBn: notice.titleBn ?? '',
      content: notice.content,
      contentBn: notice.contentBn ?? '',
      type: notice.type,
      isPinned: notice.isPinned,
      isPublished: notice.isPublished,
      publishDate: notice.publishDate ? notice.publishDate.split('T')[0] : '',
      expiryDate: notice.expiryDate ? notice.expiryDate.split('T')[0] : '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<Notice> = {
        title: form.title.trim(),
        titleBn: form.titleBn.trim() || null,
        content: form.content.trim(),
        contentBn: form.contentBn.trim() || null,
        type: form.type,
        isPinned: form.isPinned,
        isPublished: form.isPublished,
        publishDate: form.publishDate || new Date().toISOString(),
        expiryDate: form.expiryDate || null,
      };

      if (editingId) {
        await api.notices.updateNotice(siteId, editingId, payload);
        toast.success('Notice updated');
      } else {
        await api.notices.createNotice(siteId, payload);
        toast.success('Notice created');
      }
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (notice: Notice) => {
    if (!confirm(`Delete "${notice.title}"?`)) return;
    try {
      await api.notices.deleteNotice(siteId, notice.id);
      toast.success('Notice deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const updateField = (field: keyof NoticeForm, value: string | boolean | NoticeType) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Notices ({notices.length})
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Notice List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No notices yet</p>
            <p className="text-xs text-gray-400 mt-1">Create notices for your students</p>
          </div>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white border rounded-lg p-3 relative group hover:shadow-sm transition-shadow ${
                notice.type === 'urgent' ? 'border-red-200' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {notice.isPinned && (
                      <svg className="w-3 h-3 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1 1 0 004 6.868V9a1 1 0 001 1h4v7a1 1 0 102 0v-7h4a1 1 0 001-1V6.868a1 1 0 00-1.046-.963L11 4.323V3a1 1 0 00-1-1z" />
                      </svg>
                    )}
                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase ${typeColors[notice.type]}`}>
                      {notice.type}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase ${
                      notice.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {notice.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-800 truncate">{notice.title}</div>
                  {notice.titleBn && (
                    <div className="text-[10px] text-gray-400 truncate">{notice.titleBn}</div>
                  )}
                  <div className="text-[10px] text-gray-400 mt-1 line-clamp-2">{notice.content}</div>
                  <div className="flex items-center gap-2 mt-1.5 text-[9px] text-gray-300">
                    <span>{new Date(notice.publishDate).toLocaleDateString()}</span>
                    {notice.expiryDate && (
                      <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(notice)} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                    <HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button onClick={() => handleDelete(notice)} className="p-1 rounded-md hover:bg-red-50 transition-colors">
                    <HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Notice' : 'Add Notice'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Notice title"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title (Bangla)</label>
              <input
                type="text"
                value={form.titleBn}
                onChange={(e) => updateField('titleBn', e.target.value)}
                placeholder="বাংলা শিরোনাম"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              rows={3}
              placeholder="Notice content..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Content (Bangla)</label>
            <textarea
              value={form.contentBn}
              onChange={(e) => updateField('contentBn', e.target.value)}
              rows={3}
              placeholder="বাংলা বিষয়বস্তু..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => updateField('type', e.target.value as NoticeType)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="general">General</option>
              <option value="exam">Exam</option>
              <option value="schedule">Schedule</option>
              <option value="admission">Admission</option>
              <option value="result">Result</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Publish Date</label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => updateField('publishDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date</label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => updateField('expiryDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPinned}
                onChange={(e) => updateField('isPinned', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Pinned
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => updateField('isPublished', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              Published
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" loading={saving} onClick={handleSave}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
