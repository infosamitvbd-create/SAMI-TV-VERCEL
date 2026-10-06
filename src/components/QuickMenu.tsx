import React from 'react';
import { Tv, PlayCircle, MapPin, Globe, LayoutGrid, FileText, Film } from 'lucide-react';
import { TabType } from '../types';

interface QuickMenuItem {
  id: string;
  name: string;
  tab: TabType;
  icon: React.ReactNode;
  categoryFilter?: string;
}

interface QuickMenuProps {
  activeId: string;
  onSelect: (item: QuickMenuItem) => void;
}

export const QuickMenu: React.FC<QuickMenuProps> = ({ activeId, onSelect }) => {
  const menuItems: QuickMenuItem[] = [
    {
      id: 'latest',
      name: 'সর্বশেষ খবর',
      tab: 'home',
      icon: <FileText className="w-4 h-4 text-red-500 stroke-[2]" />,
    },
    {
      id: 'live_tv',
      name: 'লাইভ টিভি',
      tab: 'live',
      icon: <Tv className="w-5 h-5 text-gray-300 stroke-[1.8]" />,
    },
    {
      id: 'video',
      name: 'ভিডিও',
      tab: 'video',
      icon: <PlayCircle className="w-5 h-5 text-gray-300 stroke-[1.8]" />,
    },
    {
      id: 'saradesh',
      name: 'সারা দেশ',
      tab: 'location',
      categoryFilter: 'saradesh',
      icon: <MapPin className="w-5 h-5 text-gray-300 stroke-[1.8]" />,
    },
    {
      id: 'international',
      name: 'আন্তর্জাতিক',
      tab: 'category',
      categoryFilter: 'international',
      icon: <Globe className="w-5 h-5 text-gray-300 stroke-[1.8]" />,
    },
    {
      id: 'more_categories',
      name: 'আরও বিভাগ',
      tab: 'category',
      icon: <LayoutGrid className="w-5 h-5 text-gray-300 stroke-[1.8]" />,
    },
  ];

  return (
    <div id="quick-menu-container" className="w-full">
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {menuItems.map(item => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="flex flex-col items-center justify-center flex-1 min-w-[50px] sm:min-w-[56px] group focus:outline-none"
            >
              {/* Icon Container Box matching screenshot 678.PNG */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 bg-[#0e1017] border ${
                  isActive
                    ? 'border-red-900/60 shadow-md shadow-red-950/40'
                    : 'border-[#1b1f2e] group-hover:border-gray-600 group-hover:bg-[#141722]'
                }`}
              >
                {/* For active item / 'latest' item: red circular ring around icon matching screenshot */}
                {isActive && item.id === 'latest' ? (
                  <div className="w-7 h-7 rounded-full border border-red-500 flex items-center justify-center">
                    {item.icon}
                  </div>
                ) : (
                  item.icon
                )}
              </div>

              {/* Title */}
              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-red-500 font-bold'
                    : 'text-gray-300 group-hover:text-white'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
