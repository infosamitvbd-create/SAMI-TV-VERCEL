export type TabType = 'home' | 'category' | 'live' | 'location' | 'jamalpur' | 'reels' | 'ads' | 'profile' | 'video' | 'admin' | 'about';

export interface ReelItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  reporter: string;
  location?: string;
  likes: number;
  shares: number;
  views: string;
  date: string;
  tags?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  date: string;
  publishedTime: string;
  image: string;
  content: string[];
  reporter?: string;
  location?: string;
  division?: string;
  upazila?: string;
  isFeatured?: boolean;
  views?: number;
  readTime?: string;
  tags?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  date: string;
  views: string;
}

export interface ProgramSchedule {
  id: string;
  time: string;
  title: string;
  presenter: string;
  isLiveNow?: boolean;
}

export interface LiveStreamConfig {
  logoUrl: string;
  streamUrl: string;
  fallbackStreamUrl: string;
  channelName: string;
  slogan: string;
  tagline: string;
  resolution: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  district?: string;
  isPremium: boolean;
  premiumPlan?: string;
  joinedDate?: string;
  savedNewsIds?: string[];
  adFreeEnabled?: boolean;
  hdStreamingEnabled?: boolean;
}

export interface CommentItem {
  id: string;
  newsId: string;
  userName: string;
  userEmail?: string;
  isPremiumUser?: boolean;
  text: string;
  time: string;
  likes?: number;
}
