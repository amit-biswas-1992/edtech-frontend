'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { auth } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import PinInput from '@/components/ui/PinInput';
import PhoneInput from '@/components/ui/PhoneInput';

type AuthTab = 'email' | 'phone' | 'google';

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const [activeTab, setActiveTab] = useState<AuthTab>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.login(email, password);
      login(res.access_token, res.user);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.length !== 5) {
      toast.error('Please enter a 5-digit PIN');
      return;
    }
    setLoading(true);
    try {
      const fullPhone = phone.startsWith('+') ? phone : `+880${phone}`;
      const res = await auth.phoneLogin(fullPhone, pin);
      login(res.access_token, res.user);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (!credentialResponse.credential) {
      toast.error('Google login failed');
      return;
    }
    setLoading(true);
    try {
      const res = await auth.googleLogin(credentialResponse.credential);
      login(res.access_token, res.user);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Google login failed');
    } finally {
      setLoading(false);
    }
  }

  const tabs: { key: AuthTab; label: string; icon: string }[] = [
    { key: 'email', label: 'Email', icon: '\u{1F4E7}' },
    { key: 'phone', label: 'Phone', icon: '\u{1F4F1}' },
    { key: 'google', label: 'Google', icon: 'G' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel - animated gradient with glassmorphism */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 animate-gradient" />

        {/* Animated blobs */}
        <div
          className="absolute w-80 h-80 bg-blue-400/30 animate-blob"
          style={{ top: '10%', left: '10%', animationDelay: '0s' }}
        />
        <div
          className="absolute w-72 h-72 bg-purple-400/30 animate-blob"
          style={{ top: '50%', right: '5%', animationDelay: '2s' }}
        />
        <div
          className="absolute w-64 h-64 bg-indigo-300/20 animate-blob"
          style={{ bottom: '10%', left: '30%', animationDelay: '4s' }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-60" style={{ animationDelay: '1s' }}>
          {'\u{1F393}'}
        </div>
        <div className="absolute bottom-32 left-16 text-4xl animate-float-slow opacity-50" style={{ animationDelay: '2s' }}>
          {'\u{1F4DA}'}
        </div>
        <div className="absolute top-1/2 right-12 text-3xl animate-float opacity-40" style={{ animationDelay: '3s' }}>
          {'\u2B50'}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">EdTech Builder</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Build professional admission coaching websites for Bangladesh in minutes.
          </p>

          {/* Glassmorphism stat card */}
          <div className="glassmorphism rounded-2xl p-6 max-w-sm">
            <div className="text-3xl font-bold mb-1">10,000+</div>
            <div className="text-blue-100 text-sm">
              {'\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0 \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AC\u09BF\u09B6\u09CD\u09AC\u09BE\u09B8 \u0995\u09B0\u09C7'}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3 lg:hidden">{'\u{1F393}'}</div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">
              Sign in to manage your edtech websites
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-full mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-xs">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={activeTab} className="animate-fade-in-up">
            {activeTab === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>
            )}

            {activeTab === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <PhoneInput
                  label="Phone Number"
                  value={phone}
                  onChange={setPhone}
                />
                <PinInput
                  label="Enter 5-digit PIN"
                  value={pin}
                  onChange={setPin}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>
            )}

            {activeTab === 'google' && (
              <div className="flex flex-col items-center gap-6 py-8">
                <p className="text-gray-600 text-center">
                  Sign in with your Google account
                </p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error('Google login failed')}
                  size="large"
                  width="320"
                  theme="outline"
                  shape="pill"
                />
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
