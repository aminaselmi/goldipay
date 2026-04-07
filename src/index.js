import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext"; // ✅ make sure this is named import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './i18n'; // Import i18n
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { CartProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>  {/* ✅ wrap your app here */}
            <CartProvider>
              <App />
            </CartProvider>
            
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>
);