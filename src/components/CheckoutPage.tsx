import React, { useState } from 'react';
import { ArrowLeft, Package, CreditCard, Smartphone, Truck, MapPin } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (orderDetails: OrderDetails) => void;
}

export default function CheckoutPage({ cartItems, onBack, onPlaceOrder }: CheckoutPageProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    city: '',
    whatsapp: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingCost, setShippingCost] = useState(0);
  const [isOutsideSantaMarta, setIsOutsideSantaMarta] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.perfume.price * item.quantity), 0);
  const total = subtotal + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    const updatedInfo = { ...customerInfo, [field]: value };
    setCustomerInfo(updatedInfo);
    
    // Check if city is outside Santa Marta
    if (field === 'city') {
      const isOutside = !value.toLowerCase().includes('santa marta') && value.trim() !== '';
      setIsOutsideSantaMarta(isOutside);
      setShippingCost(isOutside ? 16000 : 0);
      
      // Reset payment method if city changes
      if (isOutside) {
        setPaymentMethod('transfer');
      } else {
        setPaymentMethod('cod');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderDetails: OrderDetails = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      customerInfo,
      paymentMethod: paymentMethod === 'cod' ? 'Pagar al Recibir' : 'Transferencia Bancaria',
      total: total,
      shippingCost,
      orderDate: new Date().toISOString(),
      status: 'Pendiente'
    };

    onPlaceOrder(orderDetails);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const isFormValid = customerInfo.name && customerInfo.address && customerInfo.city && 
                     customerInfo.whatsapp && customerInfo.email;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Carrito
          </button>
          <h1 className="text-4xl font-serif font-bold text-slate-800">
            Finalizar Compra
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    Información de Entrega
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección de Entrega *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        isOutsideSantaMarta ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Santa Marta, Barranquilla, Bogotá..."
                    />
                    {isOutsideSantaMarta && (
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
                          <Truck className="w-4 h-4" />
                          Envío Nacional
                        </div>
                        <p className="text-blue-700 text-sm">
                          Costo de envío: <span className="font-semibold">{formatPrice(16000)}</span>
                        </p>
                        <p className="text-blue-600 text-xs mt-1">
                          El pago se realizará por transferencia bancaria vía WhatsApp
                        </p>
                      </div>
                    )}
                    {!isOutsideSantaMarta && customerInfo.city && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-1">
                          <MapPin className="w-4 h-4" />
                          Envío Local
                        </div>
                        <p className="text-green-700 text-sm font-semibold">
                          ¡Envío GRATIS en Santa Marta!
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+57 321 320 0601"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="ejemplo@gmail.com"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold text-slate-800">
                    Método de Pago
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => !isOutsideSantaMarta && setPaymentMethod(e.target.value)}
                      disabled={isOutsideSantaMarta}
                      className="w-4 h-4 text-orange-500"
                    />
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Pagar al Recibir</div>
                      <div className="text-sm text-gray-600">
                        {isOutsideSantaMarta ? 'Solo disponible en Santa Marta' : 'Paga cuando recibas tu pedido'}
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${
                    isOutsideSantaMarta 
                      ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                      : 'border-gray-200 cursor-not-allowed opacity-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      disabled={!isOutsideSantaMarta}
                      className="w-4 h-4 text-orange-500"
                    />
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Transferencia Bancaria</div>
                      <div className="text-sm text-gray-600">
                        {isOutsideSantaMarta ? 'Proceso vía WhatsApp' : 'Solo para envíos nacionales'}
                      </div>
                    </div>
                  </label>
                  
                  {isOutsideSantaMarta && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-2">📱 Proceso de Pago Nacional</h4>
                      <ol className="text-sm text-amber-700 space-y-1">
                        <li>1. Confirma tu pedido aquí</li>
                        <li>2. Te contactaremos por WhatsApp</li>
                        <li>3. Te enviaremos los datos bancarios</li>
                        <li>4. Realizas la transferencia</li>
                        <li>5. Envías el comprobante por WhatsApp</li>
                        <li>6. Procesamos tu envío inmediatamente</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">
                  Resumen del Pedido
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.perfume.id} className="flex items-start gap-3">
                      <img
                        src={item.perfume.image}
                        alt={item.perfume.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.perfume.name}</h4>
                        <p className="text-gray-600 text-xs">{item.perfume.brand}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-semibold text-sm">
                            {formatPrice(item.perfume.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                      {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {isOutsideSantaMarta && (
                    <div className="text-xs text-blue-600 italic">
                      Envío nacional a {customerInfo.city}
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-orange-500">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Confirmar Mi Pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}