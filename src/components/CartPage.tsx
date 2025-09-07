import React from 'react';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (perfumeId: string, quantity: number) => void;
  onRemoveFromCart: (perfumeId: string) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
}

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onContinueShopping,
  onProceedToCheckout
}: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.perfume.price * item.quantity), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              Descubre nuestros paisajes olfativos y encuentra tu fragancia ideal
            </p>
            <button
              onClick={onContinueShopping}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={onContinueShopping}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar Comprando
          </button>
          <h1 className="text-4xl font-serif font-bold text-slate-800">
            Carrito de Compras
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.perfume.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={item.perfume.localImageUrl || item.perfume.imageUrl || item.perfume.image}
                    alt={item.perfume.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {item.perfume.name}
                    </h3>
                    <p className="text-gray-600">{item.perfume.brand}</p>
                    <p className="text-orange-500 font-semibold mt-1">
                      {formatPrice(item.perfume.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.perfume.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => onUpdateQuantity(item.perfume.id, item.quantity + 1)}
                      disabled={item.quantity >= item.perfume.stock}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onRemoveFromCart(item.perfume.id)}
                      className="ml-4 text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Resumen del Pedido
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-orange-500">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}