import { Metadata } from 'next';
import SiteRenderer from '@/components/preview/SiteRenderer';
import PreviewToolbar from '@/components/preview/PreviewToolbar';
import { Course, Notice, Promo, Result, ResultStats, Schedule, Site, Teacher } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ embed?: string }>;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getSite(slug: string): Promise<Site | null> {
  try {
    // Try by slug first, then by subdomain
    let res = await fetch(`${API}/sites/${slug}/preview`, { cache: 'no-store' });
    if (!res.ok) {
      res = await fetch(`${API}/sites/resolve/${slug}`, { cache: 'no-store' });
    }
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getCourses(siteId: string): Promise<Course[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/courses`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getTeachers(siteId: string): Promise<Teacher[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/teachers`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getPromos(siteId: string): Promise<Promo[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/promos?active=true`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getSchedules(siteId: string): Promise<Schedule[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/schedules`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getResults(siteId: string): Promise<Result[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/results`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getResultStats(siteId: string): Promise<ResultStats | null> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/results/stats`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getNotices(siteId: string): Promise<Notice[]> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/notices`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSite(slug);

  if (!site) {
    return { title: 'Site Not Found' };
  }

  return {
    title: site.seoTitle || site.name,
    description: site.seoDescription || `${site.name} - Education Platform`,
    keywords: site.seoKeywords || 'education, admission, Bangladesh',
    openGraph: {
      title: site.seoTitle || site.name,
      description: site.seoDescription || `${site.name} - Education Platform`,
      type: 'website',
    },
  };
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { embed } = await searchParams;
  const isEmbed = embed === '1';
  const site = await getSite(slug);

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Site Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The site you are looking for does not exist or has not been published
            yet.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Fetch dynamic data in parallel
  const [coursesData, teachersData, promosData, schedulesData, resultsData, resultStatsData, noticesData] = await Promise.all([
    getCourses(site.id),
    getTeachers(site.id),
    getPromos(site.id),
    getSchedules(site.id),
    getResults(site.id),
    getResultStats(site.id),
    getNotices(site.id),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.name,
    description: site.seoDescription || `${site.name} - Education Platform`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/preview/${site.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {!isEmbed && <PreviewToolbar siteId={site.id} siteName={site.name} slug={site.slug} />}
      <div className="preview-viewport">
        <SiteRenderer
          site={site}
          courses={coursesData}
          teachers={teachersData}
          promos={promosData}
          schedules={schedulesData}
          results={resultsData}
          resultStats={resultStatsData}
          notices={noticesData}
        />
      </div>
    </>
  );
}
