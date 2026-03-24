'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Site } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SignupPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useState(() => {
    fetch(`${API}/sites/${slug}/preview`)
      .then((r) => r.ok ? r.json() : null)
      .then((s) => { setSite(s); setLoading(false); })
      .catch(() => setLoading(false));
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !pin.trim()) { setError('Name, phone, and PIN are required'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/student/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, pin, email: email || undefined, institution: institution || undefined, siteId: site?.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: 'Registration failed' }));
        setError(data.message || 'Registration failed');
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem('student_token', data.access_token);
        localStorage.setItem('student', JSON.stringify(data.user));
      }
      router.push(`/preview/${slug}/dashboard`);
    } catch {
      setError('Network error');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Site not found</p>
      </div>
    );
  }

  const theme = site.colorTheme;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: theme.background }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          {site.logo ? (
            <img src={site.logo} alt={site.name} className="h-14 w-14 mx-auto rounded-lg object-cover mb-2" />
          ) : (
            <div
              className="h-14 w-14 mx-auto rounded-lg flex items-center justify-center text-xl font-bold text-white mb-2"
              style={{ backgroundColor: theme.primary }}
            >
              {site.name.charAt(0)}
            </div>
          )}
          <h1 className="text-xl font-bold" style={{ color: theme.text }}>
            Create Account
          </h1>
          <p className="text-sm mt-1" style={{ color: theme.text, opacity: 0.6 }}>
            Join {site.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-3">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Institution (Optional)</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Your school or college"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">PIN *</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Create a 4-6 digit PIN"
              maxLength={6}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity disabled:opacity-50"
            style={{ backgroundColor: theme.primary }}
          >
            {submitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link href={`/preview/${slug}/login`} className="font-medium" style={{ color: theme.primary }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
