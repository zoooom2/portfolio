import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const AdminRoutes = () => {
  const { isAuthenticated, user } = useUserContext();
  console.log(!isAuthenticated, user.role);
  return !isAuthenticated ? (
    <Navigate to='/login' />
  ) : user.role !== 'admin' ? (
    <Navigate to='/' />
  ) : (
    <Outlet />
  );
};

export default AdminRoutes;
