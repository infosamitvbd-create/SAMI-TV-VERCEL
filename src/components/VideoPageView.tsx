import React, { useState } from 'react';
import { Play, Eye, Calendar, X } from 'lucide-react';
import { VideoItem } from '../types';
import { VIDEOS_DATA } from '../data/newsData';

export const VideoPageView: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div id="video-page-view" className="w-full max-w-md mx-auto p-3.5 pb-20 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 live-dot" />
          <span>ভিডিও সংবাদ ও বিশেষ প্রতিবেদন</span>
        </h2>
        <span className="text-xs text-gray-400">মোট ৪ টি ভিডিও</span>
      </div>

      {/* Video Cards Grid */}
      <div className="space-y-3.5">
        {VIDEOS_DATA.map(video => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="rounded-2xl bg-[#12141c] border border-[#232738] overflow-hidden group cursor-pointer hover:border-gray-500 transition-all duration-200 shadow-md"
          >
            {/* Video Thumbnail with Play Button */}
            <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Big Red Play Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-red-500 transition-all">
                  <Play className="w-6 h-6 fill-white stroke-none ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                {video.duration}
              </div>

              {/* Category */}
              <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {video.category}
              </div>
            </div>

            {/* Video Title & Meta */}
            <div className="p-3">
              <h3 className="text-xs sm:text-sm font-bold text-gray-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                {video.title}
              </h3>

              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  {video.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-500" />
                  {video.views} বার দেখা হয়েছে
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-md bg-[#12141c] border border-[#232738] rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-3 border-b border-[#232738] flex items-center justify-between">
              <span className="text-xs font-bold text-red-400">{selectedVideo.category}</span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 text-gray-400 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="w-full aspect-video bg-black relative">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Information */}
            <div className="p-3.5">
              <h3 className="text-sm font-bold text-white leading-snug">
                {selectedVideo.title}
              </h3>
              <p className="text-xs text-gray-400 mt-2">
                সামি টিভি অনলাইন মাল্টিমিডিয়া স্পেশাল সম্প্রচার
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
