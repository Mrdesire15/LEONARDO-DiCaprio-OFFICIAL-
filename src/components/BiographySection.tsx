import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Maximize2, X, Compass, Globe, Sparkles, Sliders } from 'lucide-react';
import { PHOTO_ARCHIVES } from '../data/diCaprioData';
import { PhotoArchiveItem, AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface BiographySectionProps {
  aura: AuraTheme;
  reducedMotion: boolean;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ aura, reducedMotion }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoArchiveItem | null>(null);
  const [activeEra, setActiveEra] = useState<string>('all');
  
  // 360 Photo Spinner Interactive State
  const [spinDegree, setSpinDegree] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(!reducedMotion);
  const spinnerContainerRef = useRef<HTMLDivElement | null>(null);

  const themeConfig = THEME_AURAS[aura];

  // Auto-rotate effect when enabled
  useEffect(() => {
    if (!autoRotate || isDragging || reducedMotion) return;

    const interval = setInterval(() => {
      setSpinDegree((prev) => (prev + 1) % 360);
    }, 40);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging, reducedMotion]);

  // Drag handlers for 360 photo
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    haptic.triggerClick('light');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 2) {
      setSpinDegree((prev) => (prev + deltaX * 0.8 + 360) % 360);
      setDragStartX(e.clientX);
      haptic.triggerClick('film');
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      haptic.triggerClick('light');
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    if (Math.abs(deltaX) > 2) {
      setSpinDegree((prev) => (prev + deltaX * 0.8 + 360) % 360);
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const eras = [
    { id: 'all', label: 'All Chronicles' },
    { id: 'early', label: '1990–1996 Prodigy' },
    { id: 'titan', label: '1997–2005 Global Titan' },
    { id: 'collaborations', label: '2006–2015 Masterpieces' },
    { id: 'oscar', label: '2016–Present Oscar Legacy' }
  ];

  return (
    <section id="biography" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cinematic Leonardo DiCaprio Photo Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 rounded-3xl overflow-hidden">
        <img
          src="/src/assets/images/leo_cinema_archive_1791625389792.jpg"
          alt="Leonardo DiCaprio Cinematic Archive Background"
          className="w-full h-full object-cover object-top opacity-20 filter contrast-125 saturate-50 scale-105 transform hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-[#050608]/85 to-[#050608]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#050608]/70 to-[#050608]" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Official Biography & Archival History</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
            OFFICIAL LEONARDO DICAPRIO
          </h2>
          <p className="text-sm font-cinzel text-amber-300/80 tracking-widest mt-1">
            THE HISTORIC LIVING MONOGRAPH
          </p>
        </div>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl font-light">
          From an intrepid 19-year-old Oscar nominee to cinema's most revered auteur collaborator and relentless planetary custodian.
        </p>
      </div>

      {/* 360° Interactive Photo Spinner Station */}
      <div className="mb-20 glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 360 Interactive Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              ref={spinnerContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl cursor-grab active:cursor-grabbing select-none perspective-1000 group p-2"
              title="Drag horizontally to spin portrait 360°"
            >
              {/* Radial glow background */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-40 transition-all duration-500"
                style={{ background: themeConfig.glow }}
              />

              {/* 3D Spin Viewport */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl relative bg-stone-950 transition-transform"
                style={{
                  transform: `rotateY(${spinDegree}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="/src/assets/images/leo_hero_portrait_1791625375197.jpg"
                  alt="Leonardo DiCaprio 360 Degree View"
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Tactical coordinates overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-amber-300 pointer-events-none">
                  <span>360° TACTILE VIEW</span>
                  <span>{Math.round(spinDegree)}° AZIMUTH</span>
                </div>
              </div>

              {/* Holographic rim light reflection */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none group-hover:border-amber-400/60 transition-colors" />
            </div>

            {/* Spinner Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  setAutoRotate(!autoRotate);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border transition-all ${
                  autoRotate
                    ? 'bg-amber-400/20 border-amber-400/60 text-amber-300'
                    : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate && !reducedMotion ? 'animate-spin' : ''}`} />
                <span>{autoRotate ? 'Auto-Spin Active' : 'Start Auto-Spin'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  haptic.triggerClick('light');
                  setSpinDegree(0);
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-stone-300 transition-colors"
              >
                Reset Angle
              </button>

              <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                Drag horizontally to rotate 360°
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Context */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tactile Archival Viewer</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white leading-snug">
              Every Facet of an Era-Defining Career
            </h3>
            
            <p className="text-stone-300 text-sm leading-relaxed">
              DiCaprio has consistently defied the Hollywood star machine, prioritizing artistic peril over commercial safety. Working almost exclusively with visionary directors—from Martin Scorsese and Christopher Nolan to Quentin Tarantino and Alejandro González Iñárritu.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-400 border-t border-white/10">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-500 uppercase font-mono">Born</span>
                <span className="text-stone-200">November 11, 1974 · Los Angeles, California</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-500 uppercase font-mono">Collaborations</span>
                <span className="text-stone-200">6 Feature Films with Martin Scorsese</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-stone-500 uppercase font-mono">Global Box Office</span>
                <span className="text-stone-200 tabular-nums font-mono">$7.2+ Billion Worldwide</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500 uppercase font-mono">Major Accolades</span>
                <span className="text-stone-200">1 Oscar · 3 Golden Globes · 1 BAFTA · 1 SAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {eras.map((era) => {
          const isSelected = activeEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => {
                haptic.triggerClick('light');
                setActiveEra(era.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-stone-900/60 text-stone-300 border-white/10 hover:border-amber-400/40 hover:text-white'
              }`}
            >
              {era.label}
            </button>
          );
        })}
      </div>

      {/* Fluid Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHOTO_ARCHIVES.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              haptic.triggerClick('medium');
              setSelectedPhoto(photo);
            }}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-amber-400/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer"
          >
            {/* Image Container with 4:3 Aspect Ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Prompt */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Tag unboxed */}
              <div className="absolute top-3 left-3 text-[11px] font-mono text-amber-300 tracking-wider">
                {photo.year} · {photo.era}
              </div>
            </div>

            {/* Content info */}
            <div className="p-4">
              <h4 className="font-cinzel font-semibold text-white group-hover:text-amber-300 transition-colors text-base">
                {photo.title}
              </h4>
              <p className="text-xs text-stone-400 mt-1.5 line-clamp-2">
                {photo.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono mt-3 pt-3 border-t border-white/5">
                <span>{photo.location}</span>
                <span className="text-amber-400/80">Inspect</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full z-10 glass-hologram rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => {
                  haptic.triggerClick('light');
                  setSelectedPhoto(null);
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-white">
                  <div className="text-xs font-mono text-amber-300 uppercase">
                    {selectedPhoto.year} · {selectedPhoto.era}
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-stone-400">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Location:</span>
                      <span className="text-stone-200">{selectedPhoto.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Archive Credit:</span>
                      <span className="text-stone-200">{selectedPhoto.photographer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
