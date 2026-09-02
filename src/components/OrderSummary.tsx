import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Check, Info, CheckCircle2 } from 'lucide-react';

interface OrderSummaryProps {
  hasAddon: boolean;
  setHasAddon: (v: boolean) => void;
  appliedDiscount: number;
  setAppliedDiscount: (v: number) => void;
  totalPrice: string;
}

export default function OrderSummary({
  hasAddon,
  setHasAddon,
  appliedDiscount,
  setAppliedDiscount,
  totalPrice,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showStickerTooltip, setShowStickerTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const stickerTooltipRef = useRef<HTMLDivElement>(null);

  const basePrice = 19.25;
  const addonPrice = 9.65;
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');

  const includedItems = [
    'Accident History & Damage',
    'Title Brand Check',
    'Ownership Records',
    'Odometer Verification',
    'Salvage & Lien Check',
    'Instant PDF Download'
  ];

  const windowStickerItems = [
    'Original Factory Build Sheet',
    'MSRP & Pricing Breakdown',
    'Standard & Optional Equipment',
    'Exterior & Interior Color Codes',
    'Engine & Transmission Specs',
    'Fuel Economy Ratings'
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
      if (stickerTooltipRef.current && !stickerTooltipRef.current.contains(event.target as Node)) {
        setShowStickerTooltip(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Mobile Collapsible Header */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-slate-50 hover:bg-slate-100/80 active:bg-slate-100 border border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors duration-150"
        >
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            Order summary {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          <div className="font-bold text-lg text-slate-900">
            ${totalPrice}
          </div>
        </button>
      </div>

      {/* Main Summary Display (Desktop always visible, Mobile in collapsible) */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'} pt-2 lg:pt-0`}>
        <h2 className="text-xl font-bold text-slate-900 mb-6 hidden lg:block">Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start text-sm pb-4 border-b border-slate-200">
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 text-base">Premium History Report</span>
                <div className="relative" ref={tooltipRef}>
                  <button 
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all p-1 rounded-full focus:outline-none cursor-pointer"
                    aria-label="Report info"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* Tooltip Popover */}
                  {showTooltip && (
                    <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Included in Report</span>
                        <button 
                          onClick={() => setShowTooltip(false)}
                          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors"
                        >
                          Close
                        </button>
                      </div>
                      <div className="space-y-2.5">
                        {includedItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-slate-500 mt-1">Instant Digital Delivery</div>
            </div>
            <span className="font-semibold text-slate-900 font-mono text-base">${basePrice.toFixed(2)}</span>
          </div>

          {hasAddon && (
            <div className="flex justify-between items-center text-sm pb-4 border-b border-slate-200 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-sm">Digital Window Sticker</span>
                    <div className="relative" ref={stickerTooltipRef}>
                      <button 
                        type="button"
                        onClick={() => setShowStickerTooltip(!showStickerTooltip)}
                        className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all p-1 rounded-full focus:outline-none cursor-pointer"
                        aria-label="Window sticker info"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      {showStickerTooltip && (
                        <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Window Sticker Includes</span>
                            <button 
                              onClick={() => setShowStickerTooltip(false)}
                              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors"
                            >
                              Close
                            </button>
                          </div>
                          <div className="space-y-2.5">
                            {windowStickerItems.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500">50% Off Special</span>
                    <button 
                      onClick={() => setHasAddon(false)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 active:scale-95 transition-all p-1 rounded cursor-pointer"
                      title="Remove add-on"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-slate-900 font-mono text-sm">${addonPrice.toFixed(2)}</span>
            </div>
          )}

          {/* Promo Code Accordion */}
          <div className="pt-1 pb-3 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setShowPromoCode(!showPromoCode)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 active:opacity-80 transition-colors w-full text-left py-1 cursor-pointer group"
            >
              <span className="text-lg leading-none font-bold group-hover:scale-110 transition-transform">{showPromoCode ? '−' : '+'}</span>
              <span>Have a promo code?</span>
            </button>

            {showPromoCode && (
              <div className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter code"
                  className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 bg-white border focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none uppercase font-bold"
                />
                <button 
                  type="button"
                  onClick={() => {
                    if (promoCodeInput.trim()) {
                      setAppliedDiscount(5.00);
                    }
                  }}
                  className="bg-slate-900 text-white px-5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap h-[42px] cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {appliedDiscount > 0 && (
            <div className="flex justify-between items-center text-sm pb-4 border-b border-slate-200 text-emerald-600 font-medium">
              <span>Discount Applied</span>
              <span>-${appliedDiscount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="pt-2 flex justify-between items-end">
            <span className="text-base font-bold text-slate-900">Total</span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Post-decision Upsell Banner */}
      {!hasAddon && (
        <div className={`bg-white border border-blue-200 rounded-2xl p-5 shadow-sm relative ${!isExpanded ? 'hidden lg:block' : 'block'}`}>
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            Special Offer
          </div>
          <div className="mb-4 pr-16">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-base font-bold text-slate-900 leading-tight">Add a Window Sticker</h3>
              <div className="relative" ref={stickerTooltipRef}>
                <button 
                  type="button"
                  onClick={() => setShowStickerTooltip(!showStickerTooltip)}
                  className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all p-1 rounded-full focus:outline-none cursor-pointer"
                  aria-label="Window sticker info"
                >
                  <Info className="w-4 h-4" />
                </button>

                {showStickerTooltip && (
                  <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Window Sticker Includes</span>
                      <button 
                        onClick={() => setShowStickerTooltip(false)}
                        className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {windowStickerItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-slate-600 text-sm">Get a window sticker for only $9.65 extra (Save 50%)</p>
          </div>
          <button 
            onClick={() => setHasAddon(true)}
            className="w-full bg-blue-50 text-blue-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-100 active:scale-[0.99] transition-all border border-blue-200 hover:border-blue-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Add for $9.65
          </button>
        </div>
      )}


    </div>
  );
}
