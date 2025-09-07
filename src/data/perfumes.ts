import { Perfume } from '../types';

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: "BLEU INTENSE",
    brand: "L'BEL",
    price: 65000,
    originalPrice: 83000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 58000,
    originalPrice: 69000,
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
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
    price: 30000,
    originalPrice: 35000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 33000,
    originalPrice: 42000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 45000,
    originalPrice: 68000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 45000,
    originalPrice: 68000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 33000,
    originalPrice: 45000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 40000,
    originalPrice: 47000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 59000,
    originalPrice: 70000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 70000,
    originalPrice: 109000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 65000,
    originalPrice: 142000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 70000,
    originalPrice: 117000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 70000,
    originalPrice: 117000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 57000,
    originalPrice: 126000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 35000,
    originalPrice: 42000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 30000,
    originalPrice: 37000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 65000,
    originalPrice: 77000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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
    price: 55000,
    originalPrice: 134000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 38000,
    originalPrice: 47000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 60000,
    originalPrice: 65000,
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
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
    price: 40000,
    originalPrice: 68000,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
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