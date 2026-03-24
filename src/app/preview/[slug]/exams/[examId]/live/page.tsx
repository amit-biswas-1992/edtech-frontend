'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Site, Exam, Question, ExamAttempt } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AnswerMap {
  [questionId: string]: { selectedOptionId: string | null; timeTaken: number };
}

export default function LiveExamPage() {
  const params = useParams<{ slug: string; examId: string }>();
  const router = useRouter();
  const { slug, examId } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const questionStartTime = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize exam
  useEffect(() => {
    (async () => {
      try {
        const siteRes = await fetch(`${API}/sites/${slug}/preview`);
        if (!siteRes.ok) { setError('Site not found'); setLoading(false); return; }
        const siteData = await siteRes.json();
        setSite(siteData);

        const examRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}`);
        if (!examRes.ok) { setError('Exam not found'); setLoading(false); return; }
        const examData: Exam = await examRes.json();
        setExam(examData);
        setTimeLeft(examData.duration * 60);

        // Start attempt
        const startRes = await fetch(`${API}/sites/${siteData.id}/exams/${examId}/attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!startRes.ok) { setError('Could not start exam'); setLoading(false); return; }
        const startData = await startRes.json();
        setAttempt(startData.attempt);
        setQuestions(startData.questions);
        questionStartTime.current = Date.now();
      } catch {
        setError('Failed to start exam');
      }
      setLoading(false);
    })();
  }, [slug, examId]);

  // Timer countdown
  useEffect(() => {
    if (loading || !exam || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [loading, exam]);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && attempt && !submitting && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const selectOption = useCallback((questionId: string, optionId: string) => {
    const elapsed = Math.floor((Date.now() - questionStartTime.current) / 1000);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selectedOptionId: optionId, timeTaken: (prev[questionId]?.timeTaken || 0) + elapsed },
    }));
    questionStartTime.current = Date.now();
  }, []);

  const goToQuestion = useCallback((index: number) => {
    // Track time for current question before switching
    const currentQ = questions[currentIndex];
    if (currentQ) {
      const elapsed = Math.floor((Date.now() - questionStartTime.current) / 1000);
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          selectedOptionId: prev[currentQ.id]?.selectedOptionId || null,
          timeTaken: (prev[currentQ.id]?.timeTaken || 0) + elapsed,
        },
      }));
    }
    questionStartTime.current = Date.now();
    setCurrentIndex(index);
  }, [currentIndex, questions]);

  const handleSubmit = useCallback(async () => {
    if (!site || !attempt || submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

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
        setError('Failed to submit exam');
        setSubmitting(false);
      }
    } catch {
      setError('Network error during submission');
      setSubmitting(false);
    }
  }, [site, attempt, questions, answers, examId, slug, router, submitting]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm text-gray-500">Preparing your exam...</p>
      </div>
    );
  }

  if (error || !site || !exam || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || 'Could not load exam'}</p>
          <button onClick={() => router.back()} className="text-sm text-blue-600 hover:text-blue-800">Go Back</button>
        </div>
      </div>
    );
  }

  const theme = site.colorTheme;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.values(answers).filter((a) => a.selectedOptionId !== null).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300;
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{exam.title}</h1>
            <p className="text-[10px] text-gray-400">
              Question {currentIndex + 1} of {questions.length} | Answered: {answeredCount}/{questions.length}
            </p>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${
            isLowTime ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-50 text-gray-800'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={submitting}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: theme.primary }}
          >
            {submitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Question Number + Text */}
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
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] text-gray-400">Marks: {currentQ.marks}</span>
                  {currentQ.subject && (
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{currentQ.subject}</span>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[currentQ.id]?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectOption(currentQ.id, opt.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      style={isSelected ? {
                        borderColor: theme.primary,
                        backgroundColor: `${theme.primary}10`,
                      } : undefined}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          isSelected ? 'text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                        style={isSelected ? { backgroundColor: theme.primary } : undefined}
                      >
                        {optionLabels[i]}
                      </span>
                      <span className={`text-sm ${isSelected ? 'font-medium' : 'text-gray-700'}`} style={isSelected ? { color: theme.text } : undefined}>
                        {opt.text}
                      </span>
                      {opt.image && (
                        <img src={opt.image} alt={`Option ${optionLabels[i]}`} className="ml-auto h-10 w-10 rounded object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Prev/Next */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => goToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-30 transition-colors"
                >
                  &larr; Previous
                </button>
                <span className="text-xs text-gray-400">
                  {currentIndex + 1} / {questions.length}
                </span>
                <button
                  onClick={() => goToQuestion(currentIndex + 1)}
                  disabled={currentIndex >= questions.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-30 transition-colors hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-20">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Question Navigator</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => {
                  const isAnswered = answers[q.id]?.selectedOptionId !== null;
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(i)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-offset-1 text-white'
                          : isAnswered
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                      style={isCurrent ? {
                        backgroundColor: theme.primary,
                        ringColor: theme.primary,
                      } as React.CSSProperties : undefined}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 mt-4 text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded" />
                  Answered ({answeredCount})
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-100 rounded" />
                  Unanswered ({questions.length - answeredCount})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Exam?</h3>
            <p className="text-sm text-gray-500 mb-1">
              You have answered <strong className="text-gray-900">{answeredCount}</strong> out of <strong className="text-gray-900">{questions.length}</strong> questions.
            </p>
            {questions.length - answeredCount > 0 && (
              <p className="text-sm text-yellow-600 mb-4">
                {questions.length - answeredCount} question(s) are unanswered and will be marked as skipped.
              </p>
            )}
            <p className="text-sm text-gray-500 mb-6">
              Time remaining: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={() => { setShowConfirm(false); handleSubmit(); }}
                disabled={submitting}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: theme.primary }}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
