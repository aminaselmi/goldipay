// components/CategoryFilter.jsx
import React, { useState, useEffect } from 'react';
import '../styles/CategoryFilter.css';
import { useTranslation } from 'react-i18next';

const CategoryFilter = ({ products, selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  // Get count of products in each category
  const getCategoryCount = (category) => {
    if (category === 'all') return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="category-filter">
      <h3>{t('Filters')}</h3>
      
      {/* Category list */}
      <div className="filter-section">
        <h4>{t('Categories')}</h4>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category}>
              <label className="category-label">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                />
                <span className="category-name">
                  {category === 'all' ? t('All Products') : category}
                </span>
                <span className="category-count">
                  ({getCategoryCount(category)})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range filter */}
      <div className="filter-section">
        <h4>{t('Price Range')}</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder={t('Min')}
            value={priceRange.min}
            onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
          />
          <span>{t('to')}</span>
          <input
            type="number"
            placeholder={t('Max')}
            value={priceRange.max}
            onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
          />
        </div>
      </div>

      {/* Stock filter */}
      <div className="filter-section">
        <label className="stock-filter">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>{t('In stock only')}</span>
        </label>
      </div>

      <button 
        className="apply-filters"
        onClick={() => {
          // Apply all filters logic here
          console.log('Applying filters:', { selectedCategory, priceRange, inStockOnly });
        }}
      >
        {t('Apply Filters')}
      </button>
    </div>
  );
};

export default CategoryFilter;