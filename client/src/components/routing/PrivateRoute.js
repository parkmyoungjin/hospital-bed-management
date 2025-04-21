import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (loading) return <h1>로딩 중...</h1>;
  
  return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute; 