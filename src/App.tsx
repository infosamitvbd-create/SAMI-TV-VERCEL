import React, { useState, useEffect } from 'react';
import { TabType, NewsItem, ReelItem, UserProfile } from './types';
import { Header } from './components/Header';
import { LivePlayer } from './components/LivePlayer';
import { FeaturedSlider } from './components/FeaturedSlider';
import { QuickMenu } from './components/QuickMenu';
import { LatestNewsSection } from './components/LatestNewsSection';
import { PromotionalBanner } from './components/PromotionalBanner';
import { BottomNavigation } from './components/BottomNavigation';
import { DrawerMenu } from './components/DrawerMenu';
import { NewsDetailsView } from './components/NewsDetailsView';
import { CategoryView } from './components/CategoryView';
import { LiveTVPageView } from './components/LiveTVPageView';
import { VideoPageView } from './components/VideoPageView';
import { LocationNewsView } from './components/LocationNewsView';
import { JamalpurNewsView } from './components/JamalpurNewsView';
import { ReelsNewsView } from './components/ReelsNewsView';
import { AdminPanelView } from './components/AdminPanelView';
import { AdsPageView } from './components/AdsPageView';
import { ProfilePageView } from './components/ProfilePageView';
import { AboutUsPageView } from './components/AboutUsPageView';
import { SplashScreen } from './components/SplashScreen';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { NEWS_DATA, REELS_DATA } from './data/newsData';
import {
  subscribeToNews,
  subscribeToReels,
  subscribeToAuth,
  saveNewsToFirebase,
  deleteNewsFromFirebase,
  saveReelToFirebase,
  deleteReelFromFirebase,
  resetFirebaseNews,
  clearAllNewsFromFirebase,
  seedInitialFirebaseData,
  getCurrentUserProfile,
  updateUserProfile,
  logoutUser,
  toggleBookmark,
} from './services/firebaseService';
import { Crown, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeQuickMenuItem, setActiveQuickMenuItem] = useState<string>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedReelId, setSelectedReelId] = useState<string | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

  // User Profile & VIP Member State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUserProfile());

  // Cloud & Realtime News State from Firebase Firestore (Starts clean and empty)
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [reelsList, setReelsList] = useState<ReelItem[]>(REELS_DATA);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // Initialize Firebase subscriptions on mount
  useEffect(() => {
    // Seed initial news/reels to Firestore if collection is empty
    seedInitialFirebaseData();

    // Subscribe to auth state and persistent device profile
    const unsubscribeAuth = subscribeToAuth((userProfile) => {
      if (userProfile) {
        setCurrentUser(userProfile);
      }
    });

    // Subscribe to real-time news updates
    const unsubscribeNews = subscribeToNews((updatedNews) => {
      if (updatedNews) {
        setNewsList(updatedNews);
        setIsFirebaseConnected(true);
      }
    });

    // Subscribe to real-time reels updates
    const unsubscribeReels = subscribeToReels((updatedReels) => {
      if (updatedReels && updatedReels.length > 0) {
        setReelsList(updatedReels);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeNews();
      unsubscribeReels();
    };
  }, []);

  // Save news to Firebase (Real-time Cloud Sync across all users & devices)
  const handleSaveNews = async (newsItem: NewsItem, isEdit: boolean) => {
    // Optimistic local update
    setNewsList(prev => {
      if (isEdit) {
        return prev.map(n => (n.id === newsItem.id ? newsItem : n));
      }
      return [newsItem, ...prev];
    });

    try {
      await saveNewsToFirebase(newsItem);
    } catch (error) {
      console.error('Firebase save news failed, falling back to local state:', error);
    }
  };

  // Delete news from Firebase
  const handleDeleteNews = async (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
    try {
      await deleteNewsFromFirebase(id);
    } catch (error) {
      console.error('Firebase delete news failed:', error);
    }
  };

  // Save reel to Firebase
  const handleSaveReel = async (reelItem: ReelItem) => {
    setReelsList(prev => [reelItem, ...prev]);
    try {
      await saveReelToFirebase(reelItem);
    } catch (error) {
      console.error('Firebase save reel failed:', error);
    }
  };

  // Delete reel from Firebase
  const handleDeleteReel = async (id: string) => {
    setReelsList(prev => prev.filter(r => r.id !== id));
    try {
      await deleteReelFromFirebase(id);
    } catch (error) {
      console.error('Firebase delete reel failed:', error);
    }
  };

  // Clear all news in Firebase
  const handleClearAllNews = async () => {
    setNewsList([]);
    try {
      await clearAllNewsFromFirebase();
    } catch (error) {
      console.error('Firebase clear all news failed:', error);
    }
  };

  // Reset news in Firebase
  const handleResetNews = async () => {
    setNewsList([]);
    try {
      await clearAllNewsFromFirebase();
    } catch (error) {
      console.error('Firebase reset news failed:', error);
    }
  };

  // Handle Bookmark toggle with Firestore user profile sync
  const handleToggleBookmark = async (newsId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const updated = await toggleBookmark(newsId, currentUser);
    if (updated) {
      setCurrentUser(updated);
    }
  };

  // Handle updating user profile settings
  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    setCurrentUser(updatedProfile);
    await updateUserProfile(updatedProfile);
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  // Handle Quick Menu selection
  const handleQuickMenuSelect = (item: {
    id: string;
    tab: TabType;
    categoryFilter?: string;
  }) => {
    setActiveQuickMenuItem(item.id);
    setSelectedNews(null);

    if (item.categoryFilter) {
      setSelectedCategory(item.categoryFilter);
      setActiveTab('category');
    } else {
      setActiveTab(item.tab);
    }
  };

  // Handle Bottom Navigation tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedNews(null);
    if (tab === 'home') {
      setActiveQuickMenuItem('latest');
    }
  };

  // Handle opening category from drawer
  const handleSelectCategoryFromDrawer = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('category');
    setSelectedNews(null);
  };

  // Render the currently selected tab or view
  const renderMainContent = () => {
    // If user has opened a detailed news article
    if (selectedNews) {
      const related = newsList.filter(n => n.id !== selectedNews.id).slice(0, 3);
      return (
        <NewsDetailsView
          news={selectedNews}
          relatedNews={related}
          currentUser={currentUser}
          onBack={() => setSelectedNews(null)}
          onSelectRelated={item => {
            setSelectedNews(item);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleBookmark={handleToggleBookmark}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      );
    }

    switch (activeTab) {
      case 'admin':
        return (
          <AdminPanelView
            newsList={newsList}
            reelsList={reelsList}
            onSaveNews={handleSaveNews}
            onDeleteNews={handleDeleteNews}
            onSaveReel={handleSaveReel}
            onDeleteReel={handleDeleteReel}
            onResetNews={handleResetNews}
            onClearAllNews={handleClearAllNews}
            onViewNews={item => {
              setSelectedNews(item);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => setActiveTab('home')}
          />
        );

      case 'category':
        return (
          <CategoryView
            newsList={newsList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectNews={setSelectedNews}
            onBackToHome={() => setActiveTab('home')}
          />
        );

      case 'live':
        return <LiveTVPageView />;

      case 'video':
        return <VideoPageView />;

      case 'reels':
        return (
          <ReelsNewsView
            reels={reelsList}
            onBackToHome={() => {
              setActiveTab('home');
              setSelectedReelId(undefined);
            }}
            initialReelId={selectedReelId}
          />
        );

      case 'jamalpur':
        return (
          <JamalpurNewsView
            newsList={newsList}
            onSelectNews={setSelectedNews}
          />
        );

      case 'location':
        return (
          <LocationNewsView
            newsList={newsList}
            onSelectNews={setSelectedNews}
          />
        );

      case 'ads':
        return <AdsPageView />;

      case 'about':
        return (
          <AboutUsPageView
            onBackToHome={() => setActiveTab('home')}
            onGoLive={() => setActiveTab('live')}
          />
        );

      case 'profile':
        return (
          <ProfilePageView
            currentUser={currentUser}
            newsList={newsList}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            onNavigateAdmin={() => setActiveTab('admin')}
            onNavigateAbout={() => setActiveTab('about')}
            onSelectNews={item => {
              setSelectedNews(item);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'home':
      default:
        return (
          <main className="w-full max-w-md mx-auto px-3.5 pt-2.5 pb-20 space-y-3 animate-fade-in">
            {/* VIP Welcome Banner if logged in */}
            {currentUser && (
              <div
                onClick={() => setActiveTab('profile')}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-[#1c1220] via-[#161828] to-[#10121e] border border-amber-400/40 shadow-md cursor-pointer hover:border-amber-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">স্বাগতম, {currentUser.displayName}</span>
                      <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-full font-black">
                        VIP
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">
                      {currentUser.adFreeEnabled ? '🛡️ বিজ্ঞাপনমুক্ত মোড সক্রিয়' : '⚡ 4K Ultra-HD স্ট্রিমিং মোড সক্রিয়'}
                    </p>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            )}

            {/* 1. Live TV Player directly below header */}
            <LivePlayer />

            {/* 2. Featured News Slider */}
            <FeaturedSlider
              items={newsList}
              onSelectNews={setSelectedNews}
            />

            {/* 3. Quick Menu (Horizontal icons) */}
            <QuickMenu
              activeId={activeQuickMenuItem}
              onSelect={handleQuickMenuSelect}
            />

            {/* 4. Latest News Section with Horizontal Cards */}
            <LatestNewsSection
              news={newsList}
              onSelectNews={setSelectedNews}
              onViewAll={() => {
                setSelectedCategory('all');
                setActiveTab('category');
              }}
            />

            {/* 5. SAMI TV Promotional Banner (Hidden if user activated Ad-Free VIP mode!) */}
            {(!currentUser || !currentUser.adFreeEnabled) && (
              <PromotionalBanner />
            )}
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#06070a] flex justify-center text-[#f1f1f5]">
      {/* Responsive centered frame container: mobile-first max-w-md, expands to max-w-6xl for Admin on PC */}
      <div className={`w-full ${activeTab === 'admin' ? 'max-w-6xl' : 'max-w-md'} min-h-screen bg-[#0b0c10] border-x border-[#1a1c26] shadow-2xl flex flex-col relative transition-all duration-300`}>
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          isAdminTab={activeTab === 'admin'}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onGoLive={() => {
            setSelectedNews(null);
            setActiveTab('live');
          }}
          onGoHome={() => {
            setSelectedNews(null);
            setActiveTab('home');
            setActiveQuickMenuItem('latest');
          }}
        />

        {/* Dynamic Body Content */}
        <div className="flex-1">
          {renderMainContent()}
        </div>

        {/* Fixed Bottom Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Side Drawer Navigation Menu */}
        <DrawerMenu
          isOpen={isDrawerOpen}
          currentUser={currentUser}
          onClose={() => setIsDrawerOpen(false)}
          onSelectCategory={handleSelectCategoryFromDrawer}
          onNavigateTab={handleTabChange}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          newsList={newsList}
          onSelectNews={news => {
            setSelectedNews(news);
            setIsSearchOpen(false);
          }}
        />

        {/* User Account Login & VIP Registration Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          currentUser={currentUser}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={user => {
            setCurrentUser(user);
          }}
          onLogout={handleLogout}
        />

        {/* 5-Second Startup Loading & Voice Splash Screen */}
        {showSplashScreen && (
          <SplashScreen
            durationSeconds={5}
            onFinish={() => setShowSplashScreen(false)}
          />
        )}
      </div>
    </div>
  );
}
