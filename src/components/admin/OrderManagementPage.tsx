import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Package } from 'lucide-react';
import { OrderDetails } from '../../types';

interface OrderManagementPageProps {
  orders: OrderDetails[];
}

export default function OrderManagementPage({ orders }: OrderManagementPageProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No hay pedidos aún
        </h3>
        <p className="text-gray-500">
          Los pedidos aparecerán aquí una vez que los clientes realicen compras
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">
          Gestión de Pedidos
        </h2>
        <p className="text-gray-600">
          Total de pedidos: {orders.length}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Order Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Pedido {order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : order.status === 'Entregado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-lg text-orange-500">
                      {formatPrice(order.total)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details (Expandable) */}
            {expandedOrders.has(order.id) && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Customer Information */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">
                      Información del Cliente
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Nombre:</span>
                        <span className="ml-2 font-medium">{order.customerInfo.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{order.customerInfo.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">WhatsApp:</span>
                        <span className="ml-2 font-medium">{order.customerInfo.whatsapp}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dirección:</span>
                        <span className="ml-2 font-medium">{order.customerInfo.address}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ciudad:</span>
                        <span className="ml-2 font-medium">{order.customerInfo.city}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Método de Pago:</span>
                        <span className="ml-2 font-medium">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">
                      Productos Ordenados
                    </h4>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.perfume.id} className="flex items-center gap-3 p-3 bg-white rounded-md">
                          <img
                            src={item.perfume.image_link}
                            alt={item.perfume.title}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.perfume.title}</div>
                            <div className="text-xs text-gray-600">
                              {item.quantity} x {formatPrice(item.perfume.price)}
                            </div>
                          </div>
                          <div className="font-semibold text-sm">
                            {formatPrice(item.perfume.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      <PerfumeDetailModal
        perfume={selectedPerfume}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPerfume(null);
        }}
        onAddToCart={() => {}}
        isAdminMode={true}
        onSave={handleSavePerfume}
      />
    </div>
  );
}