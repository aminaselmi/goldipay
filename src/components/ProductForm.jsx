// components/seller/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useSeller } from '../context/SellerContext';
import '../styles/ProductForm.css';
import { useTranslation } from 'react-i18next';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { addProduct, updateProduct, user } = useSeller();
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

 
  // Categories data
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Food & Beverages',
    'Automotive',
    'Health',
    'Jewelry',
    'Music',
    'Pet Supplies',
    'Shoes',
    'Other'
  ];

  // Load product data if editing
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        image: product.image || '' // Ensure img field is passed
      });
    }
  }, [product]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? [checked] : value
    }));
  };

  // Form validation
  const validateForm = () => {
  if (!formData.title.trim()) return t('Title required');
  if (!formData.price) return t('Valid price required');
  if (!formData.category) return t('Category required');
  if (!imageFile && !product) return t('Image required');
  return '';
};
   
  const [imageFile, setImageFile] = useState(null);
  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Prepare data for submission
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", parseFloat(formData.price) || 0);
      formDataToSend.append("stock", parseInt(formData.stock) || 0);
      formDataToSend.append("seller", user?.id || "seller_demo");

      // 🔥 VERY IMPORTANT
      if (imageFile) {
          formDataToSend.append("image", imageFile);
        }
      
    

      if (product) {
        await updateProduct(product._id, formDataToSend);
        setSuccessMessage(t('Product updated successfully!'));
      } else {
        await addProduct(formDataToSend);
        setSuccessMessage(t('Product added successfully!'));
      }
      
      // Close modal after success
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || t('An error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-form-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? t('✏️ Edit Product') : t('➕ Add New Product')}</h2>
          <button className="close-btn" onClick={onClose} aria-label={t('Close')}>
            <span>×</span>
          </button>
        </div>

        {/* Form Tabs */}
        <div className="form-tabs">

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-body">
            {/* ==================== BASIC INFO TAB ==================== */}
              <div className="tab-content">
                <div className="form-group required">
                  <label>{t('Product Title')}</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={t('e.g., Premium Cotton T-Shirt')}
                    maxLength="100"
                    required
                  />
                  <small>{formData.title.length}/100 {t('characters')}</small>
                </div>

                <div className="form-row">
                  <div className="form-group required">
                    <label>{t('Price ($)')}</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="29.99"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  

                <div className="form-group">
                  <label>{t('Description')}</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('Detailed product description...')}
                    rows="5"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group required">
                    <label>{t('Category')}</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{t('Select Category')}</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{t(cat)}</option>
                      ))}
                    </select>
              </div>
              </div>
            
              <div className="tab-content">
                <div className="form-group">
                  <label>{t('Product Image URL')}</label>
                  <div className="image-upload-group">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      
                    />
                 </div>
                </div>
              </div> 
                  <div className="image-preview-grid">
                    {imageFile && (
                      <div className="image-preview">
                        <img 
                          src={URL.createObjectURL(imageFile)} 
                          alt={t('preview')} 
                        />
                      </div>
                    )}

                    {/* show existing image in edit mode */}
                    {product && !imageFile && (
                      <div className="image-preview">
                        <img 
                          src={`https://goldipay.onrender.com/uploads/${product.image}`} 
                          alt={t('product')} 
                        />
                      </div>
                    )}
                 </div>
                 </div></div></div>
              <div className="tab-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('Stock Quantity')}</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>
          {/* Messages */}
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="success-message">
              <span>✅ {successMessage}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              {t('Cancel')}
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {product ? t('Updating...') : t('Adding...')}
                </>
              ) : (
                product ? t('✏️ Update Product') : t('➕ Add Product')
              )}
            </button>
          </div>
          
        </form>
      </div>
      </div>
    </div>
  );
};

export default ProductForm;