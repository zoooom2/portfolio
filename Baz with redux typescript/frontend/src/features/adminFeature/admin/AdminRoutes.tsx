import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserType } from '../../../types';

const AdminRoutes = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: UserType;
}) => {
  const location = useLocation();
  return !isAuthenticated ? (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  ) : user.role !== 'admin' ? (
    <Navigate to='/' />
  ) : (
    <Outlet />
  );
};

export default AdminRoutes;
