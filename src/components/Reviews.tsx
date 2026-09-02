import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: 'Michael T.',
    role: 'Verified Buyer',
    date: '2 days ago',
    text: 'Report was generated instantly. Found out the car I was looking at had a salvage title hidden from the listing. Saved me thousands.',
    rating: 5,
    car: '2020 BMW 3 Series'
  },
  {
    name: 'Sarah J.',
    role: 'Verified Buyer',
    date: '1 week ago',
    text: 'Very thorough and easy to read. Loved that I didn\'t have to sign up for a monthly subscription just to check one VIN.',
    rating: 5,
    car: '2018 Honda Civic'
  },
  {
    name: 'David R.',
    role: 'Verified Buyer',
    date: '2 weeks ago',
    text: 'The window sticker addition gave me exact specs and factory options. Incredible value compared to dealer fees.',
    rating: 5,
    car: '2021 Ford F-150'
  },
  {
    name: 'Jessica M.',
    role: 'Verified Buyer',
    date: '3 weeks ago',
    text: 'Seamless experience. Entered my VIN and had the PDF report downloaded in under 30 seconds.',
    rating: 5,
    car: '2019 Toyota RAV4'
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <div className="space-y-4 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">Trusted by thousands</h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer flex items-center justify-center text-slate-600 transition-all focus:outline-none shadow-xs"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer flex items-center justify-center text-slate-600 transition-all focus:outline-none shadow-xs"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3.5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
            {current.car}
          </span>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed italic">
          "{current.text}"
        </p>

        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
          <div>
            <div className="font-bold text-slate-900 flex items-center gap-1">
              {current.name}
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-slate-400 text-[11px]">{current.role}</div>
          </div>
          <span className="text-slate-500 font-medium">{current.date}</span>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 pt-1">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-200 hover:bg-slate-400 hover:scale-125'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

