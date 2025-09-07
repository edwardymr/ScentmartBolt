import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  selectedGenders: string[];
  selectedFamilies: string[];
  priceRange: [number, number];
  onGenderChange: (genders: string[]) => void;
  onFamilyChange: (families: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  selectedGenders,
  selectedFamilies,
  priceRange,
  onGenderChange,
  onFamilyChange,
  onPriceChange,
  onClearFilters
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    family: true,
    price: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleGenderToggle = (gender: string) => {
    const updated = selectedGenders.includes(gender)
      ? selectedGenders.filter(g => g !== gender)
      : [...selectedGenders, gender];
    onGenderChange(updated);
  };

  const handleFamilyToggle = (family: string) => {
    const updated = selectedFamilies.includes(family)
      ? selectedFamilies.filter(f => f !== family)
      : [...selectedFamilies, family];
    onFamilyChange(updated);
  };

  const genders = ['Mujer', 'Hombre', 'Unisex'];
  const families = ['Floral', 'Oriental', 'Amaderado', 'Cítrico', 'Aromático'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
        <button
          onClick={onClearFilters}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Gender Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('gender')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-slate-700">Género</span>
          {expandedSections.gender ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.gender && (
          <div className="mt-3 space-y-2">
            {genders.map(gender => (
              <label key={gender} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(gender)}
                  onChange={() => handleGenderToggle(gender)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Family Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('family')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-slate-700">Familia Olfativa</span>
          {expandedSections.family ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.family && (
          <div className="mt-3 space-y-2">
            {families.map(family => (
              <label key={family} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFamilies.includes(family)}
                  onChange={() => handleFamilyToggle(family)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{family}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-slate-700">Rango de Precio</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="25000"
              max="75000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${((priceRange[1] - 25000) / (75000 - 25000)) * 100}%, #e5e7eb ${((priceRange[1] - 25000) / (75000 - 25000)) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}