import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Copy, Check, Sparkles, X, Globe } from 'lucide-react';
import { haptic } from '../utils/haptics';

interface HolographicSocialPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocialLink {
  name: string;
  url: string;
  handle: string;
  platform: 'instagram' | 'facebook' | 'telegram';
  description: string;
  accent: string;
  gradient: string;
  badge: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram Official',
    url: 'https://www.instagram.com/leonardodicaprio?stkn=MXJlMTM1ZmFsczNtbw==',
    handle: '@leonardodicaprio',
    platform: 'instagram',
    description: 'Official environmental reports, film photography, and biodiversity dispatches.',
    accent: '#E1306C',
    gradient: 'from-pink-500/20 via-purple-600/15 to-amber-500/15',
    badge: '61M+ Community'
  },
  {
    name: 'Facebook Community',
    url: 'https://www.facebook.com/share/1CNbFN6kjs/',
    handle: 'Leonardo DiCaprio Official',
    platform: 'facebook',
    description: 'Earth Alliance campaigns, global documentary premieres, and humanitarian updates.',
    accent: '#1877F2',
    gradient: 'from-blue-600/20 via-indigo-600/15 to-cyan-500/15',
    badge: 'Verified Page'
  },
  {
    name: 'Telegram VIP Channel',
    url: 'https://t.me/leonardodicap1974',
    handle: '@leonardodicap1974',
    platform: 'telegram',
    description: 'Direct priority communications, behind-the-scenes alerts, and private announcements.',
    accent: '#0088CC',
    gradient: 'from-sky-400/20 via-cyan-600/15 to-blue-600/15',
    badge: 'Direct Channel'
  }
];

export const HolographicSocialPopup: React.FC<HolographicSocialPopupProps> = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.triggerClick('light');
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2200);
  };

  const handleOpenLink = (url: string) => {
    haptic.triggerClick('medium');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
            aria-hidden="true"
          />

          {/* Holographic Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl z-10 glass-hologram holographic-card holographic-foil rounded-2xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden border border-amber-400/40"
          >
            {/* Header Accent Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-400/20 to-transparent blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => {
                haptic.triggerClick('light');
                onClose();
              }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 text-stone-300 hover:text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dialog Header */}
            <div className="text-center mb-7 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Holographic Transmissions
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
                Verified Official Network
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto">
                Connect directly across Leonardo DiCaprio’s authenticated communication hubs and archival broadcasts.
              </p>
            </div>

            {/* Social Cards Grid */}
            <div className="space-y-3.5 relative z-10">
              {SOCIAL_LINKS.map((item) => {
                const isCopied = copiedUrl === item.url;
                return (
                  <div
                    key={item.platform}
                    onClick={() => handleOpenLink(item.url)}
                    className="group relative p-4 rounded-xl bg-gradient-to-r from-stone-900/80 via-black/90 to-stone-900/80 border border-white/10 hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Prismatic edge sheen */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 10% 50%, ${item.accent}22, transparent 60%)`
                      }}
                    />

                    <div className="flex items-start sm:items-center gap-3.5 z-10">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: `${item.accent}18` }}
                      >
                        <Globe className="w-5 h-5" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-stone-300 font-mono">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 font-mono mt-0.5">
                          {item.handle}
                        </p>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0 z-10">
                      <button
                        type="button"
                        onClick={(e) => handleCopy(item.url, e)}
                        title="Copy official link"
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-xs">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </button>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 group-hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-medium transition-all group-hover:translate-x-0.5">
                        <span>Visit</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Authenticated Feeds
              </span>
              <span className="font-mono text-stone-500">Official Channels</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
