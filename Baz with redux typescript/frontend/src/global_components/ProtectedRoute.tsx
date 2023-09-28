import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { fetchProfile } from '../features/userFeature/userSlice';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

export default ProtectedRoute;
