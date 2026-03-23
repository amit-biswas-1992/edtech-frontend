export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  name: string;
}

export type SectionType =
  | 'hero' | 'about' | 'courses' | 'admission_info' | 'success_stories'
  | 'faculty' | 'testimonials' | 'faq' | 'contact' | 'footer'
  | 'features' | 'pricing' | 'cta' | 'stats' | 'gallery';

export interface SiteSection {
  id: string;
  siteId: string;
  sectionType: SectionType;
  designVariant: number;
  order: number;
  isVisible: boolean;
  content: Record<string, any>;
}

export interface Site {
  id: string;
  name: string;
  slug: string;
  templateId: string;
  colorTheme: ColorTheme;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  logo: string | null;
  favicon: string | null;
  subdomain: string | null;
  isPublished: boolean;
  sections: SiteSection[];
  template?: Template;
  courses?: Course[];
  teachers?: Teacher[];
  promos?: Promo[];
  chatConfig: ChatConfig | null;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
  category: 'admission' | 'landing' | 'coaching' | 'premium';
  defaultSections: DefaultSection[];
}

export interface DefaultSection {
  sectionType: SectionType;
  designVariant: number;
  order: number;
  defaultContent: Record<string, any>;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Course Management
export type CourseCategory = 'engineering' | 'medical' | 'university' | 'hsc' | 'ssc';

export interface SyllabusItem {
  topic: string;
  description: string;
}

export interface Course {
  id: string;
  siteId: string;
  title: string;
  titleBn: string | null;
  description: string | null;
  descriptionBn: string | null;
  duration: string | null;
  fee: number | null;
  feeCurrency: string;
  category: CourseCategory;
  thumbnail: string | null;
  syllabus: SyllabusItem[] | null;
  totalSeats: number | null;
  enrolledCount: number;
  isActive: boolean;
  schedule: string | null;
  startDate: string | null;
  endDate: string | null;
  teacherId: string | null;
  teacher?: Teacher;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Teacher Management
export interface Teacher {
  id: string;
  siteId: string;
  name: string;
  nameBn: string | null;
  designation: string | null;
  designationBn: string | null;
  subject: string | null;
  subjectBn: string | null;
  bio: string | null;
  bioBn: string | null;
  image: string | null;
  phone: string | null;
  email: string | null;
  qualifications: string[] | null;
  experience: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Promo Management
export type PromoType = 'percentage' | 'fixed';

export interface Promo {
  id: string;
  siteId: string;
  code: string;
  type: PromoType;
  value: number;
  minPurchase: number | null;
  maxDiscount: number | null;
  description: string | null;
  descriptionBn: string | null;
  startDate: string;
  endDate: string;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  applicableCourseIds: string[] | null;
  createdAt: string;
  updatedAt: string;
}

// Enrollment Management
export type EnrollmentStatus = 'pending' | 'confirmed' | 'waitlisted' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

export interface Enrollment {
  id: string;
  siteId: string;
  courseId: string | null;
  studentName: string;
  studentPhone: string;
  guardianPhone: string | null;
  email: string | null;
  institution: string | null;
  sscRoll: string | null;
  hscRoll: string | null;
  targetUniversity: string | null;
  batchPreference: string | null;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string | null;
  transactionId: string | null;
  amount: number | null;
  notes: string | null;
  course?: Course;
  createdAt: string;
  updatedAt: string;
}

export interface EnrollmentStats {
  total: number;
  pending: number;
  confirmed: number;
  waitlisted: number;
  cancelled: number;
  totalRevenue: number;
}

// Schedule Management
export type DayOfWeek = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface Schedule {
  id: string;
  siteId: string;
  courseId: string | null;
  title: string;
  titleBn: string | null;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  teacherId: string | null;
  room: string | null;
  meetingLink: string | null;
  batchName: string | null;
  isActive: boolean;
  teacher?: Teacher;
  course?: Course;
  createdAt: string;
  updatedAt: string;
}

// Result Management
export interface Result {
  id: string;
  siteId: string;
  studentName: string;
  studentNameBn: string | null;
  photo: string | null;
  university: string;
  universityBn: string | null;
  department: string | null;
  admissionYear: number;
  meritPosition: number | null;
  coachingBatch: string | null;
  previousInstitution: string | null;
  testimonial: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResultStats {
  totalAdmitted: number;
  byUniversity: { name: string; count: number }[];
  byYear: { year: number; count: number }[];
  featuredCount: number;
}

// Notice Management
export type NoticeType = 'general' | 'exam' | 'schedule' | 'admission' | 'result' | 'urgent';

export interface Notice {
  id: string;
  siteId: string;
  title: string;
  titleBn: string | null;
  content: string;
  contentBn: string | null;
  type: NoticeType;
  isPinned: boolean;
  isPublished: boolean;
  publishDate: string;
  expiryDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// Chat Config
export interface ChatConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  messengerPageId: string;
  showWhatsapp: boolean;
  showMessenger: boolean;
}
