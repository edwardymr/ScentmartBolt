import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { Perfume } from '../../types';
import PerfumeCard from '../PerfumeCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export default function SearchModal({ 
  isOpen, 
  onClose, 
  perfumes, 
  onAddToCart, 
  onViewDetails 
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return perfumes.filter(perfume =>
      perfume.title.toLowerCase().includes(term) ||
      perfume.brand.toLowerCase().includes(term) ||
      perfume.family.toLowerCase().includes(term) ||
      perfume.description.toLowerCase().includes(term)
    );
  }, [perfumes, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar perfumes, marcas, familias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-lg border-none outline-none placeholder-gray-500"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {searchTerm.trim() === '' ? (
            <p className="text-gray-500 text-center py-8">
              Escribe para buscar en nuestro catálogo
            </p>
          ) : searchResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No se encontraron resultados para "{searchTerm}"
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map(perfume => (
                <div key={perfume.id} onClick={onClose}>
                  <PerfumeCard
                    perfume={perfume}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}