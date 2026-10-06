import React from 'react';
import {
  Tv,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Globe,
  Radio,
  MapPin,
  Mail,
  Award,
  CheckCircle2,
  Share2,
  Users,
  Target,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { SamiLogo } from './SamiLogo';
import { APP_CONFIG, JAMALPUR_UPAZILAS } from '../config/appConfig';

interface AboutUsPageViewProps {
  onBackToHome?: () => void;
  onGoLive?: () => void;
}

export const AboutUsPageView: React.FC<AboutUsPageViewProps> = ({
  onBackToHome,
  onGoLive,
}) => {
  const upazilasCount = JAMALPUR_UPAZILAS.filter(u => u !== 'সব এলাকা').length;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'আমাদের সম্পর্কে • SAMI TELEVISION',
          text: 'সামি টেলিভিশন (SAMI TV) - জামালপুরের প্রথম এআই-ভিত্তিক স্যাটেলাইট টেলিভিশন ও ডিজিটাল নিউজ নেটওয়ার্ক। সত্যের সাথে সবসময়।',
          url: window.location.href,
        });
      } catch (_) {}
    }
  };

  return (
    <div id="about-us-page-view" className="w-full max-w-md mx-auto p-3.5 pb-24 space-y-4 animate-fade-in text-left">
      {/* Top Header Bar with Back Button */}
      <div className="flex items-center justify-between pb-1 border-b border-[#1c2030]">
        <div className="flex items-center gap-2">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              aria-label="Back to home"
              className="p-1.5 -ml-1 text-gray-400 hover:text-white hover:bg-[#161a28] rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-base font-black text-white flex items-center gap-2">
              <span>আমাদের সম্পর্কে</span>
              <span className="text-xs text-red-500 font-normal">• SAMI TELEVISION</span>
            </h1>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-[#161a28] rounded-xl transition-colors"
          aria-label="Share about page"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Channel Identity Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[#171926] via-[#10121c] to-[#0a0b12] border border-[#262c42] shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Channel Logo */}
        <div className="flex justify-center mb-3">
          <div className="p-2 rounded-2xl bg-black/60 border border-[#2b334c] shadow-lg inline-block">
            <SamiLogo size="lg" showText={false} />
          </div>
        </div>

        <h2 className="text-lg font-black text-white tracking-wide">
          সামি টেলিভিশন
        </h2>
        <p className="text-xs font-bold text-red-500 tracking-widest mt-0.5">
          SAMI TELEVISION • SAMI TV
        </p>

        {/* Slogan Pill */}
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-bold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>{APP_CONFIG.slogan || 'সত্যের সাথে সবসময়'}</span>
        </div>

        <p className="text-[11px] text-gray-300 font-medium mt-3 leading-relaxed px-2">
          {APP_CONFIG.tagline || 'FIRST AI-BASED SATELLITE TELEVISION CHANNEL IN JAMALPUR, BANGLADESH'}
        </p>
      </div>

      {/* Quick Numbers / Stats Grid */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3 rounded-2xl bg-[#121522] border border-[#22273b]">
          <div className="w-7 h-7 mx-auto rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <strong className="text-sm font-black text-white">{upazilasCount}টি</strong>
          <span className="block text-[10px] text-gray-400">উপজেলা কভারেজ</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#121522] border border-[#22273b]">
          <div className="w-7 h-7 mx-auto rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-1">
            <Radio className="w-4 h-4" />
          </div>
          <strong className="text-sm font-black text-white">২৪/৭</strong>
          <span className="block text-[10px] text-gray-400">লাইভ ও সংবাদ</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#121522] border border-[#22273b]">
          <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-1">
            <Cpu className="w-4 h-4" />
          </div>
          <strong className="text-sm font-black text-white">AI-Powered</strong>
          <span className="block text-[10px] text-gray-400">স্মার্ট মিডিয়া</span>
        </div>
      </div>

      {/* About Description & Introduction */}
      <div className="p-4 rounded-2xl bg-[#12141e] border border-[#22273b] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-[#1f2438] pb-2">
          <Tv className="w-4 h-4 text-red-500" />
          <span>আমাদের পরিচিতি ও লক্ষ্য</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white">সামি টেলিভিশন (SAMI TELEVISION)</strong> বৃহত্তর জামালপুর জেলা ও সমগ্র বাংলাদেশের একটি আধুনিক, প্রযুক্তিনির্ভর এবং প্রথম এআই-চালিত ডিজিটাল ও স্যাটেলাইট টেলিভিশন চ্যানেল।
        </p>
        <p className="text-xs text-gray-300 leading-relaxed">
          আমাদের মূল লক্ষ্য তৃণমূলের মানুষের না বলা কথা, উন্নয়ন-সমস্যা, ঐতিহ্য, শিল্প-সংস্কৃতি এবং সত্য ঘটনাকে বস্তুনিষ্ঠভাবে জাতির সামনে তুলে ধরা। কোনো দলমত বা পক্ষপাতহীনভাবে নির্ভীক সাংবাদিকতাই আমাদের মূল শক্তি।
        </p>
      </div>

      {/* Core Principles & Editorial Values */}
      <div className="p-4 rounded-2xl bg-[#12141e] border border-[#22273b] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-[#1f2438] pb-2">
          <Target className="w-4 h-4 text-red-500" />
          <span>আমাদের মূল অঙ্গীকার ও মূল্যবোধ</span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">বস্তুনিষ্ঠ ও নিরপেক্ষ সাংবাদিকতা</h4>
              <p className="text-[11px] text-gray-400 leading-normal">
                কোনো গুজবের স্থান নেই; তথ্যের সত্যতা যাচাই করে দ্রুততম সময়ে সঠিক সংবাদ পরিবেশন।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">তৃণমূল ও আঞ্চলিক কণ্ঠস্বর</h4>
              <p className="text-[11px] text-gray-400 leading-normal">
                জামালপুর সদর, দেওয়ানগঞ্জ, ইসলামপুর, মেলান্দহ, মাদারগঞ্জ, সরিষাবাড়ী ও বকশীগঞ্জ সহ প্রত্যন্ত অঞ্চলের খবর অগ্রাধিকার।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">আধুনিক এআই ও মাল্টিমিডিয়া প্রযুক্তি</h4>
              <p className="text-[11px] text-gray-400 leading-normal">
                ডিজিটাল রিলস, হাই-ডেফিনিশন ভিডিও বুলেটিন ও ২৪ ঘণ্টা নিরবচ্ছিন্ন লাইভ স্ট্রিমিং অভিজ্ঞতা।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">সামাজিক দায়বদ্ধতা</h4>
              <p className="text-[11px] text-gray-400 leading-normal">
                শিক্ষা, স্বাস্থ্য, কৃষি, পরিবেশ ও দেশের সার্বিক উন্নয়নে সচেতনতামূলক অনুষ্ঠান প্রচার।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage & Services Area */}
      <div className="p-4 rounded-2xl bg-[#12141e] border border-[#22273b] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-[#1f2438] pb-2">
          <Globe className="w-4 h-4 text-red-500" />
          <span>সম্প্রচার ক্ষেত্র ও সেবাসমূহ</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#171b2a] border border-[#23283c]">
            <span className="font-bold text-white block">📺 ডিজিটাল লাইভ টিভি</span>
            <span className="text-[10px] text-gray-400">২৪ ঘণ্টা লাইভ সম্প্রচার</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#171b2a] border border-[#23283c]">
            <span className="font-bold text-white block">⚡ ব্রেকিং নিউজ পোর্টাল</span>
            <span className="text-[10px] text-gray-400">তাত্ক্ষণিক দেশ-বিদেশের খবর</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#171b2a] border border-[#23283c]">
            <span className="font-bold text-white block">🎬 শর্টস ও রিলস বুলেটিন</span>
            <span className="text-[10px] text-gray-400">ভিজ্যুয়াল ৬০-সেকেন্ড খবর</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#171b2a] border border-[#23283c]">
            <span className="font-bold text-white block">📍 আঞ্চলিক নেটওয়ার্ক</span>
            <span className="text-[10px] text-gray-400">৮ বিভাগ ও ৬৪ জেলার সংবাদ</span>
          </div>
        </div>
      </div>

      {/* Official Contact & Office Information Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#181216] via-[#141624] to-[#0d0f17] border border-red-900/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-[#24293d] pb-2">
          <Mail className="w-4 h-4 text-red-400" />
          <span>যোগাযোগ ও অফিস তথ্য</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">প্রধান কার্যালয়:</span>
              <p className="text-gray-300 text-[11px]">জামালপুর সদর, জামালপুর-২০০০, ময়মনসিংহ বিভাগ, বাংলাদেশ।</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">ইমেইল:</span>
              <p className="text-gray-300 text-[11px]">
                <a href="mailto:info.samitv.bd@gmail.com" className="text-red-400 underline hover:text-red-300">
                  info.samitv.bd@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">বার্তা ও সম্প্রচার বিভাগ:</span>
              <p className="text-gray-300 text-[11px]">SAMI TELEVISION Digital Newsroom & Media Lab</p>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="pt-2 flex gap-2">
          <a
            href="mailto:info.samitv.bd@gmail.com"
            className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold text-center active:scale-98 transition-all shadow-md shadow-red-950/50 flex items-center justify-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>ইমেইল পাঠান</span>
          </a>

          {onGoLive && (
            <button
              onClick={onGoLive}
              className="py-2 px-3.5 rounded-xl bg-[#1b2032] hover:bg-[#252b42] text-white text-xs font-bold active:scale-98 transition-all border border-[#2b334d] flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span>লাইভ টিভি</span>
            </button>
          )}
        </div>
      </div>

      {/* Copyright Footer Note */}
      <div className="pt-2 text-center text-[10px] text-gray-500 space-y-1">
        <p>© ২০২৬ SAMI TELEVISION (সামি টিভি). সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-gray-600">সত্যের সাথে সবসময় • First AI-Based Satellite TV in Jamalpur</p>
      </div>
    </div>
  );
};
