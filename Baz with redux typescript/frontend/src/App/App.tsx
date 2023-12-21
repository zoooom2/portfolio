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
import { Loading } from '../global_components';
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
const LoginPage = lazy(() => import('../pages/LoginPage'));
const OrderPage = lazy(() => import('../pages/OrderPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const AdminRoutes = lazy(
  () => import('../features/adminFeature/admin/AdminRoutes')
);
import { useAppDispatch, useAppSelector } from './hooks';
import { countCartTotal } from '../features/cartFeature/cartSlice';
import UserRoutes from '../features/userFeature/user/UserRoutes';
import {
  AdminOrders,
  AdminOverview,
  AdminProduct,
} from '../features/adminFeature/admin';
import AdminProductForm from '../features/adminFeature/admin/AdminProducts/AdminProductForm';
import AdminOrderDetail from '../features/adminFeature/admin/AdminOrders/AdminOrderDetail';
import AdminTopProducts from '../features/adminFeature/admin/AdminBestSellers.tsx/AdminTopProducts';

const App = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);
  const { single_product } = useAppSelector((state) => state.product);
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

            <Route path='/admin/overview' element={<AdminOverview />} />

            <Route path='/admin/product' element={<AdminProduct />} />
            <Route
              path='/admin/product/detail/:id'
              element={
                <AdminProductForm type='detail' product={single_product} />
              }
            />
            <Route
              path='/admin/product/create'
              element={<AdminProductForm type='create' />}
            />

            <Route path='/admin/order/' element={<AdminOrders />} />
            <Route
              path='/admin/order/detail/:id'
              element={<AdminOrderDetail />}
            />

            <Route path='/admin/topProducts' element={<AdminTopProducts />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;
