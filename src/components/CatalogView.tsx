import React, { useMemo } from 'react';
import { Perfume } from '../types';
import FilterSidebar from './FilterSidebar';
import SortBar from './SortBar';
import PerfumeCard from './PerfumeCard';

interface CatalogViewProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
  isAdminMode?: boolean;
  onEditPerfume?: (perfume: Perfume) => void;
  recommendedPerfumes?: string[];
  selectedGenders: string[];
  selectedFamilies: string[];
  priceRange: [number, number];
  sortOption: string;
  onGenderChange: (genders: string[]) => void;
  onFamilyChange: (families: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (option: string) => void;
}

export default function CatalogView({ 
  perfumes, 
  onAddToCart, 
  onViewDetails, 
  isAdminMode = false,
  onEditPerfume,
  recommendedPerfumes = [],
  selectedGenders,
  selectedFamilies,
  priceRange,
  sortOption,
  onGenderChange,
  onFamilyChange,
  onPriceChange,
  onSortChange
}: CatalogViewProps) {

  const filteredAndSortedPerfumes = useMemo(() => {
    let filtered = perfumes.filter(perfume => {
      // Normalizamos valores en minúsculas para evitar problemas
      const gender = perfume.gender?.toLowerCase() || "";
      const family = perfume.product_type?.toLowerCase() || "";

      const genderMatch =
        selectedGenders.length === 0 ||
        selectedGenders.map(g => g.toLowerCase()).includes(gender);

      const familyMatch =
        selectedFamilies.length === 0 ||
        selectedFamilies.map(f => f.toLowerCase()).includes(family);

      const priceMatch =
        perfume.price >= priceRange[0] && perfume.price <= priceRange[1];

      return genderMatch && familyMatch && priceMatch;
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        case 'relevance':
        default:
          // Recomendaciones primero si existen
          if (recommendedPerfumes.length > 0) {
            const aIsRecommended = recommendedPerfumes.includes(a.title);
            const bIsRecommended = recommendedPerfumes.includes(b.title);
            if (aIsRecommended && !bIsRecommended) return -1;
            if (!aIsRecommended && bIsRecommended) return 1;
          }
          return 0;
      }
    });

    return filtered;
  }, [perfumes, selectedGenders, selectedFamilies, priceRange, sortOption, recommendedPerfumes]);

  const clearFilters = () => {
    onGenderChange([]);
    onFamilyChange([]);
    onPriceChange([30000, 80000]);
    onSortChange('relevance');
  };

  return (
    <section id="catalog" className="pt-28 md:pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nuestra Colección
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explora nuestros paisajes olfativos cuidadosamente seleccionados
          </p>
          {recommendedPerfumes.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 font-medium">
                ✨ Mostrando recomendaciones personalizadas basadas en tu quiz
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <FilterSidebar
              selectedGenders={selectedGenders}
              selectedFamilies={selectedFamilies}
              priceRange={priceRange}
              onGenderChange={onGenderChange}
              onFamilyChange={onFamilyChange}
              onPriceChange={onPriceChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            <SortBar
              totalResults={filteredAndSortedPerfumes.length}
              sortOption={sortOption}
              onSortChange={onSortChange}
            />

            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
              {filteredAndSortedPerfumes.map(perfume => (
                <PerfumeCard
                  key={perfume.id}
                  perfume={perfume}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isAdminMode={isAdminMode}
                  onEdit={onEditPerfume}
                />
              ))}
            </div>

            {filteredAndSortedPerfumes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No se encontraron productos que coincidan con tus filtros
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
