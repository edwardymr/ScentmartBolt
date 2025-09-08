ScentmartBolt

## 🌸 ScentMart Perfumes - Sistema de Feeds para Commerce Manager

### 📋 Generar Feeds de Productos

Para generar los feeds CSV y XML para Facebook Commerce Manager:

```bash
npm run generate-feeds
```

o

```bash
npm run feeds
```

### ⚠️ IMPORTANTE - Configuración Antes del Uso

Antes de generar los feeds, **DEBES** editar el archivo `scripts/generate-product-feed.js` y cambiar:

```javascript
const STORE_CONFIG = {
  // ⚠️ CAMBIAR POR TU DOMINIO REAL
  baseUrl: 'https://your-scentmart-domain.com', // ← CAMBIAR AQUÍ
  // ... resto de configuración
};
```

### 📁 Archivos Generados

El script genera 3 archivos en la raíz del proyecto:

1. **`scentmart_products_feed.csv`** - Feed CSV para Facebook Commerce Manager
2. **`scentmart_products_feed.xml`** - Feed XML alternativo
3. **`scentmart_catalog_report.txt`** - Reporte detallado del catálogo

### 🚀 Pasos para Conectar con Facebook Commerce Manager

1. **Generar feeds**: `npm run generate-feeds`
2. **Configurar dominio**: Cambiar `baseUrl` en el script
3. **Subir CSV**: Ir a Facebook Commerce Manager → Catálogos → Subir archivo
4. **Configurar tienda**: Conectar con Facebook Shop, Instagram Shopping
5. **WhatsApp Business**: Conectar catálogo con WhatsApp Business API

### 📊 Características del Feed

- ✅ Compatible con Facebook Commerce Manager
- ✅ Incluye todas las características de productos (notas olfativas, concentración, volumen)
- ✅ Manejo de descuentos y precios especiales
- ✅ Información de stock y disponibilidad
- ✅ Categorización por familia olfativa y género
- ✅ Configuración de envío gratuito para Santa Marta
- ✅ Metadatos personalizados para perfumes

### 🛍️ Integración con Plataformas

Una vez subido el feed, podrás:
- 📱 **Facebook Shop**: Tienda integrada en Facebook
- 📸 **Instagram Shopping**: Tags de productos en posts y stories
- 💬 **WhatsApp Business**: Catálogo de productos en WhatsApp
- 🔍 **Facebook Ads**: Anuncios dinámicos de productos
