import { Outlet } from 'react-router-dom';
import { setClicked } from '../userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';

const UserRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setClicked(true));
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
