import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onNavigate: (view: string, section?: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export default function Header({ cartItemsCount, onNavigate, onOpenSearch, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigationClick = (section: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    onNavigate('home', section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationItems = [
    { label: 'Inicio', action: handleHomeClick },
    { label: 'Más Vendidos', action: () => handleNavigationClick('bestsellers') },
    { label: 'Tienda', action: () => handleNavigationClick('catalog') },
    { label: 'Nosotros', action: () => handleNavigationClick('about') }
  ];

  return (
    <>
      <header className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-slate-800/95 backdrop-blur-md shadow-lg' : 'bg-slate-800/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer z-50"
              onClick={handleHomeClick}
            >
              <img 
                src="/images/logo-perfumes-instagram_post_1080x1080 (1).png" 
                alt="ScentMart Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg shadow-sm bg-white/10 p-1"
              />
              <div className="flex flex-col">
                <span className="text-white font-serif text-lg sm:text-xl font-bold leading-tight">ScentMart</span>
                <span className="text-amber-400 text-xs font-medium tracking-wide">PERFUMES</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <button 
                  key={index}
                  onClick={item.action}
                  className="text-white hover:text-amber-400 transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Tablet Navigation */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              {navigationItems.slice(0, 2).map((item, index) => (
                <button 
                  key={index}
                  onClick={item.action}
                  className="text-white hover:text-amber-400 transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-amber-400 transition-colors duration-200 p-1 mobile-menu-button"
              >
                <Menu className="w-5 h-5" />
              </button>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={onOpenSearch}
                className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button 
                className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full hidden sm:block"
                aria-label="Perfil"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button 
                onClick={onOpenCart}
                className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full relative"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-semibold animate-pulse">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-amber-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full lg:hidden mobile-menu-button"
                aria-label="Menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Mobile Menu Panel */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-out mobile-menu ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo-perfumes-instagram_post_1080x1080 (1).png" 
                alt="ScentMart Logo" 
                className="h-8 w-8 rounded-md bg-white/10 p-1"
              />
              <div className="flex flex-col">
                <span className="text-white font-serif text-lg font-bold leading-tight">ScentMart</span>
                <span className="text-amber-400 text-xs font-medium tracking-wide">PERFUMES</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-amber-400 transition-colors duration-200 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="py-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full text-left px-6 py-4 text-white hover:text-amber-400 hover:bg-slate-700/50 transition-all duration-200 font-medium text-lg border-b border-slate-700/50 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center justify-center w-12 h-12 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="flex items-center justify-center w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-200 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}