import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  checkVisitorCount,
  fetchProfile,
} from '../features/userFeature/userSlice';
import { Navbar, Sidebar, ProtectedRoute, Loading } from '../global_components';
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
  OrderPage,
  ContactPage,
  AdminPages,
} from '../pages';

import AdminRoutes from '../features/adminFeature/admin/AdminRoutes';
import { useAppDispatch, useAppSelector } from './hooks';

const App = () => {
  const { isAuthenticated, clicked, user, loading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkVisitorCount());
    if (!isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      {clicked && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/thesis' element={<ThesisPage />} />
        <Route path='/shop' element={<ProductPage />} />
        <Route path='/shop/:id' element={<SingleProductPage />} />

        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />}
        />
        <Route
          path='/signup'
          // element={isAuthenticated ? <Navigate to='/' /> : <Signup />}
          element={<Signup />}
        />
        {/* <Route
          path='/profile'
          element={isAuthenticated ? <Profile /> : <LoginPage />}
        /> */}

        <Route element={<ProtectedRoute />}>
          <Route path='/checkout/:params' element={<CheckoutPage />} />
          <Route path='/pay' element={<PaymentGateway />} />
          <Route path='/order' element={<OrderPage />} />
        </Route>
        <Route
          element={
            <AdminRoutes isAuthenticated={isAuthenticated} user={user} />
          }>
          <Route path='/admin/:page' element={<AdminPages />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
