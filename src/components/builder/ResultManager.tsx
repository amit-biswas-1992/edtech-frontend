'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineStar,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Result } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ResultManagerProps {
  siteId: string;
}

const emptyForm = {
  studentName: '',
  studentNameBn: '',
  photo: '',
  university: '',
  universityBn: '',
  department: '',
  admissionYear: new Date().getFullYear().toString(),
  meritPosition: '',
  coachingBatch: '',
  previousInstitution: '',
  testimonial: '',
  isVerified: false,
  isFeatured: false,
};

type ResultForm = typeof emptyForm;

export default function ResultManager({ siteId }: ResultManagerProps) {
  const results = useAppStore((s) => s.results);
  const setResults = useAppStore((s) => s.setResults);
  const resultStats = useAppStore((s) => s.resultStats);
  const setResultStats = useAppStore((s) => s.setResultStats);

  const [loading, setLoading] = useState(true);
  const [filterUni, setFilterUni] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ResultForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const params: { university?: string; year?: string } = {};
      if (filterUni !== 'all') params.university = filterUni;
      if (filterYear !== 'all') params.year = filterYear;

      const [resultsData, statsData] = await Promise.all([
        api.results.getResults(siteId, params),
        api.results.getResultStats(siteId),
      ]);
      setResults(resultsData);
      setResultStats(statsData);
    } catch {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  }, [siteId, filterUni, filterYear, setResults, setResultStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (result: Result) => {
    setEditingId(result.id);
    setForm({
      studentName: result.studentName,
      studentNameBn: result.studentNameBn ?? '',
      photo: result.photo ?? '',
      university: result.university,
      universityBn: result.universityBn ?? '',
      department: result.department ?? '',
      admissionYear: String(result.admissionYear),
      meritPosition: result.meritPosition !== null ? String(result.meritPosition) : '',
      coachingBatch: result.coachingBatch ?? '',
      previousInstitution: result.previousInstitution ?? '',
      testimonial: result.testimonial ?? '',
      isVerified: result.isVerified,
      isFeatured: result.isFeatured,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.studentName.trim() || !form.university.trim()) {
      toast.error('Student name and university are required');
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<Result> = {
        studentName: form.studentName.trim(),
        studentNameBn: form.studentNameBn.trim() || null,
        photo: form.photo.trim() || null,
        university: form.university.trim(),
        universityBn: form.universityBn.trim() || null,
        department: form.department.trim() || null,
        admissionYear: Number(form.admissionYear),
        meritPosition: form.meritPosition ? Number(form.meritPosition) : null,
        coachingBatch: form.coachingBatch.trim() || null,
        previousInstitution: form.previousInstitution.trim() || null,
        testimonial: form.testimonial.trim() || null,
        isVerified: form.isVerified,
        isFeatured: form.isFeatured,
      };

      if (editingId) {
        await api.results.updateResult(siteId, editingId, payload);
        toast.success('Result updated');
      } else {
        await api.results.createResult(siteId, payload);
        toast.success('Result created');
      }
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (result: Result) => {
    if (!confirm(`Delete result for "${result.studentName}"?`)) return;
    try {
      await api.results.deleteResult(siteId, result.id);
      toast.success('Result deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const updateField = (field: keyof ResultForm, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // Unique universities and years for filtering
  const universities = [...new Set(results.map((r) => r.university))];
  const years = [...new Set(results.map((r) => r.admissionYear))].sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Stats Bar */}
      {resultStats && (
        <div className="px-3 py-2 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-sm font-bold text-gray-800">{resultStats.totalAdmitted}</span>
            <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Admitted</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[10px] text-yellow-600 font-semibold">{resultStats.featuredCount} Featured</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {resultStats.byUniversity.slice(0, 4).map((u) => (
              <span key={u.name} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-semibold rounded-full">
                {u.name}: {u.count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Header + Filters */}
      <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-1.5">
        <select
          value={filterUni}
          onChange={(e) => setFilterUni(e.target.value)}
          className="px-2 py-1 text-[10px] rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Universities</option>
          {universities.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-2 py-1 text-[10px] rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
        <div className="ml-auto">
          <button
            onClick={openAdd}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <HiOutlinePlus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No results yet</p>
            <p className="text-xs text-gray-400 mt-1">Add admission results to showcase</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white border border-gray-100 rounded-lg p-2.5 relative group hover:shadow-sm transition-shadow"
              >
                {result.isFeatured && (
                  <HiOutlineStar className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                )}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                    {result.photo ? (
                      <img src={result.photo} alt={result.studentName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400">
                        {result.studentName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-gray-800 truncate">{result.studentName}</div>
                    <div className="text-[9px] text-blue-600 font-medium truncate">{result.university}</div>
                    {result.department && (
                      <div className="text-[9px] text-gray-400 truncate">{result.department}</div>
                    )}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[8px] text-gray-400">{result.admissionYear}</span>
                      {result.meritPosition && (
                        <span className="text-[8px] text-green-600 font-semibold">Merit #{result.meritPosition}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 hidden group-hover:flex gap-0.5">
                  <button onClick={() => openEdit(result)} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                    <HiOutlinePencil className="w-3 h-3 text-gray-400" />
                  </button>
                  <button onClick={() => handleDelete(result)} className="p-1 rounded-md hover:bg-red-50 transition-colors">
                    <HiOutlineTrash className="w-3 h-3 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Result' : 'Add Result'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={(e) => updateField('studentName', e.target.value)}
                placeholder="Student name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name (Bangla)</label>
              <input
                type="text"
                value={form.studentNameBn}
                onChange={(e) => updateField('studentNameBn', e.target.value)}
                placeholder="শিক্ষার্থীর নাম"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Photo URL</label>
            <input
              type="text"
              value={form.photo}
              onChange={(e) => updateField('photo', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.university}
                onChange={(e) => updateField('university', e.target.value)}
                placeholder="e.g. BUET, DMC"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">University (Bangla)</label>
              <input
                type="text"
                value={form.universityBn}
                onChange={(e) => updateField('universityBn', e.target.value)}
                placeholder="বিশ্ববিদ্যালয়"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => updateField('department', e.target.value)}
                placeholder="CSE, EEE..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
              <input
                type="number"
                value={form.admissionYear}
                onChange={(e) => updateField('admissionYear', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Merit #</label>
              <input
                type="number"
                value={form.meritPosition}
                onChange={(e) => updateField('meritPosition', e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Coaching Batch</label>
              <input
                type="text"
                value={form.coachingBatch}
                onChange={(e) => updateField('coachingBatch', e.target.value)}
                placeholder="Batch name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Previous Institution</label>
              <input
                type="text"
                value={form.previousInstitution}
                onChange={(e) => updateField('previousInstitution', e.target.value)}
                placeholder="College name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Testimonial</label>
            <textarea
              value={form.testimonial}
              onChange={(e) => updateField('testimonial', e.target.value)}
              rows={2}
              placeholder="Student testimonial..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isVerified}
                onChange={(e) => updateField('isVerified', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Verified
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => updateField('isFeatured', e.target.checked)}
                className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              Featured
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
