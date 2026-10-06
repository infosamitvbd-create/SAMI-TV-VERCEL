import React from 'react';
import { Home, Globe2, Tv2, Landmark, Film, MapPin, Megaphone, Settings } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'প্রচ্ছদ',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'category',
      label: 'জাতীয়',
      icon: <Globe2 className="w-4 h-4" />,
    },
    {
      id: 'live',
      label: 'লাইভ',
      icon: <Tv2 className="w-4 h-4" />,
    },
    {
      id: 'reels',
      label: 'রিলস',
      icon: <Film className="w-4 h-4" />,
    },
    {
      id: 'jamalpur',
      label: 'জামালপুর',
      icon: <Landmark className="w-4 h-4" />,
    },
    {
      id: 'location',
      label: 'সারাদেশ',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 'ads',
      label: 'বিজ্ঞাপন',
      icon: <Megaphone className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'সেটিংস',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#08090d]/98 backdrop-blur-lg border-t border-[#1a1e2c] py-1 px-1 shadow-[0_-4px_16px_rgba(0,0,0,0.8)] transition-all"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-0.5 px-0.5 transition-all duration-150 focus:outline-none ${
                isActive
                  ? 'text-[#e50914]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Icon */}
              <div className="relative">
                {tab.icon}
                {tab.id === 'live' && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse ring-1 ring-black" />
                )}
              </div>

              {/* Bengali label */}
              <span
                className={`text-[9px] leading-tight tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'font-bold text-[#e50914]' : 'font-medium text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
