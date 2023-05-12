import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const ProtectedRoute = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useUserContext();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

export default ProtectedRoute;
