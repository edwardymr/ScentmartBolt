const fs = require('fs');
const path = require('path');

// Importar datos de perfumes (simulamos la importación)
const perfumes = [
  {
    id: '1',
    name: "BLEU INTENSE",
    brand: "L'BEL",
    price: 70000,
    originalPrice: 88000,
    image: '/images/products/bleu-intense.jpg',
    description: "Un aroma para el hombre poderoso como las olas que embisten las rocas, refrescante como el agua de un mar infinito, sin límites. Siente un aroma lleno de la energía y frescura del reventar de las olas del mar que, combinadas con intensas notas herbales de salvia, crean un perfume para hombre con energía sin límites.",
    notes: {
      top: ['Bergamota', 'Limón', 'Salvia'],
      middle: ['Haba tonka', 'Healingwood captive'],
      base: ['Musgo de roble de Yugoslavia', 'Ámbar']
    },
    family: 'Aromático',
    gender: 'Hombre',
    stock: 2,
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '2',
    name: "D'orsay",
    brand: "Esika",
    price: 63000,
    originalPrice: 74000,
    image: '/images/products/dorsay.jpg',
    description: "Una fragancia diseñada para el hombre auténtico y sofisticado que busca destacar con un aroma intenso y elegante.",
    notes: {
      top: ['Bergamota', 'Toronja'],
      middle: ['Cardamomo', 'Pimienta negra'],
      base: ['Madera de cedro', 'Ámbar']
    },
    family: 'Amaderado',
    gender: 'Hombre',
    stock: 8,
    volume: '90ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '3',
    name: "Dancing",
    brand: "Cyzone",
    price: 35000,
    originalPrice: 40000,
    image: '/images/products/dancing.jpg',
    description: "Un perfume fresco y juvenil que captura la energía y la libertad de la danza. Expresa la alegría y espontaneidad de la mujer joven que vive con pasión.",
    notes: {
      top: ['Bergamota', 'Mandarina'],
      middle: ['Jazmín', 'Rosa'],
      base: ['Vainilla', 'Sándalo']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 3,
    volume: '90ml',
    concentration: 'Eau de Toilette'
  },
  {
    id: '4',
    name: "Expression",
    brand: "Esika",
    price: 38000,
    originalPrice: 47000,
    image: '/images/products/expression.jpg',
    description: "Un perfume que refleja la esencia de una mujer audaz y expresiva, con un aroma vibrante y sofisticado. Celebra la autenticidad y la libertad de expresión de la mujer moderna.",
    notes: {
      top: ['Frutas rojas', 'Mandarina'],
      middle: ['Peonía', 'Jazmín'],
      base: ['Vainilla', 'Ámbar']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 0,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '5',
    name: "Fantasía Azul",
    brand: "Esika",
    price: 50000,
    originalPrice: 73000,
    image: '/images/products/fantasia-azul.jpg',
    description: "Un aroma fresco y ligero que evoca la libertad y los sueños infinitos. Inspirado en la libertad y la imaginación sin límites.",
    notes: {
      top: ['Manzana', 'Pera'],
      middle: ['Flores blancas', 'Jazmín'],
      base: ['Almizcle', 'Ámbar']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Toilette'
  },
  {
    id: '6',
    name: "Fantasia Radiante",
    brand: "Esika",
    price: 50000,
    originalPrice: 73000,
    image: '/images/products/fantasia-radiante.jpg',
    description: "Un perfume que irradia feminidad y alegría con un toque cálido y envolvente. Representa la energía radiante y la feminidad vibrante.",
    notes: {
      top: ['Frutas tropicales', 'Cítricos'],
      middle: ['Rosa', 'Jazmín'],
      base: ['Vainilla', 'Praliné']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '7',
    name: "Girlink",
    brand: "Cyzone",
    price: 38000,
    originalPrice: 50000,
    image: '/images/products/girlink.jpg',
    description: "Una fragancia divertida y juvenil que combina frescura y dulzura para la mujer moderna. Captura la esencia de la juventud y la diversión.",
    notes: {
      top: ['Frutas rojas', 'Cítricos'],
      middle: ['Flores blancas', 'Jazmín'],
      base: ['Almizcle', 'Vainilla']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Toilette'
  },
  {
    id: '8',
    name: "In Love Passion",
    brand: "Cyzone",
    price: 45000,
    originalPrice: 52000,
    image: '/images/products/in-love-passion.jpg',
    description: "Un perfume que despierta la pasión y el romanticismo con un aroma envolvente. Evoca el amor apasionado y la conexión emocional.",
    notes: {
      top: ['Frutos rojos', 'Mandarina'],
      middle: ['Rosa', 'Jazmín'],
      base: ['Vainilla', 'Almizcle']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '9',
    name: "L'image",
    brand: "Esika",
    price: 64000,
    originalPrice: 75000,
    image: '/images/products/limage.jpg',
    description: "Una fragancia elegante y sofisticada que resalta la feminidad y el estilo único. Representa la elegancia y la confianza de la mujer contemporánea.",
    notes: {
      top: ['Bergamota', 'Pera'],
      middle: ['Jazmín', 'Rosa'],
      base: ['Sándalo', 'Vainilla']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 2,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '10',
    name: "Leyenda Absolute",
    brand: "Esika",
    price: 75000,
    originalPrice: 114000,
    image: '/images/products/leyenda-absolute.jpg',
    description: "Un aroma intenso y masculino que evoca fuerza y carisma. Inspirado en el hombre legendario y carismático.",
    notes: {
      top: ['Cítricos', 'Bergamota'],
      middle: ['Cardamomo', 'Lavanda'],
      base: ['Madera de cedro', 'Ámbar']
    },
    family: 'Amaderado',
    gender: 'Hombre',
    stock: 1,
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '11',
    name: "LIASSON",
    brand: "L'BEL",
    price: 70000,
    originalPrice: 147000,
    image: '/images/products/liasson.jpg',
    description: "Un perfume que combina sensualidad y sofisticación para la mujer moderna. Representa una conexión emocional y sensual.",
    notes: {
      top: ['Frutas rojas', 'Bergamota'],
      middle: ['Jazmín', 'Rosa'],
      base: ['Vainilla', 'Ámbar']
    },
    family: 'Oriental',
    gender: 'Mujer',
    stock: 0,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '12',
    name: "Magnat",
    brand: "Esika",
    price: 75000,
    originalPrice: 122000,
    image: '/images/products/magnat.jpg',
    description: "Una fragancia poderosa que refleja la fuerza y el magnetismo del hombre moderno. Exalta el carisma y la presencia magnética.",
    notes: {
      top: ['Toronja', 'Bergamota'],
      middle: ['Pimienta negra', 'Cardamomo'],
      base: ['Madera de cedro', 'Ámbar']
    },
    family: 'Amaderado',
    gender: 'Hombre',
    stock: 2,
    volume: '90ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '13',
    name: "Magnat Select",
    brand: "Esika",
    price: 75000,
    originalPrice: 122000,
    image: '/images/products/magnat-select.jpg',
    description: "Un perfume sofisticado para el hombre que busca destacar con elegancia. Representa la distinción y el estilo refinado.",
    notes: {
      top: ['Cítricos', 'Toronja'],
      middle: ['Lavanda', 'Cardamomo'],
      base: ['Madera de sándalo', 'Ámbar']
    },
    family: 'Amaderado',
    gender: 'Hombre',
    stock: 2,
    volume: '90ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '14',
    name: "MITHYKA",
    brand: "L'BEL",
    price: 62000,
    originalPrice: 131000,
    image: '/images/products/mithyka.jpg',
    description: "Una fragancia mítica que resalta la feminidad y el poder de la mujer. Inspirado en la fuerza y el encanto de una diosa.",
    notes: {
      top: ['Bergamota', 'Mandarina'],
      middle: ['Rosa', 'Jazmín'],
      base: ['Vainilla', 'Pachulí']
    },
    family: 'Oriental',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '15',
    name: "Nitro",
    brand: "Cyzone",
    price: 40000,
    originalPrice: 47000,
    image: '/images/products/nitro.jpg',
    description: "Un perfume dinámico y juvenil que refleja energía y audacia. Captura la energía explosiva de la juventud.",
    notes: {
      top: ['Cítricos', 'Menta'],
      middle: ['Cardamomo', 'Jengibre'],
      base: ['Madera de cedro', 'Almizcle']
    },
    family: 'Cítrico',
    gender: 'Hombre',
    stock: 5,
    volume: '100ml',
    concentration: 'Eau de Toilette'
  },
  {
    id: '16',
    name: "Prints",
    brand: "Cyzone",
    price: 35000,
    originalPrice: 42000,
    image: '/images/products/prints.jpg',
    description: "Una fragancia fresca y divertida que resalta la personalidad vibrante de la mujer joven. Expresa la creatividad y la espontaneidad.",
    notes: {
      top: ['Frutas rojas', 'Cítricos'],
      middle: ['Jazmín', 'Peonía'],
      base: ['Vainilla', 'Almizcle']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 0,
    volume: '30ml',
    concentration: 'Eau de Toilette'
  },
  {
    id: '17',
    name: "Pulso Absolute",
    brand: "Esika",
    price: 70000,
    originalPrice: 82000,
    image: '/images/products/pulso-absolute.jpg',
    description: "Un aroma intenso que refleja la fuerza y el carácter del hombre moderno. Representa la energía y el pulso vibrante del hombre actual.",
    notes: {
      top: ['Bergamota', 'Limón'],
      middle: ['Lavanda', 'Cardamomo'],
      base: ['Madera de cedro', 'Ámbar']
    },
    family: 'Amaderado',
    gender: 'Hombre',
    stock: 3,
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '18',
    name: "SATIN ROUGE",
    brand: "L'BEL",
    price: 60000,
    originalPrice: 139000,
    image: '/images/products/satin-rouge.jpg',
    description: "Un perfume sensual y elegante que envuelve con su calidez y sofisticación. Evoca sensualidad y feminidad con un toque de lujo.",
    notes: {
      top: ['Frutas rojas', 'Bergamota'],
      middle: ['Rosa', 'Jazmín'],
      base: ['Vainilla', 'Praliné']
    },
    family: 'Oriental',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '19',
    name: "Sweet Black Pink Addiction",
    brand: "Cyzone",
    price: 43000,
    originalPrice: 52000,
    image: '/images/products/sweet-black-pink-addiction.jpg',
    description: "Una fragancia dulce y adictiva que resalta la feminidad y la audacia. Captura la energía vibrante y seductora de la mujer joven.",
    notes: {
      top: ['Frutas rojas', 'Mandarina'],
      middle: ['Jazmín', 'Rosa'],
      base: ['Vainilla', 'Praliné']
    },
    family: 'Oriental',
    gender: 'Mujer',
    stock: 1,
    volume: '50ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '20',
    name: "Vibranza",
    brand: "Esika",
    price: 65000,
    originalPrice: 70000,
    image: '/images/products/vibranza.jpg',
    description: "Un perfume que irradia vitalidad y frescura, ideal para la mujer dinámica. Representa la energía y la vitalidad de la mujer moderna.",
    notes: {
      top: ['Cítricos', 'Bergamota'],
      middle: ['Jazmín', 'Peonía'],
      base: ['Vainilla', 'Almizcle']
    },
    family: 'Floral',
    gender: 'Mujer',
    stock: 0,
    volume: '45ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: '21',
    name: "You",
    brand: "Esika",
    price: 45000,
    originalPrice: 73000,
    image: '/images/products/you.jpg',
    description: "Una fragancia fresca y moderna que refleja autenticidad y libertad. Inspirado en la libertad y la autenticidad del espíritu joven.",
    notes: {
      top: ['Cítricos', 'Toronja'],
      middle: ['Lavanda', 'Cardamomo'],
      base: ['Madera de cedro', 'Ámbar']
    },
    family: 'Aromático',
    gender: 'Unisex',
    stock: 2,
    volume: '90ml',
    concentration: 'Eau de Toilette'
  }
];

// CONFIGURACIÓN IMPORTANTE - CAMBIAR ANTES DE USAR
const STORE_CONFIG = {
  // ⚠️ CAMBIAR POR TU DOMINIO REAL
  baseUrl: 'https://scentmartbold.netlify.app/',
  
  // Información de la tienda
  storeName: 'ScentMart Perfumes',
  storeDescription: 'Tu Aroma, Tu Historia - Perfumes Premium en Santa Marta',
  
  // Configuración de envío
  shipping: {
    freeShippingLocation: 'Santa Marta, Colombia',
    shippingCost: '0 COP',
    shippingTime: '1-2 días hábiles'
  },
  
  // Información de contacto
  contact: {
    whatsapp: '+573213200601',
    email: 'scentmartperfumes@gmail.com',
    address: 'Mz X Casa 32 B. Cantilito, Santa Marta'
  }
};

// Función para escapar valores CSV
const escapeCsv = (value) => {
  if (value === null || value === undefined) return '';
  let stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

// Función para generar feed CSV para Facebook Commerce Manager
const generateCSVFeed = () => {
  console.log('🚀 Generando feed CSV para Facebook Commerce Manager...');
  
  // Headers requeridos por Facebook Commerce Manager
  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'brand',
    'product_type',
    'google_product_category',
    'gender',
    'size',
    'color',
    'custom_label_0', // Concentración
    'custom_label_1', // Notas de salida
    'custom_label_2', // Notas de corazón
    'custom_label_3', // Notas de fondo
    'custom_label_4', // Familia olfativa
    'sale_price',
    'sale_price_effective_date',
    'shipping',
    'shipping_weight'
  ];

  let csvContent = headers.map(escapeCsv).join(',') + '\n';

  perfumes.forEach(perfume => {
    const hasDiscount = perfume.originalPrice && perfume.originalPrice > perfume.price;
    
    const row = [
      perfume.id,
      `${perfume.name} - ${perfume.brand}`,
      perfume.description,
      perfume.stock > 0 ? 'in stock' : 'out of stock',
      'new',
      `${perfume.price} COP`,
      `${STORE_CONFIG.baseUrl}/product/${perfume.id}`,
      `${STORE_CONFIG.baseUrl}${perfume.image}`,
      perfume.brand,
      `Perfumes > ${perfume.family} > ${perfume.gender}`,
      '469', // Categoría de Google para Fragancias
      perfume.gender === 'Unisex' ? 'unisex' : perfume.gender.toLowerCase(),
      perfume.volume || '',
      perfume.family,
      perfume.concentration || '',
      perfume.notes.top.join(', '),
      perfume.notes.middle.join(', '),
      perfume.notes.base.join(', '),
      perfume.family,
      hasDiscount ? `${perfume.price} COP` : '',
      hasDiscount ? '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z' : '',
      `CO::Standard:${STORE_CONFIG.shipping.shippingCost}`,
      '0.5 kg'
    ];
    
    csvContent += row.map(escapeCsv).join(',') + '\n';
  });

  const csvPath = path.join(__dirname, '..', 'scentmart_products_feed.csv');
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`✅ Feed CSV generado exitosamente: ${csvPath}`);
  return csvPath;
};

// Función para generar feed XML para Facebook Commerce Manager
const generateXMLFeed = () => {
  console.log('🚀 Generando feed XML para Facebook Commerce Manager...');
  
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${STORE_CONFIG.storeName}</title>
    <link>${STORE_CONFIG.baseUrl}</link>
    <description>${STORE_CONFIG.storeDescription}</description>
`;

  perfumes.forEach(perfume => {
    const hasDiscount = perfume.originalPrice && perfume.originalPrice > perfume.price;
    
    xmlContent += `    <item>
      <g:id>${perfume.id}</g:id>
      <g:title><![CDATA[${perfume.name} - ${perfume.brand}]]></g:title>
      <g:description><![CDATA[${perfume.description}]]></g:description>
      <g:link>${STORE_CONFIG.baseUrl}/product/${perfume.id}</g:link>
      <g:image_link>${STORE_CONFIG.baseUrl}${perfume.image}</g:image_link>
      <g:availability>${perfume.stock > 0 ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${perfume.price} COP</g:price>
      ${hasDiscount ? `<g:sale_price>${perfume.price} COP</g:sale_price>` : ''}
      <g:brand><![CDATA[${perfume.brand}]]></g:brand>
      <g:condition>new</g:condition>
      <g:product_type><![CDATA[Perfumes > ${perfume.family} > ${perfume.gender}]]></g:product_type>
      <g:google_product_category>469</g:google_product_category>
      <g:gender>${perfume.gender === 'Unisex' ? 'unisex' : perfume.gender.toLowerCase()}</g:gender>
      <g:size><![CDATA[${perfume.volume || ''}]]></g:size>
      <g:color><![CDATA[${perfume.family}]]></g:color>
      <g:custom_label_0><![CDATA[${perfume.concentration || ''}]]></g:custom_label_0>
      <g:custom_label_1><![CDATA[${perfume.notes.top.join(', ')}]]></g:custom_label_1>
      <g:custom_label_2><![CDATA[${perfume.notes.middle.join(', ')}]]></g:custom_label_2>
      <g:custom_label_3><![CDATA[${perfume.notes.base.join(', ')}]]></g:custom_label_3>
      <g:custom_label_4><![CDATA[${perfume.family}]]></g:custom_label_4>
      <g:shipping>
        <g:country>CO</g:country>
        <g:service>Standard</g:service>
        <g:price>${STORE_CONFIG.shipping.shippingCost}</g:price>
      </g:shipping>
      <g:shipping_weight>0.5 kg</g:shipping_weight>
    </item>
`;
  });

  xmlContent += `  </channel>
</rss>`;

  const xmlPath = path.join(__dirname, '..', 'scentmart_products_feed.xml');
  fs.writeFileSync(xmlPath, xmlContent, 'utf8');
  console.log(`✅ Feed XML generado exitosamente: ${xmlPath}`);
  return xmlPath;
};

// Función para generar reporte de productos
const generateProductReport = () => {
  console.log('📊 Generando reporte de productos...');
  
  const totalProducts = perfumes.length;
  const inStockProducts = perfumes.filter(p => p.stock > 0).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const productsWithDiscount = perfumes.filter(p => p.originalPrice && p.originalPrice > p.price).length;
  
  const brandCount = {};
  const familyCount = {};
  const genderCount = {};
  
  perfumes.forEach(perfume => {
    brandCount[perfume.brand] = (brandCount[perfume.brand] || 0) + 1;
    familyCount[perfume.family] = (familyCount[perfume.family] || 0) + 1;
    genderCount[perfume.gender] = (genderCount[perfume.gender] || 0) + 1;
  });

  const report = `
📈 REPORTE DE CATÁLOGO SCENTMART
===============================

📊 ESTADÍSTICAS GENERALES:
• Total de productos: ${totalProducts}
• Productos en stock: ${inStockProducts}
• Productos agotados: ${outOfStockProducts}
• Productos con descuento: ${productsWithDiscount}

🏷️ POR MARCA:
${Object.entries(brandCount).map(([brand, count]) => `• ${brand}: ${count} productos`).join('\n')}

🌸 POR FAMILIA OLFATIVA:
${Object.entries(familyCount).map(([family, count]) => `• ${family}: ${count} productos`).join('\n')}

👥 POR GÉNERO:
${Object.entries(genderCount).map(([gender, count]) => `• ${gender}: ${count} productos`).join('\n')}

⚠️ PRODUCTOS AGOTADOS:
${perfumes.filter(p => p.stock === 0).map(p => `• ${p.name} (${p.brand})`).join('\n')}

💰 RANGO DE PRECIOS:
• Precio mínimo: $${Math.min(...perfumes.map(p => p.price)).toLocaleString()} COP
• Precio máximo: $${Math.max(...perfumes.map(p => p.price)).toLocaleString()} COP
• Precio promedio: $${Math.round(perfumes.reduce((sum, p) => sum + p.price, 0) / perfumes.length).toLocaleString()} COP

🔗 CONFIGURACIÓN ACTUAL:
• Dominio base: ${STORE_CONFIG.baseUrl}
• Envío gratis en: ${STORE_CONFIG.shipping.freeShippingLocation}
• WhatsApp: ${STORE_CONFIG.contact.whatsapp}
• Email: ${STORE_CONFIG.contact.email}

⚠️ IMPORTANTE:
Antes de subir los feeds a Facebook Commerce Manager:
1. Cambiar STORE_CONFIG.baseUrl por tu dominio real
2. Verificar que las imágenes sean accesibles públicamente
3. Configurar páginas de producto individuales si es necesario
`;

  const reportPath = path.join(__dirname, '..', 'scentmart_catalog_report.txt');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`📋 Reporte generado: ${reportPath}`);
  return reportPath;
};

// Función principal
const main = () => {
  console.log('🌸 GENERADOR DE FEEDS SCENTMART PERFUMES 🌸');
  console.log('==========================================\n');
  
  try {
    // Crear directorio de salida si no existe
    const outputDir = path.join(__dirname, '..');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generar feeds
    const csvPath = generateCSVFeed();
    const xmlPath = generateXMLFeed();
    const reportPath = generateProductReport();

    console.log('\n🎉 ¡GENERACIÓN COMPLETADA EXITOSAMENTE!');
    console.log('=====================================');
    console.log(`📄 Feed CSV: ${path.basename(csvPath)}`);
    console.log(`📄 Feed XML: ${path.basename(xmlPath)}`);
    console.log(`📄 Reporte: ${path.basename(reportPath)}`);
    
    console.log('\n📋 PRÓXIMOS PASOS:');
    console.log('1. ⚠️  CAMBIAR la URL base en STORE_CONFIG');
    console.log('2. 📤 Subir el CSV o XML a Facebook Commerce Manager');
    console.log('3. 🔗 Configurar el catálogo en Facebook Business');
    console.log('4. 📱 Conectar con Instagram y WhatsApp Business');
    
    console.log('\n💡 CONSEJOS:');
    console.log('• Usa el CSV para Commerce Manager (más compatible)');
    console.log('• El XML es útil para otros sistemas de e-commerce');
    console.log('• Revisa el reporte para estadísticas del catálogo');
    
  } catch (error) {
    console.error('❌ Error generando feeds:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  generateCSVFeed,
  generateXMLFeed,
  generateProductReport,
  STORE_CONFIG
};