import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, Check, ShoppingBag, Lock, RotateCw, ShieldCheck, Maximize2, X } from 'lucide-react';
import { VIP_PASSES, ARCHIVE_ITEMS } from '../data/diCaprioData';
import { VIPPass, ArchiveItem, CartItem, AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface MeetAndGreetStoreProps {
  aura: AuraTheme;
  onAddToCart: (item: CartItem) => void;
  onQuickCheckout: (item: CartItem) => void;
}

export const MeetAndGreetStore: React.FC<MeetAndGreetStoreProps> = ({
  aura,
  onAddToCart,
  onQuickCheckout
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [inspectCard, setInspectCard] = useState<VIPPass | null>(null);

  const themeConfig = THEME_AURAS[aura];

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    haptic.triggerClick('flip');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBuyPass = (pass: VIPPass, e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.triggerClick('success');
    const cartItem: CartItem = {
      id: pass.id,
      title: pass.title,
      price: pass.price,
      category: 'Meet & Greet VIP Pass',
      quantity: 1,
      tier: pass.tier,
      image: pass.image
    };
    onAddToCart(cartItem);
  };

  const handleBuyArchiveItem = (item: ArchiveItem) => {
    if (item.isSoldOut) return;
    haptic.triggerClick('success');
    const cartItem: CartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      quantity: 1
    };
    onAddToCart(cartItem);
  };

  return (
    <section id="vip-lounge" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Official VIP Store & Accreditation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
            OFFICIAL LEONARDO DICAPRIO
          </h2>
          <p className="text-sm font-cinzel text-amber-300/80 tracking-widest mt-1">
            EXCLUSIVE MEET & GREET EXPERIENCES
          </p>
        </div>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl font-light">
          Official brushed precious metal credentials for red carpet access, intimate roundtable symposiums, and private receptions with Leonardo DiCaprio. Click cards to flip and inspect embossed metal details.
        </p>
      </div>

      {/* 3D Flip & Spin VIP Cards Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {VIP_PASSES.map((pass) => {
          const isFlipped = !!flippedCards[pass.id];
          const isGold = pass.tier === 'Gold';
          const isSilver = pass.tier === 'Silver';
          const isPlatinum = pass.tier === 'Platinum';

          return (
            <div
              key={pass.id}
              className="perspective-1000 group cursor-pointer"
              onClick={() => toggleFlip(pass.id)}
            >
              {/* Card Container with 3D Flip */}
              <div
                className={`relative w-full h-[580px] rounded-3xl transition-transform duration-700 transform-style-3d shadow-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF VIP CARD */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border ${pass.colorScheme.border} glass-hologram holographic-foil overflow-hidden ${
                    isGold ? 'bg-gradient-to-b from-amber-950/40 via-stone-950 to-black' :
                    isSilver ? 'bg-gradient-to-b from-slate-900/50 via-stone-950 to-black' :
                    'bg-gradient-to-b from-blue-950/40 via-stone-950 to-black'
                  }`}
                  style={{
                    boxShadow: `0 0 35px ${pass.colorScheme.glow}`
                  }}
                >
                  {/* Top Badge & Tier */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest font-bold ${pass.colorScheme.badgeBg}`}>
                        {pass.badge}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            haptic.triggerClick('light');
                            setInspectCard(pass);
                          }}
                          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                          title="Zoom in to inspect engraved metal pass"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(pass.id, e)}
                          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                          title="Click to flip card"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className={`text-2xl font-cinzel font-bold ${
                          isGold ? 'text-amber-300' :
                          isSilver ? 'text-slate-100' :
                          'text-cyan-200'
                        }`}>
                          {pass.tier} Pass
                        </h3>
                        <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
                          {isGold ? 'Brushed 24K Gold Ingot Pass' :
                           isSilver ? 'Brushed Sterling Silver Pass' :
                           'Obsidian Platinum Hologram Pass'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                          ${pass.price.toLocaleString()}
                        </span>
                        <span className="block text-[10px] font-mono text-stone-400">USD / Pass</span>
                      </div>
                    </div>
                  </div>

                  {/* HIGH-RES CARD PHOTO DISPLAY (Gold in Gold section, Silver in Silver section) */}
                  <div className={`my-3 relative rounded-2xl overflow-hidden aspect-[4/3] border bg-black/80 shadow-2xl group/img ${
                    isGold ? 'border-amber-400/80 shadow-[0_0_25px_rgba(212,175,55,0.3)]' :
                    isSilver ? 'border-slate-300/80 shadow-[0_0_25px_rgba(200,210,230,0.3)]' :
                    'border-cyan-300/80 shadow-[0_0_25px_rgba(100,200,255,0.3)]'
                  }`}>
                    <img
                      src={pass.image}
                      alt={`${pass.tier} Exclusive Meet & Greet Pass`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Metallic glare overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                      <span className={isGold ? 'text-amber-300 font-bold' : isSilver ? 'text-slate-200 font-bold' : 'text-cyan-200 font-bold'}>
                        {isGold ? 'AUTHENTIC 24K GOLD PASS' : isSilver ? 'AUTHENTIC STERLING SILVER PASS' : 'PLATINUM CIPHER'}
                      </span>
                      <span className="text-stone-300 bg-black/60 px-2 py-0.5 rounded text-[9px]">
                        FLIP FOR REVERSE
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-1.5 text-xs text-stone-200">
                    {pass.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isGold ? 'text-amber-400' : isSilver ? 'text-slate-300' : 'text-cyan-300'
                        }`} />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                    <div className="text-[11px] text-amber-300/90 italic pt-1 border-t border-white/10 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{pass.exclusiveBonus}</span>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-stone-400">
                      {pass.availability}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleBuyPass(pass, e)}
                      className={`px-4 py-2.5 rounded-xl font-cinzel font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
                        isGold ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-amber-500/20' :
                        isSilver ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-black shadow-slate-400/20' :
                        'bg-gradient-to-r from-cyan-300 to-blue-500 text-black shadow-cyan-400/20'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Reserve {pass.tier}</span>
                    </button>
                  </div>
                </div>

                {/* BACK OF VIP CARD (Replicates reverse side with program details, magnetic strip & signature) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col justify-between border ${pass.colorScheme.border} bg-gradient-to-b from-[#0c0e14] via-[#08090d] to-black shadow-2xl overflow-hidden`}
                >
                  {/* Magnetic strip header */}
                  <div>
                    <div className="w-full h-10 bg-black border-y border-stone-800 -mx-6 mb-3 flex items-center px-6">
                      <div className="w-full h-4 bg-stone-900 border border-white/10 rounded-[2px]" />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono text-stone-400 mb-3">
                      <span>GREETING & PROGRAM DETAILS</span>
                      <span className="text-amber-300 font-bold">PASS ID: VIP-7890-LD-26</span>
                    </div>

                    {/* Back Photo Display if available */}
                    {pass.backImage && (
                      <div className="mb-3 rounded-xl overflow-hidden aspect-[16/9] border border-white/10 bg-black/60">
                        <img
                          src={pass.backImage}
                          alt="Card Reverse Details & Signature"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 text-[11px] text-stone-300 font-mono">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-stone-500">Program:</span>
                        <span className="text-white">Discussion Panel & Screening</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-stone-500">Access:</span>
                        <span className="text-emerald-400">Photo Op & Charity Spotlight</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Signatory:</span>
                        <span className="text-amber-300 font-editorial italic text-sm">L. DiCaprio (Event Chair)</span>
                      </div>
                    </div>
                  </div>

                  {/* Flip back button & action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip(pass.id, e)}
                      className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Flip to Front</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleBuyPass(pass, e)}
                      className="px-4 py-2 rounded-xl bg-amber-400 text-black font-cinzel font-bold text-xs transition-transform hover:scale-105"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Resolution Card Inspection Lightbox Modal */}
      <AnimatePresence>
        {inspectCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectCard(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full z-10 glass-hologram rounded-3xl overflow-hidden border border-amber-400/50 shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => {
                  haptic.triggerClick('light');
                  setInspectCard(null);
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors z-20"
                aria-label="Close card inspection"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                  OFFICIAL LEONARDO DICAPRIO · ATELIER INSPECTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                  {inspectCard.tier} Pass Detailed Engraving
                </h3>
              </div>

              {/* Large high-res image of the card */}
              <div className="rounded-2xl overflow-hidden border border-white/20 aspect-[3/4] max-h-[460px] mx-auto shadow-2xl bg-black">
                <img
                  src={inspectCard.image}
                  alt={`${inspectCard.tier} Full Inspection`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-mono text-stone-300 border-t border-white/10 pt-4">
                <span>Brushed Precious Alloy · 24K Gold / Sterling Silver</span>
                <button
                  type="button"
                  onClick={(e) => {
                    handleBuyPass(inspectCard, e);
                    setInspectCard(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-cinzel font-bold text-xs"
                >
                  Acquire This Pass (${inspectCard.price.toLocaleString()})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rare Collectibles & Sold Out Museum Relics Section */}
      <div className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              Historic Memorabilia & Apparel
            </div>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
              Archive Relics & Certified Rarities
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md">
            Rare cinema artifacts, authentic signed manuscripts, screen-worn wardrobe, and limited horology editions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl p-6 glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-stone-400">
                    {item.year} · {item.category}
                  </span>
                  {item.isSoldOut ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Sold Out / Vault
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Available to Acquire
                    </span>
                  )}
                </div>

                <h4 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-stone-400">
                  <span className="text-stone-500">Provenance:</span> {item.provenance}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-stone-400 block">Valuation</span>
                  <span className="text-xl font-mono font-bold text-white tabular-nums">
                    ${item.price.toLocaleString()}
                  </span>
                </div>

                {item.isSoldOut ? (
                  <button
                    disabled
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-stone-500 text-xs font-mono cursor-not-allowed"
                  >
                    Archived in Vault
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuyArchiveItem(item)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-cinzel font-bold text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire Relic</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
