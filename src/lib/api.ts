import {
  AuthResponse, Course, Enrollment, EnrollmentStats, Exam, ExamAttempt,
  LeaderboardEntry, Notice, Payment, Promo, Question,
  Result, ResultStats, Schedule, Site, SitePage, SiteSection, Teacher, Template, User,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

async function publicRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

// Auth API
export const auth = {
  register(name: string, email: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login(email: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  googleLogin(idToken: string): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  phoneRegister(name: string, phone: string, pin: string): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/phone/register', {
      method: 'POST',
      body: JSON.stringify({ name, phone, pin }),
    });
  },

  phoneLogin(phone: string, pin: string): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/phone/login', {
      method: 'POST',
      body: JSON.stringify({ phone, pin }),
    });
  },
};

// Templates API
export const templates = {
  getTemplates(): Promise<Template[]> {
    return request<Template[]>('/templates');
  },

  getTemplate(id: string): Promise<Template> {
    return request<Template>(`/templates/${id}`);
  },
};

// Sites API
export const sites = {
  getSites(): Promise<Site[]> {
    return request<Site[]>('/sites');
  },

  getSite(id: string): Promise<Site> {
    return request<Site>(`/sites/${id}`);
  },

  getSiteBySlug(slug: string): Promise<Site> {
    return request<Site>(`/sites/${slug}/preview`);
  },

  getSiteBySubdomain(subdomain: string): Promise<Site> {
    return request<Site>(`/sites/resolve/${subdomain}`);
  },

  createSite(data: {
    name: string;
    templateId: string;
    colorTheme?: Site['colorTheme'];
  }): Promise<Site> {
    return request<Site>('/sites', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSite(
    id: string,
    data: Partial<
      Pick<
        Site,
        | 'name'
        | 'slug'
        | 'subdomain'
        | 'colorTheme'
        | 'seoTitle'
        | 'seoDescription'
        | 'seoKeywords'
        | 'logo'
        | 'favicon'
        | 'isPublished'
        | 'themeMode'
        | 'language'
      >
    >
  ): Promise<Site> {
    return request<Site>(`/sites/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteSite(id: string): Promise<void> {
    return request<void>(`/sites/${id}`, {
      method: 'DELETE',
    });
  },
};

// Sections API
export const sections = {
  getSections(siteId: string): Promise<SiteSection[]> {
    return request<SiteSection[]>(`/sites/${siteId}/sections`);
  },

  updateSection(
    siteId: string,
    sectionId: string,
    data: Partial<Pick<SiteSection, 'designVariant' | 'isVisible' | 'content'>>
  ): Promise<SiteSection> {
    return request<SiteSection>(`/sites/${siteId}/sections/${sectionId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  reorderSections(
    siteId: string,
    sectionOrders: { id: string; order: number }[]
  ): Promise<SiteSection[]> {
    return request<SiteSection[]>(`/sites/${siteId}/sections/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ sections: sectionOrders }),
    });
  },

  addSection(
    siteId: string,
    data: {
      sectionType: SiteSection['sectionType'];
      designVariant?: number;
      order?: number;
      content?: Record<string, any>;
    }
  ): Promise<SiteSection> {
    return request<SiteSection>(`/sites/${siteId}/sections`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  removeSection(siteId: string, sectionId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/sections/${sectionId}`, {
      method: 'DELETE',
    });
  },
};

// Teachers API
export const teachers = {
  getTeachers(siteId: string): Promise<Teacher[]> {
    return request<Teacher[]>(`/sites/${siteId}/teachers`);
  },

  getTeacher(siteId: string, teacherId: string): Promise<Teacher> {
    return request<Teacher>(`/sites/${siteId}/teachers/${teacherId}`);
  },

  createTeacher(siteId: string, data: Partial<Teacher>): Promise<Teacher> {
    return request<Teacher>(`/sites/${siteId}/teachers`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateTeacher(siteId: string, teacherId: string, data: Partial<Teacher>): Promise<Teacher> {
    return request<Teacher>(`/sites/${siteId}/teachers/${teacherId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteTeacher(siteId: string, teacherId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/teachers/${teacherId}`, {
      method: 'DELETE',
    });
  },
};

// Courses API
export const courses = {
  getCourses(siteId: string, category?: string): Promise<Course[]> {
    const query = category ? `?category=${category}` : '';
    return request<Course[]>(`/sites/${siteId}/courses${query}`);
  },

  getCourse(siteId: string, courseId: string): Promise<Course> {
    return request<Course>(`/sites/${siteId}/courses/${courseId}`);
  },

  createCourse(siteId: string, data: Partial<Course>): Promise<Course> {
    return request<Course>(`/sites/${siteId}/courses`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCourse(siteId: string, courseId: string, data: Partial<Course>): Promise<Course> {
    return request<Course>(`/sites/${siteId}/courses/${courseId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteCourse(siteId: string, courseId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/courses/${courseId}`, {
      method: 'DELETE',
    });
  },
};

// Promos API
export const promos = {
  getPromos(siteId: string, activeOnly?: boolean): Promise<Promo[]> {
    const query = activeOnly ? '?active=true' : '';
    return request<Promo[]>(`/sites/${siteId}/promos${query}`);
  },

  getPromo(siteId: string, promoId: string): Promise<Promo> {
    return request<Promo>(`/sites/${siteId}/promos/${promoId}`);
  },

  createPromo(siteId: string, data: Partial<Promo>): Promise<Promo> {
    return request<Promo>(`/sites/${siteId}/promos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updatePromo(siteId: string, promoId: string, data: Partial<Promo>): Promise<Promo> {
    return request<Promo>(`/sites/${siteId}/promos/${promoId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deletePromo(siteId: string, promoId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/promos/${promoId}`, {
      method: 'DELETE',
    });
  },

  validatePromo(siteId: string, code: string): Promise<{ valid: boolean; promo: Promo; discount: number }> {
    return request(`/sites/${siteId}/promos/validate`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },
};

// Enrollments API
export const enrollments = {
  getEnrollments(siteId: string, params?: { status?: string; courseId?: string; search?: string }): Promise<Enrollment[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.courseId) query.set('courseId', params.courseId);
    if (params?.search) query.set('search', params.search);
    const qs = query.toString();
    return request<Enrollment[]>(`/sites/${siteId}/enrollments${qs ? `?${qs}` : ''}`);
  },

  getEnrollmentStats(siteId: string): Promise<EnrollmentStats> {
    return request<EnrollmentStats>(`/sites/${siteId}/enrollments/stats`);
  },

  getEnrollment(siteId: string, id: string): Promise<Enrollment> {
    return request<Enrollment>(`/sites/${siteId}/enrollments/${id}`);
  },

  createEnrollment(siteId: string, data: Partial<Enrollment>): Promise<Enrollment> {
    return publicRequest<Enrollment>(`/sites/${siteId}/enrollments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEnrollment(siteId: string, id: string, data: Partial<Enrollment>): Promise<Enrollment> {
    return request<Enrollment>(`/sites/${siteId}/enrollments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteEnrollment(siteId: string, id: string): Promise<void> {
    return request<void>(`/sites/${siteId}/enrollments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Schedules API
export const schedules = {
  getSchedules(siteId: string, params?: { dayOfWeek?: string; courseId?: string; batchName?: string }): Promise<Schedule[]> {
    const query = new URLSearchParams();
    if (params?.dayOfWeek) query.set('dayOfWeek', params.dayOfWeek);
    if (params?.courseId) query.set('courseId', params.courseId);
    if (params?.batchName) query.set('batchName', params.batchName);
    const qs = query.toString();
    return request<Schedule[]>(`/sites/${siteId}/schedules${qs ? `?${qs}` : ''}`);
  },

  getSchedule(siteId: string, id: string): Promise<Schedule> {
    return request<Schedule>(`/sites/${siteId}/schedules/${id}`);
  },

  createSchedule(siteId: string, data: Partial<Schedule>): Promise<Schedule> {
    return request<Schedule>(`/sites/${siteId}/schedules`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSchedule(siteId: string, id: string, data: Partial<Schedule>): Promise<Schedule> {
    return request<Schedule>(`/sites/${siteId}/schedules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteSchedule(siteId: string, id: string): Promise<void> {
    return request<void>(`/sites/${siteId}/schedules/${id}`, {
      method: 'DELETE',
    });
  },
};

// Results API
export const results = {
  getResults(siteId: string, params?: { university?: string; year?: string; featured?: string }): Promise<Result[]> {
    const query = new URLSearchParams();
    if (params?.university) query.set('university', params.university);
    if (params?.year) query.set('year', params.year);
    if (params?.featured) query.set('featured', params.featured);
    const qs = query.toString();
    return request<Result[]>(`/sites/${siteId}/results${qs ? `?${qs}` : ''}`);
  },

  getResultStats(siteId: string): Promise<ResultStats> {
    return request<ResultStats>(`/sites/${siteId}/results/stats`);
  },

  getResult(siteId: string, id: string): Promise<Result> {
    return request<Result>(`/sites/${siteId}/results/${id}`);
  },

  createResult(siteId: string, data: Partial<Result>): Promise<Result> {
    return request<Result>(`/sites/${siteId}/results`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateResult(siteId: string, id: string, data: Partial<Result>): Promise<Result> {
    return request<Result>(`/sites/${siteId}/results/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteResult(siteId: string, id: string): Promise<void> {
    return request<void>(`/sites/${siteId}/results/${id}`, {
      method: 'DELETE',
    });
  },
};

// Notices API
export const notices = {
  getNotices(siteId: string, params?: { type?: string; pinned?: string }): Promise<Notice[]> {
    const query = new URLSearchParams();
    if (params?.type) query.set('type', params.type);
    if (params?.pinned) query.set('pinned', params.pinned);
    const qs = query.toString();
    return request<Notice[]>(`/sites/${siteId}/notices${qs ? `?${qs}` : ''}`);
  },

  getNotice(siteId: string, id: string): Promise<Notice> {
    return request<Notice>(`/sites/${siteId}/notices/${id}`);
  },

  createNotice(siteId: string, data: Partial<Notice>): Promise<Notice> {
    return request<Notice>(`/sites/${siteId}/notices`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateNotice(siteId: string, id: string, data: Partial<Notice>): Promise<Notice> {
    return request<Notice>(`/sites/${siteId}/notices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteNotice(siteId: string, id: string): Promise<void> {
    return request<void>(`/sites/${siteId}/notices/${id}`, {
      method: 'DELETE',
    });
  },
};

// === Pages API ===
export const pages = {
  getPages(siteId: string): Promise<SitePage[]> {
    return request<SitePage[]>(`/sites/${siteId}/pages`);
  },
  getPage(siteId: string, pageId: string): Promise<SitePage> {
    return request<SitePage>(`/sites/${siteId}/pages/${pageId}`);
  },
  createPage(siteId: string, data: Partial<SitePage>): Promise<SitePage> {
    return request<SitePage>(`/sites/${siteId}/pages`, { method: 'POST', body: JSON.stringify(data) });
  },
  updatePage(siteId: string, pageId: string, data: Partial<SitePage>): Promise<SitePage> {
    return request<SitePage>(`/sites/${siteId}/pages/${pageId}`, { method: 'PATCH', body: JSON.stringify(data) });
  },
  deletePage(siteId: string, pageId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/pages/${pageId}`, { method: 'DELETE' });
  },
  reorderPages(siteId: string, items: { id: string; order: number }[]): Promise<void> {
    return request<void>(`/sites/${siteId}/pages/reorder`, { method: 'POST', body: JSON.stringify({ items }) });
  },
};

// === Exams API ===
export const exams = {
  getExams(siteId: string): Promise<Exam[]> {
    return request<Exam[]>(`/sites/${siteId}/exams`);
  },
  getExam(siteId: string, examId: string): Promise<Exam> {
    return request<Exam>(`/sites/${siteId}/exams/${examId}`);
  },
  createExam(siteId: string, data: Partial<Exam>): Promise<Exam> {
    return request<Exam>(`/sites/${siteId}/exams`, { method: 'POST', body: JSON.stringify(data) });
  },
  updateExam(siteId: string, examId: string, data: Partial<Exam>): Promise<Exam> {
    return request<Exam>(`/sites/${siteId}/exams/${examId}`, { method: 'PATCH', body: JSON.stringify(data) });
  },
  deleteExam(siteId: string, examId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/exams/${examId}`, { method: 'DELETE' });
  },
  getQuestions(siteId: string, examId: string): Promise<Question[]> {
    return request<Question[]>(`/sites/${siteId}/exams/${examId}/questions`);
  },
  addQuestions(siteId: string, examId: string, questions: Partial<Question>[]): Promise<Question[]> {
    return request<Question[]>(`/sites/${siteId}/exams/${examId}/questions`, { method: 'POST', body: JSON.stringify({ questions }) });
  },
  updateQuestion(siteId: string, examId: string, questionId: string, data: Partial<Question>): Promise<Question> {
    return request<Question>(`/sites/${siteId}/exams/${examId}/questions/${questionId}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  deleteQuestion(siteId: string, examId: string, questionId: string): Promise<void> {
    return request<void>(`/sites/${siteId}/exams/${examId}/questions/${questionId}`, { method: 'DELETE' });
  },
  startAttempt(siteId: string, examId: string): Promise<{ attempt: ExamAttempt; questions: Question[] }> {
    return request<{ attempt: ExamAttempt; questions: Question[] }>(`/sites/${siteId}/exams/${examId}/start`, { method: 'POST' });
  },
  submitAttempt(siteId: string, examId: string, answers: { questionId: string; selectedOptionId: string | null }[]): Promise<ExamAttempt> {
    return request<ExamAttempt>(`/sites/${siteId}/exams/${examId}/submit`, { method: 'POST', body: JSON.stringify({ answers }) });
  },
  getAttempts(siteId: string, examId: string): Promise<ExamAttempt[]> {
    return request<ExamAttempt[]>(`/sites/${siteId}/exams/${examId}/attempts`);
  },
  getResult(siteId: string, examId: string, attemptId: string): Promise<ExamAttempt> {
    return request<ExamAttempt>(`/sites/${siteId}/exams/${examId}/result/${attemptId}`);
  },
  getLeaderboard(siteId: string, examId: string): Promise<LeaderboardEntry[]> {
    return request<LeaderboardEntry[]>(`/sites/${siteId}/exams/${examId}/leaderboard`);
  },
};

// === Payments API ===
export const payments = {
  initiatePayment(siteId: string, data: { courseId: string; method: string }): Promise<{ paymentId: string; redirectUrl: string }> {
    return request<{ paymentId: string; redirectUrl: string }>(`/sites/${siteId}/payments/initiate`, { method: 'POST', body: JSON.stringify(data) });
  },
  getPayments(siteId: string): Promise<Payment[]> {
    return request<Payment[]>(`/sites/${siteId}/payments`);
  },
  getPayment(siteId: string, paymentId: string): Promise<Payment> {
    return request<Payment>(`/sites/${siteId}/payments/${paymentId}`);
  },
};
