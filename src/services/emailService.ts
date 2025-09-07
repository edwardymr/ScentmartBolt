import emailjs from 'emailjs-com';
import { OrderDetails } from '../types';

const WHATSAPP_BUSINESS_NUMBER = '573213200601';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_izdlxnw';
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_di24rwu';
const EMAILJS_BUSINESS_TEMPLATE_ID = 'template_business_notification'; // Necesitarás crear este template
const EMAILJS_PUBLIC_KEY = 'cbMBtEKYL9MrUE46r';

export const emailService = {
  async sendOrderConfirmationEmail(orderDetails: OrderDetails): Promise<void> {
    try {
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        }).format(price);
      };

      const itemsList = orderDetails.items.map(item => 
        `• ${item.perfume.name} (${item.perfume.brand}) - Cantidad: ${item.quantity} - ${formatPrice(item.perfume.price * item.quantity)}`
      ).join('\n');

      // Email para el cliente
      const customerEmailParams = {
        to_email: orderDetails.customerInfo.email,
        to_name: orderDetails.customerInfo.name,
        customer_name: orderDetails.customerInfo.name,
        order_number: orderDetails.id,
        order_date: new Date(orderDetails.orderDate).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        order_items: orderDetails.items.map(item => 
          `• ${item.perfume.name} (${item.perfume.brand}) - Cantidad: ${item.quantity} - ${formatPrice(item.perfume.price * item.quantity)}`
        ).join('\n'),
        subtotal: formatPrice(orderDetails.total),
        shipping_cost: 'GRATIS',
        total_amount: formatPrice(orderDetails.total),
        shipping_address: orderDetails.customerInfo.address,
        shipping_city: orderDetails.customerInfo.city,
        customer_whatsapp: orderDetails.customerInfo.whatsapp,
        customer_email: orderDetails.customerInfo.email,
        payment_method: orderDetails.paymentMethod
      };

      console.log('📧 Enviando email de confirmación al cliente:', customerEmailParams);
      
      // Enviar email de confirmación
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, customerEmailParams, EMAILJS_PUBLIC_KEY);
      console.log('✅ Email de confirmación enviado exitosamente');
      
      // Email para el negocio (usando el mismo template por ahora)
      const businessEmailParams = {
        to_email: 'scentmartperfumes@gmail.com',
        to_name: 'ScentMart Perfumes',
        customer_name: orderDetails.customerInfo.name,
        order_number: orderDetails.id,
        order_date: new Date(orderDetails.orderDate).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        order_items: itemsList,
        subtotal: formatPrice(orderDetails.total),
        shipping_cost: 'GRATIS',
        total_amount: formatPrice(orderDetails.total),
        shipping_address: orderDetails.customerInfo.address,
        shipping_city: orderDetails.customerInfo.city,
        customer_whatsapp: orderDetails.customerInfo.whatsapp,
        customer_email: orderDetails.customerInfo.email,
        payment_method: orderDetails.paymentMethod
      };

      console.log('📧 Enviando notificación al negocio:', businessEmailParams);
      
      // Enviar notificación al negocio
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, businessEmailParams, EMAILJS_PUBLIC_KEY);
      console.log('✅ Notificación enviada exitosamente al negocio');
      
    } catch (error) {
      console.error('❌ Error enviando email de confirmación:', error);
      throw error;
    }
  },

  async sendWhatsAppNotification(orderDetails: OrderDetails): Promise<void> {
    try {
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        }).format(price);
      };

      // Create detailed WhatsApp message
      const itemsList = orderDetails.items.map(item => 
        `• ${item.perfume.name} (${item.perfume.brand})\n  Cantidad: ${item.quantity} - ${formatPrice(item.perfume.price * item.quantity)}`
      ).join('\n\n');

      const whatsappMessage = `🌸 *NUEVO PEDIDO - SCENTMART* 🌸

📋 *Detalles del Pedido:*
• Número: ${orderDetails.id}
• Fecha: ${new Date(orderDetails.orderDate).toLocaleDateString('es-CO', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

👤 *Información del Cliente:*
• Nombre: ${orderDetails.customerInfo.name}
• Email: ${orderDetails.customerInfo.email}
• WhatsApp: ${orderDetails.customerInfo.whatsapp}

📍 *Dirección de Entrega:*
• ${orderDetails.customerInfo.address}
• ${orderDetails.customerInfo.city}

🛍️ *Productos Ordenados:*
${itemsList}

💰 *Resumen de Pago:*
• Método: ${orderDetails.paymentMethod}
• Total: *${formatPrice(orderDetails.total)}*

✅ Estado: ${orderDetails.status}

---
*ScentMart Perfumes*
Tu Aroma, Tu Historia 🌸`;

      // Send WhatsApp message to business number
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
      
      console.log('📱 Enviando notificación WhatsApp:', {
        to: WHATSAPP_BUSINESS_NUMBER,
        orderId: orderDetails.id,
        customer: orderDetails.customerInfo.name,
        total: formatPrice(orderDetails.total)
      });

      // Open WhatsApp with the message
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      console.log('✅ Notificación WhatsApp enviada exitosamente');
    } catch (error) {
      console.error('❌ Error enviando WhatsApp:', error);
    }
  },

  // Alternative method: Send customer WhatsApp confirmation
  async sendCustomerWhatsAppConfirmation(orderDetails: OrderDetails): Promise<void> {
    try {
      const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        }).format(price);
      };

      const customerMessage = `🌸 *CONFIRMACIÓN DE PEDIDO - SCENTMART* 🌸

¡Hola ${orderDetails.customerInfo.name}! 👋

Tu pedido ha sido confirmado exitosamente:

📋 *Número de Pedido:* ${orderDetails.id}
📅 *Fecha:* ${new Date(orderDetails.orderDate).toLocaleDateString('es-CO')}
💰 *Total:* ${formatPrice(orderDetails.total)}

🚚 *Entrega:*
Recibirás tu pedido en 1-2 días hábiles en:
${orderDetails.customerInfo.address}, ${orderDetails.customerInfo.city}

💳 *Pago:* ${orderDetails.paymentMethod}

¡Gracias por elegir ScentMart! 
Tu Aroma, Tu Historia 🌸

---
*ScentMart Perfumes*
📞 +57 321 320 0601
📧 scentmartperfumes@gmail.com`;

      // Remove country code for customer WhatsApp
      const customerPhone = orderDetails.customerInfo.whatsapp.replace(/^\+?57/, '57');
      const encodedCustomerMessage = encodeURIComponent(customerMessage);
      const customerWhatsappUrl = `https://wa.me/${customerPhone}?text=${encodedCustomerMessage}`;
      
      console.log('📱 Preparando confirmación WhatsApp para cliente:', {
        to: customerPhone,
        orderId: orderDetails.id
      });

      // For demo purposes, we'll log the URL
      console.log('🔗 URL de confirmación al cliente:', customerWhatsappUrl);
      
    } catch (error) {
      console.error('❌ Error preparando WhatsApp del cliente:', error);
    }
  }
};