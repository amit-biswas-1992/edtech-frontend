import { create } from 'zustand';
import { Course, Enrollment, EnrollmentStats, Notice, Promo, Result, ResultStats, Schedule, Site, SiteSection, Teacher, User } from './types';

export type BuilderTab = 'sections' | 'courses' | 'teachers' | 'promos' | 'enrollments' | 'schedules' | 'results' | 'notices';

interface AppState {
  user: User | null;
  token: string | null;
  currentSite: Site | null;
  sections: SiteSection[];
  selectedSectionId: string | null;
  activeBuilderTab: BuilderTab;
  courses: Course[];
  teachers: Teacher[];
  promos: Promo[];
  enrollments: Enrollment[];
  enrollmentStats: EnrollmentStats | null;
  schedules: Schedule[];
  results: Result[];
  resultStats: ResultStats | null;
  notices: Notice[];

  login: (token: string, user: User) => void;
  logout: () => void;
  setCurrentSite: (site: Site | null) => void;
  setSections: (sections: SiteSection[]) => void;
  selectSection: (id: string | null) => void;
  updateSectionInStore: (id: string, updates: Partial<SiteSection>) => void;
  reorderSectionsInStore: (sections: SiteSection[]) => void;
  setActiveBuilderTab: (tab: BuilderTab) => void;
  setCourses: (courses: Course[]) => void;
  setTeachers: (teachers: Teacher[]) => void;
  setPromos: (promos: Promo[]) => void;
  setEnrollments: (enrollments: Enrollment[]) => void;
  setEnrollmentStats: (stats: EnrollmentStats | null) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setResults: (results: Result[]) => void;
  setResultStats: (stats: ResultStats | null) => void;
  setNotices: (notices: Notice[]) => void;
  initAuth: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  currentSite: null,
  sections: [],
  selectedSectionId: null,
  activeBuilderTab: 'sections',
  courses: [],
  teachers: [],
  promos: [],
  enrollments: [],
  enrollmentStats: null,
  schedules: [],
  results: [],
  resultStats: null,
  notices: [],

  login: (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, currentSite: null, sections: [], selectedSectionId: null });
  },

  setCurrentSite: (site: Site | null) => {
    set({
      currentSite: site,
      sections: site?.sections ?? [],
      selectedSectionId: null,
    });
  },

  setSections: (sections: SiteSection[]) => {
    set({ sections });
  },

  selectSection: (id: string | null) => {
    set({ selectedSectionId: id });
  },

  updateSectionInStore: (id: string, updates: Partial<SiteSection>) => {
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    }));
  },

  reorderSectionsInStore: (sections: SiteSection[]) => {
    set({ sections });
  },

  setActiveBuilderTab: (tab: BuilderTab) => {
    set({ activeBuilderTab: tab });
  },

  setCourses: (courses: Course[]) => {
    set({ courses });
  },

  setTeachers: (teachers: Teacher[]) => {
    set({ teachers });
  },

  setPromos: (promos: Promo[]) => {
    set({ promos });
  },

  setEnrollments: (enrollments: Enrollment[]) => {
    set({ enrollments });
  },

  setEnrollmentStats: (stats: EnrollmentStats | null) => {
    set({ enrollmentStats: stats });
  },

  setSchedules: (schedules: Schedule[]) => {
    set({ schedules });
  },

  setResults: (results: Result[]) => {
    set({ results });
  },

  setResultStats: (stats: ResultStats | null) => {
    set({ resultStats: stats });
  },

  setNotices: (notices: Notice[]) => {
    set({ notices });
  },

  initAuth: () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        set({ token, user });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },
}));
