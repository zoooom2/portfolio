import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  AboutPage,
  CartPage,
  ProductPage,
  SingleProductPage,
  ErrorPage,
  CheckoutPage,
} from './pages/index';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/products" element={<ProductPage />} />
        <Route exact path="/product/:id" element={<SingleProductPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
