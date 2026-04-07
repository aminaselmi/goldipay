import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stores from "./pages/Stores";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ClientDashboard from "./pages/ClientDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { SellerProvider } from './context/SellerContext';
import OrderSuccess from "./pages/OrderSuccess";
import './i18n';
import LanguageEffect from './components/LanguageEffect';


function App() {
  return (
    <>
    <LanguageEffect /> {/* This handles RTL/LTR globally */}
    <SellerProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout"  element={<Checkout />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saller-dashboard"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      </SellerProvider>
      
    </>
    
  );
}

export default App;
