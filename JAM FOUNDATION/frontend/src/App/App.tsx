import { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from '../global_components/layout/Navbar';
import Footer from '../global_components/layout/Footer';
import ErrorComponent from '../global_components/layout/ErrorComponent';
import Loading from '../global_components/layout/Loading';

import {
  AboutPage,
  AdminArticlesPage,
  ArticlePage,
  ContactPage,
  HomePage,
  SingleArticlePage,
} from '../pages';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchArticles } from '../features/globalSlice';
import LoginPage from '../pages/LoginPage';
import AdminForm from '../pages/AdminForm';
import AdminRoutes from '../features/userFeature/AdminRoutes';
import NonAdmin from '../global_components/NonAdmin';

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<NonAdmin />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles' element={<ArticlePage />} />
            <Route path='/articles/:id' element={<SingleArticlePage />} />
            <Route path='/login' element={<LoginPage />} />
            {/* <Route path='/admin/articles/create' element={<AdminForm />} /> */}
            {/* <Route path='/admin/articles' element={<AdminArticlesPage />} /> */}
            {/* <Route path='/admin/articles/edit/:id' element={<AdminForm />} /> */}

            <Route
              path='/login'
              element={
                isAuthenticated ? <Navigate to='/admin/' /> : <LoginPage />
              }
            />
          </Route>

          <Route
            element={
              <AdminRoutes isAuthenticated={isAuthenticated} user={user} />
            }>
            <Route path='/admin' element={<Navigate to='/admin/articles' />} />
            <Route path='/admin'>
              <Route path='/admin/articles'>
                <Route
                  path='/admin/articles/'
                  element={<AdminArticlesPage />}
                />
                <Route path='/admin/articles/create' element={<AdminForm />} />
                <Route
                  path='/admin/articles/edit/:id'
                  element={<AdminForm />}
                />
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<ErrorComponent />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};
export default App;
