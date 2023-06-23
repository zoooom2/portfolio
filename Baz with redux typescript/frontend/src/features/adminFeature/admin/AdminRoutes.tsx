import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { Loading } from '../../../global_components';
import { UserType } from '../../../types';
import { fetchProfile } from '../../userFeature/userSlice';

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
