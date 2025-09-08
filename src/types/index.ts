export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageUrl?: string;
  localImageUrl?: string;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  family: string;
  gender: string;
  stock: number;
  volume?: string;
  concentration?: string;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    address: string;
    city: string;
    whatsapp: string;
    email: string;
  };
  paymentMethod: string;
  total: number;
  shippingCost: number;
  orderDate: string;
  status: string;
}

export interface QuizAnswers {
  occasion: string;
  personality: string;
  preferences: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}