import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

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

AdminRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default AdminRoutes;
