'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Site, Exam } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ExamsListPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [site, setSite] = useState<Site | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const examsRes = await fetch(`${API}/sites/${siteData.id}/exams`);
        if (examsRes.ok) setExams(await examsRes.json());
      } catch { /* empty */ }
      setLoading(false);
    })();
  }, [slug]);

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
  const activeExams = exams.filter((e) => e.isActive);
  const liveExams = activeExams.filter((e) => e.type === 'live');
  const practiceExams = activeExams.filter((e) => e.type === 'practice');

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <SiteNavigation site={site} currentPath={`/preview/${slug}/exams`} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>Exams</h1>
        <p className="text-gray-500 mb-8">Test your knowledge with live and practice exams</p>

        {/* Live Exams */}
        {liveExams.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.text }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live Exams
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/preview/${slug}/exams/${exam.id}`}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">&#9201;</span>
                    <span className="text-[10px] px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      LIVE
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{exam.title}</h3>
                  {exam.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{exam.description}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.duration}</div>
                      <div className="text-[10px] text-gray-400">min</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.totalMarks}</div>
                      <div className="text-[10px] text-gray-400">marks</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.questionsPerExam}</div>
                      <div className="text-[10px] text-gray-400">Qs</div>
                    </div>
                  </div>
                  {exam.startTime && (
                    <div className="mt-3 text-[10px] text-gray-400 text-center">
                      {new Date(exam.startTime).toLocaleString()}
                    </div>
                  )}
                  <button
                    className="w-full mt-3 py-2 text-xs font-semibold text-white rounded-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Start Exam
                  </button>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Practice Exams */}
        {practiceExams.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.text }}>
              <span className="text-lg">&#129513;</span>
              Practice Exams
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/preview/${slug}/exams/${exam.id}`}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">&#129513;</span>
                    <span className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      PRACTICE
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{exam.title}</h3>
                  {exam.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{exam.description}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.duration}</div>
                      <div className="text-[10px] text-gray-400">min</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.totalMarks}</div>
                      <div className="text-[10px] text-gray-400">marks</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs font-bold text-gray-800">{exam.questionsPerExam}</div>
                      <div className="text-[10px] text-gray-400">Qs</div>
                    </div>
                  </div>
                  <button
                    className="w-full mt-3 py-2 text-xs font-semibold text-white rounded-lg"
                    style={{ backgroundColor: theme.accent }}
                  >
                    Practice Now
                  </button>
                </Link>
              ))}
            </div>
          </section>
        )}

        {activeExams.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">&#128221;</span>
            <p className="text-gray-500">No exams available right now</p>
          </div>
        )}
      </div>
    </div>
  );
}
