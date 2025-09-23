import React, { useState } from 'react';
import { X, ShoppingCart, Save } from 'lucide-react';
import { Perfume } from '../../types';

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (perfume: Perfume) => void;
  isAdminMode?: boolean;
  onSave?: (perfume: Perfume) => void;
}

export default function PerfumeDetailModal({ 
  perfume, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isAdminMode = false,
  onSave 
}: PerfumeDetailModalProps) {
  const [editedPerfume, setEditedPerfume] = useState<Perfume | null>(null);

  React.useEffect(() => {
    if (isAdminMode && perfume) {
      setEditedPerfume({ ...perfume });
    }
  }, [isAdminMode, perfume]);

  if (!isOpen || !perfume) return null;

  const currentPerfume = isAdminMode ? (editedPerfume || perfume) : perfume;

  const handleSave = () => {
    if (editedPerfume && onSave) {
      onSave(editedPerfume);
      onClose();
    }
  };

  const updateField = (field: string, value: any) => {
    if (editedPerfume) {
      setEditedPerfume({ ...editedPerfume, [field]: value });
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif font-bold text-slate-800">
            {isAdminMode ? 'Editar Producto' : 'Detalles del Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img 
                src={currentPerfume.image_link}
                alt={currentPerfume.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {isAdminMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de Imagen
                </label>
                <input
                  type="text"
                  value={editedPerfume?.image_link || ''}
                  onChange={(e) => updateField('image_link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              {isAdminMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={editedPerfume?.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input
                      type="text"
                      value={editedPerfume?.brand || ''}
                      onChange={(e) => updateField('brand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-serif font-bold text-slate-800 mb-2">
                    {currentPerfume.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">{currentPerfume.brand}</p>
                </>
              )}
            </div>

            {/* Price and Stock */}
            <div className="flex items-center gap-4">
              {isAdminMode ? (
                <div className="flex gap-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input
                      type="number"
                      value={editedPerfume?.price || 0}
                      onChange={(e) => updateField('price', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={editedPerfume?.stock || 0}
                      onChange={(e) => updateField('stock', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-slate-800">
                      {formatPrice(currentPerfume.price)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Stock: {currentPerfume.stock} unidades
                  </div>
                </>
              )}
            </div>

            {/* Family and Gender */}
            <div className="flex gap-4">
              {isAdminMode ? (
                <>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Familia</label>
                    <input
                      type="text"
                      value={editedPerfume?.product_type || ''}
                      onChange={(e) => updateField('product_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                    <select
                      value={editedPerfume?.gender || ''}
                      onChange={(e) => updateField('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Mujer">Mujer</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {currentPerfume.product_type}
                  </span>
                  <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                    {currentPerfume.gender}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Descripción</h4>
              {isAdminMode ? (
                <textarea
                  value={editedPerfume?.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {currentPerfume.description}
                </p>
              )}
            </div>

            {/* Fragrance Notes (only if exist) */}
            {!isAdminMode && currentPerfume.notes && (
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Notas Olfativas</h4>
                <div className="space-y-3">
                  {currentPerfume.notes.top && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Notas de Salida:</span>
                      <p className="text-gray-700">{currentPerfume.notes.top.join(', ')}</p>
                    </div>
                  )}
                  {currentPerfume.notes.middle && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Notas de Corazón:</span>
                      <p className="text-gray-700">{currentPerfume.notes.middle.join(', ')}</p>
                    </div>
                  )}
                  {currentPerfume.notes.base && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Notas de Fondo:</span>
                      <p className="text-gray-700">{currentPerfume.notes.base.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              {isAdminMode ? (
                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </button>
              ) : (
                <button
                  onClick={() => onAddToCart(currentPerfume)}
                  disabled={currentPerfume.stock === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {currentPerfume.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
