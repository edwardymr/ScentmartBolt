import { Perfume, OrderDetails } from '../types';

// Configuración de Meta Business API
const META_CONFIG = {
  accessToken: import.meta.env.VITE_META_ACCESS_TOKEN || '',
  catalogId: import.meta.env.VITE_META_CATALOG_ID || '',
  pixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  businessId: import.meta.env.VITE_META_BUSINESS_ID || '',
  apiVersion: 'v18.0',
  baseUrl: 'https://graph.facebook.com'
};

export interface MetaProduct {
  id: string;
  name: string;
  description: string;
  availability: 'in stock' | 'out of stock' | 'preorder' | 'available for order' | 'discontinued';
  condition: 'new' | 'refurbished' | 'used';
  price: string;
  currency: string;
  brand: string;
  category: string;
  image_url: string;
  url: string;
  retailer_id: string;
  custom_data?: {
    concentration?: string;
    volume?: string;
    gender?: string;
    family?: string;
    top_notes?: string;
    middle_notes?: string;
    base_notes?: string;
  };
}

export interface SyncResult {
  success: boolean;
  productId: string;
  action: 'created' | 'updated' | 'deleted';
  error?: string;
}

class MetaSyncService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `${META_CONFIG.baseUrl}/${META_CONFIG.apiVersion}`;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${META_CONFIG.accessToken}`
    };
  }

  // Convertir perfume interno a formato Meta
  private perfumeToMetaProduct(perfume: Perfume, baseUrl: string): MetaProduct {
    return {
      id: perfume.id,
      name: `${perfume.title} - ${perfume.brand}`,
      description: perfume.description,
      availability: perfume.stock > 0 ? 'in stock' : 'out of stock',
      condition: 'new',
      price: (perfume.price * 100).toString(), // Meta espera centavos
      currency: 'COP',
      brand: perfume.brand,
      category: `Perfumes > ${perfume.family} > ${perfume.gender}`,
      image_url: `${baseUrl}${perfume.image_link}`,
      url: `${baseUrl}/product/${perfume.id}`,
      retailer_id: perfume.id,
      custom_data: {
        concentration: perfume.concentration,
        volume: perfume.volume,
        gender: perfume.gender,
        family: perfume.family,
        top_notes: perfume.notes.top.join(', '),
        middle_notes: perfume.notes.middle.join(', '),
        base_notes: perfume.notes.base.join(', ')
      }
    };
  }

  // Crear producto en Meta Catalog
  async createProduct(perfume: Perfume, baseUrl: string): Promise<SyncResult> {
    try {
      const metaProduct = this.perfumeToMetaProduct(perfume, baseUrl);
      
      const response = await fetch(`${this.baseUrl}/${META_CONFIG.catalogId}/products`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(metaProduct)
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ Producto creado en Meta: ${perfume.title}`);
        return {
          success: true,
          productId: perfume.id,
          action: 'created'
        };
      } else {
        console.error(`❌ Error creando producto en Meta:`, result);
        return {
          success: false,
          productId: perfume.id,
          action: 'created',
          error: result.error?.message || 'Error desconocido'
        };
      }
    } catch (error) {
      console.error(`❌ Error de red creando producto:`, error);
      return {
        success: false,
        productId: perfume.id,
        action: 'created',
        error: error instanceof Error ? error.message : 'Error de red'
      };
    }
  }

  // Actualizar producto en Meta Catalog
  async updateProduct(perfume: Perfume, baseUrl: string): Promise<SyncResult> {
    try {
      const metaProduct = this.perfumeToMetaProduct(perfume, baseUrl);
      
      const response = await fetch(`${this.baseUrl}/${META_CONFIG.catalogId}/products`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          ...metaProduct,
          method: 'UPDATE'
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ Producto actualizado en Meta: ${perfume.title}`);
        return {
          success: true,
          productId: perfume.id,
          action: 'updated'
        };
      } else {
        console.error(`❌ Error actualizando producto en Meta:`, result);
        return {
          success: false,
          productId: perfume.id,
          action: 'updated',
          error: result.error?.message || 'Error desconocido'
        };
      }
    } catch (error) {
      console.error(`❌ Error de red actualizando producto:`, error);
      return {
        success: false,
        productId: perfume.id,
        action: 'updated',
        error: error instanceof Error ? error.message : 'Error de red'
      };
    }
  }

  // Eliminar producto de Meta Catalog
  async deleteProduct(productId: string): Promise<SyncResult> {
    try {
      const response = await fetch(`${this.baseUrl}/${META_CONFIG.catalogId}/products`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          retailer_id: productId,
          method: 'DELETE'
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ Producto eliminado de Meta: ${productId}`);
        return {
          success: true,
          productId,
          action: 'deleted'
        };
      } else {
        console.error(`❌ Error eliminando producto de Meta:`, result);
        return {
          success: false,
          productId,
          action: 'deleted',
          error: result.error?.message || 'Error desconocido'
        };
      }
    } catch (error) {
      console.error(`❌ Error de red eliminando producto:`, error);
      return {
        success: false,
        productId,
        action: 'deleted',
        error: error instanceof Error ? error.message : 'Error de red'
      };
    }
  }

  // Sincronización masiva de productos
  async syncAllProducts(perfumes: Perfume[], baseUrl: string): Promise<SyncResult[]> {
    console.log(`🔄 Iniciando sincronización masiva de ${perfumes.length} productos...`);
    
    const results: SyncResult[] = [];
    const batchSize = 5; // Procesar en lotes para evitar rate limits

    for (let i = 0; i < perfumes.length; i += batchSize) {
      const batch = perfumes.slice(i, i + batchSize);
      const batchPromises = batch.map(perfume => this.updateProduct(perfume, baseUrl));
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Pausa entre lotes para respetar rate limits
      if (i + batchSize < perfumes.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✅ Sincronización completada: ${successful} exitosos, ${failed} fallidos`);
    
    return results;
  }

  // Enviar evento de conversión (para tracking)
  async trackConversion(orderDetails: OrderDetails, baseUrl: string): Promise<void> {
    try {
      const eventData = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: `${baseUrl}/thank-you`,
        user_data: {
          em: [this.hashEmail(orderDetails.customerInfo.email)],
          ph: [this.hashPhone(orderDetails.customerInfo.whatsapp)]
        },
        custom_data: {
          currency: 'COP',
          value: orderDetails.total / 100, // Meta espera valor en unidades principales
          content_ids: orderDetails.items.map(item => item.perfume.id),
          content_type: 'product',
          num_items: orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)
        }
      };

      const response = await fetch(`${this.baseUrl}/${META_CONFIG.pixelId}/events`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          data: [eventData],
          test_event_code: import.meta.env.DEV ? 'TEST12345' : undefined
        })
      });

      if (response.ok) {
        console.log('✅ Evento de conversión enviado a Meta');
      } else {
        console.error('❌ Error enviando evento de conversión:', await response.json());
      }
    } catch (error) {
      console.error('❌ Error enviando evento de conversión:', error);
    }
  }

  // Funciones auxiliares para hashing (requerido por Meta)
  private hashEmail(email: string): string {
    // En producción, usar una librería de hashing como crypto-js
    return btoa(email.toLowerCase().trim());
  }

  private hashPhone(phone: string): string {
    // Normalizar número de teléfono y hacer hash
    const normalized = phone.replace(/\D/g, '');
    return btoa(normalized);
  }

  // Verificar estado de sincronización
  async checkSyncStatus(): Promise<{ connected: boolean; catalogId: string; productsCount: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/${META_CONFIG.catalogId}?fields=product_count,name`, {
        headers: this.headers
      });

      if (response.ok) {
        const data = await response.json();
        return {
          connected: true,
          catalogId: META_CONFIG.catalogId,
          productsCount: data.product_count || 0
        };
      } else {
        return {
          connected: false,
          catalogId: META_CONFIG.catalogId,
          productsCount: 0
        };
      }
    } catch (error) {
      return {
        connected: false,
        catalogId: META_CONFIG.catalogId,
        productsCount: 0
      };
    }
  }
}

export const metaSyncService = new MetaSyncService();