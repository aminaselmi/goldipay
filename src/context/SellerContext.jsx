// context/SellerContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const SellerContext = createContext();

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
};

export const SellerProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Memoize fetchProducts to prevent unnecessary re-renders
  const fetchProducts = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://goldipay.onrender.com/api/products'); // Replace with actual backend URL
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, []);

  // Refresh stats
  const refreshStats = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockStats = {
        totalProducts: products.length,
        totalOrders: 156,
        totalRevenue: 12450.75,
        averageOrderValue: 79.81,
        topProducts: products.slice(0, 3).map(p => ({
          id: p._id,
          name: p.title,
          image: p.image,
          sales: Math.floor(Math.random() * 50) + 10,
          revenue: p.price * (Math.floor(Math.random() * 50) + 10)
        })),
        recentOrders: [
          { id: 'ORD-001', customer: 'John Doe', amount: 129.99, status: 'delivered' },
          { id: 'ORD-002', customer: 'Jane Smith', amount: 79.50, status: 'processing' },
          { id: 'ORD-003', customer: 'Bob Johnson', amount: 245.00, status: 'shipped' },
          { id: 'ORD-004', customer: 'Alice Brown', amount: 59.99, status: 'pending' }
        ]
      };
      
      setStats(mockStats);
      return mockStats;
    } catch (err) {
      console.error('Error refreshing stats:', err);
    }
  }, [products]);

  const addProduct = async (productData) => {
  setLoading(true);
  try {
    const response = await fetch('https://goldipay.onrender.com/api/products', {
      method: 'POST',
      body: productData // ✅ FormData directly
    });
    if (!response.ok) throw new Error('Failed to add product');
    const newProduct = await response.json();
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};
  const updateProduct = async (productId, productData) => {
  setLoading(true);
  try {
    const response = await fetch(`https://goldipay.onrender.com/api/products/${productId}`, {
      method: 'PUT',
      body: productData // ✅ FormData
    });
    if (!response.ok) throw new Error('Failed to update product');
    const updatedProduct = await response.json();
    setProducts(prev => prev.map(p => p._id === productId ? updatedProduct : p));
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const deleteProduct = async (productId) => {
  setLoading(true);
  try {
    const response = await fetch(`https://goldipay.onrender.com/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    setProducts(prev => prev.filter(p => p._id !== productId));
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

 const bulkDeleteProducts = async (productIds) => {
  setLoading(true);
  try {
    const response = await fetch('https://goldipay.onrender.com/api/products/bulk', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: productIds })
    });
    if (!response.ok) throw new Error('Failed to bulk delete products');
    setProducts(prev => prev.filter(p => !productIds.includes(p._id)));
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const updateProductStatus = async (productId, status) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProducts(prev => prev.map(p => 
        p._id === productId ? { ...p, status } : p
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    error,
    stats,
    fetchProducts,
    refreshStats,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    updateProductStatus
  };

  return (
    <SellerContext.Provider value={value}>
      {children}
    </SellerContext.Provider>
  );
};