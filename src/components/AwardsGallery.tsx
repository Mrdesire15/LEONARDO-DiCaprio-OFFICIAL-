import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Trophy, Globe, Shield, Star, Sparkles, Play, Pause } from 'lucide-react';
import { AWARDS_LIST } from '../data/diCaprioData';
import { AwardItem, AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface AwardsGalleryProps {
  aura: AuraTheme;
  reducedMotion: boolean;
}

export const AwardsGallery: React.FC<AwardsGalleryProps> = ({ aura, reducedMotion }) => {
  const [selectedAward, setSelectedAward] = useState<AwardItem>(AWARDS_LIST[0]);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isOrbiting, setIsOrbiting] = useState(!reducedMotion);

  const themeConfig = THEME_AURAS[aura];

  useEffect(() => {
    if (!isOrbiting || reducedMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      setOrbitAngle((prev) => (prev + dt * 20) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isOrbiting, reducedMotion]);

  // Medals around Oscar
  const orbitingMedals = AWARDS_LIST.slice(0, 6);

  return (
    <section id="awards" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Honors & Global Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
            The Pantheon of Trophies
          </h2>
        </div>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl font-light">
          Academy Awards, Golden Globes, BAFTAs, and United Nations commendations revolving around the definitive 2016 Oscar statuette.
        </p>
      </div>

      {/* Orbiting Medals & Oscar Stage */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 mb-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Medal Orbit Arena */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center my-4">
              
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/30 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-stone-800 pointer-events-none" />
              
              {/* Central Golden Oscar Trophy */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-amber-900/60 via-black to-stone-900 border-2 border-amber-400/80 shadow-[0_0_40px_rgba(212,175,55,0.4)] flex items-center justify-center group cursor-pointer"
                onClick={() => {
                  haptic.triggerClick('success');
                  setSelectedAward(AWARDS_LIST[0]);
                }}
              >
                <img
                  src="/src/assets/images/leo_oscar_trophy_1791625412811.jpg"
                  alt="Oscar Academy Award"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 text-[10px] font-cinzel font-bold text-amber-300 tracking-wider">
                  OSCAR WINNER
                </span>
              </div>

              {/* Orbiting Medals */}
              {orbitingMedals.map((item, idx) => {
                const angle = (orbitAngle + (360 / orbitingMedals.length) * idx) * (Math.PI / 180);
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 115 : 155;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * (radius * 0.75); // elliptical perspective

                const isCurrent = selectedAward.id === item.id;

                return (
                  <div
                    key={item.id}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        haptic.triggerClick('medium');
                        setSelectedAward(item);
                      }}
                      className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
                        isCurrent
                          ? 'bg-amber-400 text-black scale-125 ring-2 ring-white shadow-[0_0_20px_rgba(212,175,55,0.8)]'
                          : 'bg-stone-900/90 text-amber-300 border border-amber-400/50 hover:scale-110 hover:border-amber-300'
                      }`}
                      title={item.title}
                    >
                      {item.iconType === 'oscar' && <Trophy className="w-5 h-5" />}
                      {item.iconType === 'globe' && <Globe className="w-5 h-5" />}
                      {item.iconType === 'bafta' && <Award className="w-5 h-5" />}
                      {item.iconType === 'sag' && <Shield className="w-5 h-5" />}
                      {item.iconType === 'bear' && <Star className="w-5 h-5" />}
                      {item.iconType === 'peace' && <Sparkles className="w-5 h-5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Orbit Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  setIsOrbiting(!isOrbiting);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-stone-300 flex items-center gap-2"
              >
                {isOrbiting ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isOrbiting ? 'Pause Medals Orbit' : 'Resume Medals Orbit'}</span>
              </button>
            </div>
          </div>

          {/* Right: Selected Award Detail Plaque */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAward.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="glass-hologram holographic-card rounded-2xl p-6 sm:p-8 border border-amber-400/40 shadow-2xl relative space-y-5"
              >
                {/* Plaque Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 block tracking-widest uppercase">
                        {selectedAward.institution}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                        {selectedAward.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {selectedAward.year}
                  </span>
                </div>

                {/* Category & Project */}
                <div className="space-y-1">
                  <span className="text-xs font-mono text-stone-400 uppercase">Awarded Category</span>
                  <p className="text-base font-semibold text-stone-100">
                    {selectedAward.category}
                  </p>
                  <p className="text-xs text-amber-300 font-mono">
                    Project: <span className="text-white font-bold">{selectedAward.project}</span>
                  </p>
                </div>

                {/* Narrative Citation */}
                <p className="text-stone-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                  {selectedAward.description}
                </p>

                {/* Archival seal */}
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-3 border-t border-white/5">
                  <span>RECORD ID: {selectedAward.id.toUpperCase()}</span>
                  <span className="text-amber-400/80">AUTHENTICATED TROPHY VAULT</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Complete Historical Honors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AWARDS_LIST.map((award) => {
          const isSelected = selectedAward.id === award.id;
          return (
            <div
              key={award.id}
              onClick={() => {
                haptic.triggerClick('light');
                setSelectedAward(award);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-400/10 border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-stone-900/50 border-white/10 hover:border-amber-400/40 hover:bg-stone-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold">{award.year}</span>
                <span className="text-stone-500 text-[10px] truncate max-w-[120px]">{award.institution}</span>
              </div>
              <h4 className="font-cinzel text-sm font-semibold text-white line-clamp-1">
                {award.title}
              </h4>
              <p className="text-xs text-stone-400 truncate mt-1">
                {award.project}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
