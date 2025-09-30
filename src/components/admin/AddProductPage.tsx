// src/pages/admin/AddProductPage.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      title: formData.title,
      description: formData.description,
      availability: parseInt(formData.stock) > 0 ? 'in stock' : 'out of stock',
      condition: formData.condition,
      price: `${formData.price} COP`, // 👈 en tu tabla está con "COP"
      link: `https://misaromas.com/product/${Date.now()}`,
      image_link: formData.image_link,
      brand: formData.brand,
      product_type: formData.family,
      google_product_category: 469, // 👈 valor fijo como en tus registros
      gender: formData.gender.toLowerCase(), // mujer/hombre/unisex
      size: formData.size,
      color: formData.family, // opcional, tu tabla tiene este campo
      custom_label_0: '',
      custom_label_1: formData.topNotes,
      custom_label_2: formData.middleNotes,
      custom_label_3: formData.baseNotes,
      custom_label_4: formData.family,
      sale_price: null,
      sale_price_effective_date: null,
      shipping: 'CO::Standard:0 COP',
      shipping_weight: '0.5 kg'
    };

    const { error } = await supabase.from('products').insert([newProduct]);

    if (error) {
      console.error('❌ Error al insertar producto:', error.message);
      alert('Hubo un error al agregar el producto.');
    } else {
      alert('✅ Producto agregado con éxito');
      setFormData({
        title: '',
        brand: '',
        price: '',
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
    }
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio (COP) *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* URL Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de la Imagen *
            </label>
            <input
              type="url"
              required
              value={formData.image_link}
              onChange={(e) => handleInputChange('image_link', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://misaromas.com/images/products/ejemplo.jpg"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Notas */}
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Notas de salida"
              value={formData.topNotes}
              onChange={(e) => handleInputChange('topNotes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              required
              placeholder="Notas de corazón"
              value={formData.middleNotes}
              onChange={(e) => handleInputChange('middleNotes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              required
              placeholder="Notas de fondo"
              value={formData.baseNotes}
              onChange={(e) => handleInputChange('baseNotes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Familia, Género y Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              required
              value={formData.family}
              onChange={(e) => handleInputChange('family', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Floral">Floral</option>
              <option value="Oriental">Oriental</option>
              <option value="Amaderado">Amaderado</option>
              <option value="Cítrico">Cítrico</option>
              <option value="Aromático">Aromático</option>
            </select>
            <select
              required
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Mujer">Mujer</option>
              <option value="Hombre">Hombre</option>
              <option value="Unisex">Unisex</option>
            </select>
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Tamaño */}
          <select
            value={formData.size}
            onChange={(e) => handleInputChange('size', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="30ml">30ml</option>
            <option value="50ml">50ml</option>
            <option value="75ml">75ml</option>
            <option value="100ml">100ml</option>
            <option value="125ml">125ml</option>
          </select>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Añadir Producto
          </button>
        </div>
      </form>
    </div>
  );
}
