'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Site } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PaymentSuccessPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params.slug;
  const txn = searchParams.get('txn');

  const [site, setSite] = useState<Site | null>(null);

  useEffect(() => {
    fetch(`${API}/sites/${slug}/preview`)
      .then((r) => r.ok ? r.json() : null)
      .then(setSite)
      .catch(() => {});
  }, [slug]);

  const theme = site?.colorTheme || { primary: '#3B82F6', secondary: '#6366F1', accent: '#38BDF8', background: '#FFFFFF', text: '#1F2937', name: 'Default' };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: theme.background }}>
      <div className="max-w-sm w-full text-center">
        {/* Animated Checkmark */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: `${theme.primary}15` }}
          >
            <svg className="w-12 h-12" style={{ color: theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-6">Your enrollment has been confirmed.</p>

        {txn && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-gray-800">{txn}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href={`/preview/${slug}/dashboard`}
            className="block w-full py-3 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.primary }}
          >
            Go to My Courses
          </Link>
          <Link
            href={`/preview/${slug}`}
            className="block w-full py-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
