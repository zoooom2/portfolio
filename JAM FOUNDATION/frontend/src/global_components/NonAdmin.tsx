import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { setAdminMode } from '../features/globalSlice';
import { useAppDispatch } from '../App/hooks';

const NonAdmin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAdminMode(false));
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default NonAdmin;
