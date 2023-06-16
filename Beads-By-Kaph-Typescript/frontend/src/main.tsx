import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  CartProvider,
  FilterProvider,
  ProductsProvider,
  UserProvider,
} from './context/contextProviders';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </StrictMode>
);
