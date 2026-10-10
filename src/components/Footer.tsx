import React from 'react';
import { Globe, ArrowUp, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { haptic } from '../utils/haptics';

interface FooterProps {
  onOpenSocials: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSocials }) => {
  const scrollToTop = () => {
    haptic.triggerClick('light');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-amber-500/20 bg-[#040507] text-stone-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-white">
                OFFICIAL LEONARDO DICAPRIO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              An indelible legacy of artistic integrity, cinematic fearlessness, and relentless global stewardship for our living biosphere.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('flip');
                  onOpenSocials();
                }}
                className="px-3 py-1.5 rounded-xl glass-hologram border border-amber-400/50 text-amber-300 hover:text-white text-xs font-mono flex items-center gap-2 shadow-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Launch Holographic Socials</span>
              </button>
            </div>
          </div>

          {/* Quick Curated Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-200">
              The Archives
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#orbital" className="hover:text-amber-300 transition-colors">
                  Orbital Galaxy View
                </a>
              </li>
              <li>
                <a href="#biography" className="hover:text-amber-300 transition-colors">
                  360° Photo Monograph
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-amber-300 transition-colors">
                  35mm Film Reel Timeline
                </a>
              </li>
              <li>
                <a href="#awards" className="hover:text-amber-300 transition-colors">
                  Pantheon of Trophies
                </a>
              </li>
              <li>
                <a href="#vip-lounge" className="hover:text-amber-300 transition-colors">
                  VIP Passes & Archive Vault
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels direct */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-200">
              Authenticated Portals
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://www.instagram.com/leonardodicaprio?stkn=MXJlMTM1ZmFsczNtbw=="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.triggerClick('light')}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-300 transition-colors border border-white/5"
              >
                <span>Instagram Archive</span>
                <span className="text-[10px] text-stone-500">@leonardodicaprio</span>
              </a>
              <a
                href="https://www.facebook.com/share/1CNbFN6kjs/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.triggerClick('light')}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-300 transition-colors border border-white/5"
              >
                <span>Facebook Broadcast</span>
                <span className="text-[10px] text-stone-500">Official Community</span>
              </a>
              <a
                href="https://t.me/leonardodicap1974"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.triggerClick('light')}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-amber-300 transition-colors border border-white/5"
              >
                <span>Telegram VIP Dispatch</span>
                <span className="text-[10px] text-stone-500">@leonardodicap1974</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Honoring cinema history & global environmental stewardship. All rights reserved.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
