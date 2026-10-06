import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  Volume2,
  VolumeX,
  Type,
  Check,
  Eye,
  MessageCircle,
  Crown,
  Sparkles,
} from 'lucide-react';
import { NewsItem, UserProfile } from '../types';

interface NewsDetailsViewProps {
  news: NewsItem;
  relatedNews: NewsItem[];
  currentUser?: UserProfile | null;
  onBack: () => void;
  onSelectRelated: (item: NewsItem) => void;
  onToggleBookmark?: (newsId: string) => void;
  onOpenAuth?: () => void;
}

export const NewsDetailsView: React.FC<NewsDetailsViewProps> = ({
  news,
  relatedNews,
  currentUser,
  onBack,
  onSelectRelated,
  onToggleBookmark,
  onOpenAuth,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [bookmarkToast, setBookmarkToast] = useState<string>('');

  const isBookmarked = currentUser?.savedNewsIds?.includes(news.id) || false;

  const [comments, setComments] = useState<{ name: string; text: string; time: string; isVip?: boolean }[]>([
    {
      name: 'হাসান মাহমুদ',
      text: 'সামি টিভির দ্রুত এবং বস্তুনিষ্ঠ সংবাদের জন্য ধন্যবাদ।',
      time: '১০ মিনিট আগে',
      isVip: true,
    },
    {
      name: 'আহমেদ রিয়াজ',
      text: 'খবরটি অত্যন্ত সময়োপযোগী এবং নিরপেক্ষ।',
      time: '২৫ মিনিট আগে',
      isVip: false,
    },
  ]);
  const [newComment, setNewComment] = useState<string>('');

  const handleBookmarkClick = () => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
    if (onToggleBookmark) {
      onToggleBookmark(news.id);
      setBookmarkToast(isBookmarked ? 'বুকমার্ক থেকে সরানো হয়েছে' : 'খবরটি বুকমার্কে সেভ করা হয়েছে!');
      setTimeout(() => setBookmarkToast(''), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: `SAMI TV - ${news.title}`,
          url: window.location.href,
        });
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${news.title}. ${news.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'bn-BD';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const authorName = currentUser?.displayName || 'অতিথি পাঠক';
    const isVip = currentUser?.isPremium || false;

    setComments([
      {
        name: authorName,
        text: newComment.trim(),
        time: 'এইমাত্র',
        isVip,
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  return (
    <div id="news-details-view" className="w-full max-w-md mx-auto pb-24 animate-fade-in">
      {/* 1. Top Sticky Bar matching Screenshot 2 & 4 (Back Arrow + Category Name) */}
      <div className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#1c1f2e] px-3.5 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center gap-2 text-gray-200 hover:text-white p-1 -ml-1 rounded-lg transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5 text-gray-200" />
          <span className="text-base font-bold text-white tracking-wide">
            {news.category}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Bengali Audio Reader */}
          <button
            onClick={toggleSpeech}
            aria-label="Read News Aloud"
            className={`p-1.5 rounded-full transition-colors ${
              isSpeaking
                ? 'bg-red-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Font Size Selector */}
          <button
            onClick={() =>
              setFontSize(prev =>
                prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'
              )
            }
            aria-label="Adjust font size"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmarkClick}
            aria-label="Bookmark news"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            title={isBookmarked ? 'বুকমার্ক করা হয়েছে' : 'বুকমার্কে সেভ করুন'}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
              }`}
            />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share article"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bookmark Toast Alert */}
      {bookmarkToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-black text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <Crown className="w-3.5 h-3.5" />
          <span>{bookmarkToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <article className="p-3.5 space-y-3.5">
        {/* 2. Large Featured News Image matching Screenshot 2 & 4 */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#1e2230] bg-black shadow-md">
          <img
            src={news.image}
            alt={news.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-72 object-cover"
          />
        </div>

        {/* 3. Bengali News Headline */}
        <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
          {news.title}
        </h1>

        {/* 4. Meta Bar: Date/Time + Red Category Accent + Share */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-b border-[#1c1f2e] pb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-3 h-3 text-gray-500" />
              <span>{news.publishedTime || news.date}</span>
            </span>

            <span className="text-red-500 font-bold">|</span>

            <span className="text-red-500 font-bold bg-red-600/15 px-2 py-0.5 rounded-md border border-red-500/30">
              {news.category}
            </span>

            {news.location && (
              <span className="flex items-center gap-1 text-gray-400">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>{news.location}</span>
              </span>
            )}
          </div>

          <button
            onClick={handleShare}
            aria-label="Share article"
            className="text-gray-300 hover:text-white p-1 rounded-lg transition-colors flex items-center gap-1"
          >
            <Share2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* 5. Bengali Article Paragraphs */}
        <div className={`space-y-3 text-gray-200 font-normal ${getFontSizeClass()}`}>
          {news.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {news.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#12141c] hover:bg-[#1a1d28] text-gray-300 text-xs px-2.5 py-1 rounded-md border border-[#202436] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 6. "আরও খবর" (Related News Section) matching Screenshot 2 & 4 */}
        {relatedNews.length > 0 && (
          <div className="pt-4 border-t border-[#1c1f2e] space-y-2.5">
            <h3 className="text-base font-bold text-white tracking-wide">
              আরও খবর
            </h3>

            <div className="space-y-2.5">
              {relatedNews.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelectRelated(item)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#10121a] hover:bg-[#141722] border border-[#1c1f2e] hover:border-gray-600 cursor-pointer group transition-all duration-200 shadow-sm"
                >
                  {/* Left Thumbnail */}
                  <div className="w-24 h-18 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-200 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1.5">
                      <span>{item.publishedTime || item.date}</span>
                      <span className="text-red-500 font-bold">|</span>
                      <span className="text-red-500 font-semibold">{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="pt-4 border-t border-[#1c1f2e]">
          <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-red-500" />
            <span>মন্তব্যসমূহ ({comments.length})</span>
          </h3>

          <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="আপনার মন্তব্য লিখুন..."
              className="flex-1 bg-[#10121a] border border-[#1e2230] rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors"
            >
              পাঠান
            </button>
          </form>

          <div className="space-y-2">
            {comments.map((c, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#10121a] border border-[#1c1f2e]">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-200">{c.name}</span>
                    {c.isVip && (
                      <span className="text-[9px] bg-amber-950/60 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                        <Crown className="w-2.5 h-2.5" />
                        <span>VIP</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500">{c.time}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
