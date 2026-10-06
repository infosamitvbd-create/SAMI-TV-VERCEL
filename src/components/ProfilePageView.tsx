import React, { useState } from 'react';
import {
  User,
  Bell,
  Bookmark,
  Shield,
  FileText,
  Info,
  Tv,
  ExternalLink,
  ChevronRight,
  LogOut,
  Crown,
  Sparkles,
  Zap,
  CheckCircle,
  Eye,
  Sliders,
  Volume2,
  Trash2,
} from 'lucide-react';
import { SamiLogo } from './SamiLogo';
import { APP_CONFIG } from '../config/appConfig';
import { UserProfile, NewsItem } from '../types';

interface ProfilePageViewProps {
  currentUser: UserProfile | null;
  newsList: NewsItem[];
  onOpenAuth: () => void;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigateAdmin?: () => void;
  onNavigateAbout?: () => void;
  onSelectNews?: (news: NewsItem) => void;
}

export const ProfilePageView: React.FC<ProfilePageViewProps> = ({
  currentUser,
  newsList,
  onOpenAuth,
  onLogout,
  onUpdateProfile,
  onNavigateAdmin,
  onNavigateAbout,
  onSelectNews,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [showSavedNewsModal, setShowSavedNewsModal] = useState<boolean>(false);

  // Filter saved news
  const savedNewsItems = newsList.filter(n =>
    currentUser?.savedNewsIds?.includes(n.id)
  );

  const handleToggleAdFree = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const updated = {
      ...currentUser,
      adFreeEnabled: !currentUser.adFreeEnabled,
    };
    onUpdateProfile(updated);
  };

  const handleToggleHD = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const updated = {
      ...currentUser,
      hdStreamingEnabled: !currentUser.hdStreamingEnabled,
    };
    onUpdateProfile(updated);
  };

  const handleRemoveBookmark = (e: React.MouseEvent, newsId: string) => {
    e.stopPropagation();
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      savedNewsIds: (currentUser.savedNewsIds || []).filter(id => id !== newsId),
    };
    onUpdateProfile(updated);
  };

  return (
    <div id="profile-page-view" className="w-full max-w-md mx-auto p-3.5 pb-24 space-y-4 animate-fade-in">
      {/* User Account Card */}
      {currentUser ? (
        <div className="p-4 rounded-2xl bg-[#131622] border border-[#232738] shadow-xl relative overflow-hidden">
          {/* Top Tag */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 bg-red-600/20 border border-red-500/30 text-red-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <User className="w-3.5 h-3.5" />
              <span>আমার অ্যাকাউন্ট</span>
            </div>
            <button
              onClick={onLogout}
              className="text-[11px] text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              title="লগআউট"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0">
              {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white truncate flex items-center gap-1.5">
                <span>{currentUser.displayName}</span>
              </h3>
              <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                <span className="bg-[#1f2436] px-2 py-0.5 rounded-md text-gray-300">
                  📍 {currentUser.district || 'জামালপুর'}
                </span>
                <span>সদস্য: {currentUser.joinedDate || '২০২৬'}</span>
              </div>
            </div>
          </div>

          {/* Quick Feature Stats Bar */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-[#22273b] text-center text-xs">
            <div className="bg-[#10121c] p-2 rounded-xl border border-[#202538]">
              <span className="block text-[10px] text-gray-400">বুকমার্কস</span>
              <strong className="text-red-400 font-bold">
                {currentUser.savedNewsIds?.length || 0} টি
              </strong>
            </div>
            <div className="bg-[#10121c] p-2 rounded-xl border border-[#202538]">
              <span className="block text-[10px] text-gray-400">বিজ্ঞাপনমুক্ত</span>
              <strong className={currentUser.adFreeEnabled ? "text-emerald-400 font-bold" : "text-gray-400"}>
                {currentUser.adFreeEnabled ? 'সক্রিয়' : 'বন্ধ'}
              </strong>
            </div>
            <div className="bg-[#10121c] p-2 rounded-xl border border-[#202538]">
              <span className="block text-[10px] text-gray-400">ভিডিও কোয়ালিটি</span>
              <strong className="text-white font-bold">
                {currentUser.hdStreamingEnabled ? 'HD' : 'Auto'}
              </strong>
            </div>
          </div>

          {/* Persistent Device Status */}
          <div className="mt-3 bg-[#0d101a]/90 rounded-xl p-2 px-3 border border-[#22283e] flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">এই ডিভাইসে অ্যাকাউন্ট সক্রিয় রয়েছে</span>
            </div>
            <span className="text-gray-400">Device Lock On</span>
          </div>
        </div>
      ) : (
        /* Guest Card (Simple & Clean) */
        <div className="p-4 rounded-2xl bg-[#131622] border border-[#232738] shadow-xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1c2030] border border-[#2c3348] flex items-center justify-center text-gray-400 flex-shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">আমার প্রোফাইল</h3>
              <p className="text-xs text-gray-400 mt-0.5">সংবাদ সেভ ও ব্যক্তিগত সেটিংস পরিচালনা করুন</p>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            className="w-full mt-3 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-950/60 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>লগইন / সাইন আপ</span>
          </button>
        </div>
      )}

      {/* App & Reading Settings */}
      <div className="p-4 rounded-2xl bg-[#12141c] border border-[#232738] space-y-3">
        <div className="flex items-center justify-between border-b border-[#202436] pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-red-500" />
            <span>অ্যাপ ও রিডিং সেটিংস</span>
          </div>
        </div>

        {/* 1. Ultra HD 4K Live Streaming */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">4K / Ultra-HD লাইভ টিভি</h5>
              <p className="text-[10px] text-gray-400">বাফারলেস উচ্চ রেজোলিউশন লাইভ সম্প্রচার</p>
            </div>
          </div>
          <button
            onClick={handleToggleHD}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              currentUser?.hdStreamingEnabled ? 'bg-amber-500' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                currentUser?.hdStreamingEnabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 2. Ad-Free Reading Mode */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">বিজ্ঞাপনমুক্ত (Ad-Free) মোড</h5>
              <p className="text-[10px] text-gray-400">বিজ্ঞাপন ছাড়া দ্রুত ও শান্তিময় রিডিং</p>
            </div>
          </div>
          <button
            onClick={handleToggleAdFree}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              currentUser?.adFreeEnabled ? 'bg-emerald-500' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                currentUser?.adFreeEnabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 3. Breaking News Push Notification */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-950/50 border border-blue-500/30 text-blue-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">জরুরি ব্রেকিং নিউজ অ্যালার্ট</h5>
              <p className="text-[10px] text-gray-400">জামালপুর ও দেশের তাজা সংবাদ তাৎক্ষণিক</p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              notificationsEnabled ? 'bg-red-600' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 4. Saved News & Bookmarks */}
        <div
          onClick={() => setShowSavedNewsModal(!showSavedNewsModal)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-[#272d42]"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-400">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">সংরক্ষিত খবরসমূহ (বুকমার্ক)</h5>
              <p className="text-[10px] text-gray-400">
                {savedNewsItems.length > 0
                  ? `${savedNewsItems.length} টি খবর সেভ করা আছে`
                  : 'পরে পড়ার জন্য সেভ করা সংবাদ'}
              </p>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showSavedNewsModal ? 'rotate-90' : ''}`} />
        </div>

        {/* Saved News List Drawer */}
        {showSavedNewsModal && (
          <div className="mt-2 p-3 bg-[#0c0e15] rounded-xl border border-[#23283a] space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-400 font-bold border-b border-[#1f2436] pb-1.5">
              <span>বুকমার্ক করা খবরের তালিকা:</span>
              <span className="text-amber-400">{savedNewsItems.length} টি</span>
            </div>

            {savedNewsItems.length === 0 ? (
              <p className="text-xs text-gray-500 py-3 text-center">
                কোনো খবর সেভ করা নেই। যেকোনো সংবাদের বিস্তারিত পাতায় গিয়ে বুকমার্কে ক্লিক করুন।
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedNewsItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => onSelectNews && onSelectNews(item)}
                    className="p-2 bg-[#141724] rounded-lg border border-[#282f48] hover:border-amber-500/50 cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h6 className="text-xs font-bold text-white truncate">{item.title}</h6>
                        <span className="text-[10px] text-red-400">{item.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveBookmark(e, item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* About SAMI TV */}
      <div className="p-4 rounded-2xl bg-[#12141c] border border-[#232738] space-y-3">
        <div className="flex items-center justify-between">
          <SamiLogo size="md" showText={true} onClick={onNavigateAdmin} />
        </div>

        <div className="text-xs text-gray-300 space-y-2 leading-relaxed pt-2 border-t border-[#1e2230]">
          <p>
            <strong>সামি টিভি (SAMI TV)</strong> হলো জামালপুর তথা বাংলাদেশের প্রথম
            এআই-ভিত্তিক স্যাটেলাইট টেলিভিশন চ্যানেল। আমাদের মূল অঙ্গীকার
            <strong> “সত্যের সাথে সবসময়”</strong>।
          </p>
          <p>
            ২৪ ঘণ্টা লাইভ সম্প্রচার, নির্ভরযোগ্য জাতীয় ও আন্তর্জাতিক সংবাদ এবং জনস্বার্থের
            প্রতিবেদনে আমরা অবিচল।
          </p>
        </div>

        <div className="pt-2 border-t border-[#1e2230] space-y-1.5 text-xs text-gray-400">
          <div className="flex items-center justify-between py-1">
            <span>অ্যাপ সংস্করণ</span>
            <span className="font-mono text-gray-300">v2.5.0 (2026 VIP Build)</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span>সম্প্রচার অঞ্চল</span>
            <span className="text-gray-300">বাংলাদেশ ও আন্তর্জাতিক</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span>স্টুডিও হেডকোয়ার্টার</span>
            <span className="text-gray-300">জামালপুর / ঢাকা</span>
          </div>
        </div>

        {onNavigateAbout && (
          <button
            onClick={onNavigateAbout}
            className="w-full py-2.5 px-3 rounded-xl bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Info className="w-4 h-4 text-red-400" />
            <span>আমাদের সম্পর্কে বিস্তারিত পড়ুন</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Legal & Policy */}
      <div className="p-3 rounded-2xl bg-[#12141c] border border-[#232738] space-y-1 text-xs text-gray-300">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <span>গোপনীয়তা নীতি (Privacy Policy)</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span>ব্যবহারের শর্তাবলী (Terms & Conditions)</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
