import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Crown,
  CheckCircle,
  Sparkles,
  Eye,
  EyeOff,
  Tv,
  Bookmark,
  Bell,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { UserProfile } from '../types';
import { registerUser, loginUser } from '../services/firebaseService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
}

const DISTRICT_LIST = [
  'জামালপুর সদর',
  'মেলান্দহ',
  'ইসলামপুর',
  'দেওয়ানগঞ্জ',
  'মাদারগঞ্জ',
  'সরিষাবাড়ী',
  'বকশীগঞ্জ',
  'ঢাকা',
  'ময়মনসিংহ',
  'অন্যান্য জেলা',
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('জামালপুর সদর');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [celebrationProfile, setCelebrationProfile] = useState<UserProfile | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          setError('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন');
          setLoading(false);
          return;
        }
        if (!email.trim() || !email.includes('@')) {
          setError('সঠিক ইমেইল এড্রেস লিখুন');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে');
          setLoading(false);
          return;
        }

        const profile = await registerUser(email, password, name, phone, district);
        setCelebrationProfile(profile);
        setTimeout(() => {
          onSuccess(profile);
          onClose();
          setCelebrationProfile(null);
        }, 2200);
      } else {
        if (!email.trim()) {
          setError('অনুগ্রহ করে ইমেইল লিখুন');
          setLoading(false);
          return;
        }
        if (!password) {
          setError('অনুগ্রহ করে পাসওয়ার্ড লিখুন');
          setLoading(false);
          return;
        }

        const profile = await loginUser(email, password);
        onSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'অথেনটিকেশনে সমস্যা হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  // Quick One-Click VIP Test Access
  const handleQuickVIPLogin = async () => {
    setLoading(true);
    const demoProfile = await registerUser(
      'vip.reader@samitv.bd',
      'samitv2026',
      'সামি টিভি ভিআইপি পাঠক',
      '01700000000',
      'জামালপুর সদর'
    );
    setCelebrationProfile(demoProfile);
    setTimeout(() => {
      onSuccess(demoProfile);
      onClose();
      setCelebrationProfile(null);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0e1018] border border-[#23283d] rounded-3xl overflow-hidden shadow-2xl">
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-900 to-black p-5 text-white overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 bg-amber-400/20 text-amber-300 rounded-lg border border-amber-400/40">
              <Crown className="w-4 h-4" />
            </span>
            <span className="text-xs font-black tracking-wider text-amber-300 uppercase">
              SAMI TV VIP ACCOUNT
            </span>
          </div>

          <h2 className="text-xl font-black text-white">
            {mode === 'register' ? 'ফ্রি প্রিমিয়াম অ্যাকাউন্ট তৈরি করুন' : 'সামি টিভি অ্যাকাউন্টে লগইন'}
          </h2>
          <p className="text-xs text-red-100/80 mt-1">
            অ্যাকাউন্ট করলেই পাচ্ছেন সম্পূর্ণ বিনামূল্যে আজীবন ভিআইপি সুবিধা!
          </p>

          {/* Glowing Badge */}
          <div className="mt-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-amber-400/30 rounded-xl px-3 py-1.5 text-[11px] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>লাইভ টিভি, নো-অ্যাডস ও বুকমার্ক আনলকড</span>
          </div>
        </div>

        {/* Celebration State */}
        {celebrationProfile ? (
          <div className="p-8 text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-black flex items-center justify-center shadow-xl shadow-amber-500/20">
              <Crown className="w-9 h-9 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">অভিনন্দন, {celebrationProfile.displayName}!</h3>
              <p className="text-xs text-amber-300 font-semibold mt-1">
                🌟 আপনার ভিআইপি প্রিমিয়াম মেম্বারশিপ সক্রিয় হয়েছে
              </p>
              <p className="text-[11px] text-gray-400 mt-2">
                এখন থেকে আপনি বিজ্ঞাপনমুক্ত খবর, আল্ট্রা এইচডি লাইভ স্ট্রিম ও সেভড নিউজ বুকমার্ক উপভোগ করতে পারবেন।
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 py-2 rounded-xl border border-emerald-500/30">
              <CheckCircle className="w-4 h-4" />
              <span>প্রিমিয়াম স্ট্যাটাস: এক্টিভ</span>
            </div>
          </div>
        ) : (
          <div className="p-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Mode Switcher */}
            <div className="flex bg-[#161926] p-1 rounded-xl border border-[#262c42] mb-4">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                নতুন একাউন্ট (ফ্রি VIP)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                লগইন করুন
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    আপনার পূর্ণ নাম: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="যেমন: মোঃ সাকিব হাসান"
                      className="w-full bg-[#131622] border border-[#282e44] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  ইমেইল এড্রেস: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#131622] border border-[#282e44] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  পাসওয়ার্ড: <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'register' ? 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড' : 'আপনার পাসওয়ার্ড'}
                    className="w-full bg-[#131622] border border-[#282e44] rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        জেলা / উপজেলা:
                      </label>
                      <div className="relative">
                        <select
                          value={district}
                          onChange={e => setDistrict(e.target.value)}
                          className="w-full bg-[#131622] border border-[#282e44] rounded-xl pl-8 pr-2 py-2.5 text-[11px] text-white focus:outline-none focus:border-red-500"
                        >
                          {DISTRICT_LIST.map(d => (
                            <option key={d} value={d} className="bg-[#131622]">
                              {d}
                            </option>
                          ))}
                        </select>
                        <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        মোবাইল (ঐচ্ছিক):
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full bg-[#131622] border border-[#282e44] rounded-xl pl-8 pr-2 py-2.5 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-red-500 font-mono"
                        />
                        <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* VIP Benefits Box */}
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#181b29] to-[#121420] border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black">
                  <Crown className="w-3.5 h-3.5" />
                  <span>অ্যাকাউন্ট করলেই যা যা পাবেন:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400">✓</span> 4K আল্ট্রা HD লাইভ টিভি
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400">✓</span> নো-অ্যাডস রিডিং মোড
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400">✓</span> আনলিমিটেড বুকমার্ক
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-400">✓</span> স্থায়ী ডিভাইস লগইন
                  </div>
                </div>
                <div className="pt-1.5 border-t border-[#23293e] flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>এই ডিভাইসে আপনার অ্যাকাউন্ট আজীবন স্বয়ংক্রিয়ভাবে সেভ থাকবে।</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs tracking-wide shadow-lg shadow-red-900/40 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : mode === 'register' ? (
                  <>
                    <Crown className="w-4 h-4 text-amber-300" />
                    <span>অ্যাকাউন্ট খুলুন ও প্রিমিয়াম আনলক করুন</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>লগইন করুন</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Test Access */}
            <div className="mt-4 pt-3 border-t border-[#202538] text-center">
              <button
                type="button"
                onClick={handleQuickVIPLogin}
                disabled={loading}
                className="w-full py-2 px-3 bg-[#181c2d] hover:bg-[#20253b] border border-[#2f3754] text-amber-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>🚀 এক ক্লিকে ইনস্ট্যান্ট ভিআইপি ট্রায়াল</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
