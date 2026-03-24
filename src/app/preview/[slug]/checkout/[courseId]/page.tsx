'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Site, Course } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CheckoutPage() {
  const params = useParams<{ slug: string; courseId: string }>();
  const router = useRouter();
  const { slug, courseId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const courseRes = await fetch(`${API}/sites/${siteData.id}/courses/${courseId}`);
        if (courseRes.ok) {
          setCourse(await courseRes.json());
        }
      } catch { /* empty */ }
      setLoading(false);
    })();
  }, [slug, courseId]);

  const validatePromo = useCallback(async () => {
    if (!promoCode.trim() || !site) return;
    setValidatingPromo(true);
    try {
      const res = await fetch(`${API}/sites/${site.id}/promos/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode }),
      });
      if (res.ok) {
        const data = await res.json();
        setPromoValid(data.valid);
        setPromoDiscount(data.valid ? data.discount : 0);
      } else {
        setPromoValid(false);
        setPromoDiscount(0);
      }
    } catch {
      setPromoValid(false);
    }
    setValidatingPromo(false);
  }, [promoCode, site]);

  const handlePay = useCallback(async () => {
    if (!site || !course) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/sites/${site.id}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          method: paymentMethod,
          promoCode: promoValid ? promoCode : undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          router.push(`/preview/${slug}/payment/success?txn=${data.paymentId}`);
        }
      } else {
        router.push(`/preview/${slug}/payment/fail`);
      }
    } catch {
      router.push(`/preview/${slug}/payment/fail`);
    }
    setSubmitting(false);
  }, [site, course, paymentMethod, promoCode, promoValid, slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!site || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Not found</p>
      </div>
    );
  }

  const theme = site.colorTheme;
  const courseFee = course.fee || 0;
  const total = Math.max(0, courseFee - promoDiscount);

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: theme.background }}>
      <div className="max-w-lg mx-auto">
        <Link href={`/preview/${slug}/courses/${courseId}`} className="text-sm mb-4 inline-block" style={{ color: theme.primary }}>
          &larr; Back to Course
        </Link>

        <h1 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>Checkout</h1>

        {/* Course Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <h2 className="font-semibold text-gray-900 mb-1">{course.title}</h2>
          {course.teacher && <p className="text-xs text-gray-500">by {course.teacher.name}</p>}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">Course Fee</span>
            <span className="text-lg font-bold" style={{ color: theme.primary }}>
              {'\u09F3'}{courseFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoValid(null); }}
              placeholder="ENTER CODE"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            <button
              onClick={validatePromo}
              disabled={validatingPromo || !promoCode.trim()}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50"
              style={{ backgroundColor: theme.primary }}
            >
              {validatingPromo ? '...' : 'Apply'}
            </button>
          </div>
          {promoValid === true && (
            <p className="text-xs text-green-600 mt-1">
              Discount applied: -{'\u09F3'}{promoDiscount.toLocaleString()}
            </p>
          )}
          {promoValid === false && (
            <p className="text-xs text-red-600 mt-1">Invalid promo code</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-3">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('bkash')}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">bKash</div>
              <div className="text-[10px] text-gray-500">Mobile Payment</div>
            </button>
            <button
              onClick={() => setPaymentMethod('nagad')}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">Nagad</div>
              <div className="text-[10px] text-gray-500">Mobile Payment</div>
            </button>
          </div>
        </div>

        {/* Total + Pay */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span>{'\u09F3'}{courseFee.toLocaleString()}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex items-center justify-between mb-4 text-green-600">
              <span>Discount</span>
              <span>-{'\u09F3'}{promoDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold" style={{ color: theme.primary }}>
              {'\u09F3'}{total.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={submitting}
            className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-opacity disabled:opacity-50 hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            {submitting ? 'Processing...' : `Pay ${'\u09F3'}${total.toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
