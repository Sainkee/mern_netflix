import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, redirectTo }) => {
  const isLoggedIn = useSelector((state) => state.authenication.isAuthenticated);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default ProtectedRoute;