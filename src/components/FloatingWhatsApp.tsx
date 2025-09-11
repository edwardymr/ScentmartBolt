import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show button after a short delay when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '573213200601';
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre los perfumes de MisAromas 🌸');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce hover:animate-none"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          ¡Escríbenos por WhatsApp!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      </button>

      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}