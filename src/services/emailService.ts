import emailjs from 'emailjs-com';
import { OrderDetails } from '../types';

export const emailService = {
  async sendOrderConfirmationEmail(orderDetails: OrderDetails): Promise<void> {
    try {
      // For demo purposes, we'll just log the email data
      console.log('Enviando email de confirmación:', {
        to: orderDetails.customerInfo.email,
        orderId: orderDetails.id,
        total: orderDetails.total,
        items: orderDetails.items.map(item => ({
          name: item.perfume.name,
          quantity: item.quantity,
          price: item.perfume.price
        }))
      });
      
      // In a real implementation, configure EmailJS here
      // await emailjs.send('service_id', 'template_id', emailTemplateParams, 'user_id');
      
      console.log('Email de confirmación enviado exitosamente');
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }
};