import React from 'react';
import { Perfume } from '../types';
import PerfumeCard from './PerfumeCard';

interface BestsellersSectionProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export default function BestsellersSection({ perfumes, onAddToCart, onViewDetails }: BestsellersSectionProps) {
  // Get bestsellers (products with lower stock or higher prices, indicating popularity)
  const bestsellers = perfumes
    .filter(p => p.stock > 0)
    .sort((a, b) => {
      // Prioritize products with original price (on sale) and lower stock
      const aScore = (a.originalPrice ? 2 : 0) + (10 - a.stock);
      const bScore = (b.originalPrice ? 2 : 0) + (10 - b.stock);
      return bScore - aScore;
    })
    .slice(0, 4);

  return (
    <section id="bestsellers" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Los Más Vendidos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre las fragancias favoritas de nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(perfume => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}