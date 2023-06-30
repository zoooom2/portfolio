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
  stopLoading,
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
import { countCartTotal } from '../features/cartFeature/cartSlice';
import { fetchProducts } from '../features/productFeature/productSlice';
import { products_url } from '../utils/constants';

const App = () => {
  const { isAuthenticated, clicked, user, loading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(products_url));
    dispatch(checkVisitorCount()).then(() => {
      dispatch(countCartTotal());
      if (!isAuthenticated) {
        dispatch(fetchProfile());
      } else {
        dispatch(stopLoading());
      }
    });
  }, [isAuthenticated]);

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
          <Route path='/admin' element={<Navigate to='/admin/overview' />} />
          <Route path='/admin'>
            <Route
              path='/admin/overview'
              element={<AdminPages page={'overview'} />}
            />
            <Route path='/admin/product'>
              <Route
                path='/admin/product/'
                element={<AdminPages page={'product'} />}
              />
              <Route
                path='/admin/product/detail/:id'
                element={<AdminPages page={'productDetail'} />}
              />
              <Route
                path='/admin/product/create'
                element={<AdminPages page={'productCreate'} />}
              />
            </Route>
            <Route path='/admin/order'>
              <Route
                path='/admin/order/'
                element={<AdminPages page='order' />}
              />
              <Route
                path='/admin/order/detail/:id'
                element={<AdminPages page={'orderDetail'} />}
              />
            </Route>
            <Route path='/admin/users' element={<AdminPages page='users' />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
