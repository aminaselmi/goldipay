// components/seller/DashboardStats.jsx
import React, { useState, useEffect } from 'react';
import { useSeller } from '../context/SellerContext';
import '../styles/DashboardStats.css';
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t } = useTranslation();
  const { refreshStats } = useSeller();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topProducts: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await refreshStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">{t('Loading dashboard...')}</div>;
  }

  return (
    <div className="dashboard-stats">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon products-icon">
            <i className="icon-box"></i>
          </div>
          <div className="stat-details">
            <h3>{t('Total Products')}</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-change positive">{t('+12% from last month')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <i className="icon-shopping-cart"></i>
          </div>
          <div className="stat-details">
            <h3>{t('Total Orders')}</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-change positive">{t('+8% from last month')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <i className="icon-dollar"></i>
          </div>
          <div className="stat-details">
            <h3>{t('Total Revenue')}</h3>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
            <span className="stat-change positive">{t('+15% from last month')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon avg-icon">
            <i className="icon-chart"></i>
          </div>
          <div className="stat-details">
            <h3>{t('Avg. Order Value')}</h3>
            <p className="stat-value">${stats.averageOrderValue.toFixed(2)}</p>
            <span className="stat-change negative">{t('-3% from last month')}</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="stats-details-grid">
        {/* Top Products */}
        <div className="stats-section">
          <h3>{t('Top Selling Products')}</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>{t('Product')}</th>
                <th>{t('Sales')}</th>
                <th>{t('Revenue')}</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.sales} {t('units')}</td>
                  <td>${product.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div className="stats-section">
          <h3>{t('Recent Orders')}</h3>
          <table className="stats-table">
            <thead>
              <tr>
                <th>{t('Order ID')}</th>
                <th>{t('Customer')}</th>
                <th>{t('Amount')}</th>
                <th>{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {t(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;