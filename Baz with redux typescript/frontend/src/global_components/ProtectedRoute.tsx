import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../App/hooks';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

export default ProtectedRoute;
