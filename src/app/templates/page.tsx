'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import { templates as templatesApi, sites as sitesApi } from '@/lib/api';
import { Template } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

const categoryGradients: Record<string, string> = {
  admission: 'from-blue-500 to-cyan-500',
  landing: 'from-purple-500 to-pink-500',
  coaching: 'from-emerald-500 to-teal-500',
  premium: 'from-amber-500 to-orange-500',
};

const categoryLabels: Record<string, string> = {
  admission: 'Admission',
  landing: 'Landing Page',
  coaching: 'Coaching',
  premium: 'Premium',
};

type FilterCategory = 'all' | 'admission' | 'landing' | 'coaching' | 'premium';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function TemplatesPage() {
  const router = useRouter();
  const token = useAppStore((s) => s.token);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [siteName, setSiteName] = useState('');
  const [creating, setCreating] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push('/auth/login');
    }
  }, [hydrated, token, router]);

  useEffect(() => {
    if (token) {
      fetchTemplates();
    }
  }, [token]);

  async function fetchTemplates() {
    try {
      const data = await templatesApi.getTemplates();
      setTemplates(data);
    } catch {
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateSite(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate || !siteName.trim()) return;

    setCreating(true);
    try {
      const site = await sitesApi.createSite({
        name: siteName.trim(),
        templateId: selectedTemplate.id,
      });
      toast.success('Site created!');
      router.push(`/builder/${site.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create site');
    } finally {
      setCreating(false);
    }
  }

  const filteredTemplates = activeFilter === 'all'
    ? templates
    : templates.filter((t) => t.category === activeFilter);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'admission', label: 'Admission' },
    { key: 'landing', label: 'Landing' },
    { key: 'coaching', label: 'Coaching' },
    { key: 'premium', label: 'Premium' },
  ];

  if (!hydrated || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient mesh header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        {/* Decorative blobs */}
        <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -top-20 -left-20" />
        <div className="absolute w-80 h-80 bg-purple-400/20 rounded-full blur-3xl -bottom-20 -right-10" />

        <div className="relative z-10">
          {/* Nav */}
          <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-2xl">{'\u{1F393}'}</span>
              <span className="text-xl font-bold text-white">EdTech Site Builder</span>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="sm" className="!rounded-full">
                Back to Dashboard
              </Button>
            </Link>
          </header>

          {/* Title */}
          <div className="text-center px-6 pt-8 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Choose a Template
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Pick a starting point for your coaching website. Each template comes
              with pre-built sections that you can customize to match your brand.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-6 pb-12">
        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-gray-500 text-sm">Loading templates...</span>
            </div>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-4">{'\u{1F4E6}'}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates available</h3>
            <p className="text-gray-600">Templates will appear here once they are added by the admin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredTemplates.map((template, i) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-200 hover:scale-[1.02] transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Template preview - gradient mesh */}
                <div className="h-48 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[template.category] || 'from-gray-400 to-gray-600'}`} />
                  {/* Mesh elements */}
                  <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-10 -right-10 group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-8 -left-8 group-hover:scale-125 transition-transform duration-700" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/70 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {template.defaultSections?.length || 0} sections included
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryGradients[template.category] || 'from-gray-400 to-gray-600'} text-white shadow-lg`}>
                      {categoryLabels[template.category] || template.category}
                    </span>
                  </div>
                </div>

                {/* Template info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                    {template.description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setSiteName('');
                    }}
                    className="w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create site modal */}
      <Modal
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        title="Name Your Site"
      >
        <form onSubmit={handleCreateSite}>
          <p className="text-sm text-gray-600 mb-4">
            Using template:{' '}
            <span className="font-medium text-gray-900">
              {selectedTemplate?.name}
            </span>
          </p>
          <Input
            label="Site name"
            placeholder="e.g., Dhaka Coaching Center"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setSelectedTemplate(null)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={creating} disabled={!siteName.trim()}>
              Create Site
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
