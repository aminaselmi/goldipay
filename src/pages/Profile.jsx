// ProfilePage.jsx
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Edit2,
  Camera,
  Package,
  ChevronRight,
  Star,
  Clock,
  CreditCard
} from 'lucide-react';
import '../styles/ProfilePage.css';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, New York, NY 10001',
    joinDate: 'January 2024',
    avatar: 'https://via.placeholder.com/150'
  });

  // Sample order history
  const orders = [
    {
      id: '#ORD-001',
      date: '2024-01-15',
      total: '$129.99',
      status: 'Delivered',
      items: 3,
      products: [
        { name: t('Product 1'), quantity: 2, price: '$45.99' },
        { name: t('Product 2'), quantity: 1, price: '$38.01' }
      ]
    },
    {
      id: '#ORD-002',
      date: '2024-01-10',
      total: '$89.99',
      status: 'Shipped',
      items: 2,
      products: [
        { name: t('Product 3'), quantity: 1, price: '$89.99' }
      ]
    },
    {
      id: '#ORD-003',
      date: '2024-01-05',
      total: '$249.99',
      status: 'Processing',
      items: 4,
      products: [
        { name: t('Product 4'), quantity: 2, price: '$79.99' },
        { name: t('Product 5'), quantity: 2, price: '$45.01' }
      ]
    }
  ];

  // Sample wishlist items
  const wishlist = [
    {
      id: 1,
      name: t('Premium Wireless Headphones'),
      price: '$299.99',
      rating: 4.5,
      image: 'https://via.placeholder.com/200x200',
      inStock: true
    },
    {
      id: 2,
      name: t('Smart Watch Series 5'),
      price: '$399.99',
      rating: 4.8,
      image: 'https://via.placeholder.com/200x200',
      inStock: true
    },
    {
      id: 3,
      name: t('Designer Backpack'),
      price: '$89.99',
      rating: 4.3,
      image: 'https://via.placeholder.com/200x200',
      inStock: false
    },
    {
      id: 4,
      name: t('Leather Wallet'),
      price: '$49.99',
      rating: 4.6,
      image: 'https://via.placeholder.com/200x200',
      inStock: true
    }
  ];

  const tabs = [
    { id: 'profile', label: t('Profile'), icon: User },
    { id: 'orders', label: t('Orders'), icon: ShoppingBag },
    { id: 'wishlist', label: t('Wishlist'), icon: Heart },
    { id: 'settings', label: t('Settings'), icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'status-delivered';
      case 'Shipped': return 'status-shipped';
      case 'Processing': return 'status-processing';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    return t(status);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the data
    console.log('Saved profile:', userData);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-header">
            <div className="avatar-container">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="avatar"
              />
              <button className="avatar-upload">
                <Camera size={20} />
              </button>
            </div>
            <h2 className="user-name">{userData.name}</h2>
            <p className="user-join-date">{t('Member since')} {userData.joinDate}</p>
          </div>

          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
                {tab.id === 'orders' && (
                  <span className="badge">{orders.length}</span>
                )}
                {tab.id === 'wishlist' && (
                  <span className="badge">{wishlist.length}</span>
                )}
              </button>
            ))}
          </nav>

          <button className="logout-button">
            <LogOut size={20} />
            <span>{t('Logout')}</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content profile-tab">
              <div className="tab-header">
                <h2>{t('Profile Information')}</h2>
                {!isEditing ? (
                  <button className="edit-button" onClick={handleEditToggle}>
                    <Edit2 size={18} />
                    {t('Edit Profile')}
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>
                      {t('Cancel')}
                    </button>
                    <button className="save-button" onClick={handleSaveProfile}>
                      {t('Save Changes')}
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <User size={24} />
                  </div>
                  <div className="info-content">
                    <label>{t('Full Name')}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <p>{userData.name}</p>
                    )}
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <Mail size={24} />
                  </div>
                  <div className="info-content">
                    <label>{t('Email Address')}</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <p>{userData.email}</p>
                    )}
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <Phone size={24} />
                  </div>
                  <div className="info-content">
                    <label>{t('Phone Number')}</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <p>{userData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="info-content">
                    <label>{t('Shipping Address')}</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="edit-textarea"
                        rows="2"
                      />
                    ) : (
                      <p>{userData.address}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="recent-orders-section">
                <div className="section-header">
                  <h3>{t('Recent Orders')}</h3>
                  <button 
                    className="view-all"
                    onClick={() => setActiveTab('orders')}
                  >
                    {t('View All')} <ChevronRight size={16} />
                  </button>
                </div>
                <div className="recent-orders-list">
                  {orders.slice(0, 2).map(order => (
                    <div key={order.id} className="recent-order-item">
                      <div className="order-info">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="order-total">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-content orders-tab">
              <h2>{t('Order History')}</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-header-left">
                        <h3>{order.id}</h3>
                        <span className="order-date">
                          <Clock size={14} />
                          {order.date}
                        </span>
                      </div>
                      <div className="order-header-right">
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="order-total">{order.total}</span>
                      </div>
                    </div>
                    
                    <div className="order-products">
                      {order.products.map((product, index) => (
                        <div key={index} className="order-product-item">
                          <div className="product-info">
                            <Package size={16} />
                            <span>{product.name}</span>
                          </div>
                          <div className="product-details">
                            <span>{t('Qty')}: {product.quantity}</span>
                            <span>{product.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <button className="track-order">{t('Track Order')}</button>
                      <button className="buy-again">{t('Buy Again')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="tab-content wishlist-tab">
              <h2>{t('My Wishlist')}</h2>
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div key={item.id} className="wishlist-card">
                    <div className="wishlist-image">
                      <img src={item.image} alt={item.name} />
                      <button className="remove-wishlist">×</button>
                    </div>
                    <div className="wishlist-details">
                      <h3>{item.name}</h3>
                      <div className="wishlist-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(item.rating) ? '#FFD700' : 'none'}
                            color={i < Math.floor(item.rating) ? '#FFD700' : '#ccc'}
                          />
                        ))}
                        <span>({item.rating})</span>
                      </div>
                      <div className="wishlist-price">{item.price}</div>
                      <div className="wishlist-actions">
                        <button 
                          className="add-to-cart-btn"
                          disabled={!item.inStock}
                        >
                          {item.inStock ? t('Add to Cart') : t('Out of Stock')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content settings-tab">
              <h2>{t('Account Settings')}</h2>
              
              <div className="settings-section">
                <h3>{t('Preferences')}</h3>
                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>{t('Email Notifications')}</label>
                    <p>{t('Receive updates about your orders and promotions')}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>{t('SMS Notifications')}</label>
                    <p>{t('Get text messages about order updates')}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="settings-item-info">
                    <label>{t('Marketing Communications')}</label>
                    <p>{t('Receive promotional offers and newsletters')}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>{t('Payment Methods')}</h3>
                <div className="payment-methods">
                  <div className="payment-card">
                    <CreditCard size={24} />
                    <div className="payment-details">
                      <span>•••• •••• •••• 4242</span>
                      <small>{t('Expires')} 12/25</small>
                    </div>
                    <button className="edit-payment">{t('Edit')}</button>
                  </div>
                  <button className="add-payment">
                    + {t('Add New Payment Method')}
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h3>{t('Security')}</h3>
                <button className="security-button">
                  {t('Change Password')}
                </button>
                <button className="security-button">
                  {t('Enable Two-Factor Authentication')}
                </button>
              </div>

              <div className="settings-section danger-zone">
                <h3>{t('Danger Zone')}</h3>
                <button className="delete-account">
                  {t('Delete Account')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;