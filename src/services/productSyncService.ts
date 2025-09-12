import { Perfume } from '../types';
import { metaSyncService } from './metaSyncService';

// Servicio centralizado para manejar sincronización de productos
class ProductSyncService {
  private baseUrl: string;
  private syncQueue: Array<{ perfume: Perfume; action: 'create' | 'update' | 'delete' }> = [];
  private isProcessing = false;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Agregar producto a la cola de sincronización
  queueSync(perfume: Perfume, action: 'create' | 'update' | 'delete') {
    this.syncQueue.push({ perfume, action });
    this.processQueue();
  }

  // Procesar cola de sincronización
  private async processQueue() {
    if (this.isProcessing || this.syncQueue.length === 0) return;

    this.isProcessing = true;

    while (this.syncQueue.length > 0) {
      const { perfume, action } = this.syncQueue.shift()!;
      
      try {
        switch (action) {
          case 'create':
            await metaSyncService.createProduct(perfume, this.baseUrl);
            break;
          case 'update':
            await metaSyncService.updateProduct(perfume, this.baseUrl);
            break;
          case 'delete':
            await metaSyncService.deleteProduct(perfume.id);
            break;
        }

        // Pausa entre sincronizaciones para respetar rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error sincronizando producto ${perfume.id}:`, error);
        // En caso de error, reintentamos después
        setTimeout(() => {
          this.syncQueue.push({ perfume, action });
        }, 5000);
      }
    }

    this.isProcessing = false;
  }

  // Sincronización automática cuando se modifica un producto
  onProductChange(perfume: Perfume, changeType: 'created' | 'updated' | 'deleted') {
    const actionMap = {
      'created': 'create' as const,
      'updated': 'update' as const,
      'deleted': 'delete' as const
    };

    this.queueSync(perfume, actionMap[changeType]);
  }

  // Verificar si hay cambios pendientes
  hasPendingChanges(): boolean {
    return this.syncQueue.length > 0 || this.isProcessing;
  }

  // Obtener estado de la cola
  getQueueStatus() {
    return {
      pending: this.syncQueue.length,
      processing: this.isProcessing
    };
  }
}

export const productSyncService = new ProductSyncService('https://www.misaromas.com');