import React from 'react';

interface SortBarProps {
  totalResults: number;
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function SortBar({ totalResults, sortOption, onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="text-sm text-gray-600">
        Mostrando {totalResults} producto{totalResults !== 1 ? 's' : ''}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Ordenar por:</span>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="newest">Novedades</option>
        </select>
      </div>
    </div>
  );
}