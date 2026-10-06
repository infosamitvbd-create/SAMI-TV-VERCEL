import React, { useState, useEffect } from 'react';
import { Zap, Calendar, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface FeaturedSliderProps {
  items: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ items, onSelectNews }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const featuredItems = items.filter(item => item.isFeatured).length > 0
    ? items.filter(item => item.isFeatured).slice(0, 5)
    : items.slice(0, 5);

  // Auto rotate slides every 5 seconds
  useEffect(() => {
    if (isPaused || featuredItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, featuredItems.length]);

  if (!featuredItems || featuredItems.length === 0) return null;

  const currentItem = featuredItems[currentIndex] || featuredItems[0];

  return (
    <div
      id="featured-news-slider"
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Featured News Card Container matching screenshot 678.PNG */}
      <div
        onClick={() => onSelectNews(currentItem)}
        className="relative overflow-hidden rounded-2xl bg-[#0e1017] border border-[#1b1f2e] p-3.5 sm:p-4 cursor-pointer group shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          {/* Left Text Column */}
          <div className="flex-1 pr-1 flex flex-col justify-between z-10 min-w-0">
            <div>
              {/* Category Tag with Red Lightning Icon */}
              <div className="flex items-center gap-1.5 text-[#e50914] text-xs font-bold mb-2">
                <Zap className="w-3.5 h-3.5 fill-[#e50914] text-[#e50914]" />
                <span className="tracking-wide">শীর্ষ সংবাদ</span>
              </div>

              {/* Bengali Headline matching screenshot */}
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                {currentItem.title}
              </h3>
            </div>

            <div className="mt-3 space-y-2.5">
              {/* Date */}
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-normal">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{currentItem.date}</span>
              </div>

              {/* Red 'বিস্তারিত >' Button matching screenshot */}
              <div>
                <div className="inline-flex items-center gap-1 bg-[#d0101b] group-hover:bg-[#e50914] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md shadow-red-950 transition-colors">
                  <span>বিস্তারিত</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Column (Infantino portrait / Featured photo) */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 relative overflow-hidden rounded-xl bg-[#090b10] border border-white/5">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle natural shadow blend */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0e1017]/40" />
          </div>
        </div>
      </div>

      {/* Slider Pagination Dots matching screenshot 678.PNG (🔴 ⚪ ⚪ ⚪ ⚪) */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {featuredItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-200 rounded-full ${
              currentIndex === idx
                ? 'w-2 h-2 bg-[#e50914]'
                : 'w-1.5 h-1.5 bg-gray-500/70 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
