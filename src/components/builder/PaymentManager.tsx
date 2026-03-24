'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { Payment, PaymentMethodType, PaymentStatusEnum } from '@/lib/types';

interface PaymentManagerProps {
  siteId: string;
}

const METHOD_COLORS: Record<PaymentMethodType, string> = {
  bkash: 'bg-pink-100 text-pink-700',
  nagad: 'bg-orange-100 text-orange-700',
  cash: 'bg-gray-100 text-gray-700',
  bank: 'bg-blue-100 text-blue-700',
};

const STATUS_COLORS: Record<PaymentStatusEnum, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
};

export default function PaymentManager({ siteId }: PaymentManagerProps) {
  const payments = useAppStore((s) => s.payments);
  const setPayments = useAppStore((s) => s.setPayments);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (payments.length === 0) {
      setLoading(true);
      api.payments.getPayments(siteId).then(setPayments).catch(() => {}).finally(() => setLoading(false));
    }
  }, [siteId, payments.length, setPayments]);

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (filterMethod !== 'all' && p.method !== filterMethod) return false;
      return true;
    });
  }, [payments, filterStatus, filterMethod]);

  const totalRevenue = useMemo(() => payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0), [payments]);
  const pendingCount = payments.filter((p) => p.status === 'pending').length;
  const completedCount = payments.filter((p) => p.status === 'completed').length;
  const failedCount = payments.filter((p) => p.status === 'failed').length;

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.payments.getPayments(siteId);
      setPayments(data);
    } catch { /* empty */ }
    setLoading(false);
  }, [siteId, setPayments]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Payments</h3>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          <div className="bg-green-50 rounded-md px-2 py-1.5 text-center">
            <div className="text-xs font-bold text-green-700">{'\u09F3'}{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-green-600">Revenue</div>
          </div>
          <div className="bg-yellow-50 rounded-md px-2 py-1.5 text-center">
            <div className="text-xs font-bold text-yellow-700">{pendingCount}</div>
            <div className="text-[10px] text-yellow-600">Pending</div>
          </div>
          <div className="bg-green-50 rounded-md px-2 py-1.5 text-center">
            <div className="text-xs font-bold text-green-700">{completedCount}</div>
            <div className="text-[10px] text-green-600">Done</div>
          </div>
          <div className="bg-red-50 rounded-md px-2 py-1.5 text-center">
            <div className="text-xs font-bold text-red-700">{failedCount}</div>
            <div className="text-[10px] text-red-600">Failed</div>
          </div>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-[10px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="text-[10px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Methods</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {loading && payments.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">No payments found.</div>
        ) : (
          filtered.map((payment) => (
            <div key={payment.id} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-900">
                      {'\u09F3'}{payment.amount.toLocaleString()}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${METHOD_COLORS[payment.method]}`}>
                      {payment.method}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${STATUS_COLORS[payment.status]}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {new Date(payment.createdAt).toLocaleString()}
                  </div>
                  {payment.transactionId && (
                    <div className="text-[10px] text-gray-500 mt-0.5 font-mono">
                      TXN: {payment.transactionId}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
