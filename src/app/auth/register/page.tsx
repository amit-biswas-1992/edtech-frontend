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

export default function RegisterPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const [activeTab, setActiveTab] = useState<AuthTab>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [phoneName, setPhoneName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await auth.register(name, email, password);
      login(res.access_token, res.user);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
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
    if (!phoneName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setLoading(true);
    try {
      const fullPhone = phone.startsWith('+') ? phone : `+880${phone}`;
      const res = await auth.phoneRegister(phoneName, fullPhone, pin);
      login(res.access_token, res.user);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    if (!credentialResponse.credential) {
      toast.error('Google sign up failed');
      return;
    }
    setLoading(true);
    try {
      const res = await auth.googleLogin(credentialResponse.credential);
      login(res.access_token, res.user);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Google sign up failed');
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 animate-gradient" />

        {/* Animated blobs */}
        <div
          className="absolute w-72 h-72 bg-pink-400/30 animate-blob"
          style={{ top: '15%', right: '10%', animationDelay: '0s' }}
        />
        <div
          className="absolute w-80 h-80 bg-indigo-300/30 animate-blob"
          style={{ bottom: '10%', left: '5%', animationDelay: '3s' }}
        />
        <div
          className="absolute w-60 h-60 bg-purple-400/20 animate-blob"
          style={{ top: '45%', left: '20%', animationDelay: '5s' }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-24 left-16 text-5xl animate-float opacity-60" style={{ animationDelay: '0s' }}>
          {'\u{1F4DD}'}
        </div>
        <div className="absolute bottom-28 right-20 text-4xl animate-float-slow opacity-50" style={{ animationDelay: '1.5s' }}>
          {'\u{1F680}'}
        </div>
        <div className="absolute top-1/3 left-2/3 text-3xl animate-float opacity-40" style={{ animationDelay: '3s' }}>
          {'\u{1F31F}'}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Join EdTech Builder</h1>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Start building your admission coaching website today. No coding required.
          </p>

          {/* Glassmorphism stat card */}
          <div className="glassmorphism rounded-2xl p-6 max-w-sm">
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-purple-100 text-sm">
              {'\u0995\u09CB\u099A\u09BF\u0982 \u09B8\u09C7\u09A8\u09CD\u099F\u09BE\u09B0 \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE\u09C7'}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3 lg:hidden">{'\u{1F393}'}</div>
            <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">
              Get started building your edtech website
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
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
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>
            )}

            {activeTab === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={phoneName}
                    onChange={(e) => setPhoneName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <PhoneInput
                  label="Phone Number"
                  value={phone}
                  onChange={setPhone}
                />
                <PinInput
                  label="Create a 5-digit PIN"
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
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>
            )}

            {activeTab === 'google' && (
              <div className="flex flex-col items-center gap-6 py-8">
                <p className="text-gray-600 text-center">
                  Sign up with your Google account
                </p>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error('Google sign up failed')}
                  size="large"
                  width="320"
                  theme="outline"
                  shape="pill"
                  text="signup_with"
                />
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
