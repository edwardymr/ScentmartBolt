import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Zap, Globe, Instagram, MessageCircle } from 'lucide-react';
import { Perfume } from '../../types';
import { useMetaSync } from '../../hooks/useMetaSync';

interface MetaSyncPanelProps {
  perfumes: Perfume[];
  baseUrl: string;
}

export default function MetaSyncPanel({ perfumes, baseUrl }: MetaSyncPanelProps) {
  const { 
    isLoading, 
    lastSync, 
    syncResults, 
    error, 
    connected,
    syncProduct,
    syncAllProducts,
    checkConnection 
  } = useMetaSync(baseUrl);

  const [autoSync, setAutoSync] = useState(false);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Auto-sync cada 30 minutos si está habilitado
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(() => {
      if (perfumes.length > 0) {
        syncAllProducts(perfumes);
      }
    }, 30 * 60 * 1000); // 30 minutos

    return () => clearInterval(interval);
  }, [autoSync, perfumes, syncAllProducts]);

  const handleManualSync = async () => {
    try {
      await syncAllProducts(perfumes);
    } catch (error) {
      console.error('Error en sincronización manual:', error);
    }
  };

  const getStatusColor = (success: boolean) => {
    return success ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (success: boolean) => {
    return success ? CheckCircle : AlertCircle;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Sincronización Meta Business
            </h2>
            <p className="text-sm text-gray-600">
              Facebook • Instagram • WhatsApp Business
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${connected ? 'text-green-600' : 'text-red-600'}`}>
            {connected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      {/* Estado de conexión */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Facebook Shop</span>
          </div>
          <p className="text-xs text-blue-600">
            {connected ? 'Catálogo sincronizado' : 'Pendiente configuración'}
          </p>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-800">Instagram Shopping</span>
          </div>
          <p className="text-xs text-pink-600">
            {connected ? 'Productos etiquetables' : 'Requiere aprobación'}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">WhatsApp Business</span>
          </div>
          <p className="text-xs text-green-600">
            {connected ? 'Catálogo disponible' : 'Pendiente conexión'}
          </p>
        </div>
      </div>

      {/* Controles de sincronización */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleManualSync}
            disabled={isLoading || !connected}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Sincronizando...' : 'Sincronizar Ahora'}
          </button>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Auto-sync cada 30 min</span>
          </label>
        </div>

        {lastSync && (
          <div className="text-sm text-gray-600">
            Última sincronización: {lastSync.toLocaleString('es-CO')}
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Error de Sincronización</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Resultados de sincronización */}
      {syncResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Últimas Sincronizaciones
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {syncResults.map((result, index) => {
              const StatusIcon = getStatusIcon(result.success);
              return (
                <div
                  key={`${result.productId}-${index}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(result.success)}`} />
                    <div>
                      <span className="text-sm font-medium text-slate-800">
                        Producto {result.productId}
                      </span>
                      <p className="text-xs text-gray-600">
                        Acción: {result.action}
                      </p>
                    </div>
                  </div>
                  
                  {result.error && (
                    <div className="text-xs text-red-600 max-w-xs truncate">
                      {result.error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{perfumes.length}</div>
            <div className="text-xs text-gray-600">Productos Locales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {syncResults.filter(r => r.success).length}
            </div>
            <div className="text-xs text-gray-600">Sincronizados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {syncResults.filter(r => !r.success).length}
            </div>
            <div className="text-xs text-gray-600">Errores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {perfumes.filter(p => p.stock > 0).length}
            </div>
            <div className="text-xs text-gray-600">En Stock</div>
          </div>
        </div>
      </div>

      {/* Configuración avanzada */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-800">
            <Zap className="w-4 h-4" />
            Configuración Avanzada
          </summary>
          <div className="mt-4 space-y-4 pl-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-gray-700 mb-1">Frecuencia de Auto-sync</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="30">Cada 30 minutos</option>
                  <option value="60">Cada hora</option>
                  <option value="240">Cada 4 horas</option>
                  <option value="1440">Diario</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Modo de Sincronización</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="incremental">Solo cambios</option>
                  <option value="full">Sincronización completa</option>
                </select>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}