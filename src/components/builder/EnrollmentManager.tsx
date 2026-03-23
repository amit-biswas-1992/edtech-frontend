'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Enrollment, EnrollmentStatus, PaymentStatus } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface EnrollmentManagerProps {
  siteId: string;
}

const statusColors: Record<EnrollmentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  waitlisted: 'bg-orange-100 text-orange-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentColors: Record<PaymentStatus, string> = {
  unpaid: 'bg-gray-100 text-gray-600',
  partial: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
};

export default function EnrollmentManager({ siteId }: EnrollmentManagerProps) {
  const enrollments = useAppStore((s) => s.enrollments);
  const setEnrollments = useAppStore((s) => s.setEnrollments);
  const enrollmentStats = useAppStore((s) => s.enrollmentStats);
  const setEnrollmentStats = useAppStore((s) => s.setEnrollmentStats);
  const courses = useAppStore((s) => s.courses);

  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    status: EnrollmentStatus;
    paymentStatus: PaymentStatus;
    notes: string;
  }>({ status: 'pending', paymentStatus: 'unpaid', notes: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const params: { status?: string; courseId?: string; search?: string } = {};
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterCourse !== 'all') params.courseId = filterCourse;
      if (search.trim()) params.search = search.trim();

      const [enrollmentsData, statsData] = await Promise.all([
        api.enrollments.getEnrollments(siteId, params),
        api.enrollments.getEnrollmentStats(siteId),
      ]);
      setEnrollments(enrollmentsData);
      setEnrollmentStats(statsData);
    } catch {
      toast.error('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  }, [siteId, filterStatus, filterCourse, search, setEnrollments, setEnrollmentStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExpand = (enrollment: Enrollment) => {
    if (expandedId === enrollment.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(enrollment.id);
    setEditForm({
      status: enrollment.status,
      paymentStatus: enrollment.paymentStatus,
      notes: enrollment.notes ?? '',
    });
  };

  const handleUpdateEnrollment = async (id: string) => {
    setSaving(true);
    try {
      await api.enrollments.updateEnrollment(siteId, id, {
        status: editForm.status,
        paymentStatus: editForm.paymentStatus,
        notes: editForm.notes.trim() || null,
      });
      toast.success('Enrollment updated');
      setExpandedId(null);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (enrollment: Enrollment) => {
    if (!confirm(`Delete enrollment for "${enrollment.studentName}"?`)) return;
    try {
      await api.enrollments.deleteEnrollment(siteId, enrollment.id);
      toast.success('Enrollment deleted');
      await fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = enrollmentStats;

  return (
    <div className="flex flex-col h-full">
      {/* Stats Cards */}
      {stats && (
        <div className="px-3 py-2 border-b border-gray-200 grid grid-cols-5 gap-1.5">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-gray-800">{stats.total}</div>
            <div className="text-[9px] text-gray-500 uppercase font-semibold">Total</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-yellow-700">{stats.pending}</div>
            <div className="text-[9px] text-yellow-600 uppercase font-semibold">Pending</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-green-700">{stats.confirmed}</div>
            <div className="text-[9px] text-green-600 uppercase font-semibold">Confirmed</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-orange-700">{stats.waitlisted}</div>
            <div className="text-[9px] text-orange-600 uppercase font-semibold">Waitlisted</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-blue-700">
              ৳{(stats.totalRevenue ?? 0).toLocaleString()}
            </div>
            <div className="text-[9px] text-blue-600 uppercase font-semibold">Revenue</div>
          </div>
        </div>
      )}

      {/* Filter Row */}
      <div className="px-3 py-2 border-b border-gray-100 flex gap-1.5 items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-2 py-1 text-[10px] rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="waitlisted">Waitlisted</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-2 py-1 text-[10px] rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-6 pr-2 py-1 text-[10px] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <HiOutlinePlus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">No enrollments found</p>
            <p className="text-xs text-gray-400 mt-1">Enrollments will appear when students sign up</p>
          </div>
        ) : (
          <div>
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="border-b border-gray-50">
                <div
                  onClick={() => handleExpand(enrollment)}
                  className="px-3 py-2.5 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-800 truncate">
                        {enrollment.studentName}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        {enrollment.studentPhone}
                        {enrollment.course ? ` - ${enrollment.course.title}` : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase ${statusColors[enrollment.status]}`}>
                        {enrollment.status}
                      </span>
                      <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded-full uppercase ${paymentColors[enrollment.paymentStatus]}`}>
                        {enrollment.paymentStatus}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(enrollment); }}
                      className="p-1 rounded-md hover:bg-red-50 transition-colors shrink-0"
                    >
                      <HiOutlineTrash className="w-3 h-3 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {enrollment.batchPreference && (
                      <span className="text-[9px] text-gray-400">Batch: {enrollment.batchPreference}</span>
                    )}
                    <span className="text-[9px] text-gray-300 ml-auto">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Expanded Edit Form */}
                {expandedId === enrollment.id && (
                  <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100">
                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Status</label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as EnrollmentStatus }))}
                            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="waitlisted">Waitlisted</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Payment</label>
                          <select
                            value={editForm.paymentStatus}
                            onChange={(e) => setEditForm((f) => ({ ...f, paymentStatus: e.target.value as PaymentStatus }))}
                            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="partial">Partial</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </div>
                      {enrollment.email && (
                        <div className="text-[10px] text-gray-500">Email: {enrollment.email}</div>
                      )}
                      {enrollment.institution && (
                        <div className="text-[10px] text-gray-500">Institution: {enrollment.institution}</div>
                      )}
                      {enrollment.targetUniversity && (
                        <div className="text-[10px] text-gray-500">Target: {enrollment.targetUniversity}</div>
                      )}
                      {enrollment.transactionId && (
                        <div className="text-[10px] text-gray-500">TxnID: {enrollment.transactionId}</div>
                      )}
                      <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Notes</label>
                        <textarea
                          value={editForm.notes}
                          onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))}
                          rows={2}
                          className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                          placeholder="Add notes..."
                        />
                      </div>
                      <div className="flex justify-end gap-1.5">
                        <Button variant="secondary" size="sm" onClick={() => setExpandedId(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" loading={saving} onClick={() => handleUpdateEnrollment(enrollment.id)}>
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
