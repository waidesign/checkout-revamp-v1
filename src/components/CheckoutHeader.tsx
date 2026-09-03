import dvhLogo from '../assets/images/dvh-logo.webp';

export default function CheckoutHeader() {
  return (
    <header className="h-[72px] bg-white border-b border-slate-200 shrink-0 z-50">
      {/* Desktop Header Layout - perfectly aligned with split page columns */}
      <div className="hidden lg:flex w-full h-full">
        {/* Left Column matching main checkout flow */}
        <div className="w-1/2 flex justify-end px-8 xl:px-12 items-center">
          <div className="w-full max-w-[520px] flex items-center">
            <img 
              src={dvhLogo} 
              alt="Detailed Vehicle History" 
              className="h-8 lg:h-9 w-auto object-contain cursor-pointer" 
            />
          </div>
        </div>

        {/* Right Column matching order summary & proof */}
        <div className="w-1/2 px-8 xl:px-12 flex items-center">
          <div className="w-full max-w-[420px] flex justify-end">
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900 text-sm font-semibold cursor-pointer transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header Layout - aligned with max-w-xl mobile container */}
      <div className="lg:hidden w-full h-full max-w-xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={dvhLogo} 
            alt="Detailed Vehicle History" 
            className="h-8 w-auto object-contain cursor-pointer" 
          />
        </div>
        <button
          type="button"
          className="text-slate-600 hover:text-slate-900 text-sm font-semibold cursor-pointer transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-50"
        >
          Contact us
        </button>
      </div>
    </header>
  );
}
