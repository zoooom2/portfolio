import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { AdminProvider } from './context/admin_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <UserProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </UserProvider>
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </React.StrictMode>
);
