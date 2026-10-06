import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface LatestNewsSectionProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onViewAll: () => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  news,
  onSelectNews,
  onViewAll,
}) => {
  // Exactly 5 news items as shown in screenshot 75.PNG
  const displayNews = news.slice(0, 5);

  if (!displayNews || displayNews.length === 0) return null;

  return (
    <section id="latest-news-section" className="w-full">
      {/* Section Header matching screenshot 75.PNG */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-2">
          {/* Solid Red Dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] shadow-xs flex-shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
            সর্বশেষ খবর
          </h2>
        </div>

        {/* 'আরও দেখুন >' in Red */}
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-xs font-bold text-[#e50914] hover:text-[#ff2b37] transition-colors focus:outline-none"
        >
          <span>আরও দেখুন</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 5 Cards Row matching screenshot 75.PNG */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 py-0.5 px-0.5 w-full">
        {displayNews.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectNews(item)}
            className="flex flex-col justify-between rounded-xl bg-[#0c0e15] border border-[#181c28] hover:border-gray-600 p-1.5 sm:p-2 cursor-pointer group transition-all duration-200 shadow-md select-none w-full min-w-0"
          >
            {/* Top Clean Thumbnail Image without category badge */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 border border-white/5">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Middle: Headline (2 lines, clean bold font) */}
            <div className="flex-1 flex flex-col justify-between mt-1.5 sm:mt-2 min-w-0">
              <h4 className="text-[10px] sm:text-[11.5px] font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                {item.title}
              </h4>

              {/* Bottom: Date with Calendar Icon */}
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-400 mt-1.5 sm:mt-2 truncate pt-1 border-t border-white/5">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0 stroke-[1.8]" />
                <span className="truncate">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


