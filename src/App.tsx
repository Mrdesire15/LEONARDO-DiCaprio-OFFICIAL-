import React, { useState, useEffect } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navigation } from './components/Navigation';
import { OrbitalSystem } from './components/OrbitalSystem';
import { BiographySection } from './components/BiographySection';
import { FilmReelTimeline } from './components/FilmReelTimeline';
import { AwardsGallery } from './components/AwardsGallery';
import { MeetAndGreetStore } from './components/MeetAndGreetStore';
import { OpenSocialSection } from './components/OpenSocialSection';
import { CheckoutModal } from './components/CheckoutModal';
import { HolographicSocialPopup } from './components/HolographicSocialPopup';
import { Footer } from './components/Footer';
import { AuraTheme, CartItem } from './types';
import { haptic } from './utils/haptics';

export default function App() {
  const [currentAura, setCurrentAura] = useState<AuraTheme>('gold');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState('orbital');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('leo_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  // Mouse cursor glow position
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Sync cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('leo_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Track active section for top bar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['orbital', 'biography', 'timeline', 'awards', 'vip-lounge'];
      const scrollY = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor glow tracker
  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#050608] text-[#EAE6DF] relative selection:bg-[#D4AF37]/30 selection:text-white ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* Interactive Background Canvas Particles */}
      <ParticleCanvas aura={currentAura} reducedMotion={reducedMotion} />

      {/* Interactive Cursor Glow */}
      {!reducedMotion && (
        <div
          className="fixed pointer-events-none rounded-full blur-[90px] w-72 h-72 -translate-x-1/2 -translate-y-1/2 opacity-25 z-0 transition-opacity duration-300"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            background: currentAura === 'gold' ? 'radial-gradient(circle, #D4AF37, transparent)' :
                        currentAura === 'platinum' ? 'radial-gradient(circle, #E5E4E2, transparent)' :
                        currentAura === 'emerald' ? 'radial-gradient(circle, #10B981, transparent)' :
                        currentAura === 'sapphire' ? 'radial-gradient(circle, #3B82F6, transparent)' :
                        'radial-gradient(circle, #EF4444, transparent)'
          }}
        />
      )}

      {/* Top Navigation */}
      <Navigation
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSocials={() => setIsSocialsOpen(true)}
        currentAura={currentAura}
        onChangeAura={setCurrentAura}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Synchronized 3D Orbital Exhibition */}
        <OrbitalSystem
          aura={currentAura}
          onChangeAura={setCurrentAura}
          reducedMotion={reducedMotion}
          onNavigateToSection={handleNavigateToSection}
        />

        {/* 2. Biography & 360 Photo Monograph */}
        <BiographySection
          aura={currentAura}
          reducedMotion={reducedMotion}
        />

        {/* 3. 35mm Rotating Film Reel Timeline */}
        <FilmReelTimeline
          aura={currentAura}
          reducedMotion={reducedMotion}
        />

        {/* 4. Orbiting Medals & Awards Gallery */}
        <AwardsGallery
          aura={currentAura}
          reducedMotion={reducedMotion}
        />

        {/* 5. Open & Bold Official Social Media Hub */}
        <OpenSocialSection />

        {/* 6. Meet & Greet VIP Store & Historic Relics Vault */}
        <MeetAndGreetStore
          aura={currentAura}
          onAddToCart={handleAddToCart}
          onQuickCheckout={(item) => {
            handleAddToCart(item);
            setIsCartOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer onOpenSocials={() => setIsSocialsOpen(true)} />

      {/* Secure Checkout & Cart Summary Modal */}
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Holographic Social Pop-up */}
      <HolographicSocialPopup
        isOpen={isSocialsOpen}
        onClose={() => setIsSocialsOpen(false)}
      />
    </div>
  );
}
