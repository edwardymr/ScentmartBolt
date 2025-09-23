import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Perfume } from '../../types';

interface AddProductPageProps {
  onAddPerfume: (perfume: Perfume) => void;
}

export default function AddProductPage({ onAddPerfume }: AddProductPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    originalPrice: '',
    image_link: '',
    description: '',
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    family: 'Floral',
    gender: 'Mujer',
    stock: '',
    size: '100ml',
    condition: 'new'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPerfume: Perfume = {
      id: `perfume-${Date.now()}`,
      title: formData.title,
      brand: formData.brand,
      price: parseInt(formData.price),
      description: formData.description,
      image_link: formData.image_link,
      condition: formData.condition,
      availability: formData.stock && parseInt(formData.stock) > 0 ? "in stock" : "out of stock",
      stock: parseInt(formData.stock) || 0,
      product_type: formData.family,
      gender: formData.gender,
      size: formData.size,
      custom_label_1: formData.topNotes,
      custom_label_2: formData.middleNotes,
      custom_label_3: formData.baseNotes,
      custom_label_0: '',
      custom_label_4: ''
    };

    onAddPerfume(newPerfume);
    
    // Reset form
    setFormData({
      title: '',
      brand: '',
      price: '',
      originalPrice: '',
      image_link: '',
      description: '',
      topNotes: '',
      middleNotes: '',
      baseNotes: '',
      family: 'Floral',
      gender: 'Mujer',
      stock: '',
      size: '100ml',
      condition: 'new'
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
          {/* Nombre y Marca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
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

          {/* Precio */}
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
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de la Imagen *
            </label>
            <input
              type="url"
              required
              value={formData.image_link}
              onChange={(e) => handleInputChange('image_link', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://misaromas.com/images/producto.jpg"
            />
          </div>

          {/* Descripción */}
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

          {/* Notas Olfativas */}
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
                placeholder="Bergamota, Limón, Cassis"
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
                placeholder="Jazmín, Rosa, Peonía"
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
                placeholder="Almizcle, Cedro, Ámbar"
              />
            </div>
          </div>

          {/* Familia, Género y Stock */}
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

          {/* Volumen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño / Volumen
            </label>
            <select
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="30ml">30ml</option>
              <option value="50ml">50ml</option>
              <option value="75ml">75ml</option>
              <option value="100ml">100ml</option>
              <option value="125ml">125ml</option>
            </select>
          </div>

          {/* Botón */}
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
