import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom';
import Navbar from '../global_components/layout/Navbar';
import Footer from '../global_components/layout/Footer';
import ErrorComponent from '../global_components/layout/ErrorComponent';
import Loading from '../global_components/layout/Loading';
// import { useAppSelector } from './hooks';
import {
  AboutPage,
  ArticlePage,
  ContactPage,
  HomePage,
  SingleArticlePage,
} from '../pages';

const App = () => {
  // const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Router>
      <>
        <Navbar />

        {/* <Sidebar navLinks={links} footerButtons={<CartButtons />} /> */}
      </>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/articles' element={<ArticlePage />} />
          <Route path='/articles/:id' element={<SingleArticlePage />} />

          {/* <Route
            path='/login'
            element={
              isAuthenticated ? <Navigate to='/admin/' /> : <LoginPage />
            }
          /> */}

          {/* <Route
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
              </Route> */}
          {/* <Route path='/admin/order'>
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
            </Route> */}
          {/* </Route> */}
          <Route path='*' element={<ErrorComponent />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};
export default App;