import React, { useState } from 'react';
import { MapPin, Calendar, Eye, Search, Layers, List } from 'lucide-react';
import { NewsItem } from '../types';
import { DISTRICTS, DIVISIONS, DivisionItem } from '../config/appConfig';

interface LocationNewsViewProps {
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
  onSelectCategory?: (category: string) => void;
}

export const LocationNewsView: React.FC<LocationNewsViewProps> = ({
  newsList,
  onSelectNews,
}) => {
  const [viewMode, setViewMode] = useState<'news' | 'divisions'>('news');
  const [selectedDivision, setSelectedDivision] = useState<string>('সব বিভাগ');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('জামালপুর');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDistricts = DISTRICTS.filter(d =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter news items based on selected division or district
  const districtNews = newsList.filter(item => {
    if (selectedDivision !== 'সব বিভাগ') {
      return (
        item.division === selectedDivision ||
        (item.location && item.location.includes(selectedDivision.replace(' বিভাগ', '')))
      );
    }
    return (
      item.categoryKey === 'saradesh' ||
      item.categoryKey === 'jamalpur' ||
      (item.location && item.location.includes(selectedDistrict)) ||
      item.title.includes(selectedDistrict)
    );
  });

  return (
    <div id="location-news-view" className="w-full max-w-md mx-auto pb-24 animate-fade-in">
      {/* Top Header matching Screenshot 5 */}
      <div className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#1c1f2e] px-3.5 py-2.5 flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>সারাদেশ ও বিভাগীয় সংবাদ</span>
        </h2>

        {/* Toggle between News Cards and Divisions Directory */}
        <div className="flex items-center gap-1 bg-[#141722] p-0.5 rounded-lg border border-[#232738]">
          <button
            onClick={() => setViewMode('news')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              viewMode === 'news' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            সংবাদ
          </button>
          <button
            onClick={() => setViewMode('divisions')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              viewMode === 'divisions' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            বিভাগ তালিকা
          </button>
        </div>
      </div>

      {viewMode === 'divisions' ? (
        /* Divisions Directory View matching Screenshot 5 (Bottom-Middle) */
        <div className="p-3.5 space-y-2.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold text-gray-300">সকল বিভাগসমূহ</span>
            <span className="text-[11px] text-gray-500">৮টি বিভাগ</span>
          </div>

          {DIVISIONS.map((division: DivisionItem) => (
            <button
              key={division.id}
              onClick={() => {
                setSelectedDivision(division.name);
                setViewMode('news');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#10121a] hover:bg-[#151824] border border-[#1d202e] hover:border-red-900/50 transition-all duration-200 group text-left shadow-sm"
            >
              {/* Left: Division Image + Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800">
                  <img
                    src={division.image}
                    alt={division.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-100 group-hover:text-red-400 transition-colors truncate flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span>{division.name}</span>
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {division.newsCount} টি সংবাদ প্রকাশিত
                  </p>
                </div>
              </div>

              {/* Right: 'খবর দেখুন >' */}
              <div className="flex items-center gap-1 text-gray-400 group-hover:text-red-400 transition-colors flex-shrink-0 pl-2">
                <span className="text-xs font-semibold">খবর দেখুন &gt;</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* News List View with Division & District Filters */
        <div className="p-3 space-y-3">
          {/* Division Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedDivision('সব বিভাগ')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDivision === 'সব বিভাগ'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-[#12141c] text-gray-300 border border-[#202436] hover:text-white'
              }`}
            >
              সব বিভাগ
            </button>
            {DIVISIONS.map(div => {
              const isActive = selectedDivision === div.name;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-[#12141c] text-gray-300 border border-[#202436] hover:text-white'
                  }`}
                >
                  {div.name.replace(' বিভাগ', '')}
                </button>
              );
            })}
          </div>

          {/* District Search & Selection */}
          <div className="bg-[#10121a] p-2.5 rounded-xl border border-[#1e2230] space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="জেলা খুঁজুন (যেমন: জামালপুর, ঢাকা, রাজশাহী)..."
                className="w-full bg-[#161824] border border-[#262a3d] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* District Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {filteredDistricts.map(dist => {
                const isActive = selectedDistrict === dist && selectedDivision === 'সব বিভাগ';
                return (
                  <button
                    key={dist}
                    onClick={() => {
                      setSelectedDistrict(dist);
                      setSelectedDivision('সব বিভাগ');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-[#161824] text-gray-300 border border-[#262a3d] hover:text-white'
                    }`}
                  >
                    {dist}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Header */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-gray-300">
              <span className="text-red-500">
                {selectedDivision !== 'সব বিভাগ' ? selectedDivision : `${selectedDistrict} জেলা`}
              </span>{' '}
              সর্বশেষ খবর
            </span>
            <span className="text-[11px] text-gray-500">
              {districtNews.length.toLocaleString('bn-BD')} টি সংবাদ
            </span>
          </div>

          {/* News List matching Screenshots 1 & 3 */}
          <div className="space-y-2.5">
            {districtNews.length > 0 ? (
              districtNews.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelectNews(item)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#10121a] hover:bg-[#141722] border border-[#1c1f2e] hover:border-gray-600 cursor-pointer group transition-all duration-200 shadow-sm"
                >
                  <div className="relative w-28 sm:w-32 h-20 sm:h-22 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800/80">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-2 truncate">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
                        <span>{item.publishedTime || item.date}</span>
                      </span>

                      <span className="text-red-500 font-bold">|</span>

                      <span className="text-red-500 font-semibold truncate">
                        {item.location || item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#10121a] rounded-2xl border border-[#1c1f2e]">
                <p className="text-xs text-gray-400">
                  {selectedDivision !== 'সব বিভাগ' ? selectedDivision : selectedDistrict} সম্পর্কিত নতুন সংবাদ শীঘ্রই আসছে।
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
