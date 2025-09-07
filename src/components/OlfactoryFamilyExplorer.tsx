import React from 'react';
import { Flower2, Crown, TreePine, Sun, Leaf } from 'lucide-react';

interface OlfactoryFamilyExplorerProps {
  onNavigateToCatalog: (family?: string) => void;
}

const families = [
  {
    name: 'Floral',
    icon: Flower2,
    description: 'Elegancia y feminidad en cada nota',
    color: 'from-pink-500 to-rose-600'
  },
  {
    name: 'Oriental',
    icon: Crown,
    description: 'Misterio y sensualidad oriental',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    name: 'Amaderado',
    icon: TreePine,
    description: 'Calidez y profundidad natural',
    color: 'from-amber-600 to-orange-700'
  },
  {
    name: 'Cítrico',
    icon: Sun,
    description: 'Frescura y vitalidad energizante',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    name: 'Aromático',
    icon: Leaf,
    description: 'Hierbas y especias naturales',
    color: 'from-green-500 to-emerald-600'
  }
];

export default function OlfactoryFamilyExplorer({ onNavigateToCatalog }: OlfactoryFamilyExplorerProps) {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Explora las Familias Olfativas
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Cada familia olfativa cuenta una historia diferente. Descubre cuál resuena contigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {families.map((family) => {
            const IconComponent = family.icon;
            return (
              <button
                key={family.name}
                onClick={() => onNavigateToCatalog(family.name)}
                className="group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${family.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {family.name}
                  </h3>
                  
                  <p className="text-white/90 text-sm leading-relaxed">
                    {family.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}