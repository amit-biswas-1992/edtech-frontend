import { SectionType } from './types';

export interface SectionMeta {
  label: string;
  icon: string;
}

export const sectionMeta: Record<SectionType, SectionMeta> = {
  hero: { label: 'Hero Banner', icon: 'HiOutlinePhotograph' },
  about: { label: 'About Us', icon: 'HiOutlineInformationCircle' },
  courses: { label: 'Courses & Programs', icon: 'HiOutlineAcademicCap' },
  admission_info: { label: 'Admission Info', icon: 'HiOutlineClipboardList' },
  success_stories: { label: 'Success Stories', icon: 'HiOutlineStar' },
  faculty: { label: 'Faculty & Staff', icon: 'HiOutlineUserGroup' },
  testimonials: { label: 'Testimonials', icon: 'HiOutlineChatAlt2' },
  faq: { label: 'FAQ', icon: 'HiOutlineQuestionMarkCircle' },
  contact: { label: 'Contact', icon: 'HiOutlineMail' },
  footer: { label: 'Footer', icon: 'HiOutlineViewBoards' },
  features: { label: 'Features', icon: 'HiOutlineSparkles' },
  pricing: { label: 'Pricing', icon: 'HiOutlineCurrencyDollar' },
  cta: { label: 'Call to Action', icon: 'HiOutlineSpeakerphone' },
  stats: { label: 'Statistics', icon: 'HiOutlineChartBar' },
  gallery: { label: 'Gallery', icon: 'HiOutlineColorSwatch' },
};

export const variantLabels: Record<SectionType, string[]> = {
  hero: ['Centered', 'Split Image', 'Video Background'],
  about: ['Text Left', 'Cards Layout', 'Timeline'],
  courses: ['Grid', 'List', 'Tabbed'],
  admission_info: ['Steps', 'Two Column', 'Accordion'],
  success_stories: ['Carousel', 'Grid Cards', 'Featured'],
  faculty: ['Grid', 'List with Bio', 'Compact'],
  testimonials: ['Slider', 'Masonry', 'Single Highlight'],
  faq: ['Accordion', 'Two Column', 'Searchable'],
  contact: ['Form Left', 'Centered', 'Map with Form'],
  footer: ['Multi Column', 'Minimal', 'Centered'],
  features: ['Icon Grid', 'Alternating', 'Cards'],
  pricing: ['Three Column', 'Two Column', 'Toggle Monthly/Yearly'],
  cta: ['Banner', 'Split', 'Floating'],
  stats: ['Counters Row', 'Cards', 'Infographic'],
  gallery: ['Masonry', 'Grid', 'Lightbox Carousel'],
};
