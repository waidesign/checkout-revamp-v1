export default function Footer() {
  return (
    <footer className="pt-6 pb-2 border-t border-slate-100 mt-8 text-slate-500 text-xs">
      <div className="flex flex-wrap gap-4 mb-3">
        <a href="#" className="hover:text-slate-900 hover:underline underline-offset-2 cursor-pointer transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-slate-900 hover:underline underline-offset-2 cursor-pointer transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-900 hover:underline underline-offset-2 cursor-pointer transition-colors">Refund Policy</a>
        <a href="#" className="hover:text-slate-900 hover:underline underline-offset-2 cursor-pointer transition-colors">Contact Support</a>
      </div>
      <p>&copy; {new Date().getFullYear()} VehicleReport. All rights reserved.</p>
    </footer>
  );
}
