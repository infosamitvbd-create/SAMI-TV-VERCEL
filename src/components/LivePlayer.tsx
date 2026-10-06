import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Loader2,
  Tv,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface LivePlayerProps {
  streamUrl?: string;
  isMiniPlayer?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  className?: string;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({
  streamUrl = APP_CONFIG.streamUrl,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Browser autoplay policy requires mute initially
  const [volume, setVolume] = useState<number>(0.8);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [quality, setQuality] = useState<string>('Auto');
  const [isCCActive, setIsCCActive] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowQualityMenu(false);
      }
    }, 2500);
  };

  const handleUserActivity = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };

  // Initialize HLS stream if streamUrl is present
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!streamUrl || streamUrl.trim() === '') {
      setIsLoading(false);
      setStreamError(false);
      setIsPlaying(false);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      return;
    }

    setIsLoading(true);
    setStreamError(false);

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        setStreamError(false);
        video.play().then(() => {
          setIsPlaying(true);
          hideControlsAfterDelay();
        }).catch(() => {
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setStreamError(true);
              setIsLoading(false);
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().then(() => {
          setIsPlaying(true);
          hideControlsAfterDelay();
        }).catch(() => setIsPlaying(false));
      });
      video.addEventListener('error', () => {
        setStreamError(true);
        setIsLoading(false);
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [streamUrl]);

  // Handle Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        hideControlsAfterDelay();
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  // Handle Volume / Mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = volume > 0 ? volume : 0.8;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleRetry = () => {
    if (!streamUrl) return;
    setStreamError(false);
    setIsLoading(true);
    const video = videoRef.current;
    if (!video) return;
    if (hlsRef.current) {
      hlsRef.current.loadSource(streamUrl);
      hlsRef.current.attachMedia(video);
    } else {
      video.src = streamUrl;
      video.load();
    }
  };

  return (
    <div
      id="sami-live-player-container"
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      onClick={() => {
        if (!showControls) {
          setShowControls(true);
          hideControlsAfterDelay();
        }
      }}
      className={`relative w-full overflow-hidden bg-black select-none group ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen rounded-none'
          : 'rounded-2xl border border-[#1b1f2e] shadow-2xl shadow-black aspect-video'
      } ${className}`}
    >
      {/* Clean Native Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        playsInline
        autoPlay
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Standby / Off-Air Screen when no stream URL is configured */}
      {!streamUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#10131d] via-[#090b11] to-[#040508] z-10 p-4 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-500 mb-2.5 shadow-lg shadow-red-950/30">
            <Tv className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-white mb-1">
            লাইভ সম্প্রচার বর্তমানে অফ-এয়ার রয়েছে
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 max-w-xs">
            নতুন লাইভ স্ট্রিমিং লিঙ্ক যুক্ত করার পর সম্প্রচার স্বয়ংক্রিয়ভাবে শুরু হবে।
          </p>
        </div>
      )}

      {/* Loading Spinner Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 pointer-events-none">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-2" />
          <span className="text-xs font-semibold text-gray-200">লাইভ স্ট্রিম লোড হচ্ছে...</span>
        </div>
      )}

      {/* Stream Error Overlay */}
      {streamError && streamUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 z-25 p-4 text-center">
          <p className="text-xs text-red-400 font-bold mb-2">লাইভ সম্প্রচার লোড করতে সাময়িক সমস্যা হচ্ছে</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>পুনরায় চেষ্টা করুন</span>
          </button>
        </div>
      )}

      {/* Top Overlay Controls (Auto-hides) */}
      {streamUrl && (
        <div
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-2 z-30 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Quality Badge */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQualityMenu(!showQualityMenu);
              }}
              className="flex items-center gap-1 bg-black/80 backdrop-blur-xs hover:bg-black text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/25 transition-colors shadow-lg"
            >
              <span>{quality}</span>
            </button>

            {/* Quality menu selector */}
            {showQualityMenu && (
              <div className="absolute right-0 top-full mt-1 w-20 bg-[#10131d] border border-[#272c3d] rounded-md shadow-2xl py-1 z-40 text-[11px] text-gray-200">
                {['1080p', '720p', '480p', 'Auto'].map(q => (
                  <button
                    key={q}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuality(q);
                      setShowQualityMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1 hover:bg-red-600 hover:text-white transition-colors ${
                      quality === q ? 'text-red-500 font-bold bg-white/5' : ''
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 sm:p-3 pt-6 z-30 transition-opacity duration-300 ${
          showControls || !isPlaying || !streamUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Left Controls: Pause/Play icon + Red Dot + LIVE text */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? 'Pause stream' : 'Play stream'}
              disabled={!streamUrl}
              className="text-white hover:text-red-400 disabled:text-gray-500 p-1 transition-colors focus:outline-none"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none" />
              )}
            </button>

            {/* LIVE text & status indicator */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white tracking-wider">
              <span className={`w-2 h-2 rounded-full ${streamUrl && isPlaying ? 'bg-[#e50914] animate-pulse' : 'bg-gray-500'}`} />
              <span>{streamUrl && isPlaying ? 'LIVE' : 'STANDBY'}</span>
            </div>
          </div>

          {/* Center: Progress Line */}
          <div className="flex-1 mx-2 relative h-1 bg-gray-700/80 rounded-full cursor-pointer flex items-center">
            <div className={`absolute left-0 top-0 bottom-0 ${streamUrl ? 'bg-[#e50914]' : 'bg-gray-600'} rounded-full w-[100%]`}>
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 ${streamUrl ? 'bg-[#e50914]' : 'bg-gray-500'} border border-white rounded-full shadow-md`} />
            </div>
          </div>

          {/* Right Controls: Volume & Fullscreen */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Volume Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-white hover:text-red-400 p-1 transition-colors focus:outline-none"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              )}
            </button>

            {/* CC Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCCActive(!isCCActive);
              }}
              aria-label="Closed captions"
              className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded border transition-colors ${
                isCCActive
                  ? 'border-red-500 bg-red-600 text-white'
                  : 'border-white/40 text-white hover:border-white'
              }`}
            >
              CC
            </button>

            {/* Fullscreen Expand Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="text-white hover:text-red-400 p-1 transition-colors focus:outline-none"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
