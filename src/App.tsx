import React, { useState, useEffect } from 'react';
import { Perfume, CartItem, OrderDetails, ToastNotification as ToastType } from './types';
import { perfumes as initialPerfumes } from './data/perfumes';
import { emailService } from './services/emailService';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import OlfactoryFamilyExplorer from './components/OlfactoryFamilyExplorer';
import AboutSection from './components/AboutSection';
import BestsellersSection from './components/BestsellersSection';
import CatalogView from './components/CatalogView';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ThankYouPage from './components/ThankYouPage';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';

// Modals
import QuizModal from './components/modals/QuizModal';
import PerfumeDetailModal from './components/modals/PerfumeDetailModal';
import SearchModal from './components/modals/SearchModal';
import AdminLoginModal from './components/modals/AdminLoginModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Admin
import AdminPage from './components/admin/AdminPage';

type View = 'home' | 'cart' | 'checkout' | 'thank-you' | 'admin';

function App() {
  // State management
  const [currentView, setCurrentView] = useState<View>('home');
  const [perfumes, setPerfumes] = useState<Perfume[]>(initialPerfumes);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [recommendedPerfumes, setRecommendedPerfumes] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<ToastType[]>([]);
  
  // Filter states (moved from CatalogView to App level)
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([30000, 80000]);
  const [sortOption, setSortOption] = useState('relevance');
  // Modal states
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [lastOrderDetails, setLastOrderDetails] = useState<OrderDetails | null>(null);

  // Navigation handlers
  const handleNavigate = (view: View, section?: string) => {
    setCurrentView(view);
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleNavigateToCatalog = (family?: string) => {
    setCurrentView('home');
    
    // Si se especifica una familia, aplicar el filtro
    if (family) {
      // Resetear otros filtros y aplicar solo la familia seleccionada
      setSelectedFamilies([family]);
      setSelectedGenders([]);
      setPriceRange([30000, 80000]); // Rango completo actualizado
      setSortOption('relevance');
      showNotification(`Mostrando productos de la familia ${family}`, 'info');
    }
    
    setTimeout(() => {
      const element = document.getElementById('catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Cart management
  const handleAddToCart = (perfume: Perfume) => {
    if (perfume.stock === 0) {
      showNotification('Este producto está agotado', 'error');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.perfume.id === perfume.id);
      
      if (existingItem) {
        if (existingItem.quantity >= perfume.stock) {
          showNotification('No hay más stock disponible', 'error');
          return prevCart;
        }
        
        const updated = prevCart.map(item =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showNotification(`${perfume.name} añadido al carrito`, 'success');
        return updated;
      } else {
        showNotification(`${perfume.name} añadido al carrito`, 'success');
        return [...prevCart, { perfume, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (perfumeId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(perfumeId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.perfume.id === perfumeId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (perfumeId: string) => {
    setCart(prevCart => prevCart.filter(item => item.perfume.id !== perfumeId));
    showNotification('Producto eliminado del carrito', 'info');
  };

  // Product management
  const handleViewDetails = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsDetailModalOpen(true);
  };

  const handleUpdatePerfume = (updatedPerfume: Perfume) => {
    setPerfumes(prev => 
      prev.map(p => p.id === updatedPerfume.id ? updatedPerfume : p)
    );
    showNotification('Producto actualizado exitosamente', 'success');
  };

  const handleAddPerfume = (newPerfume: Perfume) => {
    setPerfumes(prev => [...prev, newPerfume]);
    showNotification('Producto añadido al catálogo', 'success');
  };

  // Order management
  const handlePlaceOrder = async (orderDetails: OrderDetails) => {
    try {
      // Update stock
      setPerfumes(prev => prev.map(perfume => {
        const orderItem = orderDetails.items.find(item => item.perfume.id === perfume.id);
        if (orderItem) {
          return { ...perfume, stock: perfume.stock - orderItem.quantity };
        }
        return perfume;
      }));

      // Add to orders
      setOrders(prev => [orderDetails, ...prev]);
      
      // Clear cart
      setCart([]);
      
      // Set order details for thank you page
      setLastOrderDetails(orderDetails);
      
      // Navigate to thank you page
      setCurrentView('thank-you');
      
      // Send confirmation email
      await emailService.sendOrderConfirmationEmail(orderDetails);
      
      // Send WhatsApp notification
      await emailService.sendWhatsAppNotification(orderDetails);
      
      showNotification('Pedido confirmado exitosamente', 'success');
    } catch (error) {
      console.error('Error placing order:', error);
      showNotification('Error al procesar el pedido', 'error');
    }
  };

  // Quiz completion
  const handleQuizComplete = (recommendations: string[]) => {
    setRecommendedPerfumes(recommendations);
    handleNavigateToCatalog();
    showNotification('¡Recomendaciones personalizadas listas!', 'success');
  };

  // Notifications
  const showNotification = (message: string, type: ToastType['type'] = 'info') => {
    const notification: ToastType = {
      id: `notification-${Date.now()}`,
      message,
      type
    };
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Admin authentication
  const handleAdminAccess = () => {
    setIsAdminLoginModalOpen(true);
  };

  const handleAdminLogin = () => {
    setCurrentView('admin');
    showNotification('Acceso autorizado al panel de administración', 'success');
  };

  // Calculate cart total items
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'cart':
        return (
          <CartPage
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onContinueShopping={() => setCurrentView('home')}
            onProceedToCheckout={() => setCurrentView('checkout')}
          />
        );
      
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cart}
            onBack={() => setCurrentView('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      
      case 'thank-you':
        return lastOrderDetails ? (
          <ThankYouPage
            orderDetails={lastOrderDetails}
            onBackToHome={() => setCurrentView('home')}
          />
        ) : null;
      
      case 'admin':
        return (
          <AdminPage
            perfumes={perfumes}
            orders={orders}
            onUpdatePerfume={handleUpdatePerfume}
            onAddPerfume={handleAddPerfume}
            onBackToStore={() => setCurrentView('home')}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <Hero onOpenQuiz={() => setIsQuizModalOpen(true)} />
            <BestsellersSection
              perfumes={perfumes}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
            <CatalogView
              perfumes={perfumes}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
              recommendedPerfumes={recommendedPerfumes}
              selectedGenders={selectedGenders}
              selectedFamilies={selectedFamilies}
              priceRange={priceRange}
              sortOption={sortOption}
              onGenderChange={setSelectedGenders}
              onFamilyChange={setSelectedFamilies}
              onPriceChange={setPriceRange}
              onSortChange={setSortOption}
            />
            <OlfactoryFamilyExplorer onNavigateToCatalog={handleNavigateToCatalog} />
            <AboutSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Announcement Bar */}
      {currentView === 'home' && <AnnouncementBar />}
      
      {/* Header */}
      {currentView !== 'admin' && (
        <Header
          cartItemsCount={cartItemsCount}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenCart={() => setCurrentView('cart')}
        />
      )}

      {/* Main Content */}
      <main>
        {renderCurrentView()}
      </main>

      {/* Footer */}
      {currentView === 'home' && (
        <Footer onAdminAccess={handleAdminAccess} />
      )}

      {/* Modals */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onComplete={handleQuizComplete}
      />

      <PerfumeDetailModal
        perfume={selectedPerfume}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPerfume(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        perfumes={perfumes}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLogin={handleAdminLogin}
      />

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <ToastNotification
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;