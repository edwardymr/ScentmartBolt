import React from 'react';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-2 px-4 border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Truck className="w-4 h-4 text-amber-400" />
        <span>Envíos Gratis en Santa Marta | <span className="text-amber-400">Compra hoy y recíbelo sin costo</span></span>
      </div>
    </div>
  );
}