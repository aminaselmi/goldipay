// components/seller/ProductList.jsx
import React, { useState } from 'react';
import { useSeller } from '../context/SellerContext';
import '../styles/ProductList.css';
import { useTranslation } from 'react-i18next';

const ProductList = ({ products, onEdit, onRefresh }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  
  const { deleteProduct, bulkDeleteProducts, updateProductStatus } = useSeller();

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (bulkDeleteMode && selectedProducts.length > 0) {
      await bulkDeleteProducts(selectedProducts);
      setSelectedProducts([]);
      setBulkDeleteMode(false);
    } else if (productToDelete) {
      await deleteProduct(productToDelete.id);
    }
    
    setShowDeleteModal(false);
    setProductToDelete(null);
    onRefresh();
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0) {
      setBulkDeleteMode(true);
      setShowDeleteModal(true);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleStatusChange = async (productId, newStatus) => {
    await updateProductStatus(productId, newStatus);
    onRefresh();
  };

  const handleDuplicate = async (product) => {
    // Create a copy of the product with new ID
    const { id, ...productData } = product;
    // Call API to duplicate
    onRefresh();
  };

  return (
    <div className="product-list-container">
      {/* Header with search and filters */}
      <div className="list-header">
        <div className="search-bar">
          <i className="icon-search"></i>
          <input
            type="text"
            placeholder={t('Search products by name or SKU...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? t('All Categories') : cat}
              </option>
            ))}
          </select>

          {selectedProducts.length > 0 && (
            <button className="btn-danger" onClick={handleBulkDelete}>
              <i className="icon-delete"></i>
              {t('Delete Selected')} ({selectedProducts.length})
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>{t('Product')}</th>
              <th>{t('SKU')}</th>
              <th>{t('Category')}</th>
              <th>{t('Price')}</th>
              <th>{t('Stock')}</th>
              <th>{t('Status')}</th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td className="product-info-cell">
                  <img 
                    src={product.images?.[0]?.url || '/placeholder.jpg'} 
                    alt={product.title}
                    className="product-thumbnail"
                  />
                  <div className="product-details">
                    <span className="product-title">{product.title}</span>
                    <span className="product-id">{t('ID')}: {product.id}</span>
                  </div>
                </td>
                <td>{product.sku || t('N/A')}</td>
                <td>{product.category}</td>
                <td>
                  <span className="product-price">${product.price}</span>
                  {product.discount && (
                    <span className="product-discount">-{product.discount}%</span>
                  )}
                </td>
                <td>
                  <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} ${t('units')}` : t('Out of Stock')}
                  </span>
                </td>
                <td>
                  <select
                    value={product.status}
                    onChange={(e) => handleStatusChange(product.id, e.target.value)}
                    className={`status-select status-${product.status}`}
                  >
                    <option value="published">{t('Published')}</option>
                    <option value="draft">{t('Draft')}</option>
                    <option value="archived">{t('Archived')}</option>
                  </select>
                </td>
                <td className="action-buttons">
                  <button 
                    className="btn-icon" 
                    onClick={() => onEdit(product)}
                    title={t('Edit product')}
                  >
                    <i className="icon-edit"></i>
                  </button>
                  <button 
                    className="btn-icon" 
                    onClick={() => handleDuplicate(product)}
                    title={t('Duplicate product')}
                  >
                    <i className="icon-copy"></i>
                  </button>
                  <button 
                    className="btn-icon delete" 
                    onClick={() => handleDeleteClick(product)}
                    title={t('Delete product')}
                  >
                    <i className="icon-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-footer">
        <div className="pagination-info">
          {t('Showing')} {filteredProducts.length} {t('of')} {products.length} {t('products')}
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>&laquo;</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">&raquo;</button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <h3>{t('Confirm Delete')}</h3>
            <p>
              {bulkDeleteMode
                ? t('Are you sure you want to delete {{count}} selected products? This action cannot be undone.', { count: selectedProducts.length })
                : t('Are you sure you want to delete "{{title}}"? This action cannot be undone.', { title: productToDelete?.title })
              }
            </p>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                  setBulkDeleteMode(false);
                }}
              >
                {t('Cancel')}
              </button>
              <button className="btn-danger" onClick={handleConfirmDelete}>
                {t('Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;