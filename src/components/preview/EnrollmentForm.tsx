'use client';

import { useState } from 'react';
import * as api from '@/lib/api';
import type { ColorTheme, Course } from '@/lib/types';

interface EnrollmentFormProps {
  siteId: string;
  courses: Course[];
  colorTheme: ColorTheme;
}

const UNIVERSITIES = [
  'BUET', 'DMC', 'DU', 'JU', 'CU', 'RU', 'KU', 'SUST', 'KUET', 'RUET', 'CUET',
  'BSMMU', 'SSMC', 'MMC', 'RMC', 'CMC', 'SylMC', 'BAU', 'SAU', 'Other',
];

export default function EnrollmentForm({ siteId, courses, colorTheme }: EnrollmentFormProps) {
  const [form, setForm] = useState({
    studentName: '',
    studentPhone: '',
    guardianPhone: '',
    email: '',
    institution: '',
    sscRoll: '',
    hscRoll: '',
    targetUniversity: '',
    batchPreference: '',
    courseId: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.studentPhone.trim()) {
      setError('Name and phone number are required');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await api.enrollments.createEnrollment(siteId, {
        studentName: form.studentName.trim(),
        studentPhone: form.studentPhone.trim(),
        guardianPhone: form.guardianPhone.trim() || null,
        email: form.email.trim() || null,
        institution: form.institution.trim() || null,
        sscRoll: form.sscRoll.trim() || null,
        hscRoll: form.hscRoll.trim() || null,
        targetUniversity: form.targetUniversity || null,
        batchPreference: form.batchPreference || null,
        courseId: form.courseId || null,
      });
      setSuccess(result.id);
      setForm({
        studentName: '', studentPhone: '', guardianPhone: '', email: '',
        institution: '', sscRoll: '', hscRoll: '', targetUniversity: '',
        batchPreference: '', courseId: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="py-16 px-4" id="enroll">
        <div className="max-w-lg mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${colorTheme.primary}15` }}
          >
            <svg className="w-8 h-8" style={{ color: colorTheme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: colorTheme.primary }}>
            Registration Successful!
          </h3>
          <p className="text-xl font-bold mb-1" style={{ color: colorTheme.primary }}>
            নিবন্ধন সফল হয়েছে!
          </p>
          <p className="text-gray-600 mb-2">
            Your enrollment ID: <strong>{success}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            We will contact you shortly. Please save your enrollment ID for future reference.
          </p>
          <button
            onClick={() => setSuccess(null)}
            className="px-6 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: colorTheme.primary }}
          >
            Submit Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" id="enroll">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1" style={{ color: colorTheme.primary }}>
            Enroll Now
          </h2>
          <p className="text-xl font-semibold mb-2" style={{ color: colorTheme.secondary }}>
            এখনই ভর্তি হোন
          </p>
          <p className="text-gray-600 text-sm">
            Fill out the form below to register. We will contact you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name / শিক্ষার্থীর নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={(e) => updateField('studentName', e.target.value)}
                required
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                style={{ ['--tw-ring-color' as string]: colorTheme.primary } as React.CSSProperties}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone / ফোন নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.studentPhone}
                onChange={(e) => updateField('studentPhone', e.target.value)}
                required
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* Guardian Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Phone / অভিভাবকের ফোন
              </label>
              <input
                type="tel"
                value={form.guardianPhone}
                onChange={(e) => updateField('guardianPhone', e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email / ইমেইল
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution / প্রতিষ্ঠান
              </label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) => updateField('institution', e.target.value)}
                placeholder="College / School name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course / কোর্স
              </label>
              <select
                value={form.courseId}
                onChange={(e) => updateField('courseId', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm bg-white"
              >
                <option value="">Select a course</option>
                {courses.filter((c) => c.isActive).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}{c.fee ? ` - ৳${c.fee.toLocaleString()}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* SSC Roll */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SSC Roll / এসএসসি রোল
              </label>
              <input
                type="text"
                value={form.sscRoll}
                onChange={(e) => updateField('sscRoll', e.target.value)}
                placeholder="SSC Roll Number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* HSC Roll */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HSC Roll / এইচএসসি রোল
              </label>
              <input
                type="text"
                value={form.hscRoll}
                onChange={(e) => updateField('hscRoll', e.target.value)}
                placeholder="HSC Roll Number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            {/* Target University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target University / লক্ষ্য বিশ্ববিদ্যালয়
              </label>
              <select
                value={form.targetUniversity}
                onChange={(e) => updateField('targetUniversity', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm bg-white"
              >
                <option value="">Select university</option>
                {UNIVERSITIES.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* Batch Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch / ব্যাচ পছন্দ
              </label>
              <select
                value={form.batchPreference}
                onChange={(e) => updateField('batchPreference', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent text-sm bg-white"
              >
                <option value="">Select batch</option>
                <option value="Morning">Morning / সকাল</option>
                <option value="Evening">Evening / বিকাল</option>
                <option value="Online">Online / অনলাইন</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full py-3 rounded-lg font-bold text-white text-lg transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: colorTheme.primary }}
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>Submit / জমা দিন</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
