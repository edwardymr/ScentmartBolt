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
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Agotado
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {perfume.originalPrice && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100)}%
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img 
          src={perfume.image} 
          alt={perfume.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleActionClick}
              disabled={perfume.stock === 0 && !isAdminMode}
              className={`w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {isAdminMode ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  Editar Producto
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {perfume.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-slate-800 text-lg group-hover:text-orange-500 transition-colors">
            {perfume.name}
          </h3>
          <p className="text-gray-600 text-sm">{perfume.brand}</p>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
            {perfume.family}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800">
              {formatPrice(perfume.price)}
            </span>
            {perfume.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(perfume.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Stock: {perfume.stock}
          </div>
        </div>
      </div>
    </div>
  );
}