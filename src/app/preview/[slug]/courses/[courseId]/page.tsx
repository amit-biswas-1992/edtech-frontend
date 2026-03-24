import Link from 'next/link';
import SiteNavigation from '@/components/preview/SiteNavigation';
import type { Course, Site } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string; courseId: string }>;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getSite(slug: string): Promise<Site | null> {
  try {
    const res = await fetch(`${API}/sites/${slug}/preview`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getCourse(siteId: string, courseId: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API}/sites/${siteId}/courses/${courseId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug, courseId } = await params;
  const site = await getSite(slug);
  if (!site) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Site not found</p></div>;
  }

  const course = await getCourse(site.id, courseId);
  if (!course) {
    return (
      <div style={{ backgroundColor: site.colorTheme.background }} className="min-h-screen">
        <SiteNavigation site={site} />
        <div className="flex items-center justify-center py-24">
          <p style={{ color: site.colorTheme.text }}>Course not found</p>
        </div>
      </div>
    );
  }

  const theme = site.colorTheme;

  return (
    <div style={{ backgroundColor: theme.background }} className="min-h-screen">
      <SiteNavigation site={site} />

      {/* Hero */}
      <div className="relative py-16 px-4" style={{ backgroundColor: theme.primary }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white capitalize">
              {course.category}
            </span>
            {course.teacher && (
              <span className="text-sm text-white/80">by {course.teacher.name}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {course.title}
          </h1>
          {course.titleBn && (
            <p className="text-lg text-white/80 mb-2">{course.titleBn}</p>
          )}
          {course.description && (
            <p className="text-white/70 max-w-2xl leading-relaxed">{course.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-white/90 text-sm">
            {course.duration && <span>Duration: {course.duration}</span>}
            {course.startDate && <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>}
            {course.totalSeats && <span>Seats: {course.enrolledCount}/{course.totalSeats}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Syllabus + Description */}
          <div className="md:col-span-2 space-y-6">
            {course.descriptionBn && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-3" style={{ color: theme.text }}>
                  {'\u09AC\u09BF\u09AC\u09B0\u09A3'}
                </h2>
                <p className="text-gray-600 leading-relaxed">{course.descriptionBn}</p>
              </div>
            )}

            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
                  Syllabus
                </h2>
                <div className="space-y-3">
                  {course.syllabus.map((item, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: theme.primary }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium" style={{ color: theme.text }}>{item.topic}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="px-3 pb-3 pl-13 text-sm text-gray-500 ml-10">{item.description}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {course.schedule && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>Schedule</h2>
                <p className="text-gray-600 text-sm">{course.schedule}</p>
              </div>
            )}
          </div>

          {/* Right: Fee + Enroll */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-20">
              {course.thumbnail && (
                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}

              <div className="text-center mb-4">
                {course.fee !== null && course.fee > 0 ? (
                  <>
                    <div className="text-3xl font-bold" style={{ color: theme.primary }}>
                      {'\u09F3'}{course.fee.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{course.feeCurrency}</div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-green-600">Free</div>
                )}
              </div>

              <Link
                href={`/preview/${slug}/checkout/${courseId}`}
                className="block w-full py-3 text-center text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                Enroll Now
              </Link>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                {course.duration && (
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-medium text-gray-700">{course.duration}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Enrolled</span>
                  <span className="font-medium text-gray-700">{course.enrolledCount} students</span>
                </div>
                {course.teacher && (
                  <div className="flex items-center justify-between">
                    <span>Teacher</span>
                    <span className="font-medium text-gray-700">{course.teacher.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
