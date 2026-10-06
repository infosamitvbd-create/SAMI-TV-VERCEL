import React from 'react';
import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import { DIVISIONS, DivisionItem } from '../config/appConfig';

interface DivisionsDirectoryViewProps {
  onSelectDivision: (divisionName: string) => void;
  onBack: () => void;
}

export const DivisionsDirectoryView: React.FC<DivisionsDirectoryViewProps> = ({
  onSelectDivision,
  onBack,
}) => {
  return (
    <div id="divisions-directory-view" className="w-full max-w-md mx-auto pb-24 animate-fade-in">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#1c1f2e] px-3.5 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors p-1 -ml-1 rounded-lg focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5 text-gray-200" />
          <span className="text-base font-bold text-white tracking-wide">সারাদেশ</span>
        </button>
        <span className="text-xs text-gray-400 font-medium">৮টি বিভাগ</span>
      </div>

      {/* Divisions List matching Screenshot 5 (Bottom-Middle) */}
      <div className="p-3.5 space-y-2.5">
        {DIVISIONS.map((division: DivisionItem) => (
          <button
            key={division.id}
            onClick={() => onSelectDivision(division.name)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#10121a] hover:bg-[#151824] border border-[#1d202e] hover:border-red-900/50 transition-all duration-200 group text-left shadow-sm"
          >
            {/* Left: Division Image Thumbnail + Name */}
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
              <span className="text-xs font-semibold">খবর দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
