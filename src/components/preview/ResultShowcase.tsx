'use client';

import { useState, useEffect, useRef } from 'react';
import type { ColorTheme, Result, ResultStats } from '@/lib/types';

interface ResultShowcaseProps {
  results: Result[];
  resultStats: ResultStats | null;
  colorTheme: ColorTheme;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function ResultShowcase({ results, resultStats, colorTheme }: ResultShowcaseProps) {
  const [filterUni, setFilterUni] = useState<string>('all');

  const featuredResults = results.filter((r) => r.isFeatured);
  const displayResults = filterUni === 'all'
    ? featuredResults
    : featuredResults.filter((r) => r.university === filterUni);
  const universities = [...new Set(featuredResults.map((r) => r.university))];

  if (results.length === 0) return null;

  return (
    <section className="py-16 px-4" id="results">
      <div className="max-w-6xl mx-auto">
        {/* Stats Banner */}
        {resultStats && resultStats.totalAdmitted > 0 && (
          <div
            className="rounded-2xl p-8 mb-12 text-white text-center"
            style={{
              background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
            }}
          >
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div>
                <AnimatedCounter target={resultStats.totalAdmitted} suffix="+" />
                <p className="text-sm mt-1 opacity-90">Total Admitted / মোট ভর্তি</p>
              </div>
              {resultStats.byUniversity.slice(0, 4).map((u) => (
                <div key={u.name}>
                  <AnimatedCounter target={u.count} suffix="+" />
                  <p className="text-sm mt-1 opacity-90">{u.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1" style={{ color: colorTheme.primary }}>
            Our Achievers
          </h2>
          <p className="text-xl font-semibold mb-4" style={{ color: colorTheme.secondary }}>
            আমাদের সফল শিক্ষার্থীরা
          </p>

          {/* Filter Tabs */}
          {universities.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setFilterUni('all')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterUni === 'all' ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={filterUni === 'all' ? { backgroundColor: colorTheme.primary } : {}}
              >
                All
              </button>
              {universities.map((uni) => (
                <button
                  key={uni}
                  onClick={() => setFilterUni(uni)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterUni === uni ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={filterUni === uni ? { backgroundColor: colorTheme.primary } : {}}
                >
                  {uni}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayResults.map((result) => (
            <div
              key={result.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div
                className="h-2"
                style={{ backgroundColor: colorTheme.primary }}
              />
              <div className="p-4 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden bg-gray-200 flex items-center justify-center">
                  {result.photo ? (
                    <img
                      src={result.photo}
                      alt={result.studentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ color: colorTheme.primary }}
                    >
                      {result.studentName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{result.studentName}</h4>
                {result.studentNameBn && (
                  <p className="text-xs text-gray-500">{result.studentNameBn}</p>
                )}
                <p
                  className="font-semibold text-sm mt-1"
                  style={{ color: colorTheme.primary }}
                >
                  {result.university}
                </p>
                {result.department && (
                  <p className="text-xs text-gray-500">{result.department}</p>
                )}
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
                  <span>{result.admissionYear}</span>
                  {result.meritPosition && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `${colorTheme.accent}20`,
                        color: colorTheme.accent,
                      }}
                    >
                      Merit #{result.meritPosition}
                    </span>
                  )}
                </div>
                {result.testimonial && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">
                    &ldquo;{result.testimonial}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayResults.length === 0 && featuredResults.length > 0 && (
          <p className="text-center text-gray-400 py-8">
            No featured results for this university
          </p>
        )}
      </div>
    </section>
  );
}
