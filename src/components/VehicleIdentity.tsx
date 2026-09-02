import { ShieldCheck } from 'lucide-react';

export default function VehicleIdentity() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          2010 Toyota Corolla
        </h1>
        <div className="flex items-center gap-3">
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">VIN</span>
          <span className="text-slate-900 font-mono font-semibold">2T1BU4EE3AC509614</span>
        </div>
      </div>
      <div className="self-start sm:self-auto flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Secure Checkout</span>
      </div>
    </div>
  );
}
