import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  ThesisPage,
  CartPage,
  ProductPage,
  SingleProductPage,
  ErrorPage,
  CheckoutPage,
  PaymentGateway,
  LoginPage,
  Signup,
  RedirectPage,
  Profile,
  ContactPage,
} from './pages';
import { useUserContext } from './context/user_context';

const App = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/cart' element={<CartPage />} />
        <Route exact path='/thesis' element={<ThesisPage />} />
        <Route exact path='/shop' element={<ProductPage />} />
        <Route exact path='/shop/:id' element={<SingleProductPage />} />
        {/* <Route path='/redirect' element={<RedirectPage />} /> */}
        {/* <Route
          exact
          path='/checkout'
          element={isAuthenticated ? <CheckoutPage /> : <LoginPage />}
        />
        <Route
          exact
          path='/pay'
          element={isAuthenticated ? <PaymentGateway /> : <LoginPage />}
        />

        <Route
          exact
          path='/login'
          element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />}
        />
        <Route
          path='/signup'
          element={isAuthenticated ? <Navigate to='/' /> : <Signup />}
        />

        <Route
          path='/profile'
          element={isAuthenticated ? <Profile /> : <LoginPage />}
        />

        <Route path='*' element={<ErrorPage />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
