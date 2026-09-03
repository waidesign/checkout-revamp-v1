import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface StickyMobileCTAProps {
  totalPrice: string;
  onValidate: () => void;
}

export default function StickyMobileCTA({ totalPrice, onValidate }: StickyMobileCTAProps) {
  // Start hidden — IntersectionObserver fires immediately on mount with the real state
  const [paymentInView, setPaymentInView] = useState(true);

  useEffect(() => {
    const target = document.getElementById('pay-button');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaymentInView(entry.isIntersecting);
      },
      {
        // Fire as soon as any part of the payment section enters/leaves the viewport
        threshold: 0,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Hidden on sm+ screens (desktop has its own inline Pay button)
  // Also hidden while the payment section is visible on mobile
  if (paymentInView) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] sm:hidden z-50 animate-in slide-in-from-bottom-full duration-200">
      <button onClick={onValidate} className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 hover:shadow-md cursor-pointer transition-all flex items-center justify-between px-5">
        <span>Complete Purchase</span>
        <span className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">${totalPrice}</span>
          <ChevronRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
}
