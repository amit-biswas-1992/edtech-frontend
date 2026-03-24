'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Site, Exam, LeaderboardEntry } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const PODIUM_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const PODIUM_LABELS = ['1st', '2nd', '3rd'];

export default function LeaderboardPage() {
  const params = useParams<{ slug: string; examId: string }>();
  const { slug, examId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const [examRes, lbRes] = await Promise.all([
          fetch(`${API}/sites/${siteData.id}/exams/${examId}`),
          fetch(`${API}/sites/${siteData.id}/exams/${examId}/leaderboard`),
        ]);

        if (examRes.ok) setExam(await examRes.json());
        if (lbRes.ok) setLeaderboard(await lbRes.json());
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
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <SiteNavigation site={site} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/preview/${slug}/exams/${examId}`} className="text-sm mb-4 inline-block" style={{ color: theme.primary }}>
          &larr; Back to Exam
        </Link>

        <h1 className="text-2xl font-bold mb-1" style={{ color: theme.text }}>Leaderboard</h1>
        <p className="text-gray-500 text-sm mb-8">{exam.title}</p>

        {leaderboard.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <span className="text-5xl block mb-4">&#127942;</span>
            <p className="text-gray-500">No results yet. Be the first to take the exam!</p>
          </div>
        ) : (
          <>
            {/* Podium */}
            {top3.length > 0 && (
              <div className="flex items-end justify-center gap-3 mb-8">
                {/* 2nd place */}
                {top3.length > 1 && (
                  <div className="text-center flex-1 max-w-[140px]">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: PODIUM_COLORS[1] }}
                      >
                        2
                      </div>
                      <p className="text-xs font-semibold text-gray-900 truncate">{top3[1].studentName}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: theme.primary }}>{top3[1].totalScore}</p>
                      <p className="text-[10px] text-gray-400">{top3[1].totalCorrect} correct | {formatTime(top3[1].timeTaken)}</p>
                    </div>
                    <div className="h-16 rounded-b-xl" style={{ backgroundColor: PODIUM_COLORS[1], opacity: 0.3 }} />
                  </div>
                )}
                {/* 1st place */}
                {top3.length > 0 && (
                  <div className="text-center flex-1 max-w-[160px]">
                    <div className="bg-white rounded-xl shadow-lg border-2 p-5 relative" style={{ borderColor: PODIUM_COLORS[0] }}>
                      <span className="text-2xl block mb-1">&#127942;</span>
                      <div
                        className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: PODIUM_COLORS[0] }}
                      >
                        1
                      </div>
                      <p className="text-sm font-bold text-gray-900 truncate">{top3[0].studentName}</p>
                      <p className="text-lg font-bold mt-1" style={{ color: theme.primary }}>{top3[0].totalScore}</p>
                      <p className="text-[10px] text-gray-400">{top3[0].totalCorrect} correct | {formatTime(top3[0].timeTaken)}</p>
                    </div>
                    <div className="h-24 rounded-b-xl" style={{ backgroundColor: PODIUM_COLORS[0], opacity: 0.3 }} />
                  </div>
                )}
                {/* 3rd place */}
                {top3.length > 2 && (
                  <div className="text-center flex-1 max-w-[140px]">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: PODIUM_COLORS[2] }}
                      >
                        3
                      </div>
                      <p className="text-xs font-semibold text-gray-900 truncate">{top3[2].studentName}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: theme.primary }}>{top3[2].totalScore}</p>
                      <p className="text-[10px] text-gray-400">{top3[2].totalCorrect} correct | {formatTime(top3[2].timeTaken)}</p>
                    </div>
                    <div className="h-10 rounded-b-xl" style={{ backgroundColor: PODIUM_COLORS[2], opacity: 0.3 }} />
                  </div>
                )}
              </div>
            )}

            {/* Full Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase">Rank</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase">Score</th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase hidden sm:table-cell">Correct</th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase hidden sm:table-cell">Wrong</th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase hidden md:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => {
                    const isTop3 = entry.rank <= 3;
                    return (
                      <tr
                        key={entry.attemptId}
                        className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                          isTop3 ? 'bg-yellow-50/30' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          {entry.rank <= 3 ? (
                            <span
                              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: PODIUM_COLORS[entry.rank - 1] }}
                            >
                              {entry.rank}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-600 font-medium">{entry.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.studentName}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm font-bold" style={{ color: theme.primary }}>{entry.totalScore}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-green-600 hidden sm:table-cell">{entry.totalCorrect}</td>
                        <td className="px-4 py-3 text-center text-sm text-red-600 hidden sm:table-cell">{entry.totalWrong}</td>
                        <td className="px-4 py-3 text-center text-xs text-gray-500 hidden md:table-cell">{formatTime(entry.timeTaken)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
