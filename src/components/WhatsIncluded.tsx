import { CheckCircle2 } from 'lucide-react';

const includes = [
  { label: 'Accident History & Damage' },
  { label: 'Title Brand Check' },
  { label: 'Ownership Records' },
  { label: 'Odometer Verification' },
  { label: 'Salvage & Lien Check' },
  { label: 'Instant PDF Download' },
];

export default function WhatsIncluded() {
  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Included in your report</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        {includes.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-sm font-medium text-slate-700 leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
