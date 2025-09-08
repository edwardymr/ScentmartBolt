import React from 'react';
import { CheckCircle, Package, Clock, Home } from 'lucide-react';
import { OrderDetails } from '../types';

interface ThankYouPageProps {
  orderDetails: OrderDetails;
  onBackToHome: () => void;
}

export default function ThankYouPage({ orderDetails, onBackToHome }: ThankYouPageProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold mb-2">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-green-100">
              Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Order Info */}
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Detalles del Pedido
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número de Pedido:</span>
                    <span className="font-semibold">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-semibold">
                      {new Date(orderDetails.orderDate).toLocaleDateString('es-CO')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-orange-500 text-lg">
                      {formatPrice(orderDetails.total)}
                    </span>
                  </div>
                  {orderDetails.shippingCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío:</span>
                      <span className="font-semibold">{formatPrice(orderDetails.shippingCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de Pago:</span>
                    <span className="font-semibold">{orderDetails.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Información de Entrega
                </h2>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Nombre:</span>
                    <div className="font-semibold">{orderDetails.customerInfo.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Dirección:</span>
                    <div className="font-semibold">{orderDetails.customerInfo.address}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Ciudad:</span>
                    <div className="font-semibold">{orderDetails.customerInfo.city}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">WhatsApp:</span>
                    <div className="font-semibold">{orderDetails.customerInfo.whatsapp}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Productos Ordenados
              </h3>
              <div className="space-y-3">
                {orderDetails.items.map(item => (
                  <div key={item.perfume.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.perfume.name}</h4>
                      <p className="text-gray-600 text-sm">{item.perfume.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Cantidad: {item.quantity}</div>
                      <div className="font-semibold">
                        {formatPrice(item.perfume.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">¿Qué sigue?</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• ✅ Pedido registrado en nuestro sistema</li>
                <li>• ✅ Notificación enviada a nuestro WhatsApp (+57 321 320 0601)</li>
                <li>• 📞 Te contactaremos por WhatsApp para confirmar la entrega</li>
                <li>• Tu pedido llegará en 1-2 días hábiles sin costo adicional</li>
                <li>• Podrás pagar al momento de recibir tu pedido</li>
                <li>• 📧 Configuración de email automático próximamente</li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={onBackToHome}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
              >
                <Home className="w-5 h-5" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}