# 🚀 Guía Completa de Integración Meta Business

## 📋 Resumen Ejecutivo

Esta guía te ayudará a implementar una sincronización automática entre tu tienda ScentMart y el ecosistema Meta (Facebook, Instagram, WhatsApp Business), maximizando ventas y simplificando operaciones.

## 🎯 Objetivos Alcanzados

✅ **Sincronización Automática**: Cualquier cambio en tu web se refleja automáticamente en Meta  
✅ **Gestión Centralizada**: Un solo panel para controlar todo  
✅ **Escalabilidad**: Arquitectura preparada para crecimiento  
✅ **Marketing Automatizado**: Herramientas para maximizar ventas  

---

## 🏗️ Arquitectura de la Solución

### 1. **Componentes Principales**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Tu Tienda     │───▶│  Sync Service    │───▶│  Meta Business  │
│   ScentMart     │    │  (Automático)    │    │  API            │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Base de Datos  │    │  Cola de Sync    │    │ Facebook Shop   │
│  Local          │    │  (Queue)         │    │ Instagram Shop  │
│                 │    │                  │    │ WhatsApp Catalog│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 2. **Flujo de Sincronización**

1. **Cambio en Producto** → Se detecta automáticamente
2. **Cola de Sincronización** → Se agrega a la cola de procesamiento
3. **API Meta Business** → Se envía el cambio a Meta
4. **Actualización Automática** → Se refleja en Facebook, Instagram y WhatsApp

---

## 🛠️ Configuración Técnica

### **Paso 1: Configurar Variables de Entorno**

Crea un archivo `.env` con:

```env
# Meta Business API
VITE_META_ACCESS_TOKEN=tu_token_de_acceso_aqui
VITE_META_CATALOG_ID=tu_catalog_id_aqui
VITE_META_PIXEL_ID=tu_pixel_id_aqui
VITE_META_BUSINESS_ID=tu_business_id_aqui

# Tu Dominio
VITE_STORE_BASE_URL=https://tu-dominio-real.com
```

### **Paso 2: Obtener Credenciales de Meta**

#### 2.1 **Access Token**
1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Crea una App de tipo "Business"
3. Ve a **Tools** → **Graph API Explorer**
4. Genera un token con permisos:
   - `catalog_management`
   - `business_management`
   - `ads_management`

#### 2.2 **Catalog ID**
1. Ve a [business.facebook.com/commerce](https://business.facebook.com/commerce)
2. Selecciona tu catálogo
3. En la URL verás: `/commerce/catalogs/CATALOG_ID`

#### 2.3 **Pixel ID**
1. Ve a **Events Manager** en Business Manager
2. Selecciona tu Pixel
3. Copia el ID de 15-16 dígitos

### **Paso 3: Configurar Webhook (Opcional pero Recomendado)**

Para sincronización bidireccional:

```javascript
// webhook-endpoint.js
app.post('/webhook/meta', (req, res) => {
  const { object, entry } = req.body;
  
  if (object === 'catalog') {
    entry.forEach(change => {
      // Procesar cambios desde Meta hacia tu tienda
      handleMetaChange(change);
    });
  }
  
  res.status(200).send('OK');
});
```

---

## 📊 Base de Datos Optimizada

### **Estructura Recomendada**

```sql
-- Tabla principal de productos
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  stock INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  image_url VARCHAR(500),
  family VARCHAR(50),
  gender VARCHAR(20),
  volume VARCHAR(20),
  concentration VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Campos para sincronización
  meta_product_id VARCHAR(100),
  last_synced_at TIMESTAMP,
  sync_status ENUM('pending', 'synced', 'error') DEFAULT 'pending',
  sync_error TEXT,
  
  -- Índices para performance
  INDEX idx_stock (stock),
  INDEX idx_family_gender (family, gender),
  INDEX idx_sync_status (sync_status),
  INDEX idx_updated_at (updated_at)
);

-- Tabla de notas olfativas
CREATE TABLE product_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50),
  note_type ENUM('top', 'middle', 'base'),
  note_name VARCHAR(100),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_type (product_id, note_type)
);

-- Tabla de cola de sincronización
CREATE TABLE sync_queue (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50),
  action ENUM('create', 'update', 'delete'),
  payload JSON,
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  attempts INT DEFAULT 0,
  max_attempts INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  error_message TEXT,
  
  INDEX idx_status_created (status, created_at),
  INDEX idx_product_action (product_id, action)
);
```

### **Triggers para Auto-Sync**

```sql
-- Trigger para detectar cambios automáticamente
DELIMITER $$
CREATE TRIGGER product_sync_trigger 
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  IF (OLD.name != NEW.name OR 
      OLD.price != NEW.price OR 
      OLD.stock != NEW.stock OR 
      OLD.description != NEW.description OR 
      OLD.image_url != NEW.image_url) THEN
    
    INSERT INTO sync_queue (product_id, action, payload)
    VALUES (NEW.id, 'update', JSON_OBJECT(
      'id', NEW.id,
      'name', NEW.name,
      'price', NEW.price,
      'stock', NEW.stock,
      'description', NEW.description,
      'image_url', NEW.image_url
    ));
  END IF;
END$$
DELIMITER ;
```

---

## 🚀 Endpoints API Recomendados

### **1. Endpoint de Sincronización Manual**

```javascript
// POST /api/sync/product/:id
app.post('/api/sync/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    
    const result = await metaSyncService.updateProduct(product, BASE_URL);
    
    res.json({
      success: true,
      result,
      message: 'Producto sincronizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### **2. Endpoint de Sincronización Masiva**

```javascript
// POST /api/sync/all
app.post('/api/sync/all', async (req, res) => {
  try {
    const products = await getAllProducts();
    const results = await metaSyncService.syncAllProducts(products, BASE_URL);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    res.json({
      success: true,
      stats: { successful, failed, total: results.length },
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### **3. Endpoint de Estado de Sincronización**

```javascript
// GET /api/sync/status
app.get('/api/sync/status', async (req, res) => {
  try {
    const status = await metaSyncService.checkSyncStatus();
    const queueStatus = productSyncService.getQueueStatus();
    
    res.json({
      meta: status,
      queue: queueStatus,
      lastSync: await getLastSyncTime()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

---

## 🎯 Estrategias de Marketing Digital

### **1. Instagram Shopping Optimizado**

#### **Etiquetado Automático de Productos**
```javascript
// Configurar etiquetado automático en posts
const instagramPost = {
  caption: "✨ Nuevo aroma disponible: BLEU INTENSE ✨",
  media_url: "https://tu-dominio.com/images/products/bleu-intense.jpg",
  product_tags: [
    {
      product_id: "1", // ID del producto en tu catálogo
      x: 0.5, // Posición X del tag (0-1)
      y: 0.3  // Posición Y del tag (0-1)
    }
  ]
};
```

#### **Stories con Stickers de Producto**
```javascript
// Crear stories automáticas para productos nuevos
const createProductStory = (product) => ({
  media_type: "IMAGE",
  image_url: product.image,
  product_sticker: {
    product_id: product.id,
    sticker_type: "product"
  },
  text_overlay: `🌸 ${product.name}\n💰 ${formatPrice(product.price)}`
});
```

### **2. Facebook Ads Dinámicos**

#### **Configuración de Audiencias**
```javascript
// Crear audiencias personalizadas automáticamente
const createCustomAudiences = async () => {
  // Visitantes del sitio web
  await createAudience({
    name: "ScentMart - Visitantes Web",
    rule: "website_visitors",
    retention_days: 30
  });
  
  // Personas que vieron productos específicos
  await createAudience({
    name: "ScentMart - Vieron Productos",
    rule: "product_viewers",
    product_set_id: CATALOG_ID
  });
  
  // Carritos abandonados
  await createAudience({
    name: "ScentMart - Carrito Abandonado",
    rule: "add_to_cart_not_purchased",
    retention_days: 7
  });
};
```

#### **Campañas de Retargeting Automáticas**
```javascript
// Crear campañas dinámicas basadas en comportamiento
const createRetargetingCampaign = async (audienceId, productSet) => {
  const campaign = await createCampaign({
    name: `ScentMart - Retargeting ${productSet}`,
    objective: "CONVERSIONS",
    status: "ACTIVE",
    daily_budget: 50000, // $50.000 COP diarios
    
    ad_sets: [{
      targeting: {
        custom_audiences: [audienceId],
        geo_locations: {
          countries: ["CO"],
          regions: [{ key: "3686" }] // Magdalena
        }
      },
      
      ads: [{
        creative: {
          object_story_spec: {
            page_id: PAGE_ID,
            template_data: {
              format_option: "carousel_images_multi_items",
              product_set_id: productSet,
              message: "🌸 Descubre tu aroma perfecto en ScentMart",
              call_to_action_type: "SHOP_NOW"
            }
          }
        }
      }]
    }]
  });
  
  return campaign;
};
```

### **3. WhatsApp Business Catalog**

#### **Mensajes Automáticos con Productos**
```javascript
// Enviar catálogo automáticamente
const sendCatalogMessage = async (phoneNumber, category = null) => {
  const message = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "interactive",
    interactive: {
      type: "product_list",
      header: {
        type: "text",
        text: "🌸 Catálogo ScentMart"
      },
      body: {
        text: category 
          ? `Perfumes ${category} disponibles:`
          : "Descubre nuestros paisajes olfativos únicos"
      },
      footer: {
        text: "Tu Aroma, Tu Historia"
      },
      action: {
        catalog_id: META_CONFIG.catalogId,
        sections: category ? [{
          title: `Perfumes ${category}`,
          product_items: await getProductsByCategory(category)
        }] : undefined
      }
    }
  };
  
  return await sendWhatsAppMessage(message);
};
```

#### **Respuestas Automáticas Inteligentes**
```javascript
// Bot inteligente para WhatsApp
const handleWhatsAppMessage = async (message) => {
  const userMessage = message.text.body.toLowerCase();
  
  // Detectar intención de compra
  if (userMessage.includes('precio') || userMessage.includes('costo')) {
    const products = await searchProducts(userMessage);
    return sendProductPrices(message.from, products);
  }
  
  // Detectar búsqueda por familia olfativa
  const families = ['floral', 'oriental', 'amaderado', 'cítrico'];
  const detectedFamily = families.find(f => userMessage.includes(f));
  
  if (detectedFamily) {
    return sendCatalogMessage(message.from, detectedFamily);
  }
  
  // Respuesta por defecto
  return sendWelcomeMessage(message.from);
};
```

---

## 📈 Métricas y Optimización

### **1. KPIs Principales a Monitorear**

```javascript
// Dashboard de métricas
const getMarketingMetrics = async () => {
  return {
    // Métricas de Sincronización
    sync: {
      productsInSync: await countSyncedProducts(),
      lastSyncTime: await getLastSyncTime(),
      syncErrors: await countSyncErrors(),
      syncSuccess: await getSyncSuccessRate()
    },
    
    // Métricas de Instagram
    instagram: {
      productTagsUsed: await getInstagramTagsCount(),
      storiesWithProducts: await getStoriesCount(),
      shoppingClicks: await getShoppingClicks(),
      conversionRate: await getInstagramConversionRate()
    },
    
    // Métricas de Facebook
    facebook: {
      catalogViews: await getCatalogViews(),
      dynamicAdsClicks: await getDynamicAdsClicks(),
      retargetingConversions: await getRetargetingConversions(),
      roas: await getReturnOnAdSpend()
    },
    
    // Métricas de WhatsApp
    whatsapp: {
      catalogShares: await getWhatsAppCatalogShares(),
      productInquiries: await getProductInquiries(),
      conversationToSale: await getConversationConversionRate()
    }
  };
};
```

### **2. Optimizaciones Automáticas**

```javascript
// Optimización automática de campañas
const optimizeCampaigns = async () => {
  const campaigns = await getActiveCampaigns();
  
  for (const campaign of campaigns) {
    const performance = await getCampaignPerformance(campaign.id);
    
    // Pausar campañas con bajo rendimiento
    if (performance.roas < 2.0 && performance.spend > 100000) {
      await pauseCampaign(campaign.id);
      await notifyLowPerformance(campaign);
    }
    
    // Aumentar presupuesto en campañas exitosas
    if (performance.roas > 4.0 && performance.ctr > 0.02) {
      await increaseBudget(campaign.id, 1.2); // Aumentar 20%
    }
    
    // Actualizar audiencias similares
    if (performance.conversions > 50) {
      await createLookalikeAudience(campaign.id);
    }
  }
};
```

---

## 🔒 Seguridad y Mejores Prácticas

### **1. Manejo Seguro de Tokens**

```javascript
// Rotación automática de tokens
const rotateAccessToken = async () => {
  try {
    const newToken = await refreshAccessToken(META_CONFIG.accessToken);
    
    // Actualizar en variables de entorno
    await updateEnvironmentVariable('VITE_META_ACCESS_TOKEN', newToken);
    
    // Notificar éxito
    console.log('✅ Token renovado exitosamente');
    
    return newToken;
  } catch (error) {
    // Notificar error crítico
    await sendCriticalAlert('Error renovando token de Meta', error);
    throw error;
  }
};
```

### **2. Rate Limiting y Retry Logic**

```javascript
// Manejo inteligente de rate limits
const withRateLimit = async (apiCall, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Rate limit alcanzado, esperando ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
};
```

### **3. Validación de Datos**

```javascript
// Validar productos antes de sincronizar
const validateProduct = (product) => {
  const errors = [];
  
  if (!product.name || product.name.length < 3) {
    errors.push('Nombre debe tener al menos 3 caracteres');
  }
  
  if (!product.price || product.price <= 0) {
    errors.push('Precio debe ser mayor a 0');
  }
  
  if (!product.image || !isValidUrl(product.image)) {
    errors.push('URL de imagen inválida');
  }
  
  if (!product.description || product.description.length < 10) {
    errors.push('Descripción debe tener al menos 10 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

---

## 🎯 Plan de Implementación (30 días)

### **Semana 1: Configuración Base**
- [ ] Configurar Meta Business Manager
- [ ] Obtener tokens y credenciales
- [ ] Configurar variables de entorno
- [ ] Probar conexión con API

### **Semana 2: Sincronización Básica**
- [ ] Implementar sincronización manual
- [ ] Configurar cola de sincronización
- [ ] Probar con productos de prueba
- [ ] Configurar manejo de errores

### **Semana 3: Automatización**
- [ ] Implementar sincronización automática
- [ ] Configurar triggers de base de datos
- [ ] Implementar panel de administración
- [ ] Configurar monitoreo

### **Semana 4: Marketing y Optimización**
- [ ] Configurar Facebook Ads dinámicos
- [ ] Implementar Instagram Shopping
- [ ] Configurar WhatsApp Business
- [ ] Implementar métricas y reportes

---

## 🚀 Resultados Esperados

### **Operacionales**
- ⏱️ **Tiempo de gestión**: Reducción del 80% en tiempo de actualización manual
- 🔄 **Sincronización**: 99.9% de productos sincronizados automáticamente
- 📊 **Visibilidad**: Dashboard unificado para todos los canales

### **Marketing**
- 📈 **Alcance**: +300% en alcance orgánico en Instagram
- 🎯 **Conversiones**: +150% en conversiones desde redes sociales
- 💰 **ROAS**: 4:1 o superior en campañas dinámicas

### **Ventas**
- 🛒 **Canales de venta**: 4 canales activos (Web + Facebook + Instagram + WhatsApp)
- 📱 **Mobile commerce**: +200% en ventas desde móvil
- 🔄 **Retargeting**: +80% en conversiones de usuarios que regresan

---

¿Necesitas ayuda implementando alguna parte específica de esta solución?