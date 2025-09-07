import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Perfume } from '../types';
import PerfumeCard from './PerfumeCard';

interface BestsellersSectionProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export default function BestsellersSection({ perfumes, onAddToCart, onViewDetails }: BestsellersSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Productos específicos para el carrusel
  const bestsellerNames = ['Magnat', "D'orsay", 'Vibranza', 'You'];
  const bestsellers = bestsellerNames.map(name => 
    perfumes.find(p => p.name === name)
  ).filter(Boolean) as Perfume[];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || bestsellers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % bestsellers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, bestsellers.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? bestsellers.length - 1 : prev - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % bestsellers.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (bestsellers.length === 0) {
    return null;
  }

  return (
    <section id="bestsellers" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Los Más Vendidos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre las fragancias favoritas de nuestros clientes
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {bestsellers.map((perfume, index) => (
                <div key={perfume.id} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                      />
                      {perfume.originalPrice && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-8 md:p-12">
                      <div className="mb-4">
                        <span className="inline-block bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full mb-3">
                          {perfume.family}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                          {perfume.name}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">{perfume.brand}</p>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                        {perfume.description}
                      </p>

                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-slate-800">
                          ${perfume.price.toLocaleString()}
                        </span>
                        {perfume.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${perfume.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => onViewDetails(perfume)}
                          className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                          Ver Detalles
                        </button>
                        <button
                          onClick={() => onAddToCart(perfume)}
                          disabled={perfume.stock === 0}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                          {perfume.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                        </button>
                      </div>

                      {perfume.stock > 0 && perfume.stock <= 3 && (
                        <p className="text-orange-600 text-sm mt-3 font-medium">
                          ¡Solo quedan {perfume.stock} unidades!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {bestsellers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>

          {/* Product Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} de {bestsellers.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}