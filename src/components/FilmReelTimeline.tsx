import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, ChevronLeft, ChevronRight, Play, Pause, Quote, Clapperboard, DollarSign } from 'lucide-react';
import { TIMELINE_FILMS } from '../data/diCaprioData';
import { AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface FilmReelTimelineProps {
  aura: AuraTheme;
  reducedMotion: boolean;
}

export const FilmReelTimeline: React.FC<FilmReelTimelineProps> = ({ aura, reducedMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // default to Titanic
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [spoolRotation, setSpoolRotation] = useState(0);

  const currentFilm = TIMELINE_FILMS[currentIndex];
  const themeConfig = THEME_AURAS[aura];

  useEffect(() => {
    if (!isPlayingReel || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TIMELINE_FILMS.length);
      setSpoolRotation((prev) => prev + 45);
      haptic.triggerClick('film');
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlayingReel, reducedMotion]);

  const handleNext = () => {
    haptic.triggerClick('film');
    setCurrentIndex((prev) => (prev + 1) % TIMELINE_FILMS.length);
    setSpoolRotation((prev) => prev + 45);
  };

  const handlePrev = () => {
    haptic.triggerClick('film');
    setCurrentIndex((prev) => (prev - 1 + TIMELINE_FILMS.length) % TIMELINE_FILMS.length);
    setSpoolRotation((prev) => prev - 45);
  };

  const handleSelect = (idx: number) => {
    haptic.triggerClick('film');
    setCurrentIndex(idx);
    setSpoolRotation((prev) => prev + (idx - currentIndex) * 45);
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <Film className="w-4 h-4 text-amber-400" />
            <span>35mm Celluloid Chronicle</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
            The Film Reel Archive
          </h2>
        </div>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl font-light">
          Experience Leonardo's landmark filmography through a rotating, motorized 35mm film reel projector system spanning over three decades of cinema history.
        </p>
      </div>

      {/* Rotating Film Spool & Projector Console */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 mb-12 shadow-2xl relative overflow-hidden">
        {/* Background Film Sprocket Border Top & Bottom */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-black/80 flex items-center justify-around overflow-hidden border-b border-white/10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2 rounded-[2px] bg-stone-900 border border-white/20 shrink-0 mx-1.5" />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/80 flex items-center justify-around overflow-hidden border-t border-white/10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2 rounded-[2px] bg-stone-900 border border-white/20 shrink-0 mx-1.5" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-4">
          {/* Left: The Rotating Film Reel Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center select-none">
              {/* Outer Spool Rim */}
              <div
                className="w-full h-full rounded-full border-8 border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-black shadow-2xl relative flex items-center justify-center transition-transform duration-500"
                style={{
                  transform: `rotate(${spoolRotation}deg)`
                }}
              >
                {/* Spool Spokes */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-500/40" />
                <div className="absolute w-full h-1 bg-stone-700/60 top-1/2 -translate-y-1/2" />
                <div className="absolute h-full w-1 bg-stone-700/60 left-1/2 -translate-x-1/2" />
                <div className="absolute w-full h-1 bg-stone-700/60 top-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute w-full h-1 bg-stone-700/60 top-1/2 -translate-y-1/2 -rotate-45" />

                {/* 35mm Celluloid Winding */}
                <div className="absolute inset-8 rounded-full border-4 border-amber-900/60 bg-amber-950/20" />

                {/* Center Hub */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-4 border-stone-900 shadow-xl flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-black border-2 border-stone-800" />
                </div>
              </div>

              {/* Holographic light indicator */}
              <div className="absolute -top-2 px-3 py-1 rounded-full bg-black/90 border border-amber-400/60 text-[10px] font-mono text-amber-300 shadow-lg">
                FRAME {currentIndex + 1} / {TIMELINE_FILMS.length}
              </div>
            </div>

            {/* Reel Playback Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors"
                aria-label="Previous reel frame"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  setIsPlayingReel(!isPlayingReel);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2 border transition-all ${
                  isPlayingReel
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:text-white'
                }`}
              >
                {isPlayingReel ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
                <span>{isPlayingReel ? 'Motor Running' : 'Auto Reel Spin'}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors"
                aria-label="Next reel frame"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Selected Film Presentation Slate */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFilm.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                    RELEASE YEAR: {currentFilm.year}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-300">Directed by {currentFilm.director}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-white tracking-wide">
                  {currentFilm.title}
                </h3>

                {/* Role & Box office strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-white/10">
                  <div>
                    <span className="block text-[11px] font-mono text-stone-500 uppercase">DiCaprio's Role</span>
                    <span className="text-sm font-semibold text-stone-100">{currentFilm.role}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-stone-500 uppercase">Worldwide Gross</span>
                    <span className="text-sm font-semibold text-amber-300 tabular-nums font-mono">{currentFilm.boxOffice}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-[11px] font-mono text-stone-500 uppercase">Honors</span>
                    <span className="text-xs text-stone-200 line-clamp-1">{currentFilm.accolades}</span>
                  </div>
                </div>

                {/* Synopsis */}
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {currentFilm.synopsis}
                </p>

                {/* Iconic Quotation */}
                <div className="relative p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-stone-900/40 to-transparent border-l-2 border-amber-400 italic text-stone-200 font-editorial text-lg sm:text-xl">
                  <Quote className="w-5 h-5 text-amber-400/60 inline mr-2" />
                  "{currentFilm.quote}"
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Film Reel Scrubber Ribbon */}
      <div className="relative">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
          {TIMELINE_FILMS.map((film, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={film.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`flex-shrink-0 text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer w-48 ${
                  isSelected
                    ? 'glass-hologram border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-stone-900/60 border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isSelected ? 'text-amber-300 font-bold' : 'text-stone-400'}>
                    {film.year}
                  </span>
                  <Clapperboard className="w-3 h-3 text-stone-500" />
                </div>
                <h4 className="font-cinzel text-xs font-semibold text-white truncate">
                  {film.title}
                </h4>
                <p className="text-[11px] text-stone-400 truncate mt-0.5">
                  as {film.role}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
