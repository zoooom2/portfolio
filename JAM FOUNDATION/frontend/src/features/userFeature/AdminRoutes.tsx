import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserType } from '../../types';
import { useEffect } from 'react';
import { useAppDispatch } from '../../App/hooks';
import { fetchProfile } from '../userFeature/userSlice';
import { setAdminMode } from '../globalSlice';

const AdminRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
  user: UserType;
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAdminMode(true));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  return !isAuthenticated ? (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  ) : (
    <Outlet />
  );
};

export default AdminRoutes;
