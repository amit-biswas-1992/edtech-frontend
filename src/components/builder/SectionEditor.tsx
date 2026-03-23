'use client';

import { useState, useCallback, useRef } from 'react';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import { sectionMeta } from '@/lib/section-labels';
import DesignVariantPicker from './DesignVariantPicker';
import type { SiteSection, SectionType } from '@/lib/types';

/** Safely coerce any value to an array (handles null, undefined, objects, strings) */
function asArray(val: unknown): Record<string, any>[] {
  if (Array.isArray(val)) return val;
  return [];
}

/* ------------------------------------------------------------------ */
/*  Reusable field components                                          */
/* ------------------------------------------------------------------ */

function TextField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const baseClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}

function ArrayFieldHeader({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <button
        onClick={onAdd}
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
      >
        <HiOutlinePlus className="w-3 h-3" />
        Add
      </button>
    </div>
  );
}

function ArrayItemWrapper({
  index,
  onRemove,
  children,
}: {
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
        title="Remove item"
      >
        <HiOutlineTrash className="w-3.5 h-3.5" />
      </button>
      <div className="text-[10px] font-bold text-gray-400 uppercase">
        #{index + 1}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main SectionEditor                                                 */
/* ------------------------------------------------------------------ */

export default function SectionEditor() {
  const currentSite = useAppStore((s) => s.currentSite);
  const sections = useAppStore((s) => s.sections);
  const selectedSectionId = useAppStore((s) => s.selectedSectionId);
  const selectSection = useAppStore((s) => s.selectSection);
  const updateSectionInStore = useAppStore((s) => s.updateSectionInStore);

  const section = sections.find((s) => s.id === selectedSectionId) ?? null;

  // Debounced save ref
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveSection = useCallback(
    (sectionToSave: SiteSection) => {
      if (!currentSite) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        try {
          await api.sections.updateSection(
            currentSite.id,
            sectionToSave.id,
            {
              content: sectionToSave.content,
              designVariant: sectionToSave.designVariant,
            }
          );
        } catch {
          toast.error('Failed to save changes');
        }
      }, 400);
    },
    [currentSite]
  );

  const updateContent = useCallback(
    (key: string, value: unknown) => {
      if (!section) return;
      const newContent = { ...section.content, [key]: value };
      updateSectionInStore(section.id, { content: newContent });
      saveSection({ ...section, content: newContent });
    },
    [section, updateSectionInStore, saveSection]
  );

  const saveNow = useCallback(() => {
    if (!section || !currentSite) return;
    api.sections
      .updateSection(currentSite.id, section.id, {
        content: section.content,
        designVariant: section.designVariant,
      })
      .catch(() => toast.error('Failed to save'));
  }, [section, currentSite]);

  // Helper to update a single item in an array within content
  const updateArrayItem = useCallback(
    (key: string, index: number, field: string, value: unknown) => {
      if (!section) return;
      const arr = [...(section.content[key] ?? [])];
      arr[index] = { ...arr[index], [field]: value };
      updateContent(key, arr);
    },
    [section, updateContent]
  );

  const addArrayItem = useCallback(
    (key: string, template: Record<string, any>) => {
      if (!section) return;
      const arr = [...(section.content[key] ?? []), template];
      updateContent(key, arr);
    },
    [section, updateContent]
  );

  const removeArrayItem = useCallback(
    (key: string, index: number) => {
      if (!section) return;
      const arr = [...(section.content[key] ?? [])];
      arr.splice(index, 1);
      updateContent(key, arr);
    },
    [section, updateContent]
  );

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <HiOutlineX className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">No Section Selected</p>
        <p className="text-xs text-gray-400 mt-1">
          Click a section in the left panel to edit it
        </p>
      </div>
    );
  }

  const meta = sectionMeta[section.sectionType];
  const c = section.content ?? {};

  // Field shorthand
  const tf = (label: string, key: string, opts?: { multiline?: boolean; placeholder?: string }) => (
    <TextField
      key={key}
      label={label}
      value={c[key] ?? ''}
      onChange={(v) => updateContent(key, v)}
      onBlur={saveNow}
      placeholder={opts?.placeholder}
      multiline={opts?.multiline}
    />
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            {meta?.label ?? section.sectionType}
          </h2>
          <button
            onClick={() => selectSection(null)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <HiOutlineX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Design Variant Picker */}
        <DesignVariantPicker section={section} />

        <div className="h-px bg-gray-100" />

        {/* Content fields by section type */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Content
          </h3>

          {section.sectionType === 'hero' && (
            <>
              {tf('Title', 'title', { placeholder: 'Welcome to Our Academy' })}
              {tf('Subtitle', 'subtitle', { multiline: true, placeholder: 'Building futures through quality education' })}
              {tf('CTA Text', 'ctaText', { placeholder: 'Get Started' })}
              {tf('CTA Link', 'ctaLink', { placeholder: '/admission' })}
              {tf('Background Image URL', 'backgroundImage', { placeholder: 'https://...' })}
            </>
          )}

          {section.sectionType === 'about' && (
            <>
              {tf('Title', 'title', { placeholder: 'About Us' })}
              {tf('Description', 'description', { multiline: true })}
              {tf('Mission', 'mission', { multiline: true })}
              {tf('Vision', 'vision', { multiline: true })}
              {tf('Image URL', 'image', { placeholder: 'https://...' })}
            </>
          )}

          {section.sectionType === 'courses' && (
            <>
              {tf('Title', 'title', { placeholder: 'Our Courses' })}
              {tf('Subtitle', 'subtitle', { multiline: true })}
              <div>
                <ArrayFieldHeader
                  label="Courses"
                  onAdd={() =>
                    addArrayItem('courses', {
                      name: '',
                      description: '',
                      duration: '',
                      fee: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.courses).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('courses', i)}
                    >
                      <TextField label="Name" value={item.name ?? ''} onChange={(v) => updateArrayItem('courses', i, 'name', v)} onBlur={saveNow} placeholder="Course name" />
                      <TextField label="Description" value={item.description ?? ''} onChange={(v) => updateArrayItem('courses', i, 'description', v)} onBlur={saveNow} multiline placeholder="Course description" />
                      <TextField label="Duration" value={item.duration ?? ''} onChange={(v) => updateArrayItem('courses', i, 'duration', v)} onBlur={saveNow} placeholder="e.g. 6 months" />
                      <TextField label="Fee" value={item.fee ?? ''} onChange={(v) => updateArrayItem('courses', i, 'fee', v)} onBlur={saveNow} placeholder="e.g. $999" />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'admission_info' && (
            <>
              {tf('Title', 'title', { placeholder: 'Admissions' })}
              {tf('Deadline', 'deadline', { placeholder: 'March 31, 2026' })}
              {tf('Eligibility', 'eligibility', { multiline: true })}
              <div>
                <ArrayFieldHeader
                  label="Steps"
                  onAdd={() =>
                    addArrayItem('steps', { title: '', description: '' })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.steps).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('steps', i)}
                    >
                      <TextField label="Step Title" value={item.title ?? ''} onChange={(v) => updateArrayItem('steps', i, 'title', v)} onBlur={saveNow} />
                      <TextField label="Description" value={item.description ?? ''} onChange={(v) => updateArrayItem('steps', i, 'description', v)} onBlur={saveNow} multiline />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'success_stories' && (
            <>
              {tf('Title', 'title', { placeholder: 'Success Stories' })}
              <div>
                <ArrayFieldHeader
                  label="Stories"
                  onAdd={() =>
                    addArrayItem('stories', {
                      name: '',
                      result: '',
                      year: '',
                      image: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.stories).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('stories', i)}
                    >
                      <TextField label="Name" value={item.name ?? ''} onChange={(v) => updateArrayItem('stories', i, 'name', v)} onBlur={saveNow} />
                      <TextField label="Result" value={item.result ?? ''} onChange={(v) => updateArrayItem('stories', i, 'result', v)} onBlur={saveNow} placeholder="e.g. AIR 12 in JEE" />
                      <TextField label="Year" value={item.year ?? ''} onChange={(v) => updateArrayItem('stories', i, 'year', v)} onBlur={saveNow} placeholder="2025" />
                      <TextField label="Image URL" value={item.image ?? ''} onChange={(v) => updateArrayItem('stories', i, 'image', v)} onBlur={saveNow} />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'faculty' && (
            <>
              {tf('Title', 'title', { placeholder: 'Our Faculty' })}
              <div>
                <ArrayFieldHeader
                  label="Members"
                  onAdd={() =>
                    addArrayItem('members', {
                      name: '',
                      designation: '',
                      subject: '',
                      image: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.members).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('members', i)}
                    >
                      <TextField label="Name" value={item.name ?? ''} onChange={(v) => updateArrayItem('members', i, 'name', v)} onBlur={saveNow} />
                      <TextField label="Designation" value={item.designation ?? ''} onChange={(v) => updateArrayItem('members', i, 'designation', v)} onBlur={saveNow} placeholder="e.g. Senior Professor" />
                      <TextField label="Subject" value={item.subject ?? ''} onChange={(v) => updateArrayItem('members', i, 'subject', v)} onBlur={saveNow} />
                      <TextField label="Image URL" value={item.image ?? ''} onChange={(v) => updateArrayItem('members', i, 'image', v)} onBlur={saveNow} />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'testimonials' && (
            <>
              {tf('Title', 'title', { placeholder: 'What Our Students Say' })}
              <div>
                <ArrayFieldHeader
                  label="Testimonials"
                  onAdd={() =>
                    addArrayItem('items', {
                      name: '',
                      text: '',
                      rating: '5',
                      image: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.items).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('items', i)}
                    >
                      <TextField label="Name" value={item.name ?? ''} onChange={(v) => updateArrayItem('items', i, 'name', v)} onBlur={saveNow} />
                      <TextField label="Testimonial Text" value={item.text ?? ''} onChange={(v) => updateArrayItem('items', i, 'text', v)} onBlur={saveNow} multiline />
                      <TextField label="Rating (1-5)" value={item.rating ?? ''} onChange={(v) => updateArrayItem('items', i, 'rating', v)} onBlur={saveNow} placeholder="5" />
                      <TextField label="Image URL" value={item.image ?? ''} onChange={(v) => updateArrayItem('items', i, 'image', v)} onBlur={saveNow} />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'faq' && (
            <>
              {tf('Title', 'title', { placeholder: 'Frequently Asked Questions' })}
              <div>
                <ArrayFieldHeader
                  label="FAQ Items"
                  onAdd={() =>
                    addArrayItem('items', { question: '', answer: '' })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.items).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('items', i)}
                    >
                      <TextField label="Question" value={item.question ?? ''} onChange={(v) => updateArrayItem('items', i, 'question', v)} onBlur={saveNow} />
                      <TextField label="Answer" value={item.answer ?? ''} onChange={(v) => updateArrayItem('items', i, 'answer', v)} onBlur={saveNow} multiline />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'contact' && (
            <>
              {tf('Title', 'title', { placeholder: 'Contact Us' })}
              {tf('Address', 'address', { multiline: true })}
              {tf('Phone', 'phone', { placeholder: '+91 98765 43210' })}
              {tf('Email', 'email', { placeholder: 'info@academy.com' })}
              {tf('Map Embed URL', 'mapEmbed', { placeholder: 'https://maps.google.com/...' })}
            </>
          )}

          {section.sectionType === 'footer' && (
            <>
              {tf('Company Name', 'companyName')}
              {tf('Description', 'description', { multiline: true })}
              <div>
                <ArrayFieldHeader
                  label="Links"
                  onAdd={() =>
                    addArrayItem('links', { label: '', url: '' })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.links).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('links', i)}
                    >
                      <TextField label="Label" value={item.label ?? ''} onChange={(v) => updateArrayItem('links', i, 'label', v)} onBlur={saveNow} />
                      <TextField label="URL" value={item.url ?? ''} onChange={(v) => updateArrayItem('links', i, 'url', v)} onBlur={saveNow} placeholder="https://..." />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
              <div>
                <ArrayFieldHeader
                  label="Social Links"
                  onAdd={() =>
                    addArrayItem('socialLinks', { platform: '', url: '' })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.socialLinks).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('socialLinks', i)}
                    >
                      <TextField label="Platform" value={item.platform ?? ''} onChange={(v) => updateArrayItem('socialLinks', i, 'platform', v)} onBlur={saveNow} placeholder="e.g. facebook, twitter" />
                      <TextField label="URL" value={item.url ?? ''} onChange={(v) => updateArrayItem('socialLinks', i, 'url', v)} onBlur={saveNow} />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'features' && (
            <>
              {tf('Title', 'title', { placeholder: 'Our Features' })}
              {tf('Subtitle', 'subtitle', { multiline: true })}
              <div>
                <ArrayFieldHeader
                  label="Feature Items"
                  onAdd={() =>
                    addArrayItem('items', {
                      title: '',
                      description: '',
                      icon: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.items).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('items', i)}
                    >
                      <TextField label="Title" value={item.title ?? ''} onChange={(v) => updateArrayItem('items', i, 'title', v)} onBlur={saveNow} />
                      <TextField label="Description" value={item.description ?? ''} onChange={(v) => updateArrayItem('items', i, 'description', v)} onBlur={saveNow} multiline />
                      <TextField label="Icon Name" value={item.icon ?? ''} onChange={(v) => updateArrayItem('items', i, 'icon', v)} onBlur={saveNow} placeholder="e.g. star, shield, book" />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'pricing' && (
            <>
              {tf('Title', 'title', { placeholder: 'Pricing Plans' })}
              <div>
                <ArrayFieldHeader
                  label="Plans"
                  onAdd={() =>
                    addArrayItem('plans', {
                      name: '',
                      price: '',
                      currency: 'USD',
                      features: '',
                      isPopular: false,
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.plans).map((item: Record<string, any>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('plans', i)}
                    >
                      <TextField label="Plan Name" value={(item.name as string) ?? ''} onChange={(v) => updateArrayItem('plans', i, 'name', v)} onBlur={saveNow} placeholder="e.g. Basic" />
                      <TextField label="Price" value={(item.price as string) ?? ''} onChange={(v) => updateArrayItem('plans', i, 'price', v)} onBlur={saveNow} placeholder="29" />
                      <TextField label="Currency" value={(item.currency as string) ?? ''} onChange={(v) => updateArrayItem('plans', i, 'currency', v)} onBlur={saveNow} placeholder="USD" />
                      <TextField label="Features (comma-separated)" value={(item.features as string) ?? ''} onChange={(v) => updateArrayItem('plans', i, 'features', v)} onBlur={saveNow} multiline placeholder="Feature 1, Feature 2, Feature 3" />
                      <label className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          checked={!!item.isPopular}
                          onChange={(e) =>
                            updateArrayItem('plans', i, 'isPopular', e.target.checked)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-medium text-gray-600">
                          Popular plan
                        </span>
                      </label>
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'cta' && (
            <>
              {tf('Title', 'title', { placeholder: 'Ready to Get Started?' })}
              {tf('Subtitle', 'subtitle', { multiline: true, placeholder: 'Join thousands of students...' })}
              {tf('Button Text', 'buttonText', { placeholder: 'Enroll Now' })}
              {tf('Button Link', 'buttonLink', { placeholder: '/admission' })}
            </>
          )}

          {section.sectionType === 'stats' && (
            <>
              {tf('Title', 'title', { placeholder: 'Our Numbers' })}
              <div>
                <ArrayFieldHeader
                  label="Stats"
                  onAdd={() =>
                    addArrayItem('items', {
                      label: '',
                      value: '',
                      suffix: '',
                    })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.items).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('items', i)}
                    >
                      <TextField label="Label" value={item.label ?? ''} onChange={(v) => updateArrayItem('items', i, 'label', v)} onBlur={saveNow} placeholder="e.g. Students Enrolled" />
                      <TextField label="Value" value={item.value ?? ''} onChange={(v) => updateArrayItem('items', i, 'value', v)} onBlur={saveNow} placeholder="e.g. 5000" />
                      <TextField label="Suffix" value={item.suffix ?? ''} onChange={(v) => updateArrayItem('items', i, 'suffix', v)} onBlur={saveNow} placeholder="e.g. +" />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}

          {section.sectionType === 'gallery' && (
            <>
              {tf('Title', 'title', { placeholder: 'Gallery' })}
              <div>
                <ArrayFieldHeader
                  label="Images"
                  onAdd={() =>
                    addArrayItem('images', { url: '', caption: '' })
                  }
                />
                <div className="space-y-2">
                  {asArray(c.images).map((item: Record<string, string>, i: number) => (
                    <ArrayItemWrapper
                      key={i}
                      index={i}
                      onRemove={() => removeArrayItem('images', i)}
                    >
                      <TextField label="Image URL" value={item.url ?? ''} onChange={(v) => updateArrayItem('images', i, 'url', v)} onBlur={saveNow} placeholder="https://..." />
                      <TextField label="Caption" value={item.caption ?? ''} onChange={(v) => updateArrayItem('images', i, 'caption', v)} onBlur={saveNow} />
                    </ArrayItemWrapper>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
