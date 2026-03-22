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
import type { Promo, PromoType } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface PromoManagerProps {
  siteId: string;
}

const emptyForm = {
  code: '',
  type: 'percentage' as PromoType,
  value: '',
  minPurchase: '',
  maxDiscount: '',
  description: '',
  descriptionBn: '',
  startDate: '',
  endDate: '',
  usageLimit: '',
  applicableCourseIds: [] as string[],
  isActive: true,
};

type PromoForm = typeof emptyForm;

function getPromoStatus(promo: Promo): {
  label: string;
  color: string;
} {
  if (!promo.isActive) {
    return { label: 'Inactive', color: 'bg-yellow-100 text-yellow-700' };
  }

  const now = new Date();
  const end = new Date(promo.endDate);
  if (end < now) {
    return { label: 'Expired', color: 'bg-red-100 text-red-700' };
  }

  if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
    return { label: 'Depleted', color: 'bg-gray-100 text-gray-500' };
  }

  return { label: 'Active', color: 'bg-green-100 text-green-700' };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
}

export default function PromoManager({ siteId }: PromoManagerProps) {
  const promos = useAppStore((s) => s.promos);
  const setPromos = useAppStore((s) => s.setPromos);
  const courses = useAppStore((s) => s.courses);
  const setCourses = useAppStore((s) => s.setCourses);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromoForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [promosData, coursesData] = await Promise.all([
        api.promos.getPromos(siteId),
        api.courses.getCourses(siteId),
      ]);
      setPromos(promosData);
      setCourses(coursesData);
    } catch {
      toast.error('Failed to load promos');
    } finally {
      setLoading(false);
    }
  }, [siteId, setPromos, setCourses]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (promo: Promo) => {
    setEditingId(promo.id);
    setForm({
      code: promo.code,
      type: promo.type,
      value: String(promo.value),
      minPurchase: promo.minPurchase !== null ? String(promo.minPurchase) : '',
      maxDiscount: promo.maxDiscount !== null ? String(promo.maxDiscount) : '',
      description: promo.description ?? '',
      descriptionBn: promo.descriptionBn ?? '',
      startDate: promo.startDate ? promo.startDate.split('T')[0] : '',
      endDate: promo.endDate ? promo.endDate.split('T')[0] : '',
      usageLimit: promo.usageLimit !== null ? String(promo.usageLimit) : '',
      applicableCourseIds: promo.applicableCourseIds ?? [],
      isActive: promo.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.code.trim()) {
      toast.error('Promo code is required');
      return;
    }
    if (!form.value) {
      toast.error('Value is required');
      return;
    }
    if (!form.startDate || !form.endDate) {
      toast.error('Start and end dates are required');
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<Promo> = {
        code: form.code.trim().toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minPurchase: form.minPurchase ? Number(form.minPurchase) : null,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        description: form.description.trim() || null,
        descriptionBn: form.descriptionBn.trim() || null,
        startDate: form.startDate,
        endDate: form.endDate,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        applicableCourseIds: form.applicableCourseIds.length > 0 ? form.applicableCourseIds : null,
        isActive: form.isActive,
      };

      if (editingId) {
        await api.promos.updatePromo(siteId, editingId, payload);
        toast.success('Promo updated');
      } else {
        await api.promos.createPromo(siteId, payload);
        toast.success('Promo created');
      }

      setModalOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save promo');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (promo: Promo) => {
    if (!confirm(`Delete promo "${promo.code}"? This cannot be undone.`)) return;
    try {
      await api.promos.deletePromo(siteId, promo.id);
      toast.success('Promo deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete promo');
    }
  };

  const toggleCourseId = (courseId: string) => {
    setForm((f) => ({
      ...f,
      applicableCourseIds: f.applicableCourseIds.includes(courseId)
        ? f.applicableCourseIds.filter((id) => id !== courseId)
        : [...f.applicableCourseIds, courseId],
    }));
  };

  const updateField = (field: keyof PromoForm, value: string | boolean | PromoType) => {
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
          Promos ({promos.length})
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {promos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No promos yet</p>
            <p className="text-xs text-gray-400 mt-1">Create your first promo code</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase">Code</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase">Type</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase">Period</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-center">Usage</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-center">Status</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => {
                const status = getPromoStatus(promo);
                return (
                  <tr
                    key={promo.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-bold text-gray-800 font-mono uppercase tracking-wide">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className="text-xs font-medium text-gray-600">
                        {promo.type === 'percentage'
                          ? `${promo.value}%`
                          : `৳${promo.value.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      <div className="text-[10px] text-gray-500 leading-tight">
                        {formatDate(promo.startDate)}
                        <br />
                        {formatDate(promo.endDate)}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="text-[10px] text-gray-500 font-medium">
                        {promo.usedCount}/{promo.usageLimit ?? '∞'}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => openEdit(promo)}
                          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(promo)}
                          className="p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Promo' : 'Add Promo'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {/* Code */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Promo Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => updateField('code', e.target.value.toUpperCase())}
              placeholder="e.g. SUMMER25"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono uppercase tracking-wider"
            />
          </div>

          {/* Type & Value */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => updateField('type', e.target.value as PromoType)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => updateField('value', e.target.value)}
                placeholder={form.type === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Min Purchase & Max Discount */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Min Purchase (৳)</label>
              <input
                type="number"
                value={form.minPurchase}
                onChange={(e) => updateField('minPurchase', e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Max Discount (৳)</label>
              <input
                type="number"
                value={form.maxDiscount}
                onChange={(e) => updateField('maxDiscount', e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="e.g. Summer special discount"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (Bangla)</label>
            <input
              type="text"
              value={form.descriptionBn}
              onChange={(e) => updateField('descriptionBn', e.target.value)}
              placeholder="বাংলা বর্ণনা"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Usage Limit */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Usage Limit</label>
            <input
              type="number"
              value={form.usageLimit}
              onChange={(e) => updateField('usageLimit', e.target.value)}
              placeholder="Leave empty for unlimited"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Applicable Courses */}
          {courses.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Applicable Courses</label>
              <div className="max-h-32 overflow-y-auto space-y-1 border border-gray-200 rounded-lg p-2">
                {courses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.applicableCourseIds.includes(course.id)}
                      onChange={() => toggleCourseId(course.id)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-700 truncate">{course.title}</span>
                  </label>
                ))}
              </div>
              {form.applicableCourseIds.length === 0 && (
                <p className="text-[10px] text-gray-400 mt-1">No courses selected = applies to all</p>
              )}
            </div>
          )}

          {/* Active Toggle */}
          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-medium text-gray-600">Active</label>
            <button
              type="button"
              onClick={() => updateField('isActive', !form.isActive)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${
                form.isActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                  form.isActive ? 'translate-x-[18px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
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
