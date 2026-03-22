import { AuthResponse, Course, Promo, Site, SiteSection, Teacher, Template, User } from './types';

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
    slug: string;
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
