import React from 'react';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Truck className="w-4 h-4 text-white" />
        <span className="text-center">
          <span className="hidden sm:inline">Envíos Gratis en Santa Marta | </span>
          <span className="text-yellow-100 font-semibold">
            <span className="sm:hidden">Envío gratis Santa Marta | </span>
            <span className="hidden sm:inline">Envíos nacionales </span>
            <span className="sm:hidden">Nacional </span>
            $16.000
          </span>
        </span>
      </div>
    </div>
  );
}