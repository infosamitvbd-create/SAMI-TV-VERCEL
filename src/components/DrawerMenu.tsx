import React from 'react';
import {
  X,
  Tv,
  Newspaper,
  Video,
  Globe,
  Radio,
  Share2,
  Phone,
  Mail,
  Info,
  Shield,
  FileText,
  ChevronRight,
  Sparkles,
  Film,
  Crown,
  User,
} from 'lucide-react';
import { SamiLogo } from './SamiLogo';
import { CATEGORIES, APP_CONFIG } from '../config/appConfig';
import { TabType, UserProfile } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  currentUser?: UserProfile | null;
  onClose: () => void;
  onSelectCategory: (catId: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenAuth?: () => void;
}

// Categories to hide from the drawer menu as requested in screenshot cgjdhm.PNG
const HIDDEN_DRAWER_CATEGORY_IDS = new Set([
  'tech',
  'education',
  'health',
  'agriculture',
  'jobs',
  'lifestyle',
  'environment',
  'religion',
  'crime',
  'saradesh',
  'jamalpur',
]);

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSelectCategory,
  onNavigateTab,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const visibleCategories = CATEGORIES.filter(
    cat => !HIDDEN_DRAWER_CATEGORY_IDS.has(cat.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-[82%] max-w-xs h-full bg-[#0d0f17] border-r border-[#202230] shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar">
        {/* Top Header inside Drawer */}
        <div className="p-4 border-b border-[#1f2333] flex items-center justify-between">
          <SamiLogo size="sm" showText={true} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="p-4 flex-1 space-y-5">
          {/* User Account Card */}
          {currentUser ? (
            <div
              onClick={() => {
                onNavigateTab('profile');
                onClose();
              }}
              className="p-3 rounded-2xl bg-[#141724] border border-[#262c42] cursor-pointer hover:border-red-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">{currentUser.displayName}</h5>
                  <p className="text-[10px] text-gray-400 font-medium">
                    <span>{currentUser.district || 'জামালপুর'}</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          ) : (
            <div
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
                onClose();
              }}
              className="p-3 rounded-2xl bg-[#141724] border border-[#262c42] cursor-pointer hover:border-red-500/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">লগইন / সাইন আপ</h5>
                  <p className="text-[10px] text-gray-400">ব্যক্তিগত প্রোফাইল ও বুকমার্কস</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          )}

          {/* Quick Action Cards */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => {
                onNavigateTab('reels');
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-red-600 to-red-800 text-white shadow-md shadow-red-950/40 hover:from-red-500 hover:to-red-700 transition-colors"
            >
              <Film className="w-4 h-4 mb-1" />
              <p className="text-[11px] font-bold">রিলস নিউজ</p>
              <p className="text-[8.5px] text-red-200">SHORTS</p>
            </button>

            <button
              onClick={() => {
                onNavigateTab('live');
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-red-950/80 to-black/60 border border-red-500/40 text-red-100 hover:border-red-400 transition-colors"
            >
              <Radio className="w-4 h-4 text-red-500 animate-pulse mb-1" />
              <p className="text-[11px] font-bold text-white">লাইভ টিভি</p>
              <p className="text-[8.5px] text-red-300">সম্প্রচার</p>
            </button>

            <button
              onClick={() => {
                onNavigateTab('video');
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#151824] border border-[#262b40] text-gray-200 hover:border-gray-500 transition-colors"
            >
              <Video className="w-4 h-4 text-blue-400 mb-1" />
              <p className="text-[11px] font-bold text-white">ভিডিও খবর</p>
              <p className="text-[8.5px] text-gray-400">বুলেটিন</p>
            </button>
          </div>

          {/* News Categories Section */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-1 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-red-500" />
              <span>সংবাদের বিভাগসমূহ</span>
            </h4>

            <div className="space-y-1">
              {visibleCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {cat.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-red-400" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Satellite TV Highlight */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/40 via-[#18101a] to-[#121420] border border-red-900/30">
            <div className="flex items-center gap-1.5 text-[#ff4d5a] text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI স্যাটেলাইট টিভি</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              সামি টিভি জামালপুর ও সমগ্র বাংলাদেশে আধুনিক প্রযুক্তির সমন্বয়ে সত্যের সাথে সবসময়।
            </p>
          </div>

          {/* Additional Links */}
          <div className="space-y-1 pt-2 border-t border-[#1f2333]">
            <button
              onClick={() => {
                onNavigateTab('about');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white bg-red-950/30 border border-red-800/30 hover:bg-red-900/40 transition-colors"
            >
              <Info className="w-4 h-4 text-red-500" />
              <span className="font-bold">আমাদের সম্পর্কে • SAMI TELEVISION</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('profile');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>আমার প্রোফাইল ও সেটিংস</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('ads');
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <FileText className="w-4 h-4 text-gray-500" />
              <span>বিজ্ঞাপন ও রেটকার্ড</span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Info */}
        <div className="p-4 border-t border-[#1f2333] bg-[#090a10]">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>info.samitv.bd@gmail.com</span>
          </div>
          <p className="text-[10px] text-gray-500 text-center">
            © ২০২৬ SAMI TV. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
};
