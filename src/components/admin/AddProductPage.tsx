import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Perfume } from '../../types';

interface AddProductPageProps {
  onAddPerfume: (perfume: Perfume) => void;
}

export default function AddProductPage({ onAddPerfume }: AddProductPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    family: 'Floral',
    gender: 'Mujer',
    stock: '',
    volume: '100ml',
    concentration: 'Eau de Parfum'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPerfume: Perfume = {
      id: `perfume-${Date.now()}`,
      name: formData.name,
      brand: formData.brand,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      image: formData.image,
      description: formData.description,
      notes: {
        top: formData.topNotes.split(',').map(note => note.trim()),
        middle: formData.middleNotes.split(',').map(note => note.trim()),
        base: formData.baseNotes.split(',').map(note => note.trim())
      },
      family: formData.family,
      gender: formData.gender,
      stock: parseInt(formData.stock),
      volume: formData.volume,
      concentration: formData.concentration
    };

    onAddPerfume(newPerfume);
    
    // Reset form
    setFormData({
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      image: '',
      description: '',
      topNotes: '',
      middleNotes: '',
      baseNotes: '',
      family: 'Floral',
      gender: 'Mujer',
      stock: '',
      volume: '100ml',
      concentration: 'Eau de Parfum'
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">
          Añadir Nuevo Producto
        </h2>
        <p className="text-gray-600">
          Completa la información del nuevo perfume
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio Original (Opcional)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de la Imagen *
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe el paisaje olfativo que evoca este perfume..."
            />
          </div>

          {/* Fragrance Notes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Notas Olfativas</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas de Salida *
              </label>
              <input
                type="text"
                required
                value={formData.topNotes}
                onChange={(e) => handleInputChange('topNotes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Bergamota, Limón, Cassis (separadas por comas)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas de Corazón *
              </label>
              <input
                type="text"
                required
                value={formData.middleNotes}
                onChange={(e) => handleInputChange('middleNotes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Jazmín, Rosa, Peonía (separadas por comas)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas de Fondo *
              </label>
              <input
                type="text"
                required
                value={formData.baseNotes}
                onChange={(e) => handleInputChange('baseNotes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Almizcle, Cedro, Ámbar (separadas por comas)"
              />
            </div>
          </div>

          {/* Categories and Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Familia Olfativa *
              </label>
              <select
                required
                value={formData.family}
                onChange={(e) => handleInputChange('family', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Floral">Floral</option>
                <option value="Oriental">Oriental</option>
                <option value="Amaderado">Amaderado</option>
                <option value="Cítrico">Cítrico</option>
                <option value="Aromático">Aromático</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Género *
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Mujer">Mujer</option>
                <option value="Hombre">Hombre</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Volume and Concentration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volumen
              </label>
              <select
                value={formData.volume}
                onChange={(e) => handleInputChange('volume', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="30ml">30ml</option>
                <option value="50ml">50ml</option>
                <option value="75ml">75ml</option>
                <option value="100ml">100ml</option>
                <option value="125ml">125ml</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Concentración
              </label>
              <select
                value={formData.concentration}
                onChange={(e) => handleInputChange('concentration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Eau de Toilette">Eau de Toilette</option>
                <option value="Eau de Parfum">Eau de Parfum</option>
                <option value="Extrait de Parfum">Extrait de Parfum</option>
                <option value="Eau de Cologne">Eau de Cologne</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Añadir Producto al Catálogo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}