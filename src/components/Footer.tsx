import React, { useState } from "react";
import { Instagram, Mail, Phone, Key } from "lucide-react";
import LegalModal from "./LegalModal";
import { legalTexts } from "./legalTexts"; // 👈 importa aquí

interface FooterProps {
  onAdminAccess: () => void;
}

export default function Footer({ onAdminAccess }: FooterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const handleOpenModal = (type: string) => {
    let title = "";
    let content = "";

    switch (type) {
      case "terms":
        title = "Términos de Servicio";
        content = `Aquí van tus términos del servicio...`;
        break;
      case "privacy":
        title = "Política de Privacidad";
        content = `Aquí va tu política de privacidad...`;
        break;
      case "returns":
        title = "Política de Devoluciones";
        content = `Aquí va tu política de devoluciones...`;
        break;
    }

    setModalContent({ title, content });
    setModalOpen(true);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/logo-scentmart.png"
                alt="ScentMart Logo"
                className="h-10 w-10 rounded-md bg-white/10 p-1"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold leading-tight">
                  MisAromas
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Tu destino para paisajes olfativos únicos. Cada fragancia cuenta
              una historia, cada aroma despierta una emoción.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/misaromas.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/767986069737436"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="mailto:misaromas.store@gmail.com"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Envíanos un correo"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Quiz de Aromas
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Atención al Cliente</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a
                  href="tel:+573213200601"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                >
                  +57 321 320 0601
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a
                  href="mailto:misaromas.store@gmail.com"
                  className="text-gray-300 text-sm hover:text-amber-400 transition-colors"
                >
                  misaromas.store@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <button
                  onClick={() => handleOpenModal("terms")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Términos de Servicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("privacy")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("returns")}
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  Política de Devoluciones
                </button>
              </li>
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
            © 2025 MisAromas. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Modal */}
      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </footer>
  );
}
