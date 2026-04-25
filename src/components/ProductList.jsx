import React, { useState } from 'react';
import { useSeller } from '../context/SellerContext';
import '../styles/ProductList.css';
import { useTranslation } from 'react-i18next';

const ProductList = ({ products, onEdit, onRefresh }) => {
  const { t } = useTranslation();

  const {
    deleteProduct,
    bulkDeleteProducts,
    updateProductStatus
  } = useSeller();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // ================= FILTER =================
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  // ================= SELECT =================
  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p._id));
    }
  };

  // ================= DELETE =================
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsBulkDelete(false);
    setShowDeleteModal(true);
  };

  const handleBulkDeleteClick = () => {
    if (selectedProducts.length === 0) return;

    setProductToDelete(null);
    setIsBulkDelete(true);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (isBulkDelete) {
        await bulkDeleteProducts(selectedProducts);
        setSelectedProducts([]);
      } else {
        await deleteProduct(productToDelete._id);
      }

      setShowDeleteModal(false);
      setProductToDelete(null);
      setIsBulkDelete(false);

      onRefresh();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // ================= STATUS =================
  const handleStatusChange = async (id, status) => {
    await updateProductStatus(id, status);
    onRefresh();
  };

  return (
    <div className="product-list-container">

      {/* HEADER */}
      <div className="list-header">
        <input
          placeholder={t('Search products...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? t('All') : c}
            </option>
          ))}
        </select>

        {selectedProducts.length > 0 && (
          <button onClick={handleBulkDeleteClick} className="btn-danger">
            {t('Delete Selected')} ({selectedProducts.length})
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="products-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  filteredProducts.length > 0 &&
                  selectedProducts.length === filteredProducts.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>{t('Product')}</th>
            <th>{t('Price')}</th>
            <th>{t('Stock')}</th>
            <th>{t('Status')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product._id}
              className={selectedProducts.includes(product._id) ? 'selected' : ''}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleSelectProduct(product._id)}
                />
              </td>
              <td className="product-info-cell">
                  <img 
                    src={`https://goldipay.onrender.com/uploads/${product.image}`} 
                    alt={product.title}
                    className="product-thumbnail"></img>
                  
              <td>
                <div>
                  <strong>{product.title}</strong>
                </div>
              </td>
              </td>
              <td>${product.price}</td>

              <td>{product.stock}</td>

              <td>
                <select
                  value={product.status}
                  onChange={(e) =>
                    handleStatusChange(product._id, e.target.value)
                  }
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </td>

              <td>
                <button onClick={() => onEdit(product)}>Edit</button>

                <button onClick={() => handleDeleteClick(product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{t('Confirm Delete')}</h3>

            <p>
              {isBulkDelete
                ? `Delete ${selectedProducts.length} products?`
                : `Delete "${productToDelete?.title}"?`}
            </p>

            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>

              <button onClick={handleConfirmDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;