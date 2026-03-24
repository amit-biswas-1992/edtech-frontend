'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Site, Course, Exam } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function DashboardPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const [site, setSite] = useState<Site | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const [coursesRes, examsRes] = await Promise.all([
          fetch(`${API}/sites/${siteData.id}/courses`).catch(() => null),
          fetch(`${API}/sites/${siteData.id}/exams`).catch(() => null),
        ]);

        if (coursesRes?.ok) setCourses(await coursesRes.json());
        if (examsRes?.ok) setExams(await examsRes.json());
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <SiteNavigation site={site} currentPath={`/preview/${slug}/dashboard`} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
          My Dashboard
        </h1>

        {/* Enrolled Courses */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            My Enrolled Courses
          </h2>
          {courses.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 mb-3">No courses enrolled yet</p>
              <Link
                href={`/preview/${slug}`}
                className="text-sm font-medium"
                style={{ color: theme.primary }}
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/preview/${slug}/courses/${course.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}15` }}>
                      <span className="text-3xl">&#128218;</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{course.category}</p>
                    {course.duration && (
                      <p className="text-xs text-gray-400 mt-1">{course.duration}</p>
                    )}
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: theme.primary, width: '30%' }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">30% complete</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Exams */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            My Exams
          </h2>
          {activeExams.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500">No exams available</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/preview/${slug}/exams/${exam.id}`}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{exam.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {exam.duration} min | {exam.totalMarks} marks | {exam.questionsPerExam} questions
                      </p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                      exam.type === 'live' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exam.type === 'live' ? 'Live' : 'Practice'}
                    </span>
                  </div>
                  {exam.type === 'live' && exam.startTime && (
                    <p className="text-[10px] text-gray-400 mt-2">
                      Starts: {new Date(exam.startTime).toLocaleString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
