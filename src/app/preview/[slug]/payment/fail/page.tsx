'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Site } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PaymentFailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

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
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
          Payment Failed
        </h1>
        <p className="text-gray-500 mb-8">
          Something went wrong with your payment. Please try again.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="block w-full py-3 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.primary }}
          >
            Try Again
          </button>
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
