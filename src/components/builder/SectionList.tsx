'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineViewBoards,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlineColorSwatch,
  HiMenuAlt4,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import { sectionMeta } from '@/lib/section-labels';
import SectionLibrary from './SectionLibrary';
import type { SiteSection, SectionType } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineViewBoards,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlineColorSwatch,
};

function getSectionIcon(sectionType: SectionType) {
  const meta = sectionMeta[sectionType];
  return iconMap[meta?.icon] ?? HiOutlineViewBoards;
}

interface SortableItemProps {
  section: SiteSection;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
}

function SortableItem({
  section,
  isSelected,
  onSelect,
  onToggleVisibility,
  onDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = getSectionIcon(section.sectionType);
  const meta = sectionMeta[section.sectionType];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
        isDragging
          ? 'opacity-50 shadow-lg bg-blue-50 z-50'
          : isSelected
            ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
            : 'bg-white border-2 border-transparent hover:bg-gray-50 hover:border-gray-200'
      } ${!section.isVisible ? 'opacity-60' : ''}`}
      onClick={onSelect}
    >
      {/* Drag handle */}
      <button
        className="shrink-0 p-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <HiMenuAlt4 className="w-4 h-4" />
      </button>

      {/* Icon + Label */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Icon
          className={`w-4 h-4 shrink-0 ${
            isSelected ? 'text-blue-600' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-sm font-medium truncate ${
            isSelected ? 'text-blue-700' : 'text-gray-700'
          }`}
        >
          {meta?.label ?? section.sectionType}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          title={section.isVisible ? 'Hide section' : 'Show section'}
        >
          {section.isVisible ? (
            <HiOutlineEye className="w-3.5 h-3.5 text-gray-500" />
          ) : (
            <HiOutlineEyeOff className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded hover:bg-red-50 transition-colors"
          title="Delete section"
        >
          <HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default function SectionList() {
  const currentSite = useAppStore((s) => s.currentSite);
  const sections = useAppStore((s) => s.sections);
  const selectedSectionId = useAppStore((s) => s.selectedSectionId);
  const selectSection = useAppStore((s) => s.selectSection);
  const setSections = useAppStore((s) => s.setSections);
  const updateSectionInStore = useAppStore((s) => s.updateSectionInStore);
  const reorderSectionsInStore = useAppStore((s) => s.reorderSectionsInStore);

  const [showLibrary, setShowLibrary] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id || !currentSite) return;

      const oldIndex = sorted.findIndex((s) => s.id === active.id);
      const newIndex = sorted.findIndex((s) => s.id === over.id);
      const reordered = arrayMove(sorted, oldIndex, newIndex).map((s, i) => ({
        ...s,
        order: i,
      }));

      reorderSectionsInStore(reordered);

      try {
        await api.sections.reorderSections(
          currentSite.id,
          reordered.map((s) => ({ id: s.id, order: s.order }))
        );
      } catch {
        reorderSectionsInStore(sorted);
        toast.error('Failed to reorder sections');
      }
    },
    [currentSite, sorted, reorderSectionsInStore]
  );

  const handleToggleVisibility = useCallback(
    async (section: SiteSection) => {
      if (!currentSite) return;
      const newVal = !section.isVisible;
      updateSectionInStore(section.id, { isVisible: newVal });
      try {
        await api.sections.updateSection(currentSite.id, section.id, {
          isVisible: newVal,
        });
      } catch {
        updateSectionInStore(section.id, { isVisible: section.isVisible });
        toast.error('Failed to update visibility');
      }
    },
    [currentSite, updateSectionInStore]
  );

  const handleDelete = useCallback(
    async (section: SiteSection) => {
      if (!currentSite) return;
      const prevSections = [...sections];
      const filtered = sections.filter((s) => s.id !== section.id);
      setSections(filtered);
      if (selectedSectionId === section.id) {
        selectSection(null);
      }
      try {
        await api.sections.removeSection(currentSite.id, section.id);
        toast.success('Section removed');
      } catch {
        setSections(prevSections);
        toast.error('Failed to remove section');
      }
    },
    [currentSite, sections, selectedSectionId, setSections, selectSection]
  );

  const handleAddSection = useCallback(
    async (sectionType: SectionType, designVariant: number) => {
      if (!currentSite) return;
      setShowLibrary(false);
      try {
        const newSection = await api.sections.addSection(currentSite.id, {
          sectionType,
          designVariant,
          order: sections.length,
          content: {},
        });
        setSections([...sections, newSection]);
        selectSection(newSection.id);
        toast.success(`${sectionMeta[sectionType].label} added`);

        // Auto-scroll to new section (A4)
        setTimeout(() => {
          const el = document.getElementById(`section-${newSection.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      } catch {
        toast.error('Failed to add section');
      }
    },
    [currentSite, sections, setSections, selectSection]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Sections
        </h2>
      </div>

      {/* Section list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sorted.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sorted.map((section) => (
              <SortableItem
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onSelect={() => selectSection(section.id)}
                onToggleVisibility={() => handleToggleVisibility(section)}
                onDelete={() => handleDelete(section)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <HiOutlineViewBoards className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No sections yet</p>
            <p className="text-xs text-gray-400">Add a section to get started</p>
          </div>
        )}
      </div>

      {/* Add Section button */}
      <div className="px-3 py-3 border-t border-gray-200">
        <button
          onClick={() => setShowLibrary(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Section
        </button>
      </div>

      {/* Section Library Modal */}
      {showLibrary && (
        <SectionLibrary
          onAdd={handleAddSection}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  );
}
