// pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { useCart } from '../context/CartContext';
import '../styles/ProductsPage.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer/action";
import { useTranslation } from 'react-i18next';

const ProductsPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  //const { addToCart } = useCart();
  const dispatch = useDispatch();
  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Using Fake Store API as example [citation:4]
      const response = await fetch("https://goldipay.onrender.com/api/products"); //'https://fakestoreapi.com/products'
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product._id, // ⚠️ important
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1
    }));
  };

  if (loading) {
    return <div className="loading-spinner">{t('Loading products...')}</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
       { /* <h1>Our Products</h1> */}
        <p className="product-count">{filteredProducts.length} {t('products found')}</p>
      </div>

      <div className="products-layout">
        {/* Sidebar with filters */}
        <aside className="products-sidebar">
          <CategoryFilter 
            products={products}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>

        {/* Product grid */}
        <main className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;