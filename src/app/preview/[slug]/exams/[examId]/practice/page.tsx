'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Site, Exam, Question, ExamAttempt } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AnswerMap {
  [questionId: string]: { selectedOptionId: string | null; timeTaken: number; revealed: boolean };
}

export default function PracticeExamPage() {
  const params = useParams<{ slug: string; examId: string }>();
  const router = useRouter();
  const { slug, examId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const questionStartTime = useRef(Date.now());

  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setError('Site not found'); setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const examRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}`);
        if (!examRes.ok) { setError('Exam not found'); setLoading(false); return; }
        setExam(await examRes.json());

        const startRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}/attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!startRes.ok) { setError('Could not start practice'); setLoading(false); return; }
        const startData = await startRes.json();
        setAttempt(startData.attempt);
        setQuestions(startData.questions);
        questionStartTime.current = Date.now();
      } catch {
        setError('Failed to start practice');
      }
      setLoading(false);
    })();
  }, [slug, examId]);

  const selectOption = useCallback((questionId: string, optionId: string) => {
    const elapsed = Math.floor((Date.now() - questionStartTime.current) / 1000);
    setAnswers((prev) => {
      if (prev[questionId]?.revealed) return prev;
      return {
        ...prev,
        [questionId]: {
          selectedOptionId: optionId,
          timeTaken: (prev[questionId]?.timeTaken || 0) + elapsed,
          revealed: false,
        },
      };
    });
    questionStartTime.current = Date.now();
  }, []);

  const revealAnswer = useCallback((questionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOptionId: prev[questionId]?.selectedOptionId || null,
        timeTaken: prev[questionId]?.timeTaken || 0,
        revealed: true,
      },
    }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    questionStartTime.current = Date.now();
    setCurrentIndex(index);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!site || !attempt || submitting) return;
    setSubmitting(true);

    const answersList = questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: answers[q.id]?.selectedOptionId || null,
      timeTaken: answers[q.id]?.timeTaken || 0,
    }));

    try {
      const res = await fetch(`${API}/sites/${site.id}/exams/${examId}/attempts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersList }),
      });
      if (res.ok) {
        const result: ExamAttempt = await res.json();
        router.push(`/preview/${slug}/exams/${examId}/result/${result.id}`);
      } else {
        setError('Failed to submit');
        setSubmitting(false);
      }
    } catch {
      setError('Network error');
      setSubmitting(false);
    }
  }, [site, attempt, questions, answers, examId, slug, router, submitting]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm text-gray-500">Preparing practice exam...</p>
      </div>
    );
  }

  if (error || !site || !exam || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || 'Could not load practice exam'}</p>
          <button onClick={() => router.back()} className="text-sm text-blue-600 hover:text-blue-800">Go Back</button>
        </div>
      </div>
    );
  }

  const theme = site.colorTheme;
  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ.id];
  const answeredCount = Object.values(answers).filter((a) => a.selectedOptionId !== null).length;
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-gray-900">{exam.title}</h1>
              <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">Practice</span>
            </div>
            <p className="text-[10px] text-gray-400">
              Question {currentIndex + 1} of {questions.length} | Answered: {answeredCount}/{questions.length}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: theme.primary }}
          >
            {submitting ? 'Submitting...' : 'Finish Practice'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <span
                  className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-3"
                  style={{ backgroundColor: theme.primary }}
                >
                  Q{currentIndex + 1}
                </span>
                <h2 className="text-base font-medium text-gray-900 leading-relaxed">
                  {currentQ.questionText}
                </h2>
                {currentQ.questionTextBn && (
                  <p className="text-sm text-gray-500 mt-1">{currentQ.questionTextBn}</p>
                )}
                {currentQ.questionImage && (
                  <img src={currentQ.questionImage} alt="Question" className="mt-3 max-w-md rounded-lg border" />
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  const isRevealed = currentAnswer?.revealed;
                  const isCorrect = isRevealed && opt.id === currentQ.correctOptionId;
                  const isWrong = isRevealed && isSelected && opt.id !== currentQ.correctOptionId;

                  let borderColor = '#e5e7eb';
                  let bgColor = 'transparent';
                  if (isCorrect) { borderColor = '#16a34a'; bgColor = '#f0fdf4'; }
                  else if (isWrong) { borderColor = '#dc2626'; bgColor = '#fef2f2'; }
                  else if (isSelected && !isRevealed) { borderColor = theme.primary; bgColor = `${theme.primary}10`; }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectOption(currentQ.id, opt.id)}
                      disabled={isRevealed}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all disabled:cursor-default"
                      style={{ borderColor, backgroundColor: bgColor }}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          isCorrect ? 'bg-green-600 text-white' :
                          isWrong ? 'bg-red-600 text-white' :
                          isSelected && !isRevealed ? 'text-white' :
                          'bg-gray-100 text-gray-600'
                        }`}
                        style={isSelected && !isRevealed ? { backgroundColor: theme.primary } : undefined}
                      >
                        {isCorrect ? '\u2713' : isWrong ? '\u2717' : optionLabels[i]}
                      </span>
                      <span className="text-sm text-gray-700">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Check Answer button */}
              {currentAnswer?.selectedOptionId && !currentAnswer?.revealed && (
                <button
                  onClick={() => revealAnswer(currentQ.id)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white rounded-lg"
                  style={{ backgroundColor: theme.accent }}
                >
                  Check Answer
                </button>
              )}

              {/* Explanation */}
              {currentAnswer?.revealed && (currentQ.explanation || currentQ.explanationBn) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="text-xs font-semibold text-blue-800 mb-1">Explanation</h4>
                  {currentQ.explanation && (
                    <p className="text-sm text-blue-700">{currentQ.explanation}</p>
                  )}
                  {currentQ.explanationBn && (
                    <p className="text-sm text-blue-600 mt-1">{currentQ.explanationBn}</p>
                  )}
                </div>
              )}

              {/* Nav */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => goToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-30"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={() => goToQuestion(currentIndex + 1)}
                  disabled={currentIndex >= questions.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-30 hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-20">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Questions</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => {
                  const ans = answers[q.id];
                  const isCurrent = i === currentIndex;
                  const isAnswered = ans?.selectedOptionId !== null;
                  const isRevealedCorrect = ans?.revealed && ans?.selectedOptionId === q.correctOptionId;
                  const isRevealedWrong = ans?.revealed && ans?.selectedOptionId !== q.correctOptionId;

                  let bgColor = '#f3f4f6';
                  let textColor = '#6b7280';
                  if (isCurrent) { bgColor = theme.primary; textColor = '#fff'; }
                  else if (isRevealedCorrect) { bgColor = '#dcfce7'; textColor = '#15803d'; }
                  else if (isRevealedWrong) { bgColor = '#fee2e2'; textColor = '#dc2626'; }
                  else if (isAnswered) { bgColor = '#dbeafe'; textColor = '#1d4ed8'; }

                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(i)}
                      className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                      style={{ backgroundColor: bgColor, color: textColor }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
