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
import type { Schedule, DayOfWeek } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ScheduleManagerProps {
  siteId: string;
}

const DAYS: { key: DayOfWeek; label: string; short: string }[] = [
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
];

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

const COURSE_COLORS = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-green-100 border-green-300 text-green-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-teal-100 border-teal-300 text-teal-800',
  'bg-pink-100 border-pink-300 text-pink-800',
  'bg-indigo-100 border-indigo-300 text-indigo-800',
  'bg-yellow-100 border-yellow-300 text-yellow-800',
];

const emptyForm = {
  title: '',
  titleBn: '',
  dayOfWeek: 'saturday' as DayOfWeek,
  startTime: '09:00',
  endTime: '10:00',
  courseId: '',
  teacherId: '',
  room: '',
  meetingLink: '',
  batchName: '',
  isActive: true,
};

type ScheduleForm = typeof emptyForm;

export default function ScheduleManager({ siteId }: ScheduleManagerProps) {
  const schedules = useAppStore((s) => s.schedules);
  const setSchedules = useAppStore((s) => s.setSchedules);
  const courses = useAppStore((s) => s.courses);
  const teachers = useAppStore((s) => s.teachers);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ScheduleForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const courseColorMap: Record<string, string> = {};
  courses.forEach((c, i) => {
    courseColorMap[c.id] = COURSE_COLORS[i % COURSE_COLORS.length];
  });

  const fetchData = useCallback(async () => {
    try {
      const data = await api.schedules.getSchedules(siteId);
      setSchedules(data);
    } catch {
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  }, [siteId, setSchedules]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setForm({
      title: schedule.title,
      titleBn: schedule.titleBn ?? '',
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      courseId: schedule.courseId ?? '',
      teacherId: schedule.teacherId ?? '',
      room: schedule.room ?? '',
      meetingLink: schedule.meetingLink ?? '',
      batchName: schedule.batchName ?? '',
      isActive: schedule.isActive,
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
      const payload: Partial<Schedule> = {
        title: form.title.trim(),
        titleBn: form.titleBn.trim() || null,
        dayOfWeek: form.dayOfWeek,
        startTime: form.startTime,
        endTime: form.endTime,
        courseId: form.courseId || null,
        teacherId: form.teacherId || null,
        room: form.room.trim() || null,
        meetingLink: form.meetingLink.trim() || null,
        batchName: form.batchName.trim() || null,
        isActive: form.isActive,
      };

      if (editingId) {
        await api.schedules.updateSchedule(siteId, editingId, payload);
        toast.success('Schedule updated');
      } else {
        await api.schedules.createSchedule(siteId, payload);
        toast.success('Schedule created');
      }
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (schedule: Schedule) => {
    if (!confirm(`Delete "${schedule.title}"?`)) return;
    try {
      await api.schedules.deleteSchedule(siteId, schedule.id);
      toast.success('Schedule deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const updateField = (field: keyof ScheduleForm, value: string | boolean | DayOfWeek) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const getScheduleForSlot = (day: DayOfWeek, time: string): Schedule[] => {
    return schedules.filter((s) => {
      if (s.dayOfWeek !== day) return false;
      const startHour = parseInt(s.startTime.split(':')[0]);
      const slotHour = parseInt(time.split(':')[0]);
      return startHour === slotHour;
    });
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
          Schedule ({schedules.length})
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <HiOutlinePlus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Timetable Grid */}
      <div className="flex-1 overflow-auto">
        {schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No schedules yet</p>
            <p className="text-xs text-gray-400 mt-1">Add class schedules for the timetable</p>
          </div>
        ) : (
          <div className="min-w-[600px]">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="px-1 py-1.5 text-[9px] font-semibold text-gray-400 uppercase">Time</div>
              {DAYS.map((day) => (
                <div key={day.key} className="px-1 py-1.5 text-[9px] font-semibold text-gray-400 uppercase text-center">
                  {day.short}
                </div>
              ))}
            </div>

            {/* Time Rows */}
            {TIME_SLOTS.map((time) => {
              const hasAny = DAYS.some((d) => getScheduleForSlot(d.key, time).length > 0);
              if (!hasAny) return null;
              return (
                <div key={time} className="grid grid-cols-8 border-b border-gray-50 min-h-[40px]">
                  <div className="px-1 py-1 text-[9px] text-gray-400 font-mono">{time}</div>
                  {DAYS.map((day) => {
                    const items = getScheduleForSlot(day.key, time);
                    return (
                      <div key={day.key} className="px-0.5 py-0.5">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`rounded p-1 border text-[8px] leading-tight mb-0.5 cursor-pointer group relative ${
                              item.courseId && courseColorMap[item.courseId]
                                ? courseColorMap[item.courseId]
                                : 'bg-gray-100 border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="font-semibold truncate">{item.title}</div>
                            {item.teacher && (
                              <div className="truncate opacity-70">{item.teacher.name}</div>
                            )}
                            {item.room && (
                              <div className="truncate opacity-60">{item.room}</div>
                            )}
                            <div className="absolute top-0 right-0 hidden group-hover:flex gap-0.5 bg-white rounded shadow p-0.5">
                              <button onClick={() => openEdit(item)} className="p-0.5 hover:bg-gray-100 rounded">
                                <HiOutlinePencil className="w-2.5 h-2.5 text-gray-500" />
                              </button>
                              <button onClick={() => handleDelete(item)} className="p-0.5 hover:bg-red-50 rounded">
                                <HiOutlineTrash className="w-2.5 h-2.5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Schedule' : 'Add Schedule'}
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
                placeholder="Class title"
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Day of Week</label>
            <select
              value={form.dayOfWeek}
              onChange={(e) => updateField('dayOfWeek', e.target.value as DayOfWeek)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {DAYS.map((d) => (
                <option key={d.key} value={d.key}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => updateField('startTime', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => updateField('endTime', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Course</label>
            <select
              value={form.courseId}
              onChange={(e) => updateField('courseId', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">No course assigned</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Teacher</label>
            <select
              value={form.teacherId}
              onChange={(e) => updateField('teacherId', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">No teacher assigned</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}{t.subject ? ` (${t.subject})` : ''}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Room</label>
              <input
                type="text"
                value={form.room}
                onChange={(e) => updateField('room', e.target.value)}
                placeholder="Room 101"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Batch</label>
              <input
                type="text"
                value={form.batchName}
                onChange={(e) => updateField('batchName', e.target.value)}
                placeholder="Morning Batch"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Meeting Link</label>
            <input
              type="text"
              value={form.meetingLink}
              onChange={(e) => updateField('meetingLink', e.target.value)}
              placeholder="https://meet.google.com/..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
