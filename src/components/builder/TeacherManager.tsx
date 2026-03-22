'use client';

import { useEffect, useState, useCallback } from 'react';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Teacher } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface TeacherManagerProps {
  siteId: string;
}

const emptyForm = {
  name: '',
  nameBn: '',
  designation: '',
  designationBn: '',
  subject: '',
  subjectBn: '',
  bio: '',
  bioBn: '',
  image: '',
  phone: '',
  email: '',
  qualifications: [] as string[],
  experience: '',
  isActive: true,
};

type TeacherForm = typeof emptyForm;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const initialsColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-rose-500',
];

function getInitialsColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return initialsColors[Math.abs(hash) % initialsColors.length];
}

export default function TeacherManager({ siteId }: TeacherManagerProps) {
  const teachers = useAppStore((s) => s.teachers);
  const setTeachers = useAppStore((s) => s.setTeachers);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeacherForm>({ ...emptyForm });
  const [qualInput, setQualInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchTeachers = useCallback(async () => {
    try {
      const data = await api.teachers.getTeachers(siteId);
      setTeachers(data);
    } catch {
      toast.error('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  }, [siteId, setTeachers]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setQualInput('');
    setModalOpen(true);
  };

  const openEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setForm({
      name: teacher.name,
      nameBn: teacher.nameBn ?? '',
      designation: teacher.designation ?? '',
      designationBn: teacher.designationBn ?? '',
      subject: teacher.subject ?? '',
      subjectBn: teacher.subjectBn ?? '',
      bio: teacher.bio ?? '',
      bioBn: teacher.bioBn ?? '',
      image: teacher.image ?? '',
      phone: teacher.phone ?? '',
      email: teacher.email ?? '',
      qualifications: teacher.qualifications ?? [],
      experience: teacher.experience ?? '',
      isActive: teacher.isActive,
    });
    setQualInput('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<Teacher> = {
        name: form.name.trim(),
        nameBn: form.nameBn.trim() || null,
        designation: form.designation.trim() || null,
        designationBn: form.designationBn.trim() || null,
        subject: form.subject.trim() || null,
        subjectBn: form.subjectBn.trim() || null,
        bio: form.bio.trim() || null,
        bioBn: form.bioBn.trim() || null,
        image: form.image.trim() || null,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        qualifications: form.qualifications.length > 0 ? form.qualifications : null,
        experience: form.experience.trim() || null,
        isActive: form.isActive,
      };

      if (editingId) {
        await api.teachers.updateTeacher(siteId, editingId, payload);
        toast.success('Teacher updated');
      } else {
        await api.teachers.createTeacher(siteId, payload);
        toast.success('Teacher created');
      }

      setModalOpen(false);
      await fetchTeachers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save teacher');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (teacher: Teacher) => {
    if (!confirm(`Delete "${teacher.name}"? This cannot be undone.`)) return;
    try {
      await api.teachers.deleteTeacher(siteId, teacher.id);
      toast.success('Teacher deleted');
      await fetchTeachers();
    } catch {
      toast.error('Failed to delete teacher');
    }
  };

  const addQualification = () => {
    const val = qualInput.trim();
    if (!val) return;
    if (form.qualifications.includes(val)) {
      toast.error('Already added');
      return;
    }
    setForm((f) => ({ ...f, qualifications: [...f.qualifications, val] }));
    setQualInput('');
  };

  const removeQualification = (index: number) => {
    setForm((f) => ({
      ...f,
      qualifications: f.qualifications.filter((_, i) => i !== index),
    }));
  };

  const updateField = (field: keyof TeacherForm, value: string | boolean) => {
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
          Teachers ({teachers.length})
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {teachers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No teachers yet</p>
            <p className="text-xs text-gray-400 mt-1">Add your first teacher</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-sm transition-shadow group relative"
              >
                {/* Actions */}
                <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(teacher)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher)}
                    className="p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-11 h-11 rounded-full object-cover mb-2"
                    />
                  ) : (
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold mb-2 ${getInitialsColor(teacher.name)}`}
                    >
                      {getInitials(teacher.name)}
                    </div>
                  )}
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                    {teacher.name}
                  </h3>
                  {teacher.nameBn && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{teacher.nameBn}</p>
                  )}
                  {teacher.designation && (
                    <p className="text-[10px] text-gray-500 mt-1">{teacher.designation}</p>
                  )}
                  {teacher.subject && (
                    <p className="text-[10px] text-blue-500 font-medium">{teacher.subject}</p>
                  )}
                  <span
                    className={`inline-block mt-1.5 px-2 py-0.5 text-[9px] font-semibold rounded-full ${
                      teacher.isActive
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {teacher.isActive ? 'Active' : 'Inactive'}
                  </span>
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
        title={editingId ? 'Edit Teacher' : 'Add Teacher'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {/* Name */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Full name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name (Bangla)</label>
              <input
                type="text"
                value={form.nameBn}
                onChange={(e) => updateField('nameBn', e.target.value)}
                placeholder="বাংলা নাম"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Designation */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Designation</label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => updateField('designation', e.target.value)}
                placeholder="e.g. Senior Lecturer"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Designation (Bn)</label>
              <input
                type="text"
                value={form.designationBn}
                onChange={(e) => updateField('designationBn', e.target.value)}
                placeholder="পদবী"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                placeholder="e.g. Physics"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subject (Bn)</label>
              <input
                type="text"
                value={form.subjectBn}
                onChange={(e) => updateField('subjectBn', e.target.value)}
                placeholder="বিষয়"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              placeholder="Brief biography..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Bio (Bangla)</label>
            <textarea
              value={form.bioBn}
              onChange={(e) => updateField('bioBn', e.target.value)}
              placeholder="সংক্ষিপ্ত জীবনী..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => updateField('image', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+880..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Qualifications</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={qualInput}
                onChange={(e) => setQualInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addQualification();
                  }
                }}
                placeholder="e.g. MSc Physics"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addQualification}
                className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            {form.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.qualifications.map((q, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                  >
                    {q}
                    <button
                      type="button"
                      onClick={() => removeQualification(i)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineXMark className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Experience</label>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              placeholder="e.g. 10 years"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
