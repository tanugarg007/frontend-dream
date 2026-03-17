import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const allowedEmail = (process.env.REACT_APP_ADMIN_EMAIL || '').trim().toLowerCase();
  const userEmail = (user?.email || '').trim().toLowerCase();
  const emailMismatch = Boolean(allowedEmail) && userEmail !== allowedEmail;

  useEffect(() => {
    if (emailMismatch) {
      logout();
    }
  }, [emailMismatch, logout]);
  
  if (!isAuthenticated || emailMismatch) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
