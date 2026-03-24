'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Site, Exam, ExamAttempt } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ExamDetailsPage() {
  const params = useParams<{ slug: string; examId: string }>();
  const router = useRouter();
  const { slug, examId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const examRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}`);
        if (examRes.ok) setExam(await examRes.json());

        const attemptsRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}/attempts`);
        if (attemptsRes.ok) setAttempts(await attemptsRes.json());
      } catch { /* empty */ }
      setLoading(false);
    })();
  }, [slug, examId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!site || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Not found</p>
      </div>
    );
  }

  const theme = site.colorTheme;
  const isLive = exam.type === 'live';
  const examPath = isLive ? 'live' : 'practice';

  const canStart = () => {
    if (!exam.isActive) return false;
    if (isLive && exam.startTime && new Date(exam.startTime) > new Date()) return false;
    if (isLive && exam.endTime && new Date(exam.endTime) < new Date()) return false;
    if (exam.maxAttempts && attempts.length >= exam.maxAttempts) return false;
    return true;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <SiteNavigation site={site} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/preview/${slug}/exams`} className="text-sm mb-4 inline-block" style={{ color: theme.primary }}>
          &larr; All Exams
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6" style={{ backgroundColor: `${theme.primary}10` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                isLive ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {isLive ? 'Live Exam' : 'Practice Exam'}
              </span>
              {exam.negativeMarking > 0 && (
                <span className="text-xs px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                  Negative Marking: -{exam.negativeMarking}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold" style={{ color: theme.text }}>{exam.title}</h1>
            {exam.titleBn && <p className="text-gray-500 mt-1">{exam.titleBn}</p>}
            {exam.description && <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exam.description}</p>}
          </div>

          {/* Info Grid */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold" style={{ color: theme.primary }}>{exam.duration}</div>
              <div className="text-xs text-gray-500">Minutes</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold" style={{ color: theme.primary }}>{exam.totalMarks}</div>
              <div className="text-xs text-gray-500">Total Marks</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold" style={{ color: theme.primary }}>{exam.questionsPerExam}</div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold" style={{ color: theme.primary }}>
                {exam.passMarks ?? '-'}
              </div>
              <div className="text-xs text-gray-500">Pass Marks</div>
            </div>
          </div>

          {/* Rules */}
          <div className="px-6 pb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Exam Rules</h3>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
              <li>Duration: {exam.duration} minutes. The exam will auto-submit when time runs out.</li>
              {exam.negativeMarking > 0 && <li>Negative marking of {exam.negativeMarking} per wrong answer.</li>}
              {exam.shuffleQuestions && <li>Questions will be shuffled randomly.</li>}
              {exam.maxAttempts && <li>Maximum {exam.maxAttempts} attempt(s) allowed.</li>}
              {exam.showResult && <li>Results will be shown after submission.</li>}
              <li>You can navigate between questions freely.</li>
              <li>Make sure you have a stable internet connection.</li>
            </ul>
          </div>

          {/* Start Button */}
          <div className="p-6 border-t border-gray-100">
            {canStart() ? (
              <button
                onClick={() => router.push(`/preview/${slug}/exams/${examId}/${examPath}`)}
                className="w-full py-3 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.primary }}
              >
                {isLive ? 'Start Exam' : 'Start Practice'}
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  {!exam.isActive ? 'This exam is currently inactive.' :
                   exam.maxAttempts && attempts.length >= exam.maxAttempts ? 'You have used all attempts.' :
                   isLive && exam.startTime && new Date(exam.startTime) > new Date() ? `Starts at ${new Date(exam.startTime).toLocaleString()}` :
                   'This exam is no longer available.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Past Attempts */}
        {attempts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Past Attempts ({attempts.length})
            </h2>
            <div className="space-y-2">
              {attempts.map((attempt, i) => (
                <Link
                  key={attempt.id}
                  href={`/preview/${slug}/exams/${examId}/result/${attempt.id}`}
                  className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900">Attempt #{attempts.length - i}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(attempt.startedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {attempt.totalScore !== null && (
                      <span className="text-sm font-bold" style={{ color: theme.primary }}>
                        {attempt.totalScore}/{exam.totalMarks}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      attempt.status === 'completed' ? 'bg-green-100 text-green-700' :
                      attempt.status === 'timed_out' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {attempt.status.replace('_', ' ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Link */}
        <div className="mt-4 text-center">
          <Link
            href={`/preview/${slug}/exams/${examId}/leaderboard`}
            className="text-sm font-medium hover:underline"
            style={{ color: theme.primary }}
          >
            View Leaderboard &#8594;
          </Link>
        </div>
      </div>
    </div>
  );
}
