import CheckoutHeader from './components/CheckoutHeader';
import VehicleIdentity from './components/VehicleIdentity';
import PaymentForm, { type PaymentFormHandle } from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';
import { MessageCircle } from 'lucide-react';
import { Agentation } from 'agentation';
import { useState, useRef } from 'react';

const BASE_PRICE = 19.25;
const ADDON_PRICE = 9.65;

export default function App() {
  const [hasAddon, setHasAddon] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const paymentFormRef = useRef<PaymentFormHandle>(null);

  const rawTotal = hasAddon ? BASE_PRICE + ADDON_PRICE : BASE_PRICE;
  const totalPrice = Math.max(0, rawTotal - appliedDiscount).toFixed(2);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 lg:pb-0 flex flex-col">
      <CheckoutHeader />

      <main className="flex-1 flex flex-col lg:flex-row w-full">
        
        {/* Mobile View Structure */}
        <div className="lg:hidden px-4 py-6 space-y-8 w-full max-w-xl mx-auto">
          <VehicleIdentity />
          <OrderSummary
            hasAddon={hasAddon}
            setHasAddon={setHasAddon}
            appliedDiscount={appliedDiscount}
            setAppliedDiscount={setAppliedDiscount}
            totalPrice={totalPrice}
          />
          <PaymentForm ref={paymentFormRef} totalPrice={totalPrice} />
          <Reviews />
          <Footer />
        </div>

        {/* Desktop View Structure (Split Screen) */}
        <div className="hidden lg:flex w-full">
          
          {/* Left Column: Main Checkout Flow */}
          <div className="w-1/2 flex justify-end px-8 xl:px-12 py-12 bg-white">
            <div className="w-full max-w-[520px] space-y-12">
              <VehicleIdentity />
              <PaymentForm ref={paymentFormRef} totalPrice={totalPrice} />
              <Footer />
            </div>
          </div>

          {/* Right Column: Order Summary & Proof */}
          <div className="w-1/2 bg-slate-50 border-l border-slate-200 px-8 xl:px-12 py-12">
            <div className="w-full max-w-[420px] sticky top-28 space-y-10">
              <OrderSummary
                hasAddon={hasAddon}
                setHasAddon={setHasAddon}
                appliedDiscount={appliedDiscount}
                setAppliedDiscount={setAppliedDiscount}
                totalPrice={totalPrice}
              />
              <Reviews />
            </div>
          </div>
        </div>

      </main>

      <StickyMobileCTA totalPrice={totalPrice} onValidate={() => paymentFormRef.current?.triggerValidation()} />

      {/* Floating Chat Widget */}
      <button 
        className="fixed bottom-[110px] lg:bottom-6 right-4 lg:right-6 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 z-40"
        aria-label="Contact Support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {process.env.NODE_ENV === 'development' && <Agentation />}
    </div>
  );
}
