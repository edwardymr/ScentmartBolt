import React, { useState } from 'react';
import { Edit3, RefreshCw } from 'lucide-react';
import { Perfume } from '../../types';
import PerfumeDetailModal from '../modals/PerfumeDetailModal';

interface CatalogManagementPageProps {
  perfumes: Perfume[];
  onUpdatePerfume: (perfume: Perfume) => void;
}

export default function CatalogManagementPage({ perfumes, onUpdatePerfume }: CatalogManagementPageProps) {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEditPerfume = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsDetailModalOpen(true);
  };

  const handleSavePerfume = (updatedPerfume: Perfume) => {
    onUpdatePerfume(updatedPerfume);
    setIsDetailModalOpen(false);
    setSelectedPerfume(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">
            Gestión de Catálogo
          </h2>
          <p className="text-gray-600">
            Administra tu inventario de perfumes
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <RefreshCw className="w-4 h-4" />
          Sincronizar Catálogo
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Producto</th>
              <th className="text-left p-4 font-semibold text-gray-700">Precio</th>
              <th className="text-left p-4 font-semibold text-gray-700">Stock</th>
              <th className="text-left p-4 font-semibold text-gray-700">Familia</th>
              <th className="text-left p-4 font-semibold text-gray-700">Estado</th>
              <th className="text-left p-4 font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {perfumes.map(perfume => (
              <tr key={perfume.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={perfume.localImageUrl || perfume.imageUrl || perfume.image}
                      alt={perfume.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{perfume.name}</div>
                      <div className="text-sm text-gray-600">{perfume.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-semibold">{formatPrice(perfume.price)}</div>
                  {perfume.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(perfume.originalPrice)}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    perfume.stock === 0 
                      ? 'bg-red-100 text-red-700'
                      : perfume.stock < 5
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {perfume.stock} unidades
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                    {perfume.family}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    perfume.stock > 0 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {perfume.stock > 0 ? 'Disponible' : 'Agotado'}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditPerfume(perfume)}
                    className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <PerfumeDetailModal
        perfume={selectedPerfume}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPerfume(null);
        }}
        onAddToCart={() => {}}
        isAdminMode={true}
        onSave={handleSavePerfume}
      />
    </div>
  );
}