import React from 'react';
import { Heart, Award, Truck, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: 'Pasión por la Perfumería',
      description: 'Cada fragancia es cuidadosamente seleccionada para crear experiencias olfativas únicas'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Trabajamos solo con las mejores marcas y perfumes de alta calidad'
    },
    {
      icon: Truck,
      title: 'Envíos Gratis',
      description: 'Envío gratuito en Santa Marta para que disfrutes sin preocupaciones'
    },
    {
      icon: Sparkles,
      title: 'Experiencia Personalizada',
      description: 'Nuestro quiz con IA te ayuda a encontrar el perfume perfecto para ti'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Sobre ScentMart
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos más que una tienda de perfumes. Creamos paisajes olfativos que despiertan 
            emociones y evocan recuerdos. Cada fragancia cuenta una historia única, 
            y estamos aquí para ayudarte a encontrar la tuya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
                  <IconComponent className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}