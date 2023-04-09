import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Navbar,
  Sidebar,
  ProtectedRoute,
  AdminNav,
  AdminSidebar,
  Footer,
} from './components';
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
  AdminPages,
} from './pages';

import { Loading } from './components';

import { useCartContext } from './context/cart_context';
import { useUserContext } from './context/user_context';
import AdminRoutes from './components/AdminRoutes';

const App = () => {
  const { cart } = useCartContext();
  const { isAuthenticated, clicked, user } = useUserContext();

  return (
    <Router>
      {clicked && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}

      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/cart' element={<CartPage />} />
        <Route exact path='/thesis' element={<ThesisPage />} />
        <Route exact path='/shop' element={<ProductPage />} />
        <Route exact path='/shop/:id' element={<SingleProductPage />} />

        <Route exact path='/pay' element={<PaymentGateway />} />
        <Route
          exact
          path='/login'
          element={
            // isAuthenticated ? <Navigate to='/' /> :
            <LoginPage />
          }
        />
        <Route
          path='/signup'
          element={
            // isAuthenticated ? <Navigate to='/' /> :
            <Signup />
          }
          exact
        />
        {/* <Route
          path='/profile'
          element={isAuthenticated ? <Profile /> : <LoginPage />}
        /> */}

        <Route element={<ProtectedRoute />}>
          <Route exact path='/checkout/:params' element={<CheckoutPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route
            exact
            path='/admin/:page'
            isAdmin={true}
            element={<AdminPages />}
          />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
