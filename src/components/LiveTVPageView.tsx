import React, { useState } from 'react';
import { Radio, Calendar, Clock, Share2, MessageCircle, Send, Sparkles } from 'lucide-react';
import { LivePlayer } from './LivePlayer';
import { PROGRAM_SCHEDULE } from '../data/newsData';
import { APP_CONFIG } from '../config/appConfig';

export const LiveTVPageView: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<{ user: string; text: string; time: string }[]>([
    { user: 'রাকিব হাসান', text: 'সামি টিভির লাইভ সম্প্রচারের কোয়ালিটি অনেক দারুণ!', time: '১০:৪৫' },
    { user: 'তানিয়া আক্তার', text: 'জামালপুর থেকে সরাসরি দেখছি, চমৎকার উপস্থাপনা।', time: '১০:৪৮' },
    { user: 'মাহমুদ আলম', text: 'সত্যের সাথে সবসময় স্লোগান সত্যিই সার্থক।', time: '১০:৫০' },
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        user: 'আপনি',
        text: inputMsg.trim(),
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  return (
    <div id="live-tv-page-view" className="w-full max-w-md mx-auto p-3.5 pb-20 space-y-4 animate-fade-in">
      {/* Live TV Player */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 live-dot" />
            <h2 className="text-base font-bold text-white">সরাসরি সম্প্রচার (LIVE TV)</h2>
          </div>
          <span className="text-[11px] font-semibold bg-red-950/80 text-red-300 border border-red-800 px-2 py-0.5 rounded">
            ১০৮০p ফুল এইচডি
          </span>
        </div>

        <LivePlayer />
      </div>

      {/* Currently Airing Show Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#181119] to-[#121420] border border-red-800/40 shadow-lg">
        <div className="flex items-center justify-between mb-1.5">
          <span className="flex items-center gap-1 text-[11px] font-bold text-red-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            এখন প্রচারিত হচ্ছে
          </span>
          <span className="text-[10px] text-gray-400 font-mono">লাইভ স্টুডিও</span>
        </div>

        <h3 className="text-sm font-bold text-white">সারাদেশের চিত্র ও জামালপুর প্রতিদিন</h3>
        <p className="text-xs text-gray-300 mt-0.5">উপস্থাপনা: মাহমুদুল হাসান | প্রযোজনা: সামি টিভি</p>
      </div>

      {/* Program Schedule */}
      <div className="p-3.5 rounded-2xl bg-[#12141c] border border-[#232738]">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-500" />
          <span>আজকের অনুষ্ঠানসূচি</span>
        </h3>

        <div className="space-y-2">
          {PROGRAM_SCHEDULE.map(prog => (
            <div
              key={prog.id}
              className={`flex items-center justify-between p-2 rounded-xl text-xs ${
                prog.isLiveNow
                  ? 'bg-red-950/40 border border-red-600/50 text-white font-bold'
                  : 'bg-[#161824] text-gray-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className={`w-3.5 h-3.5 ${prog.isLiveNow ? 'text-red-400' : 'text-gray-500'}`} />
                <div>
                  <p className="font-semibold">{prog.title}</p>
                  <p className="text-[10px] text-gray-400 font-normal">উপস্থাপক: {prog.presenter}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-mono text-[11px]">{prog.time}</span>
                {prog.isLiveNow && (
                  <span className="block text-[9px] text-red-400 font-bold">চলছে</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Discussion & Chat */}
      <div className="p-3.5 rounded-2xl bg-[#12141c] border border-[#232738]">
        <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-red-500" />
          <span>লাইভ দর্শক মন্তব্য ({chatMessages.length})</span>
        </h3>

        {/* Message feed */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-3 no-scrollbar">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-[#181b28] border border-[#222738] text-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-bold text-red-400 text-[11px]">{msg.user}</span>
                <span className="text-[9px] text-gray-500">{msg.time}</span>
              </div>
              <p className="text-gray-200">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Chat input form */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            placeholder="লাইভ আড্ডায় অংশ নিন..."
            className="flex-1 bg-[#181b28] border border-[#262b40] rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
