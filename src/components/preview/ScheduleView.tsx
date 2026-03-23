'use client';

import { useState } from 'react';
import type { ColorTheme, Schedule, DayOfWeek } from '@/lib/types';

interface ScheduleViewProps {
  schedules: Schedule[];
  colorTheme: ColorTheme;
}

const DAYS: { key: DayOfWeek; label: string; labelBn: string }[] = [
  { key: 'saturday', label: 'Saturday', labelBn: 'শনিবার' },
  { key: 'sunday', label: 'Sunday', labelBn: 'রবিবার' },
  { key: 'monday', label: 'Monday', labelBn: 'সোমবার' },
  { key: 'tuesday', label: 'Tuesday', labelBn: 'মঙ্গলবার' },
  { key: 'wednesday', label: 'Wednesday', labelBn: 'বুধবার' },
  { key: 'thursday', label: 'Thursday', labelBn: 'বৃহস্পতিবার' },
  { key: 'friday', label: 'Friday', labelBn: 'শুক্রবার' },
];

const COURSE_BG_COLORS = [
  { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
  { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  { bg: '#FDF4FF', border: '#E9D5FF', text: '#7E22CE' },
  { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
  { bg: '#F0FDFA', border: '#99F6E4', text: '#0F766E' },
  { bg: '#FDF2F8', border: '#FBCFE8', text: '#BE185D' },
];

export default function ScheduleView({ schedules, colorTheme }: ScheduleViewProps) {
  const [mobileDay, setMobileDay] = useState<DayOfWeek>('saturday');

  const activeSchedules = schedules.filter((s) => s.isActive);

  // Build course color map
  const courseIds = [...new Set(activeSchedules.filter((s) => s.courseId).map((s) => s.courseId!))];
  const courseColorMap: Record<string, typeof COURSE_BG_COLORS[0]> = {};
  courseIds.forEach((id, i) => {
    courseColorMap[id] = COURSE_BG_COLORS[i % COURSE_BG_COLORS.length];
  });

  // Get unique time slots sorted
  const timeSlots = [...new Set(activeSchedules.map((s) => s.startTime))].sort();

  const getSchedulesForSlot = (day: DayOfWeek, time: string) => {
    return activeSchedules.filter((s) => s.dayOfWeek === day && s.startTime === time);
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const daysWithSchedules = DAYS.filter((d) =>
    activeSchedules.some((s) => s.dayOfWeek === d.key)
  );

  if (activeSchedules.length === 0) return null;

  return (
    <section className="py-16 px-4" id="schedule">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-1" style={{ color: colorTheme.primary }}>
            Class Schedule
          </h2>
          <p className="text-xl font-semibold mb-2" style={{ color: colorTheme.secondary }}>
            ক্লাসের সময়সূচী
          </p>
        </div>

        {/* Desktop: Full Grid */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-500 border-b-2" style={{ borderColor: colorTheme.primary }}>
                  Time
                </th>
                {daysWithSchedules.map((day) => (
                  <th
                    key={day.key}
                    className="p-3 text-center text-sm font-semibold border-b-2"
                    style={{ borderColor: colorTheme.primary, color: colorTheme.primary }}
                  >
                    <div>{day.label}</div>
                    <div className="text-xs font-normal opacity-70">{day.labelBn}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-b border-gray-100">
                  <td className="p-3 text-sm font-mono text-gray-500 whitespace-nowrap">
                    {formatTime(time)}
                  </td>
                  {daysWithSchedules.map((day) => {
                    const items = getSchedulesForSlot(day.key, time);
                    return (
                      <td key={day.key} className="p-2">
                        {items.map((item) => {
                          const colors = item.courseId ? courseColorMap[item.courseId] : { bg: '#F3F4F6', border: '#D1D5DB', text: '#374151' };
                          return (
                            <div
                              key={item.id}
                              className="rounded-lg p-2.5 mb-1 border"
                              style={{
                                backgroundColor: colors?.bg,
                                borderColor: colors?.border,
                                color: colors?.text,
                              }}
                            >
                              <div className="font-semibold text-sm">{item.title}</div>
                              {item.titleBn && (
                                <div className="text-xs opacity-80">{item.titleBn}</div>
                              )}
                              <div className="text-xs mt-1 opacity-70">
                                {formatTime(item.startTime)} - {formatTime(item.endTime)}
                              </div>
                              {item.teacher && (
                                <div className="text-xs mt-0.5 opacity-70">{item.teacher.name}</div>
                              )}
                              {item.room && (
                                <div className="text-xs opacity-60">Room: {item.room}</div>
                              )}
                              {item.batchName && (
                                <div className="text-xs opacity-60">{item.batchName}</div>
                              )}
                            </div>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Day-by-Day Accordion */}
        <div className="md:hidden">
          <div className="flex gap-1 overflow-x-auto mb-4 pb-1">
            {daysWithSchedules.map((day) => (
              <button
                key={day.key}
                onClick={() => setMobileDay(day.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mobileDay === day.key ? 'text-white' : 'bg-gray-100 text-gray-600'
                }`}
                style={mobileDay === day.key ? { backgroundColor: colorTheme.primary } : {}}
              >
                {day.label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {activeSchedules
              .filter((s) => s.dayOfWeek === mobileDay)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((item) => {
                const colors = item.courseId ? courseColorMap[item.courseId] : { bg: '#F3F4F6', border: '#D1D5DB', text: '#374151' };
                return (
                  <div
                    key={item.id}
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: colors?.bg,
                      borderColor: colors?.border,
                      color: colors?.text,
                    }}
                  >
                    <div className="font-bold text-base">{item.title}</div>
                    {item.titleBn && <div className="text-sm opacity-80">{item.titleBn}</div>}
                    <div className="text-sm mt-2 opacity-70">
                      {formatTime(item.startTime)} - {formatTime(item.endTime)}
                    </div>
                    {item.teacher && (
                      <div className="text-sm mt-1 opacity-70">Teacher: {item.teacher.name}</div>
                    )}
                    {item.room && <div className="text-sm opacity-60">Room: {item.room}</div>}
                    {item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-medium underline"
                      >
                        Join Online
                      </a>
                    )}
                  </div>
                );
              })}
            {activeSchedules.filter((s) => s.dayOfWeek === mobileDay).length === 0 && (
              <p className="text-center text-gray-400 py-6 text-sm">No classes on this day</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
