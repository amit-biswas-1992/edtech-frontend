'use client';

import { useAppStore, BuilderTab } from '@/lib/store';
import {
  HiOutlineSquares2X2,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineTag,
} from 'react-icons/hi2';
import SectionList from './SectionList';
import TeacherManager from './TeacherManager';
import CourseManager from './CourseManager';
import PromoManager from './PromoManager';

interface BuilderSidebarProps {
  siteId: string;
}

const tabs: { key: BuilderTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'sections', label: 'Sections', icon: HiOutlineSquares2X2 },
  { key: 'courses', label: 'Courses', icon: HiOutlineAcademicCap },
  { key: 'teachers', label: 'Teachers', icon: HiOutlineUserGroup },
  { key: 'promos', label: 'Promos', icon: HiOutlineTag },
];

export default function BuilderSidebar({ siteId }: BuilderSidebarProps) {
  const activeBuilderTab = useAppStore((s) => s.activeBuilderTab);
  const setActiveBuilderTab = useAppStore((s) => s.setActiveBuilderTab);

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeBuilderTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveBuilderTab(tab.key)}
                className={`flex-1 flex flex-col items-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors relative ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeBuilderTab === 'sections' && <SectionList />}
        {activeBuilderTab === 'courses' && <CourseManager siteId={siteId} />}
        {activeBuilderTab === 'teachers' && <TeacherManager siteId={siteId} />}
        {activeBuilderTab === 'promos' && <PromoManager siteId={siteId} />}
      </div>
    </div>
  );
}
