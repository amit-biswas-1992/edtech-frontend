'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import toast from 'react-hot-toast';
import type { Exam, ExamType, Question, QuestionDifficulty, ExamOption } from '@/lib/types';

interface ExamManagerProps {
  siteId: string;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyOption(): ExamOption {
  return { id: generateId(), text: '', textBn: '' };
}

function emptyQuestion(): Partial<Question> {
  const opts = [emptyOption(), emptyOption(), emptyOption(), emptyOption()];
  return {
    questionText: '',
    questionTextBn: null,
    questionImage: null,
    options: opts,
    correctOptionId: opts[0].id,
    explanation: null,
    explanationBn: null,
    subject: null,
    chapter: null,
    difficulty: 'medium',
    marks: 1,
    order: 0,
  };
}

export default function ExamManager({ siteId }: ExamManagerProps) {
  const exams = useAppStore((s) => s.exams);
  const setExams = useAppStore((s) => s.setExams);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [managingQuestions, setManagingQuestions] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state for exam create/edit
  const [formData, setFormData] = useState<Partial<Exam>>({
    title: '', titleBn: null, description: null, type: 'practice',
    duration: 60, totalMarks: 100, passMarks: 40, negativeMarking: 0,
    questionsPerExam: 50, shuffleQuestions: true, showResult: true,
    startTime: null, endTime: null, maxAttempts: null, isActive: true, courseId: null,
  });

  const liveCount = exams.filter((e) => e.type === 'live').length;
  const practiceCount = exams.filter((e) => e.type === 'practice').length;

  const openCreateModal = useCallback(() => {
    setFormData({
      title: '', titleBn: null, description: null, type: 'practice',
      duration: 60, totalMarks: 100, passMarks: 40, negativeMarking: 0,
      questionsPerExam: 50, shuffleQuestions: true, showResult: true,
      startTime: null, endTime: null, maxAttempts: null, isActive: true, courseId: null,
    });
    setEditingExam(null);
    setShowCreateModal(true);
  }, []);

  const openEditModal = useCallback((exam: Exam) => {
    setFormData({ ...exam });
    setEditingExam(exam);
    setShowCreateModal(true);
  }, []);

  const handleSaveExam = useCallback(async () => {
    if (!formData.title?.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      if (editingExam) {
        const updated = await api.exams.updateExam(siteId, editingExam.id, formData);
        setExams(exams.map((e) => (e.id === editingExam.id ? { ...e, ...updated } : e)));
        toast.success('Exam updated');
      } else {
        const created = await api.exams.createExam(siteId, formData);
        setExams([...exams, created]);
        toast.success('Exam created');
      }
      setShowCreateModal(false);
    } catch {
      toast.error('Failed to save exam');
    }
    setSaving(false);
  }, [siteId, formData, editingExam, exams, setExams]);

  const handleDeleteExam = useCallback(async (examId: string) => {
    if (!confirm('Delete this exam and all its questions?')) return;
    try {
      await api.exams.deleteExam(siteId, examId);
      setExams(exams.filter((e) => e.id !== examId));
      toast.success('Exam deleted');
    } catch {
      toast.error('Failed to delete exam');
    }
  }, [siteId, exams, setExams]);

  const handleToggleActive = useCallback(async (exam: Exam) => {
    try {
      const updated = await api.exams.updateExam(siteId, exam.id, { isActive: !exam.isActive });
      setExams(exams.map((e) => (e.id === exam.id ? { ...e, ...updated } : e)));
    } catch {
      toast.error('Failed to toggle status');
    }
  }, [siteId, exams, setExams]);

  // Questions management
  const openQuestions = useCallback(async (examId: string) => {
    setManagingQuestions(examId);
    setLoadingQuestions(true);
    try {
      const qs = await api.exams.getQuestions(siteId, examId);
      setQuestions(qs);
    } catch {
      setQuestions([]);
    }
    setLoadingQuestions(false);
  }, [siteId]);

  const openAddQuestion = useCallback(() => {
    setEditingQuestion({ ...emptyQuestion(), order: questions.length });
    setShowQuestionModal(true);
  }, [questions.length]);

  const openEditQuestion = useCallback((q: Question) => {
    setEditingQuestion({ ...q });
    setShowQuestionModal(true);
  }, []);

  const handleSaveQuestion = useCallback(async () => {
    if (!managingQuestions || !editingQuestion) return;
    if (!editingQuestion.questionText?.trim()) { toast.error('Question text is required'); return; }
    setSaving(true);
    try {
      if (editingQuestion.id) {
        const updated = await api.exams.updateQuestion(siteId, managingQuestions, editingQuestion.id, editingQuestion);
        setQuestions(questions.map((q) => (q.id === editingQuestion.id ? { ...q, ...updated } : q)));
        toast.success('Question updated');
      } else {
        const created = await api.exams.addQuestions(siteId, managingQuestions, [editingQuestion]);
        setQuestions([...questions, ...created]);
        toast.success('Question added');
      }
      setShowQuestionModal(false);
    } catch {
      toast.error('Failed to save question');
    }
    setSaving(false);
  }, [siteId, managingQuestions, editingQuestion, questions]);

  const handleDeleteQuestion = useCallback(async (questionId: string) => {
    if (!managingQuestions) return;
    if (!confirm('Delete this question?')) return;
    try {
      await api.exams.deleteQuestion(siteId, managingQuestions, questionId);
      setQuestions(questions.filter((q) => q.id !== questionId));
      toast.success('Question deleted');
    } catch {
      toast.error('Failed to delete question');
    }
  }, [siteId, managingQuestions, questions]);

  const handleBulkImport = useCallback(async () => {
    if (!managingQuestions) return;
    const input = prompt('Paste JSON array of questions:');
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) { toast.error('Must be a JSON array'); return; }
      const created = await api.exams.addQuestions(siteId, managingQuestions, parsed);
      setQuestions([...questions, ...created]);
      toast.success(`Imported ${created.length} questions`);
    } catch {
      toast.error('Invalid JSON or import failed');
    }
  }, [siteId, managingQuestions, questions]);

  const DIFF_COLORS: Record<QuestionDifficulty, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  // Question management view
  if (managingQuestions) {
    const exam = exams.find((e) => e.id === managingQuestions);
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b border-gray-100">
          <button
            onClick={() => setManagingQuestions(null)}
            className="text-xs text-blue-600 hover:text-blue-800 mb-1"
          >
            &larr; Back to Exams
          </button>
          <h3 className="text-sm font-semibold text-gray-900">
            Questions: {exam?.title || ''}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={openAddQuestion}
              className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              + Add Question
            </button>
            <button
              onClick={handleBulkImport}
              className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Import JSON
            </button>
            <span className="text-xs text-gray-400 ml-auto">{questions.length} questions</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {loadingQuestions ? (
            <div className="text-center py-8 text-xs text-gray-400">Loading...</div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-400">No questions yet.</div>
          ) : (
            questions.sort((a, b) => a.order - b.order).map((q, idx) => (
              <div key={q.id} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 group">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-gray-400 font-mono mt-0.5">{idx + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 line-clamp-2">{q.questionText}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {q.subject && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{q.subject}</span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${DIFF_COLORS[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-400">{q.marks} marks</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditQuestion(q)}
                      className="text-xs text-blue-600 hover:text-blue-800 p-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="text-xs text-red-500 hover:text-red-700 p-1"
                    >
                      Del
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Question Modal */}
        {showQuestionModal && editingQuestion && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowQuestionModal(false)}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  {editingQuestion.id ? 'Edit Question' : 'Add Question'}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">Question Text *</label>
                  <textarea
                    value={editingQuestion.questionText || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[60px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Question Text (Bangla)</label>
                  <textarea
                    value={editingQuestion.questionTextBn || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, questionTextBn: e.target.value || null })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Question Image URL</label>
                  <input
                    type="text"
                    value={editingQuestion.questionImage || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, questionImage: e.target.value || null })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Options (select correct)</label>
                  {(editingQuestion.options || []).map((opt, i) => (
                    <div key={opt.id} className="flex items-center gap-2 mb-1.5">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={editingQuestion.correctOptionId === opt.id}
                        onChange={() => setEditingQuestion({ ...editingQuestion, correctOptionId: opt.id })}
                        className="accent-green-600"
                      />
                      <span className="text-xs font-bold text-gray-500 w-4">{String.fromCharCode(65 + i)}</span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...(editingQuestion.options || [])];
                          newOpts[i] = { ...newOpts[i], text: e.target.value };
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Explanation</label>
                  <textarea
                    value={editingQuestion.explanation || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value || null })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Explanation (Bangla)</label>
                  <textarea
                    value={editingQuestion.explanationBn || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, explanationBn: e.target.value || null })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[40px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={editingQuestion.subject || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, subject: e.target.value || null })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Chapter</label>
                    <input
                      type="text"
                      value={editingQuestion.chapter || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, chapter: e.target.value || null })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Difficulty</label>
                    <select
                      value={editingQuestion.difficulty || 'medium'}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value as QuestionDifficulty })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Marks</label>
                    <input
                      type="number"
                      value={editingQuestion.marks || 1}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, marks: Number(e.target.value) })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min={1}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuestion}
                  disabled={saving}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Question'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main exam list view
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Exams</h3>
          <button
            onClick={openCreateModal}
            className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            + Create Exam
          </button>
        </div>
        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total', value: exams.length, color: 'bg-gray-100 text-gray-700' },
            { label: 'Live', value: liveCount, color: 'bg-red-50 text-red-700' },
            { label: 'Practice', value: practiceCount, color: 'bg-blue-50 text-blue-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-md px-2 py-1.5 text-center ${s.color}`}>
              <div className="text-xs font-bold">{s.value}</div>
              <div className="text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {exams.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">No exams yet.</div>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 group">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-900">{exam.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      exam.type === 'live' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exam.type === 'live' ? 'Live' : 'Practice'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                    <span>{exam.duration} min</span>
                    <span>{exam.totalMarks} marks</span>
                    <span>{exam.questionsPerExam} Qs</span>
                  </div>
                  {exam.type === 'live' && exam.startTime && (
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {new Date(exam.startTime).toLocaleString()} - {exam.endTime ? new Date(exam.endTime).toLocaleString() : 'TBD'}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleToggleActive(exam)}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    exam.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {exam.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(exam)}
                  className="text-xs text-blue-600 hover:text-blue-800 px-1.5 py-0.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => openQuestions(exam.id)}
                  className="text-xs text-purple-600 hover:text-purple-800 px-1.5 py-0.5"
                >
                  Questions
                </button>
                <button
                  onClick={() => handleDeleteExam(exam.id)}
                  className="text-xs text-red-500 hover:text-red-700 px-1.5 py-0.5 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Exam Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                {editingExam ? 'Edit Exam' : 'Create Exam'}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Title (Bangla)</label>
                <input
                  type="text"
                  value={formData.titleBn || ''}
                  onChange={(e) => setFormData({ ...formData, titleBn: e.target.value || null })}
                  className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
                  className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[50px]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Type</label>
                <select
                  value={formData.type || 'practice'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ExamType })}
                  className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="live">Live</option>
                  <option value="practice">Practice</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">Duration (min)</label>
                  <input type="number" min={1} value={formData.duration || 60}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Total Marks</label>
                  <input type="number" min={1} value={formData.totalMarks || 100}
                    onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Pass Marks</label>
                  <input type="number" min={0} value={formData.passMarks ?? ''}
                    onChange={(e) => setFormData({ ...formData, passMarks: e.target.value ? Number(e.target.value) : null })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Negative Marking</label>
                  <input type="number" min={0} step={0.25} value={formData.negativeMarking || 0}
                    onChange={(e) => setFormData({ ...formData, negativeMarking: Number(e.target.value) })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Questions/Exam</label>
                  <input type="number" min={1} value={formData.questionsPerExam || 50}
                    onChange={(e) => setFormData({ ...formData, questionsPerExam: Number(e.target.value) })}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Max Attempts</label>
                  <input type="number" min={1} value={formData.maxAttempts ?? ''}
                    onChange={(e) => setFormData({ ...formData, maxAttempts: e.target.value ? Number(e.target.value) : null })}
                    placeholder="Unlimited"
                    className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
              {formData.type === 'live' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Start Time</label>
                    <input type="datetime-local" value={formData.startTime?.slice(0, 16) || ''}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value ? new Date(e.target.value).toISOString() : null })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">End Time</label>
                    <input type="datetime-local" value={formData.endTime?.slice(0, 16) || ''}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value ? new Date(e.target.value).toISOString() : null })}
                      className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-gray-700">
                  <input type="checkbox" checked={formData.shuffleQuestions ?? true}
                    onChange={(e) => setFormData({ ...formData, shuffleQuestions: e.target.checked })}
                    className="accent-blue-600" />
                  Shuffle Questions
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-700">
                  <input type="checkbox" checked={formData.showResult ?? true}
                    onChange={(e) => setFormData({ ...formData, showResult: e.target.checked })}
                    className="accent-blue-600" />
                  Show Result
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-700">
                  <input type="checkbox" checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-blue-600" />
                  Active
                </label>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setShowCreateModal(false)} className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800">Cancel</button>
              <button onClick={handleSaveExam} disabled={saving}
                className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
                {saving ? 'Saving...' : editingExam ? 'Update Exam' : 'Create Exam'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
