import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  checkVisitorCount,
  stopLoading,
} from '../features/userFeature/userSlice';
import { Navbar, Sidebar, Loading } from '../global_components';
import {
  HomePage,
  SingleProductPage,
  ProductPage,
  DeliveryPage,
} from '../pages';

const ThesisPage = lazy(() => import('../pages/ThesisPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const PaymentGateway = lazy(() => import('../pages/PaymentGatewayPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

const OrderPage = lazy(() => import('../pages/OrderPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const AdminPages = lazy(() => import('../pages/AdminPages'));

const AdminRoutes = lazy(
  () => import('../features/adminFeature/admin/AdminRoutes')
);
import { useAppDispatch, useAppSelector } from './hooks';
import { countCartTotal } from '../features/cartFeature/cartSlice';
import { links } from '../utils/constants';
import { CartButtons } from '../features/cartFeature/cart';
import UserRoutes from '../features/userFeature/user/UserRoutes';

const App = () => {
  const { isAuthenticated, clicked, loading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkVisitorCount());
    dispatch(countCartTotal());
    dispatch(stopLoading());
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      {clicked && (
        <>
          <Navbar buttons={<CartButtons />} admin={false} />

          <Sidebar navLinks={links} footerButtons={<CartButtons />} />
        </>
      )}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<UserRoutes />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/thesis' element={<ThesisPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/shop' element={<ProductPage />} />
            <Route path='/shop/:id' element={<SingleProductPage />} />
            <Route path='/checkout/:params' element={<CheckoutPage />} />
            <Route path='/pay' element={<PaymentGateway />} />
            <Route path='/order' element={<OrderPage />} />
            <Route path='/delivery' element={<DeliveryPage />} />

            <Route
              path='/login'
              element={
                isAuthenticated ? <Navigate to='/admin/' /> : <LoginPage />
              }
            />
          </Route>

          <Route element={<AdminRoutes isAuthenticated={isAuthenticated} />}>
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
              <Route
                path='/admin/users'
                element={<AdminPages page='users' />}
              />
            </Route>
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
