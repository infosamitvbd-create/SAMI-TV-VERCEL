import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Grid,
  MapPin,
  Flame,
  Search,
} from 'lucide-react';
import { NewsItem } from '../types';
import { CATEGORIES, JAMALPUR_UPAZILAS, DIVISIONS } from '../config/appConfig';
import { CategoryDirectoryView } from './CategoryDirectoryView';

interface CategoryViewProps {
  newsList: NewsItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectNews: (news: NewsItem) => void;
  onBackToHome?: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  newsList,
  selectedCategory,
  onSelectCategory,
  onSelectNews,
  onBackToHome,
}) => {
  const [showDirectory, setShowDirectory] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('সব');
  const [selectedDivision, setSelectedDivision] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get active category configuration
  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];
  }, [selectedCategory]);

  // Handle category change and reset sub-filters
  const handleCategoryChange = (catId: string) => {
    onSelectCategory(catId);
    setSelectedSubCategory('সব');
    setSelectedDivision('সব');
    setShowDirectory(false);
  };

  // Filter news items based on active category, sub-category, division, and search query
  const filteredNews = useMemo(() => {
    return newsList.filter(item => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesLocation = item.location ? item.location.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesCategory && !matchesLocation) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory === 'all') {
        return true;
      }

      if (selectedCategory === 'jamalpur') {
        const isJamalpur =
          item.categoryKey === 'jamalpur' ||
          (item.location && item.location.includes('জামালপুর')) ||
          (item.division && item.division.includes('ময়মনসিংহ'));

        if (!isJamalpur) return false;

        // Sub-category (Upazila) filter for Jamalpur
        if (selectedSubCategory !== 'সব' && selectedSubCategory !== 'সব এলাকা') {
          const matchUpazila =
            item.upazila === selectedSubCategory ||
            (item.location && item.location.includes(selectedSubCategory)) ||
            item.title.includes(selectedSubCategory);
          return matchUpazila;
        }
        return true;
      }

      if (selectedCategory === 'saradesh') {
        const isSaradesh =
          item.categoryKey === 'saradesh' ||
          item.categoryKey === 'jamalpur' ||
          item.division !== undefined;

        if (!isSaradesh) return false;

        // Division filter for Saradesh
        if (selectedDivision !== 'সব' && selectedDivision !== 'সব বিভাগ') {
          const matchDivision =
            item.division === selectedDivision ||
            (item.location && item.location.includes(selectedDivision.replace(' বিভাগ', '')));
          return matchDivision;
        }
        return true;
      }

      return item.categoryKey === selectedCategory;
    });
  }, [newsList, selectedCategory, selectedSubCategory, selectedDivision, searchQuery]);

  // If user opened the full Category Directory list (Screenshot 6 style)
  if (showDirectory) {
    return (
      <CategoryDirectoryView
        onSelectCategory={handleCategoryChange}
        onBack={() => setShowDirectory(false)}
      />
    );
  }

  return (
    <div id="category-page-view" className="w-full max-w-md mx-auto pb-24 animate-fade-in">
      {/* 1. Header matching the Reference Screenshot (Back Arrow, Title, Directory Switcher) */}
      <div className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#1c1f2e] px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              aria-label="Go back to Home"
              className="p-1 -ml-1 text-gray-300 hover:text-white rounded-lg focus:outline-none transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
            <span>{activeCategoryObj.name}</span>
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick toggle to Category Main Directory List */}
          <button
            onClick={() => setShowDirectory(true)}
            aria-label="View all categories directory"
            className="flex items-center gap-1 text-xs font-semibold bg-[#161824] hover:bg-[#202436] text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-[#262a3d] transition-colors"
          >
            <Grid className="w-3.5 h-3.5 text-red-500" />
            <span>সকল বিভাগ</span>
          </button>
        </div>
      </div>

      {/* 2. Horizontal Category Tabs Filter matching Screenshot 1 & 3 */}
      <div className="bg-[#0b0c10] border-b border-[#181a26] px-3 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-[#e50914] text-white shadow-md shadow-red-950/80 font-bold'
                    : 'bg-[#12141c] text-gray-300 border border-[#202436] hover:text-white hover:border-gray-500'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sub-Category Pills if Jamalpur is selected (৭টি উপজেলা) */}
      {selectedCategory === 'jamalpur' && (
        <div className="bg-[#0e1017] border-b border-[#1b1e2c] px-3 py-2">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>জামালপুরের উপজেলা নির্বাচন করুন:</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {JAMALPUR_UPAZILAS.map(upazila => {
              const isUpazilaActive =
                selectedSubCategory === upazila ||
                (upazila === 'সব এলাকা' && selectedSubCategory === 'সব');
              return (
                <button
                  key={upazila}
                  onClick={() => setSelectedSubCategory(upazila === 'সব এলাকা' ? 'সব' : upazila)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    isUpazilaActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-[#161824] text-gray-300 border border-[#232738] hover:text-white'
                  }`}
                >
                  {upazila}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Division Pills if 'সারাদেশ' is selected (৮টি বিভাগ) */}
      {selectedCategory === 'saradesh' && (
        <div className="bg-[#0e1017] border-b border-[#1b1e2c] px-3 py-2">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>বিভাগ অনুযায়ী ফিল্টার করুন:</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedDivision('সব')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedDivision === 'সব'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#161824] text-gray-300 border border-[#232738] hover:text-white'
              }`}
            >
              সব বিভাগ
            </button>
            {DIVISIONS.map(div => {
              const isDivActive = selectedDivision === div.name;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.name)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    isDivActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-[#161824] text-gray-300 border border-[#232738] hover:text-white'
                  }`}
                >
                  {div.name.replace(' বিভাগ', '')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. In-category News Search Bar (Optional quick search) */}
      <div className="p-3 pb-1">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`${activeCategoryObj.name} সংবাদের মধ্যে খুঁজুন...`}
            className="w-full bg-[#10121a] border border-[#1e2230] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* 6. News List matching Screenshots 1 & 3 (Horizontal Cards) */}
      <div className="p-3 space-y-2.5">
        {filteredNews.length > 0 ? (
          filteredNews.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#10121a] hover:bg-[#141722] border border-[#1c1f2e] hover:border-gray-600 cursor-pointer group transition-all duration-200 shadow-sm"
            >
              {/* Left: News Thumbnail with Rounded Corners */}
              <div className="relative w-28 sm:w-32 h-20 sm:h-22 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800/80">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right: Bengali Headline, Date/Time & Red Category Accent */}
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
          <div className="p-8 text-center bg-[#10121a] rounded-2xl border border-[#1c1f2e] my-4">
            <Flame className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-300 font-medium">
              এই ফিল্টারে বর্তমানে কোনো সংবাদ পাওয়া যায়নি।
            </p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              সব খবর দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
