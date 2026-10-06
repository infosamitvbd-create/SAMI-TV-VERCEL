import React, { useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';

interface SamiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  showSlogan?: boolean;
  sloganText?: string;
  className?: string;
  onClick?: () => void;
}

export const SamiLogo: React.FC<SamiLogoProps> = ({
  size = 'md',
  showText = true,
  showSlogan = true,
  sloganText,
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  const getIconDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10 rounded-xl';
      case 'lg':
        return 'w-20 h-20 rounded-2xl';
      case 'xl':
        return 'w-28 h-28 rounded-3xl';
      case '2xl':
        return 'w-36 h-36 rounded-3xl';
      case 'md':
      default:
        return 'w-12 h-12 rounded-xl';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer select-none active:scale-98 transition-transform' : ''} ${className}`}
    >
      {/* Official Main SAMI TV Logo Emblem */}
      <div
        className={`${getIconDimensions()} relative overflow-hidden shadow-lg select-none flex-shrink-0 bg-[#0c0e15] border border-white/15 flex items-center justify-center`}
      >
        {!imgError && APP_CONFIG.logoUrl ? (
          <img
            src={APP_CONFIG.logoUrl}
            alt="SAMI TV Official Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300"
          />
        ) : (
          /* Fallback styled emblem */
          <div className="w-full h-full bg-gradient-to-b from-[#ff2e3a] via-[#e50914] to-[#a8050e] p-1 flex flex-col items-center justify-between">
            <div className="w-full flex-1 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow-md fill-white">
                <path d="M 28,26 C 28,15 72,15 72,26 C 72,37 32,40 32,54 C 32,68 72,65 72,76 C 72,87 26,87 26,76 L 39,76 C 39,79 59,79 59,76 C 59,70 19,67 19,54 C 19,41 59,44 59,26 C 59,21 39,21 39,26 Z" />
              </svg>
            </div>
            <div className="w-full bg-[#005570] rounded-sm py-0.5 flex items-center justify-center border border-teal-300/40">
              <span className="text-[7.5px] sm:text-[8.5px] font-black text-white tracking-wider leading-none">
                SAMI TV
              </span>
            </div>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col justify-center select-none text-left">
          <h1 className="text-base sm:text-lg font-black tracking-wider text-white leading-tight font-sans">
            SAMI TV
          </h1>
          {showSlogan && (sloganText || APP_CONFIG.slogan) && (
            <p className="text-[10px] sm:text-[11px] font-semibold text-red-400/90 tracking-normal leading-tight mt-0.5 whitespace-nowrap">
              {sloganText || APP_CONFIG.slogan}
            </p>
          )}
        </div>
      )}
    </div>
  );
};


