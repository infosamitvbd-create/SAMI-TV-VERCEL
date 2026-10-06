import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface BreakingNewsBarProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onViewAll: () => void;
}

export const BreakingNewsBar: React.FC<BreakingNewsBarProps> = ({
  news,
  onSelectNews,
  onViewAll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [news.length]);

  const current = news[currentIndex] || news[0];
  if (!current) return null;

  return (
    <div
      id="breaking-news-bar"
      onClick={() => onSelectNews(current)}
      className="w-full bg-[#12141d] border border-red-900/30 hover:border-red-600/60 rounded-xl p-2 flex items-center justify-between gap-2 cursor-pointer group shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Red Breaking Badge */}
        <div className="flex items-center gap-1 bg-[#e50914] text-white text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 animate-pulse">
          <Radio className="w-3 h-3" />
          <span>ব্রেকিং</span>
        </div>

        {/* Ticker text */}
        <p className="text-[11px] sm:text-xs text-gray-200 truncate group-hover:text-red-400 transition-colors font-medium">
          {current.title}
        </p>
      </div>

      <button
        onClick={e => {
          e.stopPropagation();
          onViewAll();
        }}
        className="flex items-center text-[10px] text-red-500 hover:text-red-400 font-semibold flex-shrink-0 pl-1"
      >
        <span>সকল</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};
