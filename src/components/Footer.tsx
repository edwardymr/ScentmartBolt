import React from 'react';
import { Instagram, Mail, Phone, MapPin, Shield, Key } from 'lucide-react';

interface FooterProps {
  onAdminAccess: () => void;
}

export default function Footer({ onAdminAccess }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo-perfumes-instagram_post_1080x1080 (1).png" 
                alt="ScentMart Logo" 
               className="h-10 w-10 rounded-md bg-white/10 p-1"
              />
             <div className="flex flex-col">
               <span className="text-xl font-serif font-bold leading-tight">ScentMart</span>
               <span className="text-amber-400 text-xs font-medium tracking-wide">PERFUMES</span>
             </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Tu destino para paisajes olfativos únicos. Cada fragancia cuenta una historia, 
              cada aroma despierta una emoción.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Inicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Catálogo</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Quiz de Aromas</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Atención al Cliente</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="text-gray-300 text-sm">+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="text-gray-300 text-sm">info@scentmart.co</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-gray-300 text-sm">Santa Marta, Colombia</span>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">Política de Privacidad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">Política de Devoluciones</a></li>
            </ul>
            
            <button
              onClick={onAdminAccess}
              className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors text-sm group"
            >
              <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Acceso Administrador
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ScentMart Perfumes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}