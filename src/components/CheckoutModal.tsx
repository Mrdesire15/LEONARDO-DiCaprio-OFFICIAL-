import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, CheckCircle2, Lock, Sparkles, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { haptic } from '../utils/haptics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [step, setStep] = useState<'cart' | 'payment' | 'confirmed'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [earthAlliancePledge, setEarthAlliancePledge] = useState(true);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [orderId, setOrderId] = useState('');

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const pledgeAmount = earthAlliancePledge ? Math.round((subtotal - discountAmount) * 0.05) : 0;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08);
  const totalAmount = subtotal - discountAmount + pledgeAmount + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.triggerClick('light');
    const code = promoCode.trim().toUpperCase();
    if (code === 'OSCARVIP') {
      setDiscountPercent(10);
      setPromoMessage('10% VIP Academy Discount Applied');
    } else if (code === 'LEO1974') {
      setDiscountPercent(15);
      setPromoMessage('15% Founder Anniversary Credit Applied');
    } else if (code === 'EARTH') {
      setDiscountPercent(12);
      setPromoMessage('12% Earth Alliance Benefactor Credit Applied');
    } else {
      setPromoMessage('Invalid or Expired Invitation Code');
    }
  };

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) return `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    return raw;
  };

  const getCardType = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('3')) return 'Amex';
    return 'Black Card';
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.triggerClick('medium');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`LEO-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('confirmed');
      haptic.triggerClick('success');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFFFFF', '#10B981', '#38BDF8']
        });
      } catch {
        // Confetti fallback
      }
    }, 2200);
  };

  const handleResetAndClose = () => {
    if (step === 'confirmed') {
      onClearCart();
      setStep('cart');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl z-10 glass-panel rounded-3xl border border-amber-400/40 shadow-2xl p-6 sm:p-8 text-white my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            haptic.triggerClick('light');
            handleResetAndClose();
          }}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 text-stone-300 hover:text-white flex items-center justify-center transition-colors z-20"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            {step === 'cart' && 'Curated Boutique Cart'}
            {step === 'payment' && 'Secure VIP Settlement'}
            {step === 'confirmed' && 'Accreditation Confirmed'}
          </h2>
        </div>

        {/* STEP 1: CART SUMMARY */}
        {step === 'cart' && (
          <div>
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-stone-400">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-cinzel text-white">Your Cart is Pristine</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Explore our Silver, Gold, or Platinum VIP passes or historic archive memorabilia to begin your reservation.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-cinzel font-bold text-xs"
                >
                  Explore VIP Lounge
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Items list */}
                <div className="lg:col-span-7 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase">
                          {item.category}
                        </span>
                        <h4 className="font-cinzel font-bold text-white text-base">
                          {item.title}
                        </h4>
                        <div className="text-xs font-mono text-stone-300 mt-1 tabular-nums">
                          ${item.price.toLocaleString()} each
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-stone-900 border border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              haptic.triggerClick('light');
                              onUpdateQuantity(item.id, -1);
                            }}
                            className="p-1 text-stone-400 hover:text-white rounded"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              haptic.triggerClick('light');
                              onUpdateQuantity(item.id, 1);
                            }}
                            className="p-1 text-stone-400 hover:text-white rounded"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            haptic.triggerClick('light');
                            onRemoveItem(item.id);
                          }}
                          className="p-2 text-stone-400 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo code box */}
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="VIP Invitation Code (e.g. OSCARVIP)"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-amber-300"
                      >
                        Apply Code
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-xs mt-1.5 font-mono ${discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {promoMessage}
                      </p>
                    )}
                  </form>

                  {/* Earth Alliance donation toggle */}
                  <div
                    onClick={() => {
                      haptic.triggerClick('light');
                      setEarthAlliancePledge(!earthAlliancePledge);
                    }}
                    className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className={`w-4 h-4 ${earthAlliancePledge ? 'text-emerald-400 fill-emerald-400' : 'text-stone-500'}`} />
                      <div className="text-xs">
                        <span className="font-semibold text-emerald-200">5% Earth Alliance Pledge</span>
                        <p className="text-[11px] text-stone-400">Directly supports Amazon & marine conservation</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                      +${pledgeAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-black/70 border border-white/10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3 text-xs font-mono">
                    <h3 className="font-cinzel text-base text-white font-bold border-b border-white/10 pb-2">
                      Investment Summary
                    </h3>

                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal</span>
                      <span className="text-white tabular-nums">${subtotal.toLocaleString()}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>VIP Privilege Discount ({discountPercent}%)</span>
                        <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    {earthAlliancePledge && (
                      <div className="flex justify-between text-emerald-300">
                        <span>Conservation Contribution</span>
                        <span className="tabular-nums">+${pledgeAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-400">
                      <span>Accreditation Fee & Tax</span>
                      <span className="text-white tabular-nums">${estimatedTax.toLocaleString()}</span>
                    </div>

                    <div className="border-t border-white/15 pt-3 flex justify-between text-sm sm:text-base font-bold text-white">
                      <span className="font-cinzel">Total Investment</span>
                      <span className="text-amber-400 font-mono tabular-nums text-lg">
                        ${totalAmount.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  {/* Proceed to checkout button */}
                  <button
                    type="button"
                    onClick={() => {
                      haptic.triggerClick('medium');
                      setStep('payment');
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black font-cinzel font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Card Settlement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: 3D CARD PAYMENT FORM */}
        {step === 'payment' && (
          <form onSubmit={handleProcessPayment} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive 3D Holographic Card Display */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="perspective-1000 w-full max-w-sm h-52 cursor-pointer select-none"
                  onClick={() => {
                    haptic.triggerClick('flip');
                    setIsCardFlipped(!isCardFlipped);
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-2xl ${
                      isCardFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl p-5 flex flex-col justify-between border border-amber-400/60 glass-hologram holographic-foil overflow-hidden text-white shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 to-amber-600 border border-amber-300 shadow-sm" />
                        <span className="text-xs font-mono font-bold tracking-widest text-amber-300">
                          {getCardType()}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-stone-400 tracking-wider">CARD NUMBER</span>
                        <div className="font-mono text-lg tracking-widest font-semibold text-white drop-shadow">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <div>
                          <span className="block text-[8px] text-stone-400">CARDHOLDER</span>
                          <span className="font-cinzel font-semibold tracking-wider text-amber-200 truncate max-w-[150px] block">
                            {cardHolder || 'LEONARDO GUEST'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-stone-400">EXPIRES</span>
                          <span className="font-semibold text-white">
                            {cardExpiry || 'MM/YY'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl py-4 flex flex-col justify-between border border-white/20 bg-stone-950 text-white shadow-2xl">
                      <div className="w-full h-9 bg-black border-y border-stone-800" />
                      <div className="px-5 flex items-center justify-end">
                        <div className="bg-white px-3 py-1 text-black font-mono font-bold text-xs rounded tracking-widest">
                          {cardCvv || '•••'}
                        </div>
                      </div>
                      <div className="px-5 text-[8px] font-mono text-stone-500">
                        AUTHORIZED SIGNATURE · FOR OFFICIAL DI CAPRIO VIP ACCREDITATION ONLY
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-stone-400 mt-3 text-center">
                  Click card to inspect holographic magnetic back
                </div>
              </div>

              {/* Right Column: Card & Billing Inputs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">
                      Guest Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setCardHolder(e.target.value.toUpperCase());
                      }}
                      placeholder="e.g. Julian Sterling"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">
                      VIP Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@prestige.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4123 4567 8901 2345"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400 font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvv}
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      haptic.triggerClick('light');
                      setStep('cart');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-stone-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Cart</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-black font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-black" />
                        <span>Authorizing Settlement...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-black" />
                        <span>Authorize ${totalAmount.toLocaleString()} USD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMED RECEIPT */}
        {step === 'confirmed' && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                Official Accreditation Granted
              </span>
              <h3 className="text-3xl font-cinzel font-bold text-white">
                Welcome to the Inner Circle
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2">
                Your reservation has been confirmed and encrypted. A formal dossier with arrival credentials and security codes has been dispatched to {email || 'your email'}.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-amber-400/30 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-500">Accreditation Dossier ID:</span>
                <span className="text-amber-300 font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Authorized Name:</span>
                <span className="text-white">{fullName || 'VIP Guest'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Settled:</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Protocol Clearance:</span>
                <span className="text-emerald-400">AUTHENTICATED (LEVEL 1)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-cinzel font-bold text-xs"
            >
              Return to Sovereign Portal
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
