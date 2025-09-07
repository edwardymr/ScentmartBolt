import React from 'react';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Truck className="w-4 h-4" />
        <span>Envíos Gratis en Santa Marta | Compra hoy y recíbelo sin costo</span>
      </div>
    </div>
  );
}