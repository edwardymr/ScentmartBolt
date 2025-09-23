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
  const bestsellers = bestsellerNames
    .map(name => perfumes.find(p => p.title === name)) // 🔹 CAMBIADO name → title
    .filter(Boolean) as Perfume[];

  // Configuración responsiva
  const updateItemsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const newItemsPerView = width >= 1024 ? 5.5 : 2.5;
      setItemsPerView(newItemsPerView);
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

  // Auto-play
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

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset > threshold) goToPrevious();
    else if (dragOffset < -threshold) goToNext();
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);

  if (bestsellers.length === 0) return null;

  const maxIndex = Math.max(0, bestsellers.length - Math.floor(itemsPerView));
  const itemWidth = 100 / itemsPerView;
  const translateX =
    -(currentIndex * itemWidth) +
    (isDragging ? (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100 : 0);

  return (
    <section id="bestsellers" className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-amber-400" />
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
              Los Más Vendidos
            </h2>
            <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-amber-400" />
          </div>
          <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto">
            Descubre las fragancias que han conquistado corazones y despertado pasiones
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(${translateX}%)` }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {bestsellers.map((perfume) => (
                <div key={perfume.id} className="flex-shrink-0 px-1.5 lg:px-2" style={{ width: `${itemWidth}%` }}>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-xl h-full">
                    <img src={perfume.image_link} alt={perfume.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-white font-bold">{perfume.title}</h3>
                      <p className="text-gray-400 text-sm">{perfume.brand}</p>
                      <p className="text-amber-400">{formatPrice(perfume.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
