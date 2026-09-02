import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface StickyMobileCTAProps {
  totalPrice: string;
}

export default function StickyMobileCTA({ totalPrice }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA when scrolled past 400px (approx past main payment card on mobile)
      if (window.scrollY > 400 && window.innerWidth < 640) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] sm:hidden z-50 animate-in slide-in-from-bottom-full duration-200">
      <button className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 hover:shadow-md cursor-pointer transition-all flex items-center justify-between px-5">
        <span>Complete Purchase</span>
        <span className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">${totalPrice}</span>
          <ChevronRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
}
