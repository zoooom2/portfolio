import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { fetchProfile } from '../../userFeature/userSlice';

import { setAdminRoute } from '../adminSlice';

const AdminRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(setAdminRoute(true));
  });

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

export default AdminRoutes;
