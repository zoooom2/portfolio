import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserType } from '../../../types';
import { useAppSelector } from '../../../App/hooks';

const AdminRoutes = ({ user }: { user: UserType }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return !isAuthenticated ? (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  ) : user.role !== 'admin' ? (
    <Navigate to='/' />
  ) : (
    <Outlet />
  );
};

export default AdminRoutes;
