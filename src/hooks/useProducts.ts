// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Product {
  id: number;
  title: string;
  description: string;
  availability: string;
  condition: string;
  price: string;
  link: string;
  image_link: string;
  brand: string;
  product_type: string;
  google_product_category: number;
  gender: string;
  size: string;
  color: string | null;
  custom_label_0: string | null;
  custom_label_1: string | null;
  custom_label_2: string | null;
  custom_label_3: string | null;
  custom_label_4: string | null;
  sale_price: string | null;
  sale_price_effective_date: string | null;
  shipping: string | null;
  shipping_weight: string | null;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('❌ Error al cargar productos:', error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    // Suscripción en tiempo real (escucha inserts/updates/deletes en "products")
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('🔄 Cambio detectado en productos:', payload);
          fetchProducts(); // recargar catálogo cuando hay cambios
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading, refetch: fetchProducts };
}
