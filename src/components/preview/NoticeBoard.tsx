'use client';

import { useState } from 'react';
import type { ColorTheme, Notice, NoticeType } from '@/lib/types';

interface NoticeBoardProps {
  notices: Notice[];
  colorTheme: ColorTheme;
}

const typeStyles: Record<NoticeType, { bg: string; text: string; border: string }> = {
  urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  exam: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  schedule: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  admission: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  result: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  general: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' },
};

export default function NoticeBoard({ notices, colorTheme }: NoticeBoardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const publishedNotices = notices
    .filter((n) => n.isPublished)
    .sort((a, b) => {
      // Pinned first, then by date
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  if (publishedNotices.length === 0) return null;

  return (
    <section className="py-16 px-4" id="notices">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-1" style={{ color: colorTheme.primary }}>
            Notice Board
          </h2>
          <p className="text-xl font-semibold mb-2" style={{ color: colorTheme.secondary }}>
            নোটিশ বোর্ড
          </p>
        </div>

        <div className="space-y-4">
          {publishedNotices.map((notice) => {
            const style = typeStyles[notice.type];
            const isExpanded = expandedId === notice.id;
            const isUrgent = notice.type === 'urgent';

            return (
              <div
                key={notice.id}
                className={`rounded-xl border-2 overflow-hidden transition-shadow hover:shadow-md ${
                  isUrgent ? 'border-red-400 shadow-red-100' : 'border-gray-200'
                }`}
              >
                <div
                  className="p-4 md:p-5 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : notice.id)}
                >
                  <div className="flex items-start gap-3">
                    {notice.isPinned && (
                      <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colorTheme.primary }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1 1 0 004 6.868V9a1 1 0 001 1h4v7a1 1 0 102 0v-7h4a1 1 0 001-1V6.868a1 1 0 00-1.046-.963L11 4.323V3a1 1 0 00-1-1z" />
                      </svg>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full uppercase ${style.bg} ${style.text}`}>
                          {notice.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(notice.publishDate).toLocaleDateString('en-BD', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                      {notice.titleBn && (
                        <p className="text-sm text-gray-600 mt-0.5">{notice.titleBn}</p>
                      )}
                      {!isExpanded && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notice.content}</p>
                      )}
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform mt-1 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-100 pt-4">
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                      {notice.content}
                    </div>
                    {notice.contentBn && (
                      <div className="mt-3 text-gray-600 whitespace-pre-wrap text-sm">
                        {notice.contentBn}
                      </div>
                    )}
                    {notice.expiryDate && (
                      <p className="mt-3 text-xs text-gray-400">
                        Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
