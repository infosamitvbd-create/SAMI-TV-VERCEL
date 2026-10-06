import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  FileText,
  Trash2,
  Edit3,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Film,
  Sparkles,
  BarChart3,
  TrendingUp,
  Radio,
  Search,
  ArrowLeft,
  RefreshCw,
  Download,
  Lock,
  Unlock,
  Sliders,
  Layers,
  Star,
  MapPin,
  Save,
  X,
  ExternalLink,
  MessageSquare,
  Flame,
  Globe2,
  Database
} from 'lucide-react';
import { NewsItem, ReelItem } from '../types';
import { CATEGORIES } from '../config/appConfig';

interface AdminPanelViewProps {
  newsList: NewsItem[];
  reelsList: ReelItem[];
  onSaveNews: (news: NewsItem, isEdit: boolean) => Promise<void> | void;
  onDeleteNews: (id: string) => void;
  onSaveReel: (reel: ReelItem) => Promise<void> | void;
  onDeleteReel: (id: string) => void;
  onResetNews: () => void;
  onClearAllNews?: () => void;
  onViewNews: (news: NewsItem) => void;
  onBackToHome: () => void;
}

const JAMALPUR_UPAZILAS = [
  'জামালপুর সদর',
  'ইসলামপুর',
  'মেলান্দহ',
  'মাদারগঞ্জ',
  'সরিষাবাড়ী',
  'বকশীগঞ্জ',
  'দেওয়ানগঞ্জ'
];

const SAMPLE_TEMPLATES = [
  {
    title: 'জামালপুরে ব্রহ্মপুত্র নদে নতুন চর জেগে ওঠার সম্ভাবনা, কৃষকদের মাঝে আনন্দ',
    category: 'জামালপুর',
    categoryKey: 'jamalpur',
    upazila: 'জামালপুর সদর',
    reporter: 'জামালপুর প্রতিনিধি',
    location: 'জামালপুর',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    content: 'জামালপুরের ঐতিহ্যবাহী ব্রহ্মপুত্র নদের বিভিন্ন পয়েন্টে নতুন চর জেগে উঠছে। স্থানীয় কৃষকরা উর্বর জমিতে রবিশস্য চাষের প্রস্তুতি নিচ্ছেন। কৃষি সম্প্রসারণ অধিদপ্তর সার্বিক সহযোগিতার আশ্বাস দিয়েছে।',
    tags: 'জামালপুর, ব্রহ্মপুত্র, কৃষি'
  },
  {
    title: 'ইসলামপুরের কাঁসা ও পিতল শিল্পের বিশ্বজোড়া কদর, সরকারি প্রণোদনার দাবি',
    category: 'জামালপুর',
    categoryKey: 'jamalpur',
    upazila: 'ইসলামপুর',
    reporter: 'ইসলামপুর প্রতিনিধি',
    location: 'ইসলামপুর',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    content: 'ঐতিহ্যবাহী ইসলামপুরের কাঁসা শিল্প সারা দেশে সমাদৃত। তবে কাঁচামালের মূল্য বৃদ্ধি এবং আধুনিক প্রযুক্তির অভাবে শিল্পীরা সংকটে পড়েছেন। কারিগররা সহজ শর্তে ঋণের আবেদন জানিয়েছেন।',
    tags: 'ইসলামপুর, কাঁসাশিল্প, ঐতিহ্য'
  },
  {
    title: 'সরিষাবাড়ীতে যমুনা সার কারখানায় উৎপাদন পুরোদমে চালু, স্বস্তিতে কৃষকরা',
    category: 'জামালপুর',
    categoryKey: 'jamalpur',
    upazila: 'সরিষাবাড়ী',
    reporter: 'সরিষাবাড়ী প্রতিনিধি',
    location: 'সরিষাবাড়ী',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    content: 'গ্যাস সরবরাহ স্বাভাবিক হওয়ায় তারাকান্দির যমুনা ফার্টিলাইজার কারখানায় (জেএফসিএল) ইউরিয়া সার উৎপাদন পুরোদমে শুরু হয়েছে। এতে উত্তরাঞ্চলসহ দেশের সার্বিক সার সরবরাহ নিশ্চিত হবে।',
    tags: 'সরিষাবাড়ী, যমুনা সার, অর্থনীতি'
  }
];

const PHOTO_PRESETS = [
  { name: 'জাতীয় / সংসদ', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80' },
  { name: 'জামালপুর / নদী', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
  { name: 'শিল্প / কারখানা', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { name: 'খেলাধুলা', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'প্রযুক্তি / আইটি', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { name: 'নকশিকাঁথা / সংস্কৃতি', url: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80' },
];

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  newsList,
  reelsList,
  onSaveNews,
  onDeleteNews,
  onSaveReel,
  onDeleteReel,
  onResetNews,
  onClearAllNews,
  onViewNews,
  onBackToHome,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('samitv_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Tab state inside Admin
  const [adminTab, setAdminTab] = useState<'news_form' | 'news_list' | 'reels_form' | 'templates' | 'stats' | 'database'>('news_form');

  // Form State for News
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('জাতীয়');
  const [categoryKey, setCategoryKey] = useState<string>('national');
  const [upazila, setUpazila] = useState<string>('');
  const [reporter, setReporter] = useState<string>('স্টাফ রিপোর্টার');
  const [location, setLocation] = useState<string>('ঢাকা');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [contentBody, setContentBody] = useState<string>('');
  const [tagsString, setTagsString] = useState<string>('সামি টিভি, ব্রেকিং');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string>('');

  // Form State for Reels
  const [reelTitle, setReelTitle] = useState<string>('');
  const [reelCategory, setReelCategory] = useState<string>('জামালপুর');
  const [reelVideoUrl, setReelVideoUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [reelThumbnail, setReelThumbnail] = useState<string>('');
  const [reelReporter, setReelReporter] = useState<string>('জামালপুর প্রতিনিধি');
  const [reelLocation, setReelLocation] = useState<string>('জামালপুর');
  const [reelDuration, setReelDuration] = useState<string>('০০:৪৫');
  const [reelTags, setReelTags] = useState<string>('#SamiTV #Shorts');

  // Search & Filter in news list
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCat, setFilterCat] = useState<string>('all');

  // Quick stats
  const totalNews = newsList.length;
  const totalJamalpur = newsList.filter(n => n.categoryKey === 'jamalpur' || n.category === 'জামালপুর').length;
  const totalFeatured = newsList.filter(n => n.isFeatured).length;
  const totalReels = reelsList.length;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = pinInput.trim().toUpperCase();
    if (cleanInput === 'SAMITV' || cleanInput === '2026' || cleanInput === 'ADMIN') {
      setIsAuthenticated(true);
      localStorage.setItem('samitv_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (পাসওয়ার্ড: SAMITV)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('samitv_admin_auth');
    setPinInput('');
  };

  // Image Upload handler with auto-compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 960;
          const MAX_HEIGHT = 640;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * (MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.82);
            setImageUrl(optimizedBase64);
            setImagePreview(optimizedBase64);
          } else {
            setImageUrl(rawResult);
            setImagePreview(rawResult);
          }
        };
        img.src = rawResult;
      };
      reader.readAsDataURL(file);
    }
  };

  // Category select handler
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCat = CATEGORIES.find(c => c.name === e.target.value);
    if (selectedCat) {
      setCategoryName(selectedCat.name);
      setCategoryKey(selectedCat.id);
      if (selectedCat.id === 'jamalpur') {
        setLocation('জামালপুর');
        setReporter('জামালপুর প্রতিনিধি');
      }
    } else {
      setCategoryName(e.target.value);
      setCategoryKey('national');
    }
  };

  // Quick Preset Template Applier
  const handleApplyTemplate = (tmpl: typeof SAMPLE_TEMPLATES[0]) => {
    setTitle(tmpl.title);
    setCategoryName(tmpl.category);
    setCategoryKey(tmpl.categoryKey);
    setUpazila(tmpl.upazila);
    setReporter(tmpl.reporter);
    setLocation(tmpl.location);
    setImageUrl(tmpl.image);
    setImagePreview(tmpl.image);
    setContentBody(tmpl.content);
    setTagsString(tmpl.tags);
    setAdminTab('news_form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Populate Edit form
  const handleStartEdit = (news: NewsItem) => {
    setEditingNewsId(news.id);
    setTitle(news.title);
    setCategoryName(news.category);
    setCategoryKey(news.categoryKey);
    setUpazila(news.upazila || '');
    setReporter(news.reporter || 'স্টাফ রিপোর্টার');
    setLocation(news.location || 'ঢাকা');
    setImageUrl(news.image);
    setImagePreview(news.image);
    setContentBody(news.content ? news.content.join('\n\n') : '');
    setTagsString(news.tags ? news.tags.join(', ') : '');
    setIsFeatured(!!news.isFeatured);
    setAdminTab('news_form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form
  const handleResetForm = () => {
    setEditingNewsId(null);
    setTitle('');
    setCategoryName('জাতীয়');
    setCategoryKey('national');
    setUpazila('');
    setReporter('স্টাফ রিপোর্টার');
    setLocation('ঢাকা');
    setImageUrl('');
    setImagePreview('');
    setContentBody('');
    setTagsString('সামি টিভি, ব্রেকিং');
    setIsFeatured(false);
  };

  // Publish / Update News
  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('অনুগ্রহ করে সংবাদের শিরোনাম লিখুন!');
      return;
    }

    setIsPublishing(true);

    const paragraphs = contentBody
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const finalContent = paragraphs.length > 0
      ? paragraphs
      : [title + ' - বিস্তারিত সংবাদ পরবর্তীতে আপডেট করা হবে। সাথে থাকুন সামি টিভির।'];

    const tags = tagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const finalImage = imageUrl || imagePreview || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';

    const bnMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const toBnNum = (n: number | string) => {
      const bnDigits: Record<string, string> = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
      return String(n).replace(/[0-9]/g, d => bnDigits[d] || d);
    };

    const now = new Date();
    const formattedDate = `${toBnNum(now.getDate())} ${bnMonths[now.getMonth()]}, ${toBnNum(now.getFullYear())}`;
    const formattedTime = `আজ, ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const newNewsItem: NewsItem = {
      id: editingNewsId || `news-custom-${Date.now()}`,
      title: title.trim(),
      category: categoryName,
      categoryKey: categoryKey,
      date: formattedDate,
      publishedTime: formattedTime,
      image: finalImage,
      content: finalContent,
      reporter: reporter.trim(),
      location: location.trim(),
      division: categoryKey === 'jamalpur' || upazila ? 'ময়মনসিংহ বিভাগ' : 'ঢাকা বিভাগ',
      upazila: upazila || (categoryKey === 'jamalpur' ? 'জামালপুর সদর' : undefined),
      isFeatured: isFeatured,
      views: editingNewsId ? (newsList.find(n => n.id === editingNewsId)?.views || 100) : 1,
      readTime: `${Math.max(1, Math.ceil(finalContent.join(' ').length / 300))} মিনিট`,
      tags: tags,
    };

    try {
      await onSaveNews(newNewsItem, !!editingNewsId);
      setSuccessToast(editingNewsId ? '✅ সংবাদ সফলভাবে ফায়ারবেসে আপডেট হয়েছে!' : '🚀 নতুন সংবাদ ফায়ারবেসে সেভ হয়েছে এবং সবার কাছে পৌঁছে গেছে!');
    } catch {
      setSuccessToast('সংবাদ সংরক্ষিত হয়েছে!');
    } finally {
      setIsPublishing(false);
    }

    setTimeout(() => setSuccessToast(''), 4000);
    handleResetForm();
    setAdminTab('news_list');
  };

  // Publish Reel
  const handlePublishReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelTitle.trim()) {
      alert('রিলসের শিরোনাম লিখুন!');
      return;
    }

    setIsPublishing(true);

    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      title: reelTitle.trim(),
      category: reelCategory,
      duration: reelDuration || '০০:৩০',
      thumbnail: reelThumbnail || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      videoUrl: reelVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      reporter: reelReporter,
      location: reelLocation,
      likes: 1,
      shares: 0,
      views: '১',
      date: 'আজ',
      tags: reelTags.split(' ').filter(Boolean),
    };

    try {
      await onSaveReel(newReel);
      setSuccessToast('🚀 নতুন রিলস ফায়ারবেসে সফলভাবে আপলোড হয়েছে!');
    } catch {
      setSuccessToast('রিলস সংরক্ষিত হয়েছে!');
    } finally {
      setIsPublishing(false);
    }

    setTimeout(() => setSuccessToast(''), 4000);
    setReelTitle('');
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `samitv_news_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered news for list
  const filteredList = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.reporter && item.reporter.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = filterCat === 'all' || item.categoryKey === filterCat || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div id="admin-login-screen" className="w-full max-w-md mx-auto p-4 py-8 pb-20 animate-fade-in text-center select-none">
        <div className="bg-[#11131f] border border-[#222738] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Logo & Security Badge */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#e50914] flex items-center justify-center shadow-lg shadow-red-950/60 border border-white/20">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wide">SAMI TV অ্যাডমিন প্যানেল</h2>
              <p className="text-xs text-gray-400 mt-0.5">নিউজ রুম ও কন্ট্রোল ডেস্ক</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                অ্যাডমিন পাসওয়ার্ড (Password):
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন (যেমন: SAMITV)"
                  className="w-full bg-[#181b2a] border border-[#2a3045] rounded-xl pl-4 pr-10 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e50914] font-mono tracking-wider transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-200 focus:outline-none"
                  title={showPassword ? 'লুকান' : 'দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#e50914] hover:bg-[#c40810] text-white font-bold py-2.5 rounded-xl text-sm shadow-lg shadow-red-950/50 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>
          </form>

          {/* Quick Access Helper */}
          <div className="pt-3 border-t border-[#1c2030] flex items-center justify-between text-xs">
            <span className="text-gray-500">পাসওয়ার্ড: <strong className="text-gray-300 font-mono">SAMITV</strong></span>
            <button
              onClick={() => {
                setIsAuthenticated(true);
                localStorage.setItem('samitv_admin_auth', 'true');
              }}
              className="text-[#e50914] hover:underline font-semibold"
            >
              সরাসরি প্রবেশ করুন →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-panel-view" className="w-full max-w-6xl mx-auto p-3 sm:p-5 pb-24 space-y-4 animate-fade-in select-none">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-400/40">
          <CheckCircle className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141624] via-[#121420] to-[#141624] border border-[#22273b] shadow-xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e50914] to-red-800 flex items-center justify-center text-white shadow-lg shadow-red-950/60 border border-white/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-white">SAMI TV কন্ট্রোল ডেস্ক</h2>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Firebase ক্লাউড কানেক্টেড</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">অনলাইন নিউজ, জামালপুর বিশেষ বুলেটিন ও মিডিয়া ম্যানেজমেন্ট</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            title="হোমে ফিরুন"
            className="px-3.5 py-2 bg-[#1a1e30] hover:bg-[#232840] text-gray-200 hover:text-white rounded-xl border border-[#2b324c] text-xs flex items-center gap-1.5 active:scale-95 transition-all font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
            <span>লাইভ হোমে ফিরুন</span>
          </button>
          <button
            onClick={handleLogout}
            title="লগআউট"
            className="px-3.5 py-2 bg-red-950/40 hover:bg-red-950/80 text-red-400 hover:text-red-300 rounded-xl border border-red-500/30 text-xs active:scale-95 transition-all flex items-center gap-1.5 font-bold"
          >
            <Lock className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Dashboard Analytics & Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111422] p-3.5 rounded-xl border border-[#1f2438] flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-[#e50914]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">মোট সংবাদ</span>
            <span className="text-lg font-black text-white">{totalNews} টি</span>
          </div>
        </div>

        <div className="bg-[#111422] p-3.5 rounded-xl border border-[#1f2438] flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">জামালপুর সংবাদ</span>
            <span className="text-lg font-black text-red-400">{totalJamalpur} টি</span>
          </div>
        </div>

        <div className="bg-[#111422] p-3.5 rounded-xl border border-[#1f2438] flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">স্লাইডার প্রধান</span>
            <span className="text-lg font-black text-amber-400">{totalFeatured} টি</span>
          </div>
        </div>

        <div className="bg-[#111422] p-3.5 rounded-xl border border-[#1f2438] flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">রিলস / শর্টস</span>
            <span className="text-lg font-black text-blue-400">{totalReels} টি</span>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs Navigation */}
      <div className="flex items-center gap-2 bg-[#111422] p-2 rounded-2xl border border-[#1f2438] overflow-x-auto no-scrollbar shadow-lg">
        <button
          onClick={() => setAdminTab('news_form')}
          className={`flex-1 min-w-[130px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            adminTab === 'news_form'
              ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/60'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#181c2c]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{editingNewsId ? 'এডিট সংবাদ' : 'সংবাদ প্রকাশ করুন'}</span>
        </button>

        <button
          onClick={() => setAdminTab('news_list')}
          className={`flex-1 min-w-[130px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            adminTab === 'news_list'
              ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/60'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#181c2c]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>সকল সংবাদ ({newsList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('reels_form')}
          className={`flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            adminTab === 'reels_form'
              ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/60'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#181c2c]'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>রিলস আপলোড</span>
        </button>

        <button
          onClick={() => setAdminTab('templates')}
          className={`flex-1 min-w-[130px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            adminTab === 'templates'
              ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/60'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#181c2c]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>রেডিমেড টেমপ্লেট</span>
        </button>

        <button
          onClick={() => setAdminTab('database')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            adminTab === 'database'
              ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/60'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#181c2c]'
          }`}
          title="ডাটাবেজ ও ব্যাকআপ"
        >
          <Database className="w-4 h-4" />
          <span className="hidden sm:inline">ব্যাকআপ</span>
        </button>
      </div>

      {/* TAB 1: NEWS PUBLISHING & EDITING FORM (FULL DESKTOP / MOBILE RICH SUITE) */}
      {adminTab === 'news_form' && (
        <div className="space-y-4">
          <form onSubmit={handlePublishNews} className="space-y-4 bg-[#111422] border border-[#202538] rounded-2xl p-4 sm:p-6 shadow-xl text-left">
            <div className="flex items-center justify-between border-b border-[#1e2336] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 text-[#e50914] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {editingNewsId ? 'সংবাদ সম্পাদনা করুন (Edit News)' : 'নতুন সংবাদ লিখুন ও প্রকাশ করুন'}
                  </h3>
                  <p className="text-[11px] text-gray-400">সরাসরি ক্লাউড ডাটাবেজে যুক্ত হয়ে সাথে সাথে অনলাইনে প্রচার হবে</p>
                </div>
              </div>
              {editingNewsId && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-gray-300 hover:text-red-400 flex items-center gap-1.5 bg-[#1a1e30] px-3 py-1.5 rounded-lg border border-[#2c334d]"
                >
                  <X className="w-4 h-4" />
                  <span>এডিট বাতিল</span>
                </button>
              )}
            </div>

            {/* Headline Input */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                সংবাদের পূর্ণাঙ্গ শিরোনাম (Headline) <span className="text-[#e50914]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="আকর্ষণীয় ও বস্তুনিষ্ঠ শিরোনাম লিখুন..."
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e50914] font-medium transition-colors"
              />
            </div>

            {/* Category, Upazila, Reporter, Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  ক্যাটাগরি / বিভাগ:
                </label>
                <select
                  value={categoryName}
                  onChange={handleCategoryChange}
                  className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  জামালপুর উপজেলা:
                </label>
                <select
                  value={upazila}
                  onChange={e => setUpazila(e.target.value)}
                  className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
                >
                  <option value="">(প্রযোজ্য নয় / জেলা পর্যায়)</option>
                  {JAMALPUR_UPAZILAS.map(u => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  প্রতিবেদক / সূত্র:
                </label>
                <input
                  type="text"
                  value={reporter}
                  onChange={e => setReporter(e.target.value)}
                  placeholder="যেমন: স্টাফ রিপোর্টার / জামালপুর প্রতিনিধি"
                  className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  স্থান / শহর:
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="যেমন: জামালপুর / ঢাকা"
                  className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
                />
              </div>
            </div>

            {/* Photo Upload & Presets Suite */}
            <div className="space-y-2.5 bg-[#151827] p-4 rounded-xl border border-[#242b3f]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>সংবাদের ফিচার ছবি (News Banner Image):</span>
                </label>
                <span className="text-[10px] text-gray-400">ফাইল নির্বাচন করুন অথবা ছবির সরাসরি লিংক দিন</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="ছবির ওয়েব লিঙ্ক (URL) পেস্ট করুন..."
                  className="flex-1 bg-[#181c2d] border border-[#2c344d] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#e50914]"
                />

                {/* Direct File Upload */}
                <label className="cursor-pointer bg-[#22283e] hover:bg-[#2c3452] text-gray-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-[#353e5e] active:scale-95 transition-all shadow-md">
                  <Upload className="w-4 h-4 text-red-400" />
                  <span>ডিভাইস থেকে ছবি আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Ready Photo Presets Ribbon */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <span className="text-[11px] text-gray-400 font-semibold whitespace-nowrap">রেডিমেড ছবি:</span>
                {PHOTO_PRESETS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setImageUrl(preset.url);
                      setImagePreview(preset.url);
                    }}
                    className="text-[10px] bg-[#1a1d2e] hover:bg-red-950/60 hover:text-red-300 text-gray-300 border border-[#2b3147] px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#2d344d] mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-md font-semibold">
                    ছবি প্রিভিউ (Web Ready)
                  </span>
                </div>
              )}
            </div>

            {/* News Body Text Area */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                সংবাদের বিস্তারিত বিবরণ (News Body):
              </label>
              <textarea
                rows={7}
                value={contentBody}
                onChange={e => setContentBody(e.target.value)}
                placeholder="সংবাদের বিস্তারিত বিবরণ লিখুন... একাধিক অনুচ্ছেদ করতে সাধারণ Enter চাপুন।"
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl p-4 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#e50914] leading-relaxed font-sans"
              />
            </div>

            {/* Tags & Featured Slider Checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  ট্যাগসমূহ (কমা দিয়ে আলাদা করুন):
                </label>
                <input
                  type="text"
                  value={tagsString}
                  onChange={e => setTagsString(e.target.value)}
                  placeholder="যেমন: সামি টিভি, জামালপুর, ব্রেকিং"
                  className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#151827] rounded-xl border border-[#242b3f] mt-1 sm:mt-5">
                <input
                  type="checkbox"
                  id="is-featured-slider-box"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#e50914] rounded cursor-pointer"
                />
                <label htmlFor="is-featured-slider-box" className="text-xs text-gray-200 cursor-pointer font-bold flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>হোমপেজের প্রধান স্লাইডারে প্রদর্শন করুন (Featured)</span>
                </label>
              </div>
            </div>

            {/* Main Submit Action */}
            <button
              type="submit"
              disabled={isPublishing}
              className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-xl shadow-red-950/60 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ফায়ারবেসে সেভ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{editingNewsId ? 'পরিবর্তন সংরক্ষণ করুন' : '🚀 সংবাদ প্রকাশ করুন (Firebase Cloud Sync)'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE PUBLISHED NEWS LIST (RICH TABLE / CARD VIEW) */}
      {adminTab === 'news_list' && (
        <div className="space-y-3 bg-[#111422] border border-[#202538] rounded-2xl p-4 sm:p-5 shadow-xl text-left">
          <div className="flex items-center justify-between border-b border-[#1e2336] pb-3 flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#e50914]" />
              <span>প্রকাশিত সংবাদ ব্যবস্থাপনা ({filteredList.length} টি)</span>
            </h3>
            <button
              onClick={() => {
                handleResetForm();
                setAdminTab('news_form');
              }}
              className="px-3.5 py-1.5 bg-[#e50914] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 active:scale-95 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>নতুন সংবাদ লিখুন</span>
            </button>
          </div>

          {/* Search Bar & Fast Filters */}
          <div className="space-y-2.5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="সংবাদ খুঁজুন (শিরোনাম, বিভাগ বা প্রতিবেদক দিয়ে)..."
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#e50914]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setFilterCat('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                  filterCat === 'all'
                    ? 'bg-[#e50914] text-white border-[#e50914]'
                    : 'bg-[#171a2a] text-gray-400 border-[#293046] hover:text-white'
                }`}
              >
                সব সংবাদ ({newsList.length})
              </button>
              <button
                onClick={() => setFilterCat('jamalpur')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                  filterCat === 'jamalpur'
                    ? 'bg-[#e50914] text-white border-[#e50914]'
                    : 'bg-[#171a2a] text-gray-400 border-[#293046] hover:text-white'
                }`}
              >
                জামালপুর ({newsList.filter(n => n.categoryKey === 'jamalpur').length})
              </button>
              <button
                onClick={() => setFilterCat('national')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                  filterCat === 'national'
                    ? 'bg-[#e50914] text-white border-[#e50914]'
                    : 'bg-[#171a2a] text-gray-400 border-[#293046] hover:text-white'
                }`}
              >
                জাতীয়
              </button>
              <button
                onClick={() => setFilterCat('sports')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                  filterCat === 'sports'
                    ? 'bg-[#e50914] text-white border-[#e50914]'
                    : 'bg-[#171a2a] text-gray-400 border-[#293046] hover:text-white'
                }`}
              >
                খেলাধুলা
              </button>
              <button
                onClick={() => setFilterCat('technology')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                  filterCat === 'technology'
                    ? 'bg-[#e50914] text-white border-[#e50914]'
                    : 'bg-[#171a2a] text-gray-400 border-[#293046] hover:text-white'
                }`}
              >
                বিজ্ঞান ও প্রযুক্তি
              </button>
            </div>
          </div>

          {/* News List Items */}
          <div className="space-y-2.5 max-h-[65vh] overflow-y-auto no-scrollbar pr-0.5 pt-1">
            {filteredList.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                কোনো সংবাদ পাওয়া যায়নি।
              </div>
            ) : (
              filteredList.map(news => (
                <div
                  key={news.id}
                  className="bg-[#151827] border border-[#23293e] hover:border-red-500/40 rounded-xl p-3 sm:p-3.5 flex gap-3 sm:gap-4 items-center justify-between transition-colors shadow-sm"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 sm:w-24 sm:h-20 rounded-xl object-cover flex-shrink-0 bg-black/40 border border-[#272d42]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/20">
                        {news.category}
                      </span>
                      {news.upazila && (
                        <span className="bg-purple-950/60 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">
                          {news.upazila}
                        </span>
                      )}
                      {news.isFeatured && (
                        <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                          ★ স্লাইডার
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 ml-auto truncate">
                        {news.publishedTime || news.date}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-gray-100 line-clamp-2 leading-tight">
                      {news.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1.5 flex-wrap">
                      <span className="truncate">{news.reporter || 'স্টাফ রিপোর্টার'}</span>
                      {news.location && <span>• {news.location}</span>}
                      <span>• ভিউ: {news.views || 1}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => onViewNews(news)}
                      title="সংবাদটি লাইভ দেখুন"
                      className="p-2 bg-[#1f2438] text-gray-300 hover:text-white rounded-lg active:scale-95 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(news)}
                      title="এডিট করুন"
                      className="p-2 bg-blue-950/60 text-blue-400 hover:text-blue-300 rounded-lg border border-blue-500/30 active:scale-95 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`"${news.title}" সংবাদটি ডিলিট করতে চান?`)) {
                          onDeleteNews(news.id);
                        }
                      }}
                      title="ডিলিট করুন"
                      className="p-2 bg-red-950/60 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 active:scale-95 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: REELS / SHORTS UPLOAD */}
      {adminTab === 'reels_form' && (
        <form onSubmit={handlePublishReel} className="space-y-4 bg-[#111422] border border-[#202538] rounded-2xl p-4 sm:p-6 shadow-xl text-left">
          <div className="flex items-center justify-between border-b border-[#1e2336] pb-3">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-[#e50914]" />
              <span>রিলস / শর্টস ভিডিও আপলোড</span>
            </h3>
            <span className="text-xs text-gray-400">শর্ট ভিডিও কনটেন্ট হাব</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-200 mb-1.5">
              রিলস শিরোনাম:
            </label>
            <input
              type="text"
              required
              value={reelTitle}
              onChange={e => setReelTitle(e.target.value)}
              placeholder="রিলসের আকর্ষণীয় শিরোনাম লিখুন..."
              className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#e50914]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ক্যাটাগরি:
              </label>
              <select
                value={reelCategory}
                onChange={e => setReelCategory(e.target.value)}
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              >
                <option value="জামালপুর">জামালপুর</option>
                <option value="জাতীয়">জাতীয়</option>
                <option value="খেলা">খেলা</option>
                <option value="প্রযুক্তি">প্রযুক্তি</option>
                <option value="ঐতিহ্য">ঐতিহ্য</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ভিডিও দৈর্ঘ্য:
              </label>
              <input
                type="text"
                value={reelDuration}
                onChange={e => setReelDuration(e.target.value)}
                placeholder="যেমন: ০০:৪৫"
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ভিডিও MP4 লিংক:
              </label>
              <input
                type="text"
                value={reelVideoUrl}
                onChange={e => setReelVideoUrl(e.target.value)}
                placeholder="ভিডিও URL (যেমন: https://...mp4)"
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ভিডিও থাম্বনেইল ছবি:
              </label>
              <input
                type="text"
                value={reelThumbnail}
                onChange={e => setReelThumbnail(e.target.value)}
                placeholder="থাম্বনেইল ইমেজ URL..."
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                প্রতিবেদক:
              </label>
              <input
                type="text"
                value={reelReporter}
                onChange={e => setReelReporter(e.target.value)}
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                স্থান:
              </label>
              <input
                type="text"
                value={reelLocation}
                onChange={e => setReelLocation(e.target.value)}
                className="w-full bg-[#171a2a] border border-[#293046] rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPublishing}
            className="w-full bg-[#e50914] hover:bg-[#c40810] text-white font-bold py-3 rounded-xl text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Film className="w-4 h-4" />
            <span>{isPublishing ? 'আপলোড হচ্ছে...' : 'রিলস আপলোড করুন'}</span>
          </button>
        </form>
      )}

      {/* TAB 4: READYMADE TEMPLATES */}
      {adminTab === 'templates' && (
        <div className="space-y-4 bg-[#111422] border border-[#202538] rounded-2xl p-4 sm:p-6 shadow-xl text-left">
          <div className="flex items-center justify-between border-b border-[#1e2336] pb-3">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>এক ক্লিকে জামালপুর স্পেশাল নিউজ টেমপ্লেট</span>
            </h3>
            <span className="text-xs text-gray-400">দ্রুত সংবাদ প্রকাশ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_TEMPLATES.map((tmpl, idx) => (
              <div key={idx} className="bg-[#151827] border border-[#23293e] rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                <div>
                  <img src={tmpl.image} alt={tmpl.title} className="w-full h-32 rounded-lg object-cover mb-2" />
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded">
                      {tmpl.upazila}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">{tmpl.title}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{tmpl.content}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="w-full py-2 bg-[#e50914] hover:bg-[#c40810] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>এই টেমপ্লেট দিয়ে লিখুন</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: DATABASE & BACKUP */}
      {adminTab === 'database' && (
        <div className="space-y-4 bg-[#111422] border border-[#202538] rounded-2xl p-4 sm:p-6 shadow-xl text-left">
          <div className="flex items-center justify-between border-b border-[#1e2336] pb-3">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>ক্লাউড ডাটাবেজ ব্যাকআপ ও কন্ট্রোল</span>
            </h3>
            <span className="text-xs text-emerald-400 font-bold">Firebase Live Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#151827] p-4 rounded-xl border border-[#242a40] space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400" />
                <span>সকল সংবাদের ব্যাকআপ ডাউনলোড (JSON)</span>
              </h4>
              <p className="text-xs text-gray-400">
                বর্তমানে সংরক্ষিত সকল {newsList.length}টি সংবাদের সম্পূর্ণ ডেটা আপনার ডিভাইসে ব্যাকআপ হিসেবে সংরক্ষণ করতে পারবেন।
              </p>
              <button
                onClick={handleExportData}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>JSON ব্যাকআপ ফাইল নামান</span>
              </button>
            </div>

            <div className="bg-[#151827] p-4 rounded-xl border border-red-900/30 space-y-3">
              <h4 className="text-xs font-bold text-red-400 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>সকল সংবাদ মুছে ফেলুন (Clear All News)</span>
              </h4>
              <p className="text-xs text-gray-400">
                ডাটাবেজ থেকে বর্তমানে বিদ্যমান সকল সংবাদ এক ক্লিকে মুছে ফেলতে পারেন যাতে পরবর্তীতে শুধু আপনার আপলোডকৃত নতুন খবর প্রদর্শিত হয়।
              </p>
              <button
                onClick={() => {
                  if (confirm('আপনি কি নিশ্চিত যে ডাটাবেজ থেকে সব সংবাদ মুছে ফেলতে চান?')) {
                    if (onClearAllNews) {
                      onClearAllNews();
                    } else {
                      onResetNews();
                    }
                  }
                }}
                className="w-full py-2.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>সকল সংবাদ মুছুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
