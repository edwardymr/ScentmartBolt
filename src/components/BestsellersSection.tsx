import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Crown } from 'lucide-react';
import { Perfume } from '../types';

interface BestsellersSectionProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export default function BestsellersSection({ perfumes, onAddToCart, onViewDetails }: BestsellersSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5.5);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Productos específicos para el carrusel (más vendidos)
  const bestsellerNames = ['Magnat', "D'orsay", 'Vibranza', 'You', 'MITHYKA', "L'image", 'Pulso Absolute', 'BLEU INTENSE'];
  const bestsellers = bestsellerNames.map(name => 
    perfumes.find(p => p.name === name)
  ).filter(Boolean) as Perfume[];

  // Configuración responsiva estilo Faro Shop
  const updateItemsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const newItemsPerView = width >= 1024 ? 5.5 : 2.5; // 5.5 en desktop, 2.5 en móvil
      setItemsPerView(newItemsPerView);
      // Ajustar currentIndex si es necesario
      setCurrentIndex(prev => {
        const maxIndex = Math.max(0, bestsellers.length - Math.floor(newItemsPerView));
        return Math.min(prev, maxIndex);
      });
    }
  }, [bestsellers.length]);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    
    autoPlayRef.current = setInterval(() => {
      if (!isDragging && isAutoPlaying && bestsellers.length > Math.floor(itemsPerView)) {
        setCurrentIndex(prev => {
          const maxIndex = bestsellers.length - Math.floor(itemsPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }
    }, 4000);
  }, [isDragging, isAutoPlaying, bestsellers.length, itemsPerView]);

  useEffect(() => {
    if (isAutoPlaying && !isDragging && bestsellers.length > Math.floor(itemsPerView)) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay, isAutoPlaying, isDragging, bestsellers.length, itemsPerView]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(prev => {
      const maxIndex = bestsellers.length - Math.floor(itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex(prev => {
      const maxIndex = bestsellers.length - Math.floor(itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Touch/Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 80;
    
    if (dragOffset > threshold) {
      goToPrevious();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (bestsellers.length === 0) return null;

  const maxIndex = Math.max(0, bestsellers.length - Math.floor(itemsPerView));
  const itemWidth = 100 / itemsPerView;
  const translateX = -(currentIndex * itemWidth) + (isDragging ? (dragOffset / (carouselRef.current?.offsetWidth || 1) * 100) : 0);

  return (
    <section id="bestsellers" className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-500/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-amber-400" />
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
              Los Más Vendidos
            </h2>
            <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-amber-400" />
          </div>
          <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Descubre las fragancias que han conquistado corazones y despertado pasiones
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 fill-current" />
            ))}
            <span className="text-amber-400 font-semibold ml-2 text-sm lg:text-base">Favoritos de nuestros clientes</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {bestsellers.length > Math.floor(itemsPerView) && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 shadow-2xl rounded-full p-2 lg:p-3 transition-all duration-300 hover:scale-110 group"
                aria-label="Producto anterior"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 shadow-2xl rounded-full p-2 lg:p-3 transition-all duration-300 hover:scale-110 group"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{ 
                transform: `translateX(${translateX}%)`,
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {bestsellers.map((perfume, index) => (
                <div 
                  key={perfume.id} 
                  className="flex-shrink-0 px-1.5 lg:px-2"
                  style={{ width: `${itemWidth}%` }}
                >
                  <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg lg:rounded-xl overflow-hidden shadow-xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/20 h-full">
                    {/* Luxury Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Crown className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                        <span className="hidden sm:inline text-xs">TOP</span>
                      </div>
                    </div>

                    {/* Discount Badge */}
                    {perfume.originalPrice && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="bg-red-500 text-white px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full text-xs font-bold">
                          -{Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-2 lg:p-4 relative">
                      {/* Luxury Accent Line */}
                      <div className="absolute top-0 left-2 right-2 lg:left-4 lg:right-4 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                      
                      <div className="mb-2 lg:mb-3">
                        <span className="inline-block bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 text-xs px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full border border-amber-500/30 mb-1 lg:mb-2">
                          {perfume.family}
                        </span>
                        <h3 className="font-serif text-sm lg:text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                          {perfume.name}
                        </h3>
                        <p className="text-gray-400 text-xs lg:text-sm">{perfume.brand}</p>
                      </div>

                      <p className="text-gray-300 text-xs leading-relaxed mb-2 lg:mb-3 line-clamp-2 hidden sm:block">
                        {perfume.description}
                      </p>

                      <div className="flex items-center gap-1 lg:gap-2 mb-2 lg:mb-4">
                        <span className="text-sm lg:text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                          {formatPrice(perfume.price)}
                        </span>
                        {perfume.originalPrice && (
                          <span className="text-gray-500 line-through text-xs lg:text-sm">
                            {formatPrice(perfume.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(perfume);
                          }}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-1.5 lg:py-2 px-2 lg:px-3 rounded-md lg:rounded-lg text-xs font-semibold transition-all duration-300 border border-slate-600 hover:border-slate-500"
                        >
                          <span className="hidden lg:inline">Ver Detalles</span>
                          <span className="lg:hidden">Ver</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(perfume);
                          }}
                          disabled={perfume.stock === 0}
                          className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-slate-900 hover:text-slate-900 disabled:text-gray-400 py-1.5 lg:py-2 px-2 lg:px-3 rounded-md lg:rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
                        >
                          {perfume.stock === 0 ? (
                            <span className="hidden lg:inline">Agotado</span>
                          ) : (
                            <>
                              <span className="hidden lg:inline">Añadir</span>
                              <span className="lg:hidden">+</span>
                            </>
                          )}
                        </button>
                      </div>

                      {perfume.stock > 0 && perfume.stock <= 3 && (
                        <p className="text-amber-400 text-xs mt-2 font-medium flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                          <span className="hidden sm:inline">¡Solo quedan {perfume.stock}!</span>
                          <span className="sm:hidden">¡Solo {perfume.stock}!</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {bestsellers.length > Math.floor(itemsPerView) && (
            <div className="flex justify-center mt-6 lg:mt-8 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`h-1.5 lg:h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 w-6 lg:w-8' 
                      : 'bg-slate-600 hover:bg-slate-500 w-1.5 lg:w-2'
                  }`}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play Indicator */}
          <div className="text-center mt-3 lg:mt-4">
            <div className="inline-flex items-center gap-2 text-gray-400 text-xs lg:text-sm">
              <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
              <span className="hidden sm:inline">{isAutoPlaying ? 'Reproducción automática' : 'Pausado'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}