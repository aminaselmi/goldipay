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
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    
    //this is profile component
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    
    //loged in user
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        joinDate: "",
        avatar: "https://via.placeholder.com/150"
      });

      useEffect(() => {
        if (user) {
          setUserData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || "",
            address: user.address || "",
            joinDate: user.createdAt ? user.createdAt.slice(0,4) : "2026",
            avatar: user.avatar || "https://via.placeholder.com/150"
          });
        }
      }, [user]);
      //Sample order history
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      useEffect(() => {
        if (!user?.id) {
          console.log("No user ID available");
          return
        };
        
        const fetchOrders = async () => {
          setLoading(true);
          setError(null);
          try {
            // Add timeout to fetch
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch(`http://localhost:5000/api/order/user/${user.id}`, {
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
              }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("orders:", data);
            setOrders(Array.isArray(data) ? data : []);
          } catch (err) {
            console.error("Error fetching orders:", err);
            if (err.name === 'AbortError') {
              setError(t('Request timeout - server not responding'));
            } else if (err.message.includes('Failed to fetch')) {
              setError(t('Cannot connect to server. Please make sure the backend is running on port 5000'));
            } else {
              setError(err.message);
            }
            setOrders([]);
          } finally {
            setLoading(false);
          }
        };

        fetchOrders();
      }, [user]);
      // Sample wishlist items after change to real products
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
        switch(status?.toLowerCase()) {
          case 'delivered': return 'status-delivered';
          case 'shipped': return 'status-shipped';
          case 'processing': return 'status-processing';
          case 'paid': return 'status-paid';
          case 'pending': return 'status-pending';
          default: return '';
        }
      };
      
      const getStatusText = (status) => {
        return t(status?.charAt(0).toUpperCase() + status?.slice(1) || status);
      };
      
      // Format date function
    const formatDate = (dateString) => {
      if (!dateString) return t('N/A');
      return new Date(dateString).toLocaleDateString(t('locale'), {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    // Format price
    const formatPrice = (price) => {
      return `$${price?.toFixed(2) || '0.00'}`;
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


    // logout 
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate("/");
    };

    //  shape
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
    
              <button className="logout-button" onClick={handleLogout}>
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
                            name="mobile"
                            value={userData.mobile}
                            onChange={handleInputChange}
                            className="edit-input"
                          />
                        ) : (
                          <p>{userData.mobile || t('Not provided')}</p>
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
                          <p>{userData.address || t('Not provided')}</p>
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
                      {loading && <p>{t('Loading orders...')}</p>}
                      {error && <p className="error-message">{t('Error')}: {error}</p>}
                      {!loading && !error && orders.slice(0, 2).map(order => (
                        <div key={order._id} className="recent-order-item">
                          <div className="order-info">
                            <span className="order-id">{t('Order')} #{order._id.slice(-6)}</span>
                            <span className="order-date">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                            <span className="order-total">{formatPrice(order.totalPrice)}</span>
                          </div>
                        </div>
                      ))}
                      {!loading && !error && orders.length === 0 && (
                        <p className="no-orders">{t('No orders yet')}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
    
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="tab-content orders-tab">
                  <h2>{t('Order History')}</h2>
                  <div className="orders-list">
                    {loading && (
                      <div className="loading-state">
                        <p>{t('Loading your orders...')}</p>
                      </div>
                    )}
                    {error && (
                      <div className="error-state">
                        <p>{t('Failed to load orders')}: {error}</p>
                        <button onClick={() => window.location.reload()}>{t('Retry')}</button>
                      </div>
                    )}
                    {!loading && !error && orders.map(order => (
                      <div key={order._id} className="order-card">
                        <div className="order-header">
                          <div className="order-header-left">
                            <h3>{t('Order')} #{order._id.slice(-8)}</h3>
                            <span className="order-date">
                              <Clock size={14} />
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                          <div className="order-header-right">
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                            <span className="order-total">{formatPrice(order.totalPrice)}</span>
                          </div>
                        </div>
                        
                        <div className="order-products">
                          {order.items && order.items.map((item, index) => (
                            <div key={index} className="order-product-item">
                              <div className="product-info">
                                    {item.image ? (
                                      <img 
                                        src={`http://localhost:5000/uploads/${item.image}`}
                                        alt={item.title}
                                        className="product-thumbnail"
                                        onError={(e) => {
                                          e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                                        }}
                                      />
                                    ) : (
                                      <div className="placeholder-image">
                                        <Package size={20} />
                                      </div>
                                    )}
                                <span>{item.title || item.product?.title || t('Product')}</span>
                              </div>
                              <div className="product-details">
                                <span>{t('Qty')}: {item.quantity}</span>
                                <span>{formatPrice(item.price)}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="order-footer">
                          <div className="payment-info">
                            <span>{t('Payment')}: {order.paymentMethod}</span>
                            <span className={order.isPaid ? 'paid' : 'unpaid'}>
                              {order.isPaid ? t('✓ Paid') : t('Pending Payment')}
                            </span>
                          </div>
                          <button className="track-order">{t('Track Order')}</button>
                          <button className="buy-again">{t('Buy Again')}</button>
                        </div>
                      </div>
                    ))}
                    {!loading && !error && orders.length === 0 && (
                      <div className="empty-state">
                        <ShoppingBag size={48} />
                        <p>{t("You haven't placed any orders yet")}</p>
                        <button onClick={() => navigate('/products')}>{t('Start Shopping')}</button>
                      </div>
                    )}
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