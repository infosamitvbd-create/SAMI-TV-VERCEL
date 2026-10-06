import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Radio } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { SamiLogo } from './SamiLogo';

interface SplashScreenProps {
  onFinish: () => void;
  durationSeconds?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationSeconds = 5,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play TV broadcast opening sonic chime (Professional broadcast identifier)
  const playWelcomeChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;
      // Rich sonic television broadcast tone
      const freqs = [349.23, 440.0, 523.25, 659.25];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.3);
      });
    } catch (_) {}
  };

  // Speak Bangla slogan: “সামি টেলিভিশন, সত্যের সাথে সবসময়”
  const speakBanglaVoice = () => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance('সামি টেলিভিশন, বাংলায় কথা বলে');
        utterance.lang = 'bn-BD';
        utterance.rate = 0.92;
        utterance.pitch = 1.05;

        // Check if a Bengali voice is available
        const voices = window.speechSynthesis.getVoices();
        const bnVoice = voices.find(
          v =>
            v.lang.toLowerCase().includes('bn') ||
            v.lang.toLowerCase().includes('bangla') ||
            v.name.toLowerCase().includes('bangla') ||
            v.name.toLowerCase().includes('bengali')
        );
        if (bnVoice) {
          utterance.voice = bnVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis notice:', err);
      }
    }
  };

  useEffect(() => {
    // Play sonic chime and voice
    playWelcomeChime();
    const voiceTimer = setTimeout(() => {
      speakBanglaVoice();
    }, 400);

    // Progress counter (update every 50ms for smooth 60fps feel)
    const totalMs = durationSeconds * 1000;
    const intervalMs = 50;
    const step = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    // Countdown second timer
    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto finish after duration
    const finishTimer = setTimeout(() => {
      handleExit();
    }, totalMs);

    return () => {
      clearTimeout(voiceTimer);
      clearInterval(timer);
      clearInterval(countdownTimer);
      clearTimeout(finishTimer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (_) {}
      }
    };
  }, [durationSeconds]);

  const handleExit = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 400);
  };

  const banglaDigits = (num: number) => {
    const map: { [k: string]: string } = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
    };
    return String(num)
      .split('')
      .map(d => map[d] || d)
      .join('');
  };

  return (
    <div
      id="sami-app-splash-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#0e0406] via-[#080a12] to-[#040509] text-white p-6 select-none transition-all duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Brand Aesthetic Lighting & Ambient Studio Glows matching Logo Palette (Crimson Red & Broadcast Cyan) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-gradient-to-b from-red-600/20 via-red-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 right-0 w-80 h-80 bg-[#005570]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Broadcast Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />

      {/* Top Spacer for Clean Balanced Framing */}
      <div className="w-full max-w-md pt-4 flex justify-center z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] font-semibold text-gray-300 tracking-wider uppercase">
            Official Broadcast Channel
          </span>
        </div>
      </div>

      {/* Center Brand Showcase: Logo Emblem, Title & Highlighted Slogan */}
      <div className="w-full max-w-md flex flex-col items-center justify-center text-center z-10 my-auto space-y-6">
        {/* Emblem Presentation with Radar Satellite Pulse */}
        <div className="relative flex items-center justify-center">
          {/* Animated Glowing Rings */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-red-600 via-[#005570] to-red-500 rounded-3xl opacity-30 blur-lg animate-pulse" />
          <div className="absolute -inset-8 border border-red-500/20 rounded-[32px] animate-ping [animation-duration:3s]" />

          {/* Logo Container styled with Logo Palette Glass Border */}
          <div className="relative p-3 rounded-3xl bg-[#090b14]/90 border border-red-500/30 shadow-[0_0_50px_rgba(229,9,20,0.35)] backdrop-blur-xl">
            <SamiLogo size="2xl" showText={false} />
          </div>
        </div>

        {/* Channel Branding Typography */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            সামি টেলিভিশন
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-red-500" />
            <p className="text-xs font-black text-red-500 tracking-[0.25em] uppercase">
              SAMI TELEVISION • SAMI TV
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>

        {/* Official Slogan Card - “সত্যের সাথে সবসময়” */}
        <div className="relative px-7 py-3 rounded-2xl bg-gradient-to-r from-[#200508]/90 via-[#101424]/90 to-[#200508]/90 border border-red-500/40 shadow-[0_8px_30px_rgba(229,9,20,0.25)] backdrop-blur-md">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white tracking-wide drop-shadow-sm">
              “{APP_CONFIG.slogan || 'সত্যের সাথে সবসময়'}”
            </h2>
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed font-medium tracking-wide">
          {APP_CONFIG.tagline || 'FIRST AI-BASED SATELLITE TELEVISION CHANNEL IN JAMALPUR'}
        </p>
      </div>

      {/* Bottom Loading Progress & Network Status */}
      <div className="w-full max-w-md z-10 space-y-2.5 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-1">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-[11px] text-gray-300">নেটওয়ার্ক লোড হচ্ছে...</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-white font-bold">{banglaDigits(timeLeft)}</span>
            <span className="text-gray-400">সেকেন্ড</span>
          </div>
        </div>

        {/* Progress Bar (Red + Teal Broadcast Gradient matching Logo Theme) */}
        <div className="relative w-full h-2 bg-[#121624] rounded-full overflow-hidden border border-[#20273c]">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-[#008299] to-red-500 rounded-full transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(229,9,20,0.6)]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        <p className="text-[10px] text-center text-gray-500 pt-0.5">
          জামালপুরের প্রথম এআই-ভিত্তিক স্যাটেলাইট টেলিভিশন
        </p>
      </div>
    </div>
  );
};
