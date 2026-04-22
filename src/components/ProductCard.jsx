// components/ProductCard.jsx
import React, { useState } from 'react';
import "../styles/ProductsPage.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer/action";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {useToast} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const dispatch = useDispatch();
  const { id, title, price, description, image, category, rating } = product;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    // 🔐 check login
    if (!user) {
      toast({
        title: t("⚠️ Please login first"),
        status: "warning",
        duration: 2000
      });
      navigate("/login");
      return;
   }
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1
    }));
    toast({
      title: t("✅ Added to cart"),
      status: "success",
      duration: 2000
    });
    console.log(product);
  };

  return (
    <div className="product-card">
      {/* Product badge for special items */}
      {product.featured && <span className="badge featured">{t('Featured')}</span>}
      {product.discount && <span className="badge sale">{t('Sale')}</span>}
      
      <div className="product-image-container">
        {!imageLoaded && <div className="image-placeholder">{t('Loading...')}</div>}
        <img
          src={`https://goldipay.onrender.com/uploads/${image}`} 
          alt={title}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy" // Lazy loading for performance [citation:6]
        />
        
        {/* Quick action buttons */}
        <div className="product-actions">
          <button 
            className="action-btn quick-view"
            onClick={() => setShowQuickView(true)}
          >
            {t('Quick View')}
          </button>
          <button 
            className="action-btn add-to-cart"
            onClick={handleAddToCart}
          >
            {t('Add to Cart')}
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(rating?.rate || 0))}
            {'☆'.repeat(5 - Math.floor(rating?.rate || 0))}
          </span>
          <span className="rating-count">({rating?.count || 0})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{price.toFixed(2)}DA</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}DA</span>
          )}
        </div>

        <p className="product-description">{description.substring(0, 100)}...</p>

        <button 
          className="add-to-cart-mobile"
          onClick={handleAddToCart}
        >
          {t('Add to Cart')}
        </button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal" onClick={() => setShowQuickView(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQuickView(false)}>×</button>
            <div className="modal-body">
              <img 
                src={`https://goldipay.onrender.com/uploads/${image}`} 
                alt={title} 
                className="modal-image" 
              />
              <div className="modal-details">
                <h2>{title}</h2>
                <p className="modal-price">{price.toFixed(2)}DA</p>
                <p className="modal-description">{description}</p>
                <button 
                  className="modal-add-to-cart"
                  onClick={handleAddToCart}
                >
                  {t('Add to Cart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;