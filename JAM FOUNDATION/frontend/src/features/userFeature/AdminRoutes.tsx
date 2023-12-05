import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserType } from '../../types';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { fetchProfile } from '../userFeature/userSlice';
import { setAdminMode } from '../globalSlice';
import Loading from '../../global_components/layout/Loading';

const AdminRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
  user: UserType;
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAdminMode(true));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  if (loading) {
    console.log('loading');
    return (
      <>
        <Loading />
      </>
    );
  } else {
    if (!isAuthenticated) {
      return <Navigate to={`/login?redirectTo=${location.pathname}`} />;
    } else {
      return <Outlet />;
    }
  }
};

export default AdminRoutes;
