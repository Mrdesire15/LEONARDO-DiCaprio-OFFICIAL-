import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Volume2, VolumeX, Eye, Share2, Menu, X } from 'lucide-react';
import { AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface NavigationProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSocials: () => void;
  currentAura: AuraTheme;
  onChangeAura: (aura: AuraTheme) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount,
  onOpenCart,
  onOpenSocials,
  currentAura,
  onChangeAura,
  reducedMotion,
  onToggleReducedMotion,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundEnabled(haptic.isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = haptic.toggleSound();
    setSoundEnabled(newState);
    haptic.triggerClick('light');
  };

  const navLinks = [
    { label: 'Orbital View', href: '#orbital' },
    { label: 'Biography', href: '#biography' },
    { label: 'Film Reel', href: '#timeline' },
    { label: 'Awards Gallery', href: '#awards' },
    { label: 'VIP Lounge', href: '#vip-lounge' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl border-b border-amber-500/20 py-3.5'
            : 'bg-gradient-to-b from-[#050608]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-8 */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand wordmark in display face */}
            <a
              href="#orbital"
              onClick={() => haptic.triggerClick('light')}
              className="group flex items-center gap-2.5 text-base sm:text-lg font-bold font-cinzel tracking-widest text-[#F5F2EB] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              <span>OFFICIAL LEONARDO DICAPRIO</span>
            </a>

            {/* Zone 2: 4-5 single-line clean text links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => haptic.triggerClick('light')}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                      isActive
                        ? 'text-amber-300 font-semibold'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action button */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Primary Cart / Boutique Action */}
              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('medium');
                  onOpenCart();
                }}
                className="relative px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-white text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span className="font-cinzel">Boutique Cart</span>
                {cartCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[11px] font-mono font-bold bg-amber-400 text-black rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 py-4 glass-panel border-t border-amber-500/20 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  haptic.triggerClick('light');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-amber-500/10 hover:text-amber-300 font-cinzel"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Floating Auxiliary Utility Bar (Theme, Haptic, Reduce Motion, Holographic Socials) */}
      <aside aria-label="Experience controls" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full glass-panel-subtle border border-amber-500/30 shadow-2xl backdrop-blur-xl">
        {/* Holographic Social Pop-up Trigger */}
        <button
          type="button"
          onClick={() => {
            haptic.triggerClick('flip');
            onOpenSocials();
          }}
          title="Open Official Holographic Socials"
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-600/20 border border-amber-400/40 text-amber-300 hover:text-white text-xs font-mono flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Socials</span>
        </button>

        {/* Aura Color Theme Selector */}
        <div className="flex items-center gap-1 px-1.5 border-l border-r border-white/10">
          {(Object.keys(THEME_AURAS) as AuraTheme[]).map((themeKey) => {
            const isSelected = currentAura === themeKey;
            const themeConfig = THEME_AURAS[themeKey];
            return (
              <button
                key={themeKey}
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  onChangeAura(themeKey);
                }}
                title={`Switch Aura: ${themeConfig.name}`}
                className={`w-4 h-4 rounded-full transition-transform ${
                  isSelected ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: themeConfig.primary }}
              />
            );
          })}
        </div>

        {/* Reduce Motion Toggle */}
        <button
          type="button"
          onClick={() => {
            haptic.triggerClick('light');
            onToggleReducedMotion();
          }}
          title={reducedMotion ? 'Enable Fluid Motion' : 'Reduce Motion'}
          className={`p-1.5 rounded-full text-xs transition-colors ${
            reducedMotion ? 'bg-amber-400/30 text-amber-300' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Haptic / Sound Toggle */}
        <button
          type="button"
          onClick={handleSoundToggle}
          title={soundEnabled ? 'Mute Tactile Audio' : 'Enable Tactile Audio'}
          className={`p-1.5 rounded-full text-xs transition-colors ${
            soundEnabled ? 'text-amber-300' : 'text-stone-500'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
};
