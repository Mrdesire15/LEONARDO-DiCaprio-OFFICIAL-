import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Compass, Sparkles, Award, Film, Crown, Camera, ArrowUpRight } from 'lucide-react';
import { AuraTheme } from '../types';
import { THEME_AURAS } from '../data/diCaprioData';
import { haptic } from '../utils/haptics';

interface OrbitalSystemProps {
  aura: AuraTheme;
  onChangeAura: (aura: AuraTheme) => void;
  reducedMotion: boolean;
  onNavigateToSection: (sectionId: string) => void;
}

export const OrbitalSystem: React.FC<OrbitalSystemProps> = ({
  aura,
  onChangeAura,
  reducedMotion,
  onNavigateToSection
}) => {
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isPhotoSpinning, setIsPhotoSpinning] = useState(true);
  const [photoSpinAngle, setPhotoSpinAngle] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const requestRef = useRef<number | null>(null);

  const themeConfig = THEME_AURAS[aura];

  // Orbit loop
  useEffect(() => {
    if (reducedMotion) {
      setIsPlaying(false);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setOrbitAngle((prev) => (prev + delta * 18 * speedMultiplier) % 360);
      }

      if (isPhotoSpinning && !reducedMotion) {
        setPhotoSpinAngle((prev) => (prev + delta * 45) % 360);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speedMultiplier, isPhotoSpinning, reducedMotion]);

  // Satellites configuration
  const satellites = [
    {
      id: 'photos',
      title: '360° Photo Archive',
      subtitle: 'Spinning Editorial Gallery',
      sectionId: 'biography',
      icon: Camera,
      angleOffset: 0,
      renderPreview: () => (
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <img
            src="/src/assets/images/leo_hero_portrait_1791625375197.jpg"
            alt="360 Spinning Leo Photo"
            className="w-full h-full object-cover transition-transform duration-75"
            style={{
              transform: `rotateY(${photoSpinAngle}deg)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'awards',
      title: 'Orbiting Medals & Oscar',
      subtitle: 'Academy & Global Honors',
      sectionId: 'awards',
      icon: Award,
      angleOffset: 90,
      renderPreview: () => (
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.6)] bg-gradient-to-br from-amber-900/60 to-black flex items-center justify-center">
          <img
            src="/src/assets/images/leo_oscar_trophy_1791625412811.jpg"
            alt="Golden Oscar"
            className="w-full h-full object-cover animate-pulse"
          />
        </div>
      )
    },
    {
      id: 'timeline',
      title: 'Film Reel Timeline',
      subtitle: 'Rotating 35mm Spool',
      sectionId: 'timeline',
      icon: Film,
      angleOffset: 180,
      renderPreview: () => (
        <div
          className="relative w-16 h-16 rounded-full border-2 border-dashed border-amber-400 bg-stone-900 flex items-center justify-center shadow-lg transition-transform duration-300"
          style={{ transform: `rotate(${orbitAngle * 1.5}deg)` }}
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>
          {/* Film sprockets */}
          <div className="absolute inset-1 rounded-full border border-stone-700 pointer-events-none" />
        </div>
      )
    },
    {
      id: 'vip-card',
      title: 'Holographic VIP Passes',
      subtitle: 'Flipping 3D Pass',
      sectionId: 'vip-lounge',
      icon: Crown,
      angleOffset: 270,
      renderPreview: () => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            haptic.triggerClick('flip');
            setIsCardFlipped(!isCardFlipped);
          }}
          className="relative w-20 h-14 rounded-lg cursor-pointer perspective-1000 group/card"
          title="Click to Flip Card"
        >
          <div
            className={`w-full h-full rounded-lg transition-transform duration-500 transform-style-3d ${
              isCardFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <img
                src="/src/assets/images/gold_vip_card_mockup_1791627196554.jpg"
                alt="VIP Gold Pass Front"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0.5 left-1 text-[7px] font-mono font-bold text-amber-300 bg-black/60 px-1 rounded">
                GOLD PASS
              </span>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden border border-amber-400 p-0.5 bg-black">
              <img
                src="/src/assets/images/card_back_details_1791627230842.jpg"
                alt="VIP Card Back"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="orbital" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 -z-10 opacity-30"
        style={{ background: themeConfig.glow }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle border border-amber-400/40 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Synchronized 3D Orbital Exhibition</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-black tracking-tight text-white mb-4"
        >
          OFFICIAL LEONARDO <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">DICAPRIO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          An extraordinary cinematic journey through iconic masterpieces, rare archives, and VIP engagements—all rotating in unison around cinema's definitive master.
        </motion.p>
      </div>

      {/* 3D Synchronized Orbital Arena */}
      <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] flex items-center justify-center my-4">
        {/* Concentric Orbital Rings */}
        <div
          className="absolute inset-0 rounded-full border border-dashed transition-colors duration-700 pointer-events-none"
          style={{ borderColor: themeConfig.border, opacity: 0.6 }}
        />
        <div
          className="absolute inset-12 sm:inset-16 md:inset-20 rounded-full border border-stone-800 pointer-events-none"
        />
        <div
          className="absolute inset-24 sm:inset-32 md:inset-40 rounded-full border border-amber-500/10 pointer-events-none"
        />

        {/* Central Core: Leonardo DiCaprio Portrait */}
        <div className="relative z-20 group">
          <div
            className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 rounded-full p-1.5 transition-all duration-700 shadow-2xl"
            style={{
              background: `radial-gradient(circle, ${themeConfig.primary}44, transparent 70%)`,
              boxShadow: `0 0 50px ${themeConfig.glow}`
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-400/90 relative">
              <img
                src="/src/assets/images/leo_hero_portrait_1791625375197.jpg"
                alt="Leonardo DiCaprio Core Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              
              {/* Central Title overlay */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] sm:text-xs font-cinzel font-bold text-amber-200 tracking-widest drop-shadow-md">
                  THE SOVEREIGN ACTOR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Orbiting Satellites */}
        {satellites.map((sat) => {
          const currentTotalAngle = (orbitAngle + sat.angleOffset) * (Math.PI / 180);
          // Radius based on viewport
          const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 140 : 250;
          const x = Math.cos(currentTotalAngle) * radius;
          const y = Math.sin(currentTotalAngle) * (radius * 0.72); // slight ellipse for 3D depth

          const SatIcon = sat.icon;

          return (
            <div
              key={sat.id}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`
              }}
            >
              <div
                onClick={() => {
                  haptic.triggerClick('medium');
                  onNavigateToSection(sat.sectionId);
                }}
                className="group relative flex flex-col items-center cursor-pointer p-2 rounded-2xl glass-panel-subtle hover:glass-hologram border border-amber-400/30 hover:border-amber-400 hover:scale-110 transition-all duration-300 shadow-xl"
              >
                {/* Visual Satellite Preview Component */}
                <div className="mb-1.5">{sat.renderPreview()}</div>

                {/* Satellite Label & Quick Link */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-white group-hover:border-amber-400 transition-colors">
                  <SatIcon className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px] font-cinzel font-medium text-stone-200 group-hover:text-amber-300 whitespace-nowrap">
                    {sat.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-amber-300" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Control Station */}
      <div className="mt-8 z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl glass-panel border border-amber-500/20 shadow-2xl">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={() => {
            haptic.triggerClick('light');
            setIsPlaying(!isPlaying);
          }}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 hover:text-white text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isPlaying ? 'Pause Orbit' : 'Resume Orbit'}</span>
        </button>

        {/* Orbit Speed Multiplier */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
          <span className="text-stone-400 text-[11px] px-1">Speed:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => {
                haptic.triggerClick('light');
                setSpeedMultiplier(spd);
              }}
              className={`px-2 py-1 rounded-lg text-[11px] transition-colors ${
                speedMultiplier === spd
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* 360 Photo Spin Toggle */}
        <button
          type="button"
          onClick={() => {
            haptic.triggerClick('light');
            setIsPhotoSpinning(!isPhotoSpinning);
          }}
          className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
            isPhotoSpinning
              ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
              : 'bg-white/5 border-white/10 text-stone-400'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>360° Photo Spin</span>
        </button>

        {/* Aura Switcher within Orbit */}
        <div className="flex items-center gap-1.5 pl-2 sm:border-l border-white/10">
          <span className="text-[11px] font-mono text-stone-400 hidden md:inline">Neon Aura:</span>
          {(['gold', 'platinum', 'emerald', 'sapphire', 'ruby'] as AuraTheme[]).map((thm) => (
            <button
              key={thm}
              type="button"
              onClick={() => {
                haptic.triggerClick('light');
                onChangeAura(thm);
              }}
              title={THEME_AURAS[thm].name}
              className={`w-4 h-4 rounded-full transition-transform ${
                aura === thm ? 'scale-125 ring-2 ring-white' : 'opacity-50 hover:opacity-100'
              }`}
              style={{ backgroundColor: THEME_AURAS[thm].primary }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
