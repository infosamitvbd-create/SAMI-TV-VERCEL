import React, { useState } from 'react';
import { Landmark, MapPin, Calendar, Eye, Search, Filter } from 'lucide-react';
import { NewsItem } from '../types';
import { JAMALPUR_UPAZILAS } from '../config/appConfig';

interface JamalpurNewsViewProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const JamalpurNewsView: React.FC<JamalpurNewsViewProps> = ({
  newsList,
  onSelectNews,
}) => {
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সব এলাকা');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter news specifically for Jamalpur and its upazilas
  const jamalpurNews = newsList.filter(item => {
    const isJamalpurRelated =
      item.categoryKey === 'jamalpur' ||
      (item.location && item.location.includes('জামালপুর')) ||
      item.title.includes('জামালপুর') ||
      item.tags?.some(t => t.includes('জামালপুর')) ||
      (item.upazila && JAMALPUR_UPAZILAS.includes(item.upazila));

    if (!isJamalpurRelated) return false;

    // Upazila filtering
    if (selectedUpazila !== 'সব এলাকা') {
      const matchesUpazila =
        item.upazila === selectedUpazila ||
        (item.location && item.location.includes(selectedUpazila)) ||
        item.title.includes(selectedUpazila) ||
        item.tags?.some(t => t.includes(selectedUpazila));
      if (!matchesUpazila) return false;
    }

    // Search query filtering
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.reporter && item.reporter.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    return true;
  });

  return (
    <div id="jamalpur-news-view" className="w-full max-w-md mx-auto pb-20 animate-fade-in">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#08090d]/95 backdrop-blur-md border-b border-[#181a26] px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">জামালপুর জেলা সংবাদ</h2>
            <p className="text-[10px] text-gray-400">৭টি উপজেলার সর্বশেষ সংবাদ ও তথ্য</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-red-400 bg-red-950/60 border border-red-800/40 px-2 py-0.5 rounded-full">
          {jamalpurNews.length}টি খবর
        </span>
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="উপজেলা বা বিষয় দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#10121a] border border-[#1f2334] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Upazila Filter Chips Horizontal Scroll */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Filter className="w-3 h-3 text-red-500" />
            <span>উপজেলা নির্বাচন:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
            {JAMALPUR_UPAZILAS.map(upazila => {
              const isSelected = selectedUpazila === upazila;
              return (
                <button
                  key={upazila}
                  onClick={() => setSelectedUpazila(upazila)}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? 'bg-red-600 text-white font-bold border-red-500 shadow-md shadow-red-900/30'
                      : 'bg-[#12141d] text-gray-300 border-[#1f2230] hover:border-gray-600 hover:text-white'
                  }`}
                >
                  {upazila}
                </button>
              );
            })}
          </div>
        </div>

        {/* News List */}
        {jamalpurNews.length > 0 ? (
          <div className="space-y-3">
            {jamalpurNews.map((item, idx) => (
              <article
                key={item.id}
                id={`jamalpur-news-${item.id}`}
                onClick={() => onSelectNews(item)}
                className={`group bg-[#10121a] hover:bg-[#151824] border border-[#1b1e2c] hover:border-red-900/40 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-sm ${
                  idx === 0 && selectedUpazila === 'সব এলাকা' ? 'p-0' : 'p-3 flex gap-3'
                }`}
              >
                {/* Highlight First Item as Featured Card */}
                {idx === 0 && selectedUpazila === 'সব এলাকা' ? (
                  <div>
                    <div className="w-full h-44 relative overflow-hidden bg-gray-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {item.upazila || item.category}
                      </div>
                      <div className="absolute bottom-2.5 inset-x-2.5 text-left">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {item.location || 'জামালপুর'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {item.publishedTime}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Standard Horizontal Card */
                  <>
                    <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 relative border border-gray-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.upazila && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8.5px] text-white text-center py-0.5 truncate px-1">
                          {item.upazila}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0 text-left">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-red-400 font-semibold mb-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{item.location || 'জামালপুর'}</span>
                        </div>
                        <h3 className="text-xs font-bold text-gray-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {item.publishedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-2.5 h-2.5" />
                          {item.views ? item.views.toLocaleString('bn-BD') : '১,২০০'}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 bg-[#10121a] rounded-xl border border-[#1b1e2c]">
            <Landmark className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-gray-300">কোনো সংবাদ পাওয়া যায়নি</h4>
            <p className="text-xs text-gray-500 mt-1">
              "{selectedUpazila}" এলাকায় এই মুহূর্তে কোনো নতুন সংবাদ প্রকাশিত হয়নি।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
