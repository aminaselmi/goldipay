// pages/SellerDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSeller } from '../context/SellerContext';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import DashboardStats from '../components/DashboardStats';
import '../styles/SellerDashboard.css';
import { useTranslation } from 'react-i18next';

const SellerDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { products, fetchProducts, loading, error, refreshStats } = useSeller();

  // Memoize fetchProducts to prevent unnecessary re-renders
  const loadProducts = useCallback(async () => {
    try {
      await fetchProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }, [fetchProducts]);

  // Load products when component mounts or when switching to products tab
  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    }
  }, [activeTab, loadProducts]);

  // Load dashboard stats when switching to dashboard tab
  useEffect(() => {
    if (activeTab === 'dashboard') {
      refreshStats?.();
    }
  }, [activeTab, refreshStats]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleSuccess = async () => {
    setShowProductForm(false);
    setEditingProduct(null);
    // Refresh the product list after successful operation
    await loadProducts();
    // Show success message (optional)
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      
      case 'products':
        return (
          <>
            {loading && <div className="loading">{t('Loading products...')}</div>}
            {error && (
              <div className="error">
                <span>{error}</span>
                <button onClick={loadProducts} className="retry-btn">
                  {t('Retry')}
                </button>
              </div>
            )}
            
            {!loading && !error && (
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onRefresh={loadProducts}
              />
            )}
          </>
        );
      
      case 'orders':
        return (
          <div className="coming-soon">
            <h3>{t('Order Management Coming Soon')}</h3>
            <p>{t("We're working hard to bring you order management features.")}</p>
            <div className="coming-soon-illustration">
              <span className="emoji">📦</span>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="coming-soon">
            <h3>{t('Analytics Dashboard Coming Soon')}</h3>
            <p>{t('Get ready for powerful insights into your sales and performance.')}</p>
            <div className="coming-soon-illustration">
              <span className="emoji">📊</span>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="coming-soon">
            <h3>{t('Store Settings Coming Soon')}</h3>
            <p>{t("You'll soon be able to customize your store settings here.")}</p>
            <div className="coming-soon-illustration">
              <span className="emoji">⚙️</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="seller-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>{t('Seller Central')}</h2>
          <p className="store-name">{t('My Awesome Store')}</p>
        </div>
        
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
            aria-label={t('Dashboard')}
          >
            <i className="icon-dashboard">📊</i>
            <span>{t('Dashboard')}</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => handleTabChange('products')}
            aria-label={t('Products')}
          >
            <i className="icon-products">📦</i>
            <span>{t('Products')}</span>
            {products.length > 0 && (
              <span className="badge">{products.length}</span>
            )}
          </button>
          
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
            aria-label={t('Orders')}
          >
            <i className="icon-orders">🛒</i>
            <span>{t('Orders')}</span>
            <span className="badge new">12</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => handleTabChange('analytics')}
            aria-label={t('Analytics')}
          >
            <i className="icon-analytics">📈</i>
            <span>{t('Analytics')}</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
            aria-label={t('Settings')}
          >
            <i className="icon-settings">⚙️</i>
            <span>{t('Settings')}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="seller-info">
            <div className="seller-avatar">
              <img src="https://via.placeholder.com/40" alt={t('Seller')} />
              <span className="online-indicator"></span>
            </div>
            <div className="seller-details">
              <p className="seller-name">{t("John's Store")}</p>
              <p className="seller-email">john@store.com</p>
            </div>
          </div>
          
          <button className="logout-btn" aria-label={t('Logout')}>
            <i className="icon-logout">🚪</i>
            <span>{t('Logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>
              {activeTab === 'dashboard' && t('Dashboard Overview')}
              {activeTab === 'products' && t('Product Management')}
              {activeTab === 'orders' && t('Order Management')}
              {activeTab === 'analytics' && t('Sales Analytics')}
              {activeTab === 'settings' && t('Store Settings')}
            </h1>
            <p className="header-date">
              {new Date().toLocaleDateString(t('locale'), { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="header-right">
            {activeTab === 'products' && (
              <button className="btn-primary" onClick={handleAddProduct}>
                <i className="icon-plus">➕</i>
                <span>{t('Add New Product')}</span>
              </button>
            )}
            
            <div className="header-actions">
              <button className="icon-btn" aria-label={t('Notifications')}>
                <i className="icon-notification">🔔</i>
                <span className="notification-badge">3</span>
              </button>
              <button className="icon-btn" aria-label={t('Messages')}>
                <i className="icon-message">💬</i>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default SellerDashboard;