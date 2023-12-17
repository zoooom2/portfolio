import { Outlet } from 'react-router-dom';
import { setClicked } from '../userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { setAdminRoute } from '../../adminFeature/adminSlice';

const UserRoutes = () => {
  const dispatch = useAppDispatch();
  const { clicked } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (clicked) dispatch(setClicked(true));
    dispatch(setAdminRoute(false));
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
