'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import { sites } from '@/lib/api';
import { Site } from '@/lib/types';
import Button from '@/components/ui/Button';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2Nmgtdi0yNGg2em0tMTAgMHY2aC02VjI0aDZ6bS0xMCAwdjZINlYyNGg2em0yMCAwdjZoLTZWMjRoNnptMTAgMHY2aC02VjI0aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">&#127891;</span>
            <span className="text-xl font-bold text-white">EdTech Site Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="!text-white hover:!bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="!bg-white !text-blue-700 hover:!bg-blue-50">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-16 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-blue-100 mb-8 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Built for Bangladesh admission coaching market
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Build Your Coaching
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Website in Minutes
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create professional admission coaching websites with our drag-and-drop
            builder. Choose from beautiful templates designed specifically for
            Bangladesh&apos;s education sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50 !px-8 !py-4 !text-lg shadow-xl shadow-blue-900/30">
                Start Building Free
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="ghost" className="!text-white !border !border-white/30 hover:!bg-white/10 !px-8 !py-4 !text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
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
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
              title: 'Beautiful Templates',
              desc: 'Choose from admission, landing, coaching, and premium templates tailored for Bangladesh.',
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Instant Publishing',
              desc: 'Publish your site with one click and share it with students and parents immediately.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>&#127891;</span>
            <span>EdTech Site Builder - Bangladesh</span>
          </div>
          <p className="text-sm text-gray-400">
            Built for admission coaching centers across Bangladesh
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">&#127891;</span>
            <span className="text-xl font-bold text-white">EdTech Site Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Sites</h1>
            <p className="text-gray-600 mt-1">
              Manage and edit your coaching websites
            </p>
          </div>
          <Link href="/templates">
            <Button size="md" className="gap-2">
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
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-4">&#128196;</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No sites yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get started by choosing a template and creating your first
              admission coaching website.
            </p>
            <Link href="/templates">
              <Button size="lg">Choose a Template</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
              >
                {/* Card preview header */}
                <div
                  className="h-32 relative"
                  style={{
                    background: `linear-gradient(135deg, ${site.colorTheme?.primary || '#2563EB'}, ${site.colorTheme?.secondary || '#1E40AF'})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-6xl font-bold">
                      {site.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        site.isPublished
                          ? 'bg-green-500/20 text-green-100 backdrop-blur-sm'
                          : 'bg-white/20 text-white/80 backdrop-blur-sm'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          site.isPublished ? 'bg-green-300' : 'bg-white/60'
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
                      <Button variant="primary" size="sm" className="w-full">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${site.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
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
