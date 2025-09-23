export interface Perfume {
  id: string;
  title: string;
  description?: string;
  availability: string;
  condition: string;
  price: number;
  link?: string;
  image_link: string;
  brand: string;
  product_type?: string;
  google_product_category?: string;
  gender?: string;
  size?: string;
  color?: string;
  custom_label_0?: string;
  
  notes?: {
    top?: string[];
    middle?: string[];
    base?: string[];
  };
  
  sale_price?: number;
  sale_price_effective_date?: string;
  shipping?: string;
  shipping_weight?: string;
  stock: number; // lo calculamos a partir de availability
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