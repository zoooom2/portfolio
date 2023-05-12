
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const location = useLocation();
  const {  isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

export default ProtectedRoute;
