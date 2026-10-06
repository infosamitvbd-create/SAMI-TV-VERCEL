import React from 'react';
import { Menu, Search, User, Crown, Sparkles } from 'lucide-react';
import { SamiLogo } from './SamiLogo';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser?: UserProfile | null;
  isAdminTab?: boolean;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onGoLive?: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  isAdminTab,
  onOpenMenu,
  onOpenSearch,
  onOpenAuth,
  onGoHome,
}) => {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-[#000000] border-b border-[#14161f] px-3.5 py-2.5 transition-all select-none"
    >
      <div className={`w-full ${isAdminTab ? 'max-w-6xl' : 'max-w-md'} mx-auto flex items-center justify-between gap-2 transition-all`}>
        {/* Left Side: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="hamburger-menu-btn"
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="p-1 -ml-1 text-white hover:text-red-400 active:scale-95 rounded-lg transition-colors focus:outline-none"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* SAMI TV Brand Logo & Slogan */}
          <button
            id="header-brand-btn"
            onClick={onGoHome}
            className="text-left focus:outline-none rounded-md"
          >
            <SamiLogo size="sm" showText={true} />
          </button>
        </div>

        {/* Right Side: Account (if logged in) & Search */}
        <div className="flex items-center gap-1.5">
          {/* User Account if logged in */}
          {currentUser && (
            <button
              id="header-user-btn"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#1e1422] to-[#121422] border border-amber-400/40 hover:border-amber-400 px-2.5 py-1 rounded-full text-xs text-amber-300 font-bold transition-all shadow-sm active:scale-95"
              title="VIP Profile"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="max-w-[70px] truncate text-[11px]">
                {currentUser.displayName.split(' ')[0]}
              </span>
            </button>
          )}

          {/* Search Icon */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            aria-label="Search News"
            className="p-2 text-white hover:text-red-400 active:scale-95 rounded-full hover:bg-white/5 transition-all focus:outline-none"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};

