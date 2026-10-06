import { LiveStreamConfig } from '../types';

export const APP_CONFIG: LiveStreamConfig = {
  // Official SAMI TV Logo URL
  logoUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJzBFxNLxCVm42e70gZrnyPMtqQ3piIxLnst-pNg7QZ-VnhzqA83dsxumwtFhBw77Pwf-YntlyB86rQWqIdoIrxe5Oe5aoMKS6lqjhFFL47Aql1u5UUs8dhquSy8dIko7xmfKwo61hWPKX0w6L80OTZQSWg7JTAVhBjZn2MS_B8V9K6EGv-500KIDb054e/s1434/sami%20logo%205.jpeg',
  // Live Stream URL (Empty by default)
  streamUrl: '',
  // Fallback demo video stream
  fallbackStreamUrl: '',
  channelName: 'SAMI TV',
  slogan: 'বাংলায় কথা বলে...',
  tagline: 'FIRST AI-BASED SATELLITE TELEVISION CHANNEL IN JAMALPUR',
  resolution: '1080p',
};

export interface CategoryConfig {
  id: string;
  name: string;
  enName: string;
  description: string;
  color: string; // Tailwind background color for circular icon badge
  iconColor: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'all', name: 'সর্বশেষ', enName: 'Latest', description: 'দেশ-বিদেশের তাজা সংবাদ', color: 'bg-red-600', iconColor: 'text-white' },
  { id: 'national', name: 'জাতীয়', enName: 'National', description: 'জাতীয় পর্যায়ের গুরুত্বপূর্ণ খবর', color: 'bg-red-500', iconColor: 'text-white' },
  { id: 'politics', name: 'রাজনীতি', enName: 'Politics', description: 'নির্বাচন ও দলীয় রাজনীতির হালচাল', color: 'bg-red-600', iconColor: 'text-white' },
  { id: 'international', name: 'আন্তর্জাতিক', enName: 'International', description: 'বিশ্বরাজনীতি ও ভূরাজনীতির সংবাদ', color: 'bg-orange-500', iconColor: 'text-white' },
  { id: 'economy', name: 'অর্থনীতি', enName: 'Economy', description: 'ব্যবসা-বাণিজ্য ও শেয়ারবাজার', color: 'bg-emerald-500', iconColor: 'text-white' },
  { id: 'sports', name: 'খেলাধুলা', enName: 'Sports', description: 'ক্রিকেট, ফুটবল ও অন্যান্য খেলা', color: 'bg-amber-500', iconColor: 'text-white' },
  { id: 'entertainment', name: 'বিনোদন', enName: 'Entertainment', description: 'সিনেমা, নাটক ও তারকার সংবাদ', color: 'bg-pink-500', iconColor: 'text-white' },
  { id: 'tech', name: 'প্রযুক্তি', enName: 'Technology', description: 'এআই, গ্যাজেট ও উদ্ভাবন', color: 'bg-cyan-500', iconColor: 'text-white' },
  { id: 'education', name: 'শিক্ষা', enName: 'Education', description: 'স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের খবর', color: 'bg-purple-500', iconColor: 'text-white' },
  { id: 'health', name: 'স্বাস্থ্য', enName: 'Health', description: 'চিকিৎসা ও জনস্বাস্থ্য বিষয়ক খবর', color: 'bg-teal-500', iconColor: 'text-white' },
  { id: 'agriculture', name: 'কৃষি', enName: 'Agriculture', description: 'কৃষিকাজ, ফসল ও গ্রামীণ অর্থনীতি', color: 'bg-lime-600', iconColor: 'text-white' },
  { id: 'jobs', name: 'চাকরি', enName: 'Jobs', description: 'নিয়োগ বিজ্ঞপ্তি ও ক্যারিয়ার পরামর্শ', color: 'bg-indigo-500', iconColor: 'text-white' },
  { id: 'lifestyle', name: 'লাইফস্টাইল', enName: 'Lifestyle', description: 'জীবনযাপন, ফ্যাশন ও ভ্রমণ', color: 'bg-amber-600', iconColor: 'text-white' },
  { id: 'environment', name: 'পরিবেশ', enName: 'Environment', description: 'জলবায়ু পরিবর্তন ও প্রকৃতি', color: 'bg-green-600', iconColor: 'text-white' },
  { id: 'religion', name: 'ধর্ম', enName: 'Religion', description: 'ধর্মীয় সংবাদ ও জীবনদর্শন', color: 'bg-teal-600', iconColor: 'text-white' },
  { id: 'crime', name: 'আইন ও অপরাধ', enName: 'Crime & Law', description: 'আইনশৃঙ্খলা ও বিচার ব্যবস্থা', color: 'bg-blue-600', iconColor: 'text-white' },
  { id: 'saradesh', name: 'সারাদেশ', enName: 'Nationwide', description: '৮টি বিভাগের জেলাভিত্তিক সংবাদ', color: 'bg-sky-600', iconColor: 'text-white' },
  { id: 'jamalpur', name: 'জামালপুর', enName: 'Jamalpur', description: 'জামালপুর জেলা ও ৭টি উপজেলার খবর', color: 'bg-rose-600', iconColor: 'text-white' },
];

export const JAMALPUR_UPAZILAS = [
  'সব এলাকা',
  'জামালপুর সদর',
  'দেওয়ানগঞ্জ',
  'ইসলামপুর',
  'মেলান্দহ',
  'মাদারগঞ্জ',
  'সরিষাবাড়ী',
  'বকশীগঞ্জ',
];

export interface DivisionItem {
  id: string;
  name: string;
  image: string;
  newsCount: number;
}

export const DIVISIONS: DivisionItem[] = [
  {
    id: 'barishal',
    name: 'বরিশাল বিভাগ',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
    newsCount: 42,
  },
  {
    id: 'chattogram',
    name: 'চট্টগ্রাম বিভাগ',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    newsCount: 68,
  },
  {
    id: 'khulna',
    name: 'খুলনা বিভাগ',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80',
    newsCount: 54,
  },
  {
    id: 'rajshahi',
    name: 'রাজশাহী বিভাগ',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
    newsCount: 49,
  },
  {
    id: 'rangpur',
    name: 'রংপুর বিভাগ',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=80',
    newsCount: 38,
  },
  {
    id: 'sylhet',
    name: 'সিলেট বিভাগ',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    newsCount: 57,
  },
  {
    id: 'mymensingh',
    name: 'ময়মনসিংহ বিভাগ',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
    newsCount: 62,
  },
  {
    id: 'dhaka',
    name: 'ঢাকা বিভাগ',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    newsCount: 115,
  },
];

export const DISTRICTS = [
  'জামালপুর',
  'ঢাকা',
  'চট্টগ্রাম',
  'রাজশাহী',
  'সিলেট',
  'খুলনা',
  'বরিশাল',
  'রংপুর',
  'ময়মনসিংহ',
  'বগুড়া',
  'কুমিল্লা',
  'কক্সবাজার',
];
