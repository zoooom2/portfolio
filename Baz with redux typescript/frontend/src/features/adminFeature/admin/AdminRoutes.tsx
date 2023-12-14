import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { fetchProfile } from '../../userFeature/userSlice';
import { Loading } from '../../../global_components';
import { setAdminRoute } from '../adminSlice';

const AdminRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(setAdminRoute(true));
  });

  if (loading) {
    return <Loading />;
  } else {
    return !isAuthenticated ? (
      <Navigate to={`/login?redirectTo=${location.pathname}`} />
    ) : (
      <Outlet />
    );
  }
};

export default AdminRoutes;
