import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { useUserContext } from './context/contextHooks';
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
  Profile,
} from './pages';

const App = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
        <Route path='/redirect' element={<RedirectPage />} />
        <Route
          path='/checkout'
          element={isAuthenticated ? <CheckoutPage /> : <LoginPage />}
        />
        <Route
          path='/pay'
          element={isAuthenticated ? <PaymentGateway /> : <LoginPage />}
        />

        <Route
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

        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
