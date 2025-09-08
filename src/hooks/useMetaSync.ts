import { useState, useCallback } from 'react';
import { Perfume } from '../types';
import { metaSyncService, SyncResult } from '../services/metaSyncService';

interface MetaSyncState {
  isLoading: boolean;
  lastSync: Date | null;
  syncResults: SyncResult[];
  error: string | null;
  connected: boolean;
}

export const useMetaSync = (baseUrl: string) => {
  const [state, setState] = useState<MetaSyncState>({
    isLoading: false,
    lastSync: null,
    syncResults: [],
    error: null,
    connected: false
  });

  // Sincronizar un producto individual
  const syncProduct = useCallback(async (perfume: Perfume, action: 'create' | 'update' | 'delete') => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      let result: SyncResult;

      switch (action) {
        case 'create':
          result = await metaSyncService.createProduct(perfume, baseUrl);
          break;
        case 'update':
          result = await metaSyncService.updateProduct(perfume, baseUrl);
          break;
        case 'delete':
          result = await metaSyncService.deleteProduct(perfume.id);
          break;
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        lastSync: new Date(),
        syncResults: [result, ...prev.syncResults.slice(0, 9)], // Mantener últimos 10 resultados
        error: result.success ? null : result.error || 'Error desconocido'
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de sincronización';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [baseUrl]);

  // Sincronizar todos los productos
  const syncAllProducts = useCallback(async (perfumes: Perfume[]) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const results = await metaSyncService.syncAllProducts(perfumes, baseUrl);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        lastSync: new Date(),
        syncResults: results,
        error: null
      }));

      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de sincronización masiva';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [baseUrl]);

  // Verificar conexión con Meta
  const checkConnection = useCallback(async () => {
    try {
      const status = await metaSyncService.checkSyncStatus();
      setState(prev => ({
        ...prev,
        connected: status.connected,
        error: status.connected ? null : 'No conectado a Meta Business'
      }));
      return status;
    } catch (error) {
      setState(prev => ({
        ...prev,
        connected: false,
        error: 'Error verificando conexión'
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    syncProduct,
    syncAllProducts,
    checkConnection
  };
};