import React from 'react';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Truck className="w-4 h-4 text-white" />
        <span>Envíos Gratis en Santa Marta | <span className="text-yellow-100 font-semibold">Compra hoy y recíbelo sin costo</span></span>
      </div>
    </div>
  );
}