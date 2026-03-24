'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Site, Exam, ExamAttempt, Question } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ResultPage() {
  const params = useParams<{ slug: string; examId: string; attemptId: string }>();
  const { slug, examId, attemptId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const [examRes, attemptRes, questionsRes] = await Promise.all([
          fetch(`${API}/sites/${siteData.id}/exams/${examId}`),
          fetch(`${API}/sites/${siteData.id}/exams/${examId}/attempts/${attemptId}`),
          fetch(`${API}/sites/${siteData.id}/exams/${examId}/questions`).catch(() => null),
        ]);

        if (examRes.ok) setExam(await examRes.json());
        if (attemptRes.ok) setAttempt(await attemptRes.json());
        if (questionsRes?.ok) setQuestions(await questionsRes.json());
      } catch { /* empty */ }
      setLoading(false);
    })();
  }, [slug, examId, attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!site || !exam || !attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Result not found</p>
      </div>
    );
  }

  const theme = site.colorTheme;
  const score = attempt.totalScore ?? 0;
  const percentage = exam.totalMarks > 0 ? Math.round((score / exam.totalMarks) * 100) : 0;
  const passed = exam.passMarks !== null ? score >= exam.passMarks : true;
  const totalAnswered = attempt.totalCorrect + attempt.totalWrong;

  // Subject-wise breakdown
  const subjectMap: Record<string, { correct: number; wrong: number; total: number }> = {};
  if (questions.length > 0 && attempt.answers) {
    for (const q of questions) {
      const sub = q.subject || 'General';
      if (!subjectMap[sub]) subjectMap[sub] = { correct: 0, wrong: 0, total: 0 };
      subjectMap[sub].total++;
      const ans = attempt.answers.find((a) => a.questionId === q.id);
      if (ans?.isCorrect) subjectMap[sub].correct++;
      else if (ans?.selectedOptionId) subjectMap[sub].wrong++;
    }
  }

  const circumference = 2 * Math.PI * 54;
  const dashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <SiteNavigation site={site} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/preview/${slug}/exams/${examId}`} className="text-sm mb-4 inline-block" style={{ color: theme.primary }}>
          &larr; Back to Exam
        </Link>

        {/* Score Circle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-6">
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="54"
                stroke={passed ? theme.primary : '#ef4444'}
                strokeWidth="8" fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: passed ? theme.primary : '#ef4444' }}>
                {percentage}%
              </span>
              <span className="text-xs text-gray-500">{score}/{exam.totalMarks}</span>
            </div>
          </div>

          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
            passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {passed ? 'PASSED' : 'FAILED'}
          </span>

          <h2 className="text-lg font-bold mt-3" style={{ color: theme.text }}>{exam.title}</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{attempt.totalCorrect}</div>
            <div className="text-xs text-green-600">Correct</div>
            <div className="mt-2 w-full bg-green-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${totalAnswered > 0 ? (attempt.totalCorrect / (attempt.totalCorrect + attempt.totalWrong + attempt.totalSkipped)) * 100 : 0}%` }} />
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{attempt.totalWrong}</div>
            <div className="text-xs text-red-600">Wrong</div>
            <div className="mt-2 w-full bg-red-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${totalAnswered > 0 ? (attempt.totalWrong / (attempt.totalCorrect + attempt.totalWrong + attempt.totalSkipped)) * 100 : 0}%` }} />
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{attempt.totalSkipped}</div>
            <div className="text-xs text-gray-600">Skipped</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-gray-400" style={{ width: `${totalAnswered > 0 ? (attempt.totalSkipped / (attempt.totalCorrect + attempt.totalWrong + attempt.totalSkipped)) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        {/* Subject-wise Breakdown */}
        {Object.keys(subjectMap).length > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Subject-wise Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(subjectMap).map(([subject, data]) => (
                <div key={subject}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className="text-gray-500">{data.correct}/{data.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ backgroundColor: theme.primary, width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question-by-Question Review */}
        {questions.length > 0 && attempt.answers && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const ans = attempt.answers.find((a) => a.questionId === q.id);
                const selectedOpt = q.options.find((o) => o.id === ans?.selectedOptionId);
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                const isCorrect = ans?.isCorrect;
                const isSkipped = !ans?.selectedOptionId;

                return (
                  <div key={q.id} className={`p-4 rounded-xl border-l-4 ${
                    isSkipped ? 'border-l-gray-400 bg-gray-50' :
                    isCorrect ? 'border-l-green-500 bg-green-50' :
                    'border-l-red-500 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-gray-400">{idx + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{q.questionText}</p>

                        <div className="mt-2 space-y-1">
                          {isSkipped ? (
                            <p className="text-xs text-gray-500 italic">Skipped</p>
                          ) : (
                            <p className={`text-xs ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              Your answer: <strong>{selectedOpt?.text || '-'}</strong>
                              {isCorrect ? ' \u2713' : ' \u2717'}
                            </p>
                          )}
                          {!isCorrect && correctOpt && (
                            <p className="text-xs text-green-700">
                              Correct answer: <strong>{correctOpt.text}</strong>
                            </p>
                          )}
                        </div>

                        {q.explanation && (
                          <div className="mt-2 p-2 bg-white/60 rounded-lg">
                            <p className="text-[10px] text-gray-600">
                              <strong>Explanation:</strong> {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {exam.type === 'practice' && (
            <Link
              href={`/preview/${slug}/exams/${examId}/practice`}
              className="flex-1 py-3 text-center text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.primary }}
            >
              Retake Practice
            </Link>
          )}
          <Link
            href={`/preview/${slug}/exams/${examId}/leaderboard`}
            className="flex-1 py-3 text-center text-sm font-semibold rounded-lg border-2 hover:bg-gray-50 transition-colors"
            style={{ borderColor: theme.primary, color: theme.primary }}
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
