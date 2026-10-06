import React from 'react';
import {
  Flame,
  Globe,
  Landmark,
  Building2,
  Trophy,
  Film,
  Cpu,
  MapPin,
  Compass,
  PlayCircle,
  Tv,
} from 'lucide-react';
import { TabType } from '../types';

export interface CategoryItem {
  id: string;
  name: string;
  tab: TabType;
  categoryFilter?: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
}

interface FullCategoryGridProps {
  activeCategory: string;
  onSelectCategory: (item: CategoryItem) => void;
}

export const FullCategoryGrid: React.FC<FullCategoryGridProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: CategoryItem[] = [
    {
      id: 'all',
      name: 'সর্বশেষ',
      tab: 'home',
      categoryFilter: 'all',
      icon: <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'national',
      name: 'জাতীয়',
      tab: 'category',
      categoryFilter: 'national',
      icon: <Landmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'international',
      name: 'আন্তর্জাতিক',
      tab: 'category',
      categoryFilter: 'international',
      icon: <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'politics',
      name: 'রাজনীতি',
      tab: 'category',
      categoryFilter: 'politics',
      icon: <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'sports',
      name: 'খেলাধুলা',
      tab: 'category',
      categoryFilter: 'sports',
      icon: <Trophy className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'entertainment',
      name: 'বিনোদন',
      tab: 'category',
      categoryFilter: 'entertainment',
      icon: <Film className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'tech',
      name: 'প্রযুক্তি',
      tab: 'category',
      categoryFilter: 'tech',
      icon: <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'jamalpur',
      name: 'জামালপুর',
      tab: 'category',
      categoryFilter: 'jamalpur',
      isSpecial: true,
      icon: <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'saradesh',
      name: 'সারাদেশ',
      tab: 'location',
      categoryFilter: 'saradesh',
      icon: <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
    {
      id: 'video',
      name: 'ভিডিও',
      tab: 'video',
      icon: <PlayCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />,
    },
  ];

  return (
    <div id="full-category-grid" className="w-full">
      {/* Category header with red dot */}
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#e50914] live-dot" />
          <span className="text-[11px] sm:text-xs font-bold text-gray-200 tracking-wide uppercase">
            সকল বিভাগ (Categories)
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">১০টি বিভাগ</span>
      </div>

      {/* 5-column / 2-row full category matrix - 100% visible without scrolling */}
      <div className="grid grid-cols-5 gap-1.5 w-full">
        {categories.map(item => {
          const isActive = activeCategory === item.id || (activeCategory === 'all' && item.id === 'all');
          return (
            <button
              key={item.id}
              id={`cat-btn-${item.id}`}
              onClick={() => onSelectCategory(item)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 focus:outline-none relative group ${
                isActive
                  ? 'bg-[#1e1014] border border-[#e50914] text-[#e50914] shadow-md shadow-red-950/60 scale-[1.02]'
                  : item.isSpecial
                  ? 'bg-[#161218] border border-red-900/40 text-red-400 hover:border-red-600 hover:bg-[#1f1520]'
                  : 'bg-[#12141c] border border-[#202434] text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#181b26]'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-red-600/20 text-[#ff333d]'
                    : item.isSpecial
                    ? 'bg-red-950/40 text-red-400'
                    : 'bg-[#1a1d29] text-gray-300 group-hover:text-white'
                }`}
              >
                {item.icon}
              </div>

              {/* Category Name */}
              <span
                className={`text-[9.5px] sm:text-[10.5px] font-medium tracking-tight mt-1 leading-none text-center whitespace-nowrap truncate w-full ${
                  isActive
                    ? 'font-bold text-[#ff333d]'
                    : item.isSpecial
                    ? 'font-semibold text-red-300'
                    : 'text-gray-300 group-hover:text-gray-100'
                }`}
              >
                {item.name}
              </span>

              {/* Special Jamalpur AI Channel Indicator Dot */}
              {item.isSpecial && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
