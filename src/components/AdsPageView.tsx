import React, { useState } from 'react';
import { Megaphone, Mail, Phone, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const AdsPageView: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    type: 'টিভি স্ক্রল বিজ্ঞাপন',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="ads-page-view" className="w-full max-w-md mx-auto p-3.5 pb-20 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-red-500" />
          <span>বিজ্ঞাপন ও প্রচার সেবা</span>
        </h2>
      </div>

      {/* Intro Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c0407] via-[#240a0e] to-[#121422] border border-red-800/40 text-center">
        <h3 className="text-lg font-bold text-white mb-1">
          {APP_CONFIG.channelName}-এ বিজ্ঞাপন দিন
        </h3>
        <p className="text-xs text-gray-300">
          দেশের প্রথম এআই-বেসড স্যাটেলাইট টেলিভিশনে আপনার ব্যবসা ও পণ্যের কার্যকর প্রচার করুন।
        </p>
      </div>

      {/* Ad Packages */}
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-[#12141c] border border-[#232738] text-center">
          <p className="font-bold text-red-400">টিভি স্ক্রল বিজ্ঞাপন</p>
          <p className="text-[10px] text-gray-400 mt-1">লাইভ সম্প্রচারে নিচে চলমান টেক্সট</p>
        </div>
        <div className="p-3 rounded-xl bg-[#12141c] border border-[#232738] text-center">
          <p className="font-bold text-red-400">ভিডিও বিজ্ঞাপন (L-Band)</p>
          <p className="text-[10px] text-gray-400 mt-1">প্রাইমটাইম বুলেটিনে বিশেষ স্লট</p>
        </div>
        <div className="p-3 rounded-xl bg-[#12141c] border border-[#232738] text-center">
          <p className="font-bold text-red-400">ডিজিটাল ব্যানার</p>
          <p className="text-[10px] text-gray-400 mt-1">অ্যাপ ও ওয়েবসাইট হোমপেজ ব্যানার</p>
        </div>
        <div className="p-3 rounded-xl bg-[#12141c] border border-[#232738] text-center">
          <p className="font-bold text-red-400">স্পন্সরড প্রতিবেদন</p>
          <p className="text-[10px] text-gray-400 mt-1">কর্পোরেট বিশেষ কভারেজ</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-4 rounded-2xl bg-[#12141c] border border-[#232738]">
        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">বিজ্ঞাপন বুকিং অনুরোধ গৃহীত হয়েছে!</h4>
            <p className="text-xs text-gray-300">
              সামি টিভি বিপণন টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 text-xs text-red-400 underline"
            >
              নতুন বার্তা পাঠান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h4 className="text-xs font-bold text-gray-200">বিজ্ঞাপন সংক্রান্ত যোগাযোগ ফর্ম</h4>

            <div>
              <label className="text-[11px] text-gray-400 block mb-1">আপনার নাম *</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="নাম লিখুন"
                className="w-full bg-[#181a26] border border-[#272b3d] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400 block mb-1">মোবাইল নম্বর *</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="০১XXXXXXXXX"
                className="w-full bg-[#181a26] border border-[#272b3d] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400 block mb-1">বিজ্ঞাপনের ধরন</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#181a26] border border-[#272b3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option>টিভি স্ক্রল বিজ্ঞাপন</option>
                <option>ভিডিও বিজ্ঞাপন (L-Band)</option>
                <option>ডিজিটাল ব্যানার</option>
                <option>স্পন্সরড প্রতিবেদন</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 block mb-1">বার্তা বা বিবরণ</label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="বিজ্ঞাপন বিষয়ক বিবরণ..."
                className="w-full bg-[#181a26] border border-[#272b3d] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>অনুরোধ জমা দিন</span>
            </button>
          </form>
        )}
      </div>

      {/* Direct Contact Info */}
      <div className="p-3.5 rounded-2xl bg-[#12141c] border border-[#232738] space-y-2 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-red-500" />
          <span>ইমেইল: info.samitv.bd@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-500" />
          <span>হটলাইন: +৮৮০১৭১২-৩৪৫৬৭৮</span>
        </div>
      </div>
    </div>
  );
};
