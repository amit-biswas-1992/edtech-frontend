'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineXMark,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Course, CourseCategory, SyllabusItem } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface CourseManagerProps {
  siteId: string;
}

const categories: { key: CourseCategory | 'all'; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-600' },
  { key: 'engineering', label: 'Engineering', color: 'bg-blue-100 text-blue-700' },
  { key: 'medical', label: 'Medical', color: 'bg-green-100 text-green-700' },
  { key: 'university', label: 'University', color: 'bg-purple-100 text-purple-700' },
  { key: 'hsc', label: 'HSC', color: 'bg-orange-100 text-orange-700' },
  { key: 'ssc', label: 'SSC', color: 'bg-teal-100 text-teal-700' },
];

const categoryColorMap: Record<CourseCategory, string> = {
  engineering: 'bg-blue-100 text-blue-700',
  medical: 'bg-green-100 text-green-700',
  university: 'bg-purple-100 text-purple-700',
  hsc: 'bg-orange-100 text-orange-700',
  ssc: 'bg-teal-100 text-teal-700',
};

const emptyForm = {
  title: '',
  titleBn: '',
  description: '',
  descriptionBn: '',
  category: 'engineering' as CourseCategory,
  duration: '',
  fee: '',
  feeCurrency: 'BDT',
  totalSeats: '',
  schedule: '',
  startDate: '',
  endDate: '',
  thumbnail: '',
  teacherId: '',
  syllabus: [] as SyllabusItem[],
  isActive: true,
};

type CourseForm = typeof emptyForm;

export default function CourseManager({ siteId }: CourseManagerProps) {
  const courses = useAppStore((s) => s.courses);
  const setCourses = useAppStore((s) => s.setCourses);
  const teachers = useAppStore((s) => s.teachers);
  const setTeachers = useAppStore((s) => s.setTeachers);

  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<CourseCategory | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [coursesData, teachersData] = await Promise.all([
        api.courses.getCourses(siteId),
        api.teachers.getTeachers(siteId),
      ]);
      setCourses(coursesData);
      setTeachers(teachersData);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [siteId, setCourses, setTeachers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredCourses =
    filterCategory === 'all'
      ? courses
      : courses.filter((c) => c.category === filterCategory);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      titleBn: course.titleBn ?? '',
      description: course.description ?? '',
      descriptionBn: course.descriptionBn ?? '',
      category: course.category,
      duration: course.duration ?? '',
      fee: course.fee !== null ? String(course.fee) : '',
      feeCurrency: course.feeCurrency || 'BDT',
      totalSeats: course.totalSeats !== null ? String(course.totalSeats) : '',
      schedule: course.schedule ?? '',
      startDate: course.startDate ? course.startDate.split('T')[0] : '',
      endDate: course.endDate ? course.endDate.split('T')[0] : '',
      thumbnail: course.thumbnail ?? '',
      teacherId: course.teacherId ?? '',
      syllabus: course.syllabus ?? [],
      isActive: course.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<Course> = {
        title: form.title.trim(),
        titleBn: form.titleBn.trim() || null,
        description: form.description.trim() || null,
        descriptionBn: form.descriptionBn.trim() || null,
        category: form.category,
        duration: form.duration.trim() || null,
        fee: form.fee ? Number(form.fee) : null,
        feeCurrency: form.feeCurrency || 'BDT',
        totalSeats: form.totalSeats ? Number(form.totalSeats) : null,
        schedule: form.schedule.trim() || null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        thumbnail: form.thumbnail.trim() || null,
        teacherId: form.teacherId || null,
        syllabus: form.syllabus.length > 0 ? form.syllabus : null,
        isActive: form.isActive,
      };

      if (editingId) {
        await api.courses.updateCourse(siteId, editingId, payload);
        toast.success('Course updated');
      } else {
        await api.courses.createCourse(siteId, payload);
        toast.success('Course created');
      }

      setModalOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course: Course) => {
    if (!confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
    try {
      await api.courses.deleteCourse(siteId, course.id);
      toast.success('Course deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete course');
    }
  };

  const handleToggleActive = async (course: Course) => {
    try {
      await api.courses.updateCourse(siteId, course.id, { isActive: !course.isActive });
      await fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const addSyllabusItem = () => {
    setForm((f) => ({
      ...f,
      syllabus: [...f.syllabus, { topic: '', description: '' }],
    }));
  };

  const updateSyllabusItem = (index: number, field: keyof SyllabusItem, value: string) => {
    setForm((f) => ({
      ...f,
      syllabus: f.syllabus.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeSyllabusItem = (index: number) => {
    setForm((f) => ({
      ...f,
      syllabus: f.syllabus.filter((_, i) => i !== index),
    }));
  };

  const updateField = (field: keyof CourseForm, value: string | boolean | CourseCategory) => {
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
          Courses ({filteredCourses.length})
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Category Filter */}
      <div className="px-3 py-2 border-b border-gray-100 flex gap-1.5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilterCategory(cat.key)}
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-full whitespace-nowrap transition-all ${
              filterCategory === cat.key
                ? cat.color + ' ring-1 ring-current/20'
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No courses found</p>
            <p className="text-xs text-gray-400 mt-1">
              {filterCategory !== 'all' ? 'Try a different category' : 'Add your first course'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase">Title</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase">Cat.</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-right">Fee</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-center">Seats</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-center">Status</th>
                <th className="px-2 py-2 text-[10px] font-semibold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <div className="text-xs font-medium text-gray-800 leading-tight truncate max-w-[100px]">
                      {course.title}
                    </div>
                    {course.titleBn && (
                      <div className="text-[10px] text-gray-400 truncate max-w-[100px]">
                        {course.titleBn}
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2.5">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${
                        categoryColorMap[course.category]
                      }`}
                    >
                      {course.category}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    {course.fee !== null ? (
                      <span className="text-xs font-medium text-gray-700">
                        ৳{course.fee.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-300">--</span>
                    )}
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <span className="text-[10px] text-gray-500">
                      {course.enrolledCount}/{course.totalSeats ?? '∞'}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <button
                      onClick={() => handleToggleActive(course)}
                      className={`inline-block w-8 h-4.5 rounded-full relative transition-colors ${
                        course.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${
                          course.isActive ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <button
                        onClick={() => openEdit(course)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(course)}
                        className="p-1 rounded-md hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Course' : 'Add Course'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {/* Title */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Course title"
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

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Course description..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (Bangla)</label>
            <textarea
              value={form.descriptionBn}
              onChange={(e) => updateField('descriptionBn', e.target.value)}
              placeholder="বাংলা বর্ণনা..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value as CourseCategory)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
              <option value="university">University</option>
              <option value="hsc">HSC</option>
              <option value="ssc">SSC</option>
            </select>
          </div>

          {/* Duration, Fee, Currency */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => updateField('duration', e.target.value)}
                placeholder="e.g. 6 months"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Fee</label>
              <input
                type="number"
                value={form.fee}
                onChange={(e) => updateField('fee', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
              <input
                type="text"
                value={form.feeCurrency}
                onChange={(e) => updateField('feeCurrency', e.target.value)}
                placeholder="BDT"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Total Seats */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Total Seats</label>
            <input
              type="number"
              value={form.totalSeats}
              onChange={(e) => updateField('totalSeats', e.target.value)}
              placeholder="Leave empty for unlimited"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Schedule, Start, End */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Schedule</label>
              <input
                type="text"
                value={form.schedule}
                onChange={(e) => updateField('schedule', e.target.value)}
                placeholder="e.g. Sat-Thu"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Thumbnail URL</label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => updateField('thumbnail', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Teacher</label>
            <select
              value={form.teacherId}
              onChange={(e) => updateField('teacherId', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">No teacher assigned</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}{t.subject ? ` (${t.subject})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Syllabus */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-600">Syllabus</label>
              <button
                type="button"
                onClick={addSyllabusItem}
                className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                <HiOutlinePlus className="w-3 h-3" />
                Add Topic
              </button>
            </div>
            {form.syllabus.length === 0 && (
              <p className="text-[10px] text-gray-400 text-center py-2">No syllabus items</p>
            )}
            <div className="space-y-2">
              {form.syllabus.map((item, i) => (
                <div key={i} className="flex gap-2 items-start bg-gray-50 rounded-lg p-2">
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={item.topic}
                      onChange={(e) => updateSyllabusItem(i, 'topic', e.target.value)}
                      placeholder="Topic"
                      className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateSyllabusItem(i, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSyllabusItem(i)}
                    className="p-1 mt-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <HiOutlineXMark className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

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
