import React, { useState } from 'react';
import { ShoppingCart, Edit3 } from 'lucide-react';
import { Perfume } from '../types';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
  isAdminMode?: boolean;
  onEdit?: (perfume: Perfume) => void;
}

export default function PerfumeCard({ 
  perfume, 
  onAddToCart, 
  onViewDetails, 
  isAdminMode = false,
  onEdit 
}: PerfumeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onViewDetails(perfume);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdminMode && onEdit) {
      onEdit(perfume);
    } else {
      onAddToCart(perfume);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Stock Badge */}
      {perfume.stock === 0 && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
            Agotado
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {perfume.originalPrice && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
            -{Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)}%
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-40 sm:h-48 md:h-64 bg-gray-100 overflow-hidden">
        <img 
          src={perfume.image_link} 
          alt={perfume.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
            <button
              onClick={handleActionClick}
              disabled={perfume.stock === 0 && !isAdminMode}
              className={`w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {isAdminMode ? (
                <>
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Editar Producto</span>
                  <span className="sm:hidden">Editar</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  {perfume.stock === 0 ? 'Agotado' : (
                    <>
                      <span className="hidden sm:inline">Añadir al Carrito</span>
                      <span className="sm:hidden">Añadir</span>
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base lg:text-lg group-hover:text-orange-500 transition-colors line-clamp-1">
            {perfume.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">{perfume.brand}</p>
        </div>

        <div className="mb-2 sm:mb-3">
          <span className="inline-block bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
            {perfume.family}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-800">
              {formatPrice(perfume.price)}
            </span>
            {perfume.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPrice(perfume.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-500 text-right sm:text-left">
            Stock: {perfume.stock}
          </div>
        </div>
      </div>
    </div>
  );
}