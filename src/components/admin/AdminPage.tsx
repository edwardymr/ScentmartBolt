import React, { useState } from 'react';
import { Package, ShoppingBag, Plus, Palette, Settings, ArrowLeft } from 'lucide-react';
import { Perfume, OrderDetails } from '../../types';
import CatalogManagementPage from './CatalogManagementPage';
import OrderManagementPage from './OrderManagementPage';
import AddProductPage from './AddProductPage';
import MetaSyncPanel from './MetaSyncPanel';

interface AdminPageProps {
  perfumes: Perfume[];
  orders: OrderDetails[];
  onUpdatePerfume: (perfume: Perfume) => void;
  onAddPerfume: (perfume: Perfume) => void;
  onBackToStore: () => void;
}

const BASE_URL = 'https://www.misaromas.com'; // TODO: Configurar con dominio real
export default function AdminPage({ 
  perfumes, 
  orders, 
  onUpdatePerfume, 
  onAddPerfume, 
  onBackToStore 
}: AdminPageProps) {
  const [activeSection, setActiveSection] = useState('catalog');

  const menuItems = [
    { id: 'catalog', label: 'Gestión de Catálogo', icon: Package },
    { id: 'orders', label: 'Gestión de Pedidos', icon: ShoppingBag },
    { id: 'meta-sync', label: 'Sincronización Meta', icon: Settings },
    { id: 'add-product', label: 'Añadir Producto', icon: Plus },
    { id: 'brand', label: 'Identidad de Marca', icon: Palette },
    { id: 'integrations', label: 'Otras Integraciones', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'catalog':
        return (
          <CatalogManagementPage
            perfumes={perfumes}
            onUpdatePerfume={onUpdatePerfume}
          />
        );
      case 'orders':
        return <OrderManagementPage orders={orders} />;
      case 'meta-sync':
        return <MetaSyncPanel perfumes={perfumes} baseUrl={BASE_URL} />;
      case 'add-product':
        return <AddProductPage onAddPerfume={onAddPerfume} />;
      case 'brand':
        return <div className="p-8 text-center text-gray-500">Identidad de Marca - Próximamente</div>;
      case 'integrations':
        return <div className="p-8 text-center text-gray-500">Integraciones - Próximamente</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToStore}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a la Tienda
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-2xl font-serif font-bold text-slate-800">
                Panel de Administración
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <nav className="space-y-1">
                {menuItems.map(item => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-orange-100 text-orange-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md min-h-96">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}