import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  Film,
  MapPin,
  Clock,
  Eye,
  Check,
  X,
  Radio,
  ArrowLeft
} from 'lucide-react';
import { ReelItem } from '../types';
import { REELS_DATA } from '../data/newsData';
import { SamiLogo } from './SamiLogo';

interface ReelsNewsViewProps {
  onBackToHome?: () => void;
  initialReelId?: string;
  reels?: ReelItem[];
}

export const ReelsNewsView: React.FC<ReelsNewsViewProps> = ({
  onBackToHome,
  initialReelId,
  reels = REELS_DATA,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব রিলস');
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedReels, setLikedReels] = useState<{ [id: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    reels.forEach(r => {
      initial[r.id] = r.likes;
    });
    return initial;
  });
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const categories = ['সব রিলস', 'জাতীয়', 'জামালপুর', 'খেলা', 'প্রযুক্তি', 'ঐতিহ্য'];

  // Filtered reels list
  const filteredReels = selectedCategory === 'সব রিলস'
    ? reels
    : reels.filter(r => r.category === selectedCategory);

  // Set initial reel if provided
  useEffect(() => {
    if (initialReelId) {
      const idx = filteredReels.findIndex(r => r.id === initialReelId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [initialReelId, filteredReels]);

  // Current active reel
  const currentReel: ReelItem | undefined = filteredReels[currentIndex] || filteredReels[0];

  // Handle video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredReels.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  // Like toggle
  const handleLikeToggle = (reelId: string) => {
    setLikedReels(prev => {
      const isLiked = !prev[reelId];
      setLikeCounts(c => ({
        ...c,
        [reelId]: isLiked ? (c[reelId] || 0) + 1 : Math.max(0, (c[reelId] || 1) - 1),
      }));
      return { ...prev, [reelId]: isLiked };
    });
  };

  // Share handler
  const handleShare = async (reel: ReelItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `সামি টিভি রিলস নিউজ: ${reel.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard?.writeText?.(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2500);
      }
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div id="reels-news-view" className="w-full max-w-md mx-auto pb-16 animate-fade-in select-none">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 animate-bounce">
          <Check className="w-4 h-4" />
          <span>রিলস লিংক কপি করা হয়েছে!</span>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="sticky top-0 z-30 bg-[#08090d]/95 backdrop-blur-md border-b border-[#181a26] px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              aria-label="Back to home"
              className="p-1 text-gray-400 hover:text-white rounded-lg active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md shadow-red-900/30">
            <Film className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white leading-tight">রিলস নিউজ</h2>
              <span className="flex items-center gap-0.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                SHORTS
              </span>
            </div>
            <p className="text-[10px] text-gray-400">সংক্ষিপ্ত ভিডিও ও ব্রেকিং নিউজ</p>
          </div>
        </div>

        {/* View Mode Toggle (Feed vs Grid) */}
        <div className="flex items-center gap-1 bg-[#12141e] border border-[#212433] rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('feed')}
            title="ভার্টিকাল রিলস ফিড"
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'feed'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            title="রিলস গ্রিড ভিউ"
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-3.5 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-[#0a0c12]/90 border-b border-[#161822]">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-red-600 text-white font-bold border-red-500 shadow-md shadow-red-950/40'
                  : 'bg-[#12141f] text-gray-400 border-[#1f2231] hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* FEED MODE: Full-Height Vertical Reels Player */}
      {viewMode === 'feed' && currentReel && (
        <div className="p-3">
          <div
            id={`reel-card-${currentReel.id}`}
            className="relative w-full aspect-[9/16] max-h-[72vh] bg-black rounded-2xl overflow-hidden border border-[#232738] shadow-2xl flex flex-col justify-between"
          >
            {/* Background Video Player */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                key={currentReel.id}
                src={currentReel.videoUrl}
                poster={currentReel.thumbnail}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              />

              {/* Pause Icon Indicator Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl animate-scale-in">
                    <Play className="w-8 h-8 fill-white stroke-none ml-1" />
                  </div>
                </div>
              )}

              {/* Gradient overlays for crisp text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
            </div>

            {/* Top Bar inside Video: Category Tag & Sound Control */}
            <div className="relative z-10 p-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="bg-red-600/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow backdrop-blur-xs">
                  {currentReel.category}
                </span>
                <span className="bg-black/60 text-white/90 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                  {currentIndex + 1}/{filteredReels.length}
                </span>
              </div>

              {/* Audio Mute/Unmute */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center border border-white/10 hover:bg-black/80 active:scale-95 transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* Right Side Action Buttons Floating Over Video */}
            <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
              {/* Like Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleLikeToggle(currentReel.id);
                }}
                className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                    likedReels[currentReel.id]
                      ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/50'
                      : 'bg-black/50 border-white/20 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedReels[currentReel.id] ? 'fill-white stroke-none' : ''
                    }`}
                  />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">
                  {likeCounts[currentReel.id] || currentReel.likes}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleShare(currentReel);
                }}
                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">
                  {currentReel.shares}
                </span>
              </button>

              {/* Details / Full story sheet button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  setShowDetailsModal(true);
                }}
                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">বিস্তারিত</span>
              </button>

              {/* Up / Down reel navigators */}
              <div className="flex flex-col gap-1.5 pt-1">
                <button
                  disabled={currentIndex === 0}
                  onClick={e => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border ${
                    currentIndex === 0
                      ? 'bg-black/30 border-white/10 text-gray-600 opacity-40 cursor-not-allowed'
                      : 'bg-black/60 border-white/20 text-white hover:bg-red-600 hover:border-red-500'
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  disabled={currentIndex === filteredReels.length - 1}
                  onClick={e => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border ${
                    currentIndex === filteredReels.length - 1
                      ? 'bg-black/30 border-white/10 text-gray-600 opacity-40 cursor-not-allowed'
                      : 'bg-black/60 border-white/20 text-white hover:bg-red-600 hover:border-red-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Details Overlay inside Video */}
            <div className="relative z-10 p-3.5 pr-14 text-left">
              {/* Channel badge & Reporter */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-red-500/40 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
                  <span className="text-[10px] font-black text-white tracking-wider">
                    SAMI TV
                  </span>
                </div>

                {currentReel.reporter && (
                  <span className="text-[10px] font-medium text-gray-300 truncate">
                    {currentReel.reporter}
                  </span>
                )}

                {currentReel.location && (
                  <span className="flex items-center gap-0.5 text-[10px] text-red-400 font-medium truncate">
                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                    {currentReel.location}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug drop-shadow-md">
                {currentReel.title}
              </h3>

              {/* Tags */}
              {currentReel.tags && currentReel.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1 overflow-x-auto no-scrollbar">
                  {currentReel.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9.5px] font-medium text-red-400 hover:underline cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Video Progress Bar Line */}
            <div className="w-full bg-gray-800/80 h-1 relative z-20">
              <div
                className="bg-red-600 h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* GRID MODE: 2-Column Reels Cards Gallery */}
      {viewMode === 'grid' && (
        <div className="p-3.5">
          <div className="grid grid-cols-2 gap-3">
            {filteredReels.map((reel, idx) => (
              <div
                key={reel.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode('feed');
                  setIsPlaying(true);
                }}
                className="group relative aspect-[9/14] bg-[#12141d] rounded-xl overflow-hidden border border-[#202333] hover:border-red-500/60 cursor-pointer shadow-md transition-all"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                {/* Top Category Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {reel.category}
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white stroke-none ml-0.5" />
                  </div>
                </div>

                {/* Duration & Views */}
                <div className="absolute bottom-10 inset-x-2 flex items-center justify-between text-[9px] text-gray-300">
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-2.5 h-2.5 text-red-400" />
                    {reel.views}
                  </span>
                  <span className="font-mono bg-black/60 px-1 rounded">
                    {reel.duration}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-2 inset-x-2 text-left">
                  <h4 className="text-[11px] font-bold text-white line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
                    {reel.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reels Details & Summary Drawer Modal */}
      {showDetailsModal && currentReel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end justify-center animate-fade-in">
          <div className="w-full max-w-md bg-[#10131d] border-t border-[#23273b] rounded-t-2xl p-4 space-y-3.5 shadow-2xl max-h-[60vh] overflow-y-auto no-scrollbar">
            {/* Header inside modal */}
            <div className="flex items-center justify-between border-b border-[#1e2233] pb-2.5">
              <div className="flex items-center gap-2">
                <SamiLogo size="sm" showText={false} />
                <div>
                  <h4 className="text-xs font-bold text-white">রিলস বিস্তারিত তথ্য</h4>
                  <p className="text-[10px] text-gray-400">{currentReel.date} প্রকাশিত</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 text-left">
              <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {currentReel.category}
              </span>
              <h3 className="text-sm font-bold text-gray-100 leading-snug">
                {currentReel.title}
              </h3>
              {currentReel.description && (
                <p className="text-xs text-gray-300 leading-relaxed bg-[#161a28] p-3 rounded-xl border border-[#22273d]">
                  {currentReel.description}
                </p>
              )}
            </div>

            {/* Reporter & Stats Info */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-[#141724] p-2.5 rounded-lg border border-[#1f2334] text-left">
                <span className="text-gray-400 block text-[10px]">প্রতিবেদক / সূত্র:</span>
                <span className="font-bold text-white">{currentReel.reporter}</span>
              </div>
              <div className="bg-[#141724] p-2.5 rounded-lg border border-[#1f2334] text-left">
                <span className="text-gray-400 block text-[10px]">স্থান:</span>
                <span className="font-bold text-red-400">{currentReel.location || 'বাংলাদেশ'}</span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
