'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import { sites } from '@/lib/api';
import { Site } from '@/lib/types';
import Button from '@/components/ui/Button';

function LandingPage() {
  const featureRef = useRef<HTMLDivElement>(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Full viewport */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />

        {/* Animated blobs for mesh effect */}
        <div
          className="absolute w-[600px] h-[600px] bg-blue-500/30 animate-blob blur-3xl"
          style={{ top: '-10%', left: '-5%', animationDelay: '0s' }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-indigo-500/25 animate-blob blur-3xl"
          style={{ top: '30%', right: '-5%', animationDelay: '2s' }}
        />
        <div
          className="absolute w-[550px] h-[550px] bg-purple-500/20 animate-blob blur-3xl"
          style={{ bottom: '-10%', left: '30%', animationDelay: '4s' }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Nav bar - glassmorphism */}
        <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3 glassmorphism rounded-full px-5 py-2">
            <span className="text-2xl">{'\u{1F393}'}</span>
            <span className="text-lg font-bold text-white">EdTech Site Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="!text-white hover:!bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="!bg-white !text-blue-700 hover:!bg-blue-50 !rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism text-sm text-blue-100 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Built for Bangladesh admission coaching market
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-gradient">
              Build Your Coaching
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '1s' }}>
              Website in Minutes
            </span>
          </h1>

          <p className="text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create professional admission coaching websites with our drag-and-drop
            builder. Choose from beautiful templates designed specifically for
            Bangladesh&apos;s education sector.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-white text-blue-700 font-semibold text-lg rounded-full shadow-xl shadow-blue-900/30 hover:bg-blue-50 hover:scale-105 transition-all duration-300">
                Start Building Free
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-8 py-4 glassmorphism text-white font-semibold text-lg rounded-full hover:bg-white/20 transition-all duration-300">
                Watch Demo
              </button>
            </Link>
          </div>

          {/* Animated scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll">
            <svg className="w-6 h-10 text-white/50" fill="none" viewBox="0 0 24 40">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-bounce" />
            </svg>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div ref={featureRef} className="max-w-6xl mx-auto px-6 lg:px-12 py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to go online
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From templates to publishing, we handle the technical stuff so you
            can focus on what matters - your students.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              ),
              title: 'Drag & Drop Builder',
              desc: 'Rearrange sections, change designs, and customize content with an intuitive visual editor.',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
              title: 'Beautiful Templates',
              desc: 'Choose from admission, landing, coaching, and premium templates tailored for Bangladesh.',
              gradient: 'from-purple-500 to-pink-500',
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Instant Publishing',
              desc: 'Publish your site with one click and share it with students and parents immediately.',
              gradient: 'from-emerald-500 to-teal-500',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SOCIAL PROOF STATS */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: '10,000+', label: '\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0' },
            { num: '500+', label: '\u0995\u09CB\u099A\u09BF\u0982 \u09B8\u09C7\u09A8\u09CD\u099F\u09BE\u09B0' },
            { num: '95%', label: '\u09B8\u09A8\u09CD\u09A4\u09C1\u09B7\u09CD\u099F\u09BF' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
                {stat.num}
              </div>
              <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>{'\u{1F393}'}</span>
            <span>EdTech Site Builder - Bangladesh</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2025 EdTech Site Builder
          </p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [mySites, setMySites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSites();
  }, []);

  async function fetchSites() {
    try {
      const data = await sites.getSites();
      setMySites(data);
    } catch {
      toast.error('Failed to load sites');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(siteId: string, siteName: string) {
    if (!confirm(`Are you sure you want to delete "${siteName}"? This action cannot be undone.`)) {
      return;
    }
    setDeletingId(siteId);
    try {
      await sites.deleteSite(siteId);
      setMySites((prev) => prev.filter((s) => s.id !== siteId));
      toast.success('Site deleted');
    } catch {
      toast.error('Failed to delete site');
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout() {
    logout();
    router.push('/');
  }

  const publishedCount = mySites.filter((s) => s.isPublished).length;
  const draftCount = mySites.filter((s) => !s.isPublished).length;

  const initials = user?.name
    ?.split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{'\u{1F393}'}</span>
            <span className="text-xl font-bold text-white">EdTech Site Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-white/30" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white/30">
                  {initials}
                </div>
              )}
              <span className="text-white text-sm font-medium">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="!text-white/80 hover:!text-white hover:!bg-white/10"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Sites', value: mySites.length, gradient: 'from-blue-500 to-cyan-500', icon: '\u{1F4CA}' },
            { label: 'Published', value: publishedCount, gradient: 'from-emerald-500 to-teal-500', icon: '\u2705' },
            { label: 'Drafts', value: draftCount, gradient: 'from-amber-500 to-orange-500', icon: '\u{1F4DD}' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {'\u{1F44B}'} Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and edit your coaching websites
            </p>
          </div>
          <Link href="/templates">
            <Button size="md" className="gap-2 !bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !rounded-xl !shadow-lg !shadow-blue-600/25">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Site
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-gray-500 text-sm">Loading your sites...</span>
            </div>
          </div>
        ) : mySites.length === 0 ? (
          <div className="relative text-center py-24 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
            {/* Floating decorative elements */}
            <div className="absolute top-8 left-12 text-4xl animate-float opacity-30">{'\u{1F4DA}'}</div>
            <div className="absolute bottom-8 right-16 text-3xl animate-float-slow opacity-25">{'\u{1F393}'}</div>
            <div className="absolute top-16 right-24 text-2xl animate-float opacity-20" style={{ animationDelay: '2s' }}>{'\u2B50'}</div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">{'\u{1F680}'}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sites yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get started by choosing a template and creating your first
                admission coaching website.
              </p>
              <Link href="/templates">
                <Button size="lg" className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 !rounded-xl !shadow-lg !shadow-blue-600/25">
                  Choose a Template
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Card preview header - gradient mesh */}
                <div className="h-32 relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${site.colorTheme?.primary || '#2563EB'}, ${site.colorTheme?.secondary || '#1E40AF'})`,
                    }}
                  />
                  <div
                    className="absolute w-40 h-40 rounded-full opacity-20 -top-10 -right-10"
                    style={{ backgroundColor: site.colorTheme?.accent || '#F59E0B' }}
                  />
                  <div
                    className="absolute w-32 h-32 rounded-full opacity-15 -bottom-8 -left-8"
                    style={{ backgroundColor: site.colorTheme?.secondary || '#1E40AF' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-6xl font-bold">
                      {site.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        site.isPublished
                          ? 'bg-green-500/20 text-green-100 backdrop-blur-sm shadow-lg shadow-green-500/20'
                          : 'bg-white/20 text-white/80 backdrop-blur-sm shadow-lg shadow-amber-500/10'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          site.isPublished ? 'bg-green-300 animate-pulse' : 'bg-amber-300'
                        }`}
                      />
                      {site.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                    {site.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {site.template?.name && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {site.template.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(site.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Link href={`/builder/${site.id}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full !rounded-lg">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${site.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full !rounded-lg">
                        Preview
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!text-red-500 hover:!bg-red-50 hover:!text-red-600 !px-2"
                      onClick={() => handleDelete(site.id, site.name)}
                      loading={deletingId === site.id}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function HomePage() {
  const user = useAppStore((s) => s.user);
  const token = useAppStore((s) => s.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (user && token) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
