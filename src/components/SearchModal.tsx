import React, { useState } from 'react';
import { Search, X, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsList: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  newsList,
  onSelectNews,
}) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const trendingTags = ['ইনফান্টিনো', 'জামালপুর', 'বন্যা', 'এআই টিভি', 'বিপিএল', 'রাজনীতি'];

  const results = query.trim()
    ? newsList.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))) ||
          item.content.some(p => p.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-start p-3 animate-fade-in select-none">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        {/* Search Input Box */}
        <div className="flex items-center gap-2 pb-3 border-b border-[#232738]">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="সংবাদ অনুসন্ধান করুন..."
              className="w-full bg-[#141624] border border-[#262b40] rounded-xl pl-9 pr-8 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-sm text-gray-300 hover:text-white font-medium focus:outline-none"
          >
            বাতিল
          </button>
        </div>

        {/* Trending Keywords */}
        {!query && (
          <div className="py-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
              <span>জনপ্রিয় অনুসন্ধান</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="bg-[#151826] hover:bg-red-950/40 hover:border-red-500 border border-[#272b40] text-gray-200 text-xs px-3 py-1.5 rounded-full transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2.5">
          {query.trim() && (
            <div className="text-xs text-gray-400 mb-2 px-1">
              {results.length > 0
                ? `"${query}" সম্পর্কিত ${results.length.toLocaleString('bn-BD')} টি সংবাদ পাওয়া গেছে:`
                : `"${query}" সংক্রান্ত কোনো ফলাফল পাওয়া যায়নি।`}
            </div>
          )}

          {results.map(item => (
            <div
              key={item.id}
              onClick={() => {
                onSelectNews(item);
                onClose();
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#12141c] border border-[#232738] hover:border-red-500/60 cursor-pointer group transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-16 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] text-red-400 font-semibold">{item.category}</span>
                <h4 className="text-xs font-bold text-gray-200 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h4>
                <span className="text-[9px] text-gray-500 mt-0.5 block">{item.date}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-red-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
