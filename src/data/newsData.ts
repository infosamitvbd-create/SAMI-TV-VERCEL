import { NewsItem, VideoItem, ProgramSchedule, ReelItem } from '../types';

// News items uploaded via Admin Panel and synced in Realtime with Firebase Firestore
// Initially empty so only user-uploaded news will appear.
export const NEWS_DATA: NewsItem[] = [];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'সামি টিভি স্পেশাল বুলেটিন: দেশের সার্বিক রাজনৈতিক ও অর্থনৈতিক পরিস্থিতি',
    category: 'বুলেটিন',
    duration: '১২:৪৫',
    thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://padmaonline.duckdns.org:8088/SamiTV/index.m3u8',
    date: 'আজ',
    views: '২৫.৪কে'
  },
  {
    id: 'vid-2',
    title: 'জামালপুর বিশেষ প্রতিবেদন: চরাঞ্চলের উন্নয়ন ও মানুষের জীবনযাত্রা',
    category: 'প্রতিবেদন',
    duration: '০৮:২০',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://padmaonline.duckdns.org:8088/SamiTV/index.m3u8',
    date: 'গতকাল',
    views: '১৮.১কে'
  },
  {
    id: 'vid-3',
    title: 'ফিফা বিশ্বকাপ ও ইনফান্টিনোর নতুন পরিকল্পনা নিয়ে বিশেষ আলোচনা',
    category: 'খেলা',
    duration: '১৫:১০',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://padmaonline.duckdns.org:8088/SamiTV/index.m3u8',
    date: '২ দিন আগে',
    views: '৩২.৭কে'
  },
  {
    id: 'vid-4',
    title: 'এআই ও গণমাধ্যম: কীভাবে স্যাটেলাইট টিভি সম্প্রচারে কৃত্রিম বুদ্ধিমত্তা বিপ্লব ঘটাচ্ছে',
    category: 'প্রযুক্তি',
    duration: '১০:০৫',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://padmaonline.duckdns.org:8088/SamiTV/index.m3u8',
    date: '৩ দিন আগে',
    views: '৪৫.২কে'
  }
];

export const PROGRAM_SCHEDULE: ProgramSchedule[] = [
  {
    id: 'prog-1',
    time: 'সকাল ০৮:০০',
    title: 'সকালের সংবাদ ও দেশের খবর',
    presenter: 'আফসানা রহমান',
  },
  {
    id: 'prog-2',
    time: 'দুপুর ১২:০০',
    title: 'মধ্যাহ্ন বুলেটিন ও বাণিজ্য বার্তা',
    presenter: 'তানভীর আহমেদ',
  },
  {
    id: 'prog-3',
    time: 'বিকাল ০৪:০০',
    title: 'সারাদেশের চিত্র ও জামালপুর প্রতিদিন',
    presenter: 'মাহমুদুল হাসান',
    isLiveNow: true,
  },
  {
    id: 'prog-4',
    time: 'সন্ধ্যা ০৭:০০',
    title: 'প্রধান সংবাদ: আজকের সারাদিন',
    presenter: 'নুসরাত জাহান',
  },
  {
    id: 'prog-5',
    time: 'রাত ০৯:০০',
    title: 'সামি টকশো: মুখোমুখি সত্য',
    presenter: 'এম এ সামি',
  },
  {
    id: 'prog-6',
    time: 'রাত ১১:০০',
    title: 'রাত বারোটার সংবাদ ও স্পোর্টস এক্সপ্রেস',
    presenter: 'রাকিবুল ইসলাম',
  }
];

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'জামালপুর অর্থনৈতিক অঞ্চলে নতুন শিল্পাঞ্চল উদ্বোধন ও শত শত তরুণের কর্মসংস্থান!',
    description: 'জামালপুর সদরে অর্থনৈতিক অঞ্চলের নতুন ইউনিটে ব্যাপক কর্মসংস্থানের সৃষ্টি হচ্ছে। আধুনিক প্রযুক্তির শিল্প কারখানা নিয়ে বিস্তারিত দেখুন রিলসে।',
    category: 'জামালপুর',
    duration: '০০:৪৫',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    reporter: 'জামালপুর প্রতিনিধি',
    location: 'জামালপুর সদর',
    likes: 1240,
    shares: 382,
    views: '৪৫.২কে',
    date: 'আজ',
    tags: ['#JamalpurNews', '#SamiTV', '#Economy', '#Bangladesh']
  },
  {
    id: 'reel-2',
    title: 'বাংলাদেশের স্যাটেলাইট গণমাধ্যমে প্রথম এআই টিভি চ্যানেল সামি টিভি!',
    description: 'কৃত্রিম বুদ্ধিমত্তা ও আধুনিক ব্রডকাস্টিংয়ের অনন্য সমন্বয়। ২৪ ঘণ্টা লাইভ সংবাদে সামি টিভি সত্যের সাথে সবসময়।',
    category: 'প্রযুক্তি',
    duration: '০০:৩০',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    reporter: 'আইটি ডেস্ক',
    location: 'ঢাকা',
    likes: 3890,
    shares: 940,
    views: '৭৮.৬কে',
    date: 'আজ',
    tags: ['#SamiTV', '#AITechnology', '#SmartMedia', '#LiveNews']
  },
  {
    id: 'reel-3',
    title: 'ইসলামপুরে যমুনা নদীর ভাঙন রোধে স্থায়ী বেড়িবাঁধ নির্মাণ দ্রুতগতিতে চলছে',
    description: 'যমুনার আগ্রাসন থেকে তীরবর্তী বসতবাড়ি ও ফসলি জমি রক্ষায় হাজার কোটি টাকার প্রকল্পের অগ্রগতি।',
    category: 'জামালপুর',
    duration: '০০:৫০',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    reporter: 'ইসলামপুর প্রতিনিধি',
    location: 'ইসলামপুর, জামালপুর',
    likes: 980,
    shares: 215,
    views: '২৮.৪কে',
    date: 'গতকাল',
    tags: ['#Jamalpur', '#Islampur', '#YamunaRiver', '#BreakingNews']
  },
  {
    id: 'reel-4',
    title: 'ফিফা বিশ্বকাপ ও ইনফান্টিনোর নতুন পরিকল্পনা নিয়ে ফুটবলে তোলপাড়!',
    description: 'বিশ্বকাপ ফুটবলে দলের সংখ্যা বৃদ্ধি এবং মেক্সিকো ও আর্জেন্টিনার পূর্ণ সমর্থন নিয়ে বিশেষ স্পোর্টস রিলস।',
    category: 'খেলা',
    duration: '০০:৩৫',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    reporter: 'স্পোর্টস ডেস্ক',
    location: 'দোহা / বুয়েনস আইরেস',
    likes: 4520,
    shares: 1200,
    views: '৯২.১কে',
    date: 'আজ',
    tags: ['#WorldCup', '#SportsNews', '#Infantino', '#Football']
  },
  {
    id: 'reel-5',
    title: 'মেলান্দহের ঐতিহ্যবাহী নকশিকাঁথা ও হস্তশিল্প প্রদর্শনীতে পর্যটকদের ভিড়',
    description: 'হাতে বোনা অপূর্ব নকশিকাঁথা ও গ্রামীণ শিল্পীদের নৈপুণ্যে মুগ্ধ মেলায় আগত দর্শনার্থীরা।',
    category: 'ঐতিহ্য',
    duration: '০০:৪০',
    thumbnail: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    reporter: 'মেলান্দহ সংবাদদাতা',
    location: 'মেলান্দহ, জামালপুর',
    likes: 2150,
    shares: 430,
    views: '৩৬.৭কে',
    date: '২ দিন আগে',
    tags: ['#NakshiKantha', '#Heritage', '#Jamalpur', '#Handicraft']
  },
  {
    id: 'reel-6',
    title: 'মাদারগঞ্জে ১০০ মেগাওয়াট সৌরবিদ্যুৎ কেন্দ্র সফলভাবে জাতীয় গ্রিডে সংযুক্ত!',
    description: 'পরিবেশবান্ধব সবুজ শক্তি উৎপাদনে বাংলাদেশের আরেকটি বড় মাইলফলক অর্জিত হলো।',
    category: 'জাতীয়',
    duration: '০০:৪৫',
    thumbnail: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    reporter: 'মাদারগঞ্জ প্রতিনিধি',
    location: 'মাদারগঞ্জ, জামালপুর',
    likes: 1840,
    shares: 310,
    views: '৩১.৫কে',
    date: 'আজ',
    tags: ['#SolarPower', '#GreenEnergy', '#Development', '#Madarganj']
  }
];
