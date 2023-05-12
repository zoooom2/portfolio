import React from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const AdminRoutes = ({ isAuthenticated, user }) => {
  const location = useLocation();
  return !isAuthenticated ? (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  ) : user.role !== 'admin' ? (
    <Navigate to='/' />
  ) : (
    <Outlet />
  );
};

export default AdminRoutes;
