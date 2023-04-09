import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useUserContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
