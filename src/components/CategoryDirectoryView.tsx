import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Flame,
  Landmark,
  Building2,
  Globe,
  TrendingUp,
  Trophy,
  Film,
  Cpu,
  GraduationCap,
  HeartPulse,
  Sprout,
  Briefcase,
  Sparkles,
  Leaf,
  BookOpen,
  Scale,
  Compass,
  MapPin,
} from 'lucide-react';
import { CATEGORIES } from '../config/appConfig';

interface CategoryDirectoryViewProps {
  onSelectCategory: (categoryId: string) => void;
  onBack: () => void;
}

export const CategoryDirectoryView: React.FC<CategoryDirectoryViewProps> = ({
  onSelectCategory,
  onBack,
}) => {
  // Mapping of icons to category IDs matching the screenshot style (circular badges)
  const getCategoryIcon = (id: string) => {
    const iconClass = "w-4 h-4 text-white stroke-[2.2]";
    switch (id) {
      case 'all':
        return <Flame className={iconClass} />;
      case 'national':
        return <Landmark className={iconClass} />;
      case 'politics':
        return <Building2 className={iconClass} />;
      case 'economy':
        return <TrendingUp className={iconClass} />;
      case 'international':
        return <Globe className={iconClass} />;
      case 'sports':
        return <Trophy className={iconClass} />;
      case 'entertainment':
        return <Film className={iconClass} />;
      case 'tech':
        return <Cpu className={iconClass} />;
      case 'education':
        return <GraduationCap className={iconClass} />;
      case 'health':
        return <HeartPulse className={iconClass} />;
      case 'agriculture':
        return <Sprout className={iconClass} />;
      case 'jobs':
        return <Briefcase className={iconClass} />;
      case 'lifestyle':
        return <Sparkles className={iconClass} />;
      case 'environment':
        return <Leaf className={iconClass} />;
      case 'religion':
        return <BookOpen className={iconClass} />;
      case 'crime':
        return <Scale className={iconClass} />;
      case 'saradesh':
        return <Compass className={iconClass} />;
      case 'jamalpur':
        return <MapPin className={iconClass} />;
      default:
        return <Flame className={iconClass} />;
    }
  };

  return (
    <div id="category-directory-view" className="w-full max-w-md mx-auto pb-24 animate-fade-in">
      {/* Top Header matching the screenshot */}
      <div className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#1c1f2e] px-3.5 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back to previous page"
          className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors p-1 -ml-1 rounded-lg focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5 text-gray-200" />
          <span className="text-base font-bold text-white tracking-wide">জাতীয় / সকল বিভাগ</span>
        </button>
        <span className="text-xs text-gray-400 font-medium">১৭টি ক্যাটাগরি</span>
      </div>

      {/* Directory List Items matching Screenshot 6 (Bottom-Right) */}
      <div className="p-3.5 space-y-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10121a] hover:bg-[#151824] border border-[#1d202e] hover:border-red-900/50 transition-all duration-200 group text-left shadow-sm"
          >
            {/* Left: Circular Colored Icon Badge + Category Name */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-full ${cat.color} flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110`}
              >
                {getCategoryIcon(cat.id)}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-100 group-hover:text-red-400 transition-colors truncate">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Right: 'খবর দেখুন >' Subtitle with Chevron */}
            <div className="flex items-center gap-1 text-gray-400 group-hover:text-red-400 transition-colors flex-shrink-0 pl-2">
              <span className="text-xs font-semibold">খবর দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
