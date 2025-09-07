import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onNavigate: (view: string, section?: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export default function Header({ cartItemsCount, onNavigate, onOpenSearch, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigationClick = (section: string) => {
    onNavigate('home', section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-800/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-slate-800 font-bold text-sm">S</span>
            </div>
            <span className="text-white font-serif text-xl font-bold">ScentMart</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-white hover:text-amber-400 transition-colors font-medium"
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavigationClick('catalog')}
              className="text-white hover:text-amber-400 transition-colors font-medium"
            >
              Tienda
            </button>
            <button 
              onClick={() => handleNavigationClick('about')}
              className="text-white hover:text-amber-400 transition-colors font-medium"
            >
              Nosotros
            </button>
            <button 
              onClick={() => handleNavigationClick('bestsellers')}
              className="text-white hover:text-amber-400 transition-colors font-medium"
            >
              Más Vendidos
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenSearch}
              className="text-white hover:text-amber-400 transition-colors p-2"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-amber-400 transition-colors p-2">
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenCart}
              className="text-white hover:text-amber-400 transition-colors p-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}