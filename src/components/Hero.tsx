import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenQuiz: () => void;
}

export default function Hero({ onOpenQuiz }: HeroProps) {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg)'
      }}
    >
      <div className="text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Tu Aroma, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            Tu Historia
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Descubre paisajes olfativos únicos que evocan recuerdos y despiertan emociones. 
          Cada fragancia cuenta una historia, ¿cuál será la tuya?
        </p>
        <button 
          onClick={onOpenQuiz}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5" />
          Descubre tu Aroma Ideal
        </button>
      </div>
    </div>
  );
}