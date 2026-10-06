import React from 'react';
import { Sparkles, Play, ChevronRight, Film, Eye } from 'lucide-react';
import { ReelItem } from '../types';

interface ReelsPreviewStripProps {
  reels: ReelItem[];
  onOpenReels: (reelId?: string) => void;
}

export const ReelsPreviewStrip: React.FC<ReelsPreviewStripProps> = ({
  reels,
  onOpenReels,
}) => {
  return (
    <div id="reels-preview-strip" className="w-full space-y-2 py-1">
      {/* Section Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center shadow-xs shadow-red-900/30">
            <Film className="w-3 h-3 text-white" />
          </div>
          <h3 className="text-xs font-bold text-white flex items-center gap-1">
            <span>রিলস নিউজ</span>
            <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full">
              SHORTS
            </span>
          </h3>
        </div>

        <button
          onClick={() => onOpenReels()}
          className="text-[11px] font-semibold text-red-400 hover:text-red-300 flex items-center gap-0.5 transition-colors"
        >
          <span>সব দেখুন</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Reels Stories Slider */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1.5 px-0.5 scrollbar-none">
        {reels.map(reel => (
          <div
            key={reel.id}
            onClick={() => onOpenReels(reel.id)}
            className="group relative flex-shrink-0 w-24 sm:w-28 aspect-[9/15] rounded-xl overflow-hidden bg-[#11131c] border border-[#202334] hover:border-red-500 cursor-pointer shadow-md transition-all duration-200"
          >
            {/* Reel Thumbnail */}
            <img
              src={reel.thumbnail}
              alt={reel.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

            {/* Top Category Badge */}
            <div className="absolute top-1.5 left-1.5 bg-red-600/90 text-white text-[8px] font-bold px-1.5 py-0.2 rounded">
              {reel.category}
            </div>

            {/* Center Play Button Overlay on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white stroke-none ml-0.5" />
              </div>
            </div>

            {/* Bottom Views and Title */}
            <div className="absolute bottom-1.5 inset-x-1.5 text-left">
              <div className="flex items-center gap-0.5 text-[8px] text-gray-300 mb-0.5 font-medium">
                <Eye className="w-2 h-2 text-red-400" />
                <span>{reel.views}</span>
              </div>
              <h4 className="text-[10px] font-bold text-white line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
                {reel.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
