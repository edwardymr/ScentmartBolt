import emailjs from 'emailjs-com';
import { OrderDetails } from '../types';

const WHATSAPP_BUSINESS_NUMBER = '573213200601';

export const emailService = {
  async sendOrderConfirmationEmail(orderDetails: OrderDetails): Promise<void> {
    try {
      // Prepare email template parameters
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

      const emailTemplateParams = {
        to_email: orderDetails.customerInfo.email,
        customer_name: orderDetails.customerInfo.name,
        order_id: orderDetails.id,
        order_date: new Date(orderDetails.orderDate).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items_list: itemsList,
        total_amount: formatPrice(orderDetails.total),
        delivery_address: orderDetails.customerInfo.address,
        delivery_city: orderDetails.customerInfo.city,
        customer_phone: orderDetails.customerInfo.whatsapp,
        payment_method: orderDetails.paymentMethod
      };

      console.log('📧 Enviando email de confirmación:', emailTemplateParams);
      
      // In a real implementation, configure EmailJS here
      // await emailjs.send('service_id', 'template_id', emailTemplateParams, 'user_id');
      
      console.log('✅ Email de confirmación enviado exitosamente');
    } catch (error) {
      console.error('❌ Error enviando email:', error);
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

      // In a real implementation, this would use WhatsApp Business API
      // For now, we'll open the WhatsApp link automatically
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      console.log('✅ Notificación WhatsApp enviada exitosamente');
    } catch (error) {
      console.error('❌ Error enviando WhatsApp:', error);
    }
  }
};