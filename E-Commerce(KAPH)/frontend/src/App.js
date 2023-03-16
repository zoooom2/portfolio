import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  AboutPage,
  CartPage,
  ProductPage,
  SingleProductPage,
  ErrorPage,
  CheckoutPage,
  PaymentGateway,
  LoginPage,
  Signup,
  RedirectPage,
} from './pages';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `/api/v1/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      // setUser(data.user._id);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        <Route exact path="/pay" element={<PaymentGateway />} />

        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/redirect" element={<RedirectPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
