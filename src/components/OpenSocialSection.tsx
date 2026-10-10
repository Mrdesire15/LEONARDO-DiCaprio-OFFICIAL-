import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { OPEN_SOCIAL_HANDLES } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

export const OpenSocialSection: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.triggerClick('light');
    navigator.clipboard.writeText(text);
    setCopiedHandle(text);
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  const handleOpen = (url: string) => {
    haptic.triggerClick('medium');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      <div className="glass-hologram holographic-card rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Channels · Open Broadcast Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-white tracking-wide">
              OFFICIAL LEONARDO DICAPRIO
            </h2>
            <p className="text-xs sm:text-sm font-mono text-amber-300 tracking-wider mt-1">
              AUTHENTICATED SOCIAL COMMUNICATIONS & DISPATCHES
            </p>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md font-light">
            Follow and verify all official dispatches across Instagram, Facebook, and Telegram directly.
          </p>
        </div>

        {/* 3 Large Bold Open Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {OPEN_SOCIAL_HANDLES.map((item) => {
            const isCopied = copiedHandle === item.handle;
            return (
              <div
                key={item.platform}
                onClick={() => handleOpen(item.url)}
                className="group relative rounded-2xl p-6 bg-gradient-to-b from-stone-900/90 via-black to-stone-950 border border-white/10 hover:border-amber-400/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                {/* Accent border strip */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div>
                  {/* Top: Platform & Verification */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-400 group-hover:text-amber-300 transition-colors">
                      {item.platform}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {item.status}
                    </span>
                  </div>

                  {/* BOLD HANDLE DISPLAY */}
                  <div className="space-y-1 mb-4">
                    <div className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white group-hover:text-amber-200 transition-colors break-words">
                      {item.handle}
                    </div>
                    <div className="text-xs font-mono text-amber-400 font-semibold tabular-nums">
                      {item.followers}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Actions Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(item.handle, e)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Handle</span>
                      </>
                    )}
                  </button>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 group-hover:from-amber-300 group-hover:to-yellow-500 text-black font-cinzel font-bold text-xs shadow-md group-hover:scale-105 transition-all">
                    <span>Open Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
