import React from 'react';
import { X } from 'lucide-react';

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

  // 🔹 Guardamos en minúsculas, pero mostramos capitalizado
  const genders = ['Mujer', 'Hombre', 'Unisex'];
  const families = [
    { value: 'floral', label: 'Floral' },
    { value: 'oriental', label: 'Oriental' },
    { value: 'amaderado', label: 'Amaderado' },
    { value: 'citrico', label: 'Cítrico' },
    { value: 'aromatico', label: 'Aromático' }
  ];

  const hasActiveFilters =
    selectedGenders.length > 0 ||
    selectedFamilies.length > 0 ||
    priceRange[0] !== 30000 ||
    priceRange[1] !== 80000;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-4">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        {/* Género */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium whitespace-nowrap">Género:</span>
          <div className="flex gap-1">
            {genders.map(gender => (
              <button
                key={gender}
                onClick={() => handleGenderToggle(gender.toLowerCase())}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedGenders.includes(gender.toLowerCase())
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-gray-300"></div>

        {/* Familia */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium whitespace-nowrap">Familia:</span>
          <div className="flex gap-1 flex-wrap">
            {families.map(f => (
              <button
                key={f.value}
                onClick={() => handleFamilyToggle(f.value)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedFamilies.includes(f.value)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-gray-300"></div>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium whitespace-nowrap">Precio:</span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="30000"
              max="80000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
              ${Math.round(priceRange[1]/1000)}K
            </span>
          </div>
        </div>

        {hasActiveFilters && (
          <>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-xs whitespace-nowrap"
            >
              <X className="w-3 h-3" />
              Limpiar
            </button>
          </>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Activos:</span>
          <div className="flex flex-wrap gap-1">
            {selectedGenders.map(gender => (
              <span key={gender} className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                {gender}
                <button
                  onClick={() => handleGenderToggle(gender)}
                  className="hover:text-orange-900"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {selectedFamilies.map(family => (
              <span key={family} className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                {family}
                <button
                  onClick={() => handleFamilyToggle(family)}
                  className="hover:text-orange-900"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {(priceRange[0] !== 30000 || priceRange[1] !== 80000) && (
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                Hasta ${Math.round(priceRange[1]/1000)}K
                <button
                  onClick={() => onPriceChange([30000, 80000])}
                  className="hover:text-orange-900"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
