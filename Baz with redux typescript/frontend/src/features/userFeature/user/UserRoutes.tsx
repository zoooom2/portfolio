import { Outlet } from 'react-router-dom';
import { setClicked } from '../userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { setAdminRoute } from '../../adminFeature/adminSlice';

const UserRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setClicked(true));
    dispatch(setAdminRoute(false));
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
